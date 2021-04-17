const {
  prepareRender,
  drawCommands,
  cameras,
  controls,
  entitiesFromSolids,
} = require("@jscad/regl-renderer");

const perspectiveCamera = cameras.perspective;
const orbitControls = controls.orbit;

const rotateSpeed = 0.002;
const panSpeed = 0.75;
const zoomSpeed = 0.08;

////////////////////////render //////////////////////////////////////////////

function setupRenderer(containerElement, data) {
  const width = containerElement.clientWidth;
  const height = containerElement.clientHeight;

  // each viewer has state
  data.state = {
    // state to control rendering
    camera: {},
    controls: {},
    rotateDelta: [0, 0],
    panDelta: [0, 0],
    zoomDelta: 0,
    // state to track mouse
    mouse: {
      buttons: 0,
      shiftKey: false,
      isOrbiting: false,
      lastClick: 0, // ms
      lastZoom: 0,
    },
  };

  // prepare the camera
  data.state.camera = Object.assign({}, perspectiveCamera.defaults);
  data.state.camera.position = [150, -180, 233];
  perspectiveCamera.setProjection(data.state.camera, data.state.camera, {
    width,
    height,
  });
  perspectiveCamera.update(data.state.camera, data.state.camera);

  // prepare the controls
  data.state.controls = orbitControls.defaults;

  // prepare the renderer
  const setupOptions = {
    glOptions: { container: containerElement },
  };
  const renderer = prepareRender(setupOptions);

  // assemble the options for rendering
  const gridOptions = {
    visuals: {
      drawCmd: "drawGrid",
      show: data.gridOptions.show,
      color: data.gridOptions.color,
      subColor: data.gridOptions.subColor,
      fadeOut: data.gridOptions.fadeOut,
      transparent: data.gridOptions.transparent,
    },
    size: data.gridOptions.size,
    ticks: data.gridOptions.ticks,
  };
  const axisOptions = {
    visuals: {
      drawCmd: "drawAxis",
      show: data.axisOptions.show,
    },
  };
  data.state.content = {
    // define the visual content
    camera: data.state.camera,
    drawCommands: {
      drawGrid: drawCommands.drawGrid,
      drawAxis: drawCommands.drawAxis,
      drawMesh: drawCommands.drawMesh,
    },
    entities: [
      gridOptions,
      axisOptions,
      //...solids
    ],
  };

  const doRotatePanZoom = (state) => {
    let { rotateDelta, panDelta, zoomDelta, controls, camera } = state;
    if (rotateDelta[0] || rotateDelta[1]) {
      const updated = orbitControls.rotate(
        { controls, camera, speed: rotateSpeed },
        rotateDelta
      );
      state.controls = { ...controls, ...updated.controls };
      state.rotateDelta[0] = 0;
      state.rotateDelta[1] = 0;
    }

    if (panDelta[0] || panDelta[1]) {
      const updated = orbitControls.pan(
        { controls, camera, speed: panSpeed },
        panDelta
      );
      state.camera.position = updated.camera.position;
      state.camera.target = updated.camera.target;
      state.panDelta[0] = 0;
      state.panDelta[1] = 0;
    }

    if (zoomDelta) {
      if (Number.isFinite(zoomDelta)) {
        const updated = orbitControls.zoom(
          { controls, camera, speed: zoomSpeed },
          zoomDelta
        );
        state.controls = { ...controls, ...updated.controls };
      } else {
        const entities = state.content.entities;
        const updated = orbitControls.zoomToFit({
          controls,
          camera,
          entities,
        });
        state.controls = { ...controls, ...updated.controls };
      }
      state.zoomDelta = 0;
    }
  };

  // the heart of rendering, as themes, controls, etc change
  const updateAndRender = () => {
    doRotatePanZoom(data.state);

    const updates = orbitControls.update({
      controls: data.state.controls,
      camera: data.state.camera,
    });
    data.state.controls = { ...data.state.controls, ...updates.controls };
    data.state.camera.position = updates.camera.position;
    perspectiveCamera.update(data.state.camera);

    renderer(data.state.content);
    window.requestAnimationFrame(updateAndRender);
  };
  window.requestAnimationFrame(updateAndRender);

  return renderer;
}

///////////////////////////////////////////////////////////////////////

// mouse event handling

const MouseDown = (event, state) => {
  state.mouse.buttons = event.buttons;
  state.mouse.shiftKey = event.shiftKey;
  state.mouse.isOrbiting = true;

  return;
};

const MouseUp = (state, viewerOptions) => {
  // handle double clicks
  const now = Date.now();

  if (state.mouse.lastClick) {
    const ms = now - state.mouse.lastClick;
    if (ms < viewerOptions.doubleClickSpeed) {
      if (state.mouse.isOrbiting) {
        state.zoomDelta = Number.POSITIVE_INFINITY;
      }
    }
  }
  state.mouse.lastClick = now;
  // reset state
  state.mouse.buttons = 0;
  state.mouse.shiftKey = false;
  state.mouse.isOrbiting = false;
};

const MouseMove = (event, state) => {
  if (state.mouse.isOrbiting) {
    if (state.mouse.shiftKey) {
      state.panDelta[0] -= event.movementX;
      state.panDelta[1] += event.movementY;
    } else {
      state.rotateDelta[0] += event.movementX;
      state.rotateDelta[1] -= event.movementY;
    }
  }
};

const Scroll = (event, state) => {
  event.preventDefault();

  state.zoomDelta = event.deltaY;
};

///////

const updateSolids = (state, solids) => {
  state.content.entities = state.content.entities.filter(
    (entity) => !entity.type
  ); // remove old solids
  let entities = entitiesFromSolids({}, solids);
  state.content.entities.push(...entities);
  console.log("updated");
  const updated = orbitControls.zoomToFit({
    controls: state.controls,
    camera: state.camera,
    entities,
  });
  state.controls = { ...state.controls, ...updated.controls };
};

export default {
  setupRenderer,
  MouseDown,
  MouseUp,
  MouseMove,
  Scroll,
  updateSolids,
};
