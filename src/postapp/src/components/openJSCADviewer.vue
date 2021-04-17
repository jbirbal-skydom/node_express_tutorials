<template>
  <div
    class="viewer"
    @mousemove="onMouseMove"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @wheel="onScroll"
  >
    <h1>{{ file }} : {{ id }} : {{ fileName }} :</h1>

    <br />
  </div>
</template>

<script>
import Renderer from "@/services/JSCAD/index";

////
import { CAD } from "@/services/JSCAD/CAD";
const solids = CAD;

///

/////////////////////// DIV ////////////////////////////

let numberOfInstances = 0;

export default {
  name: "openJSCADviewer",
  props: {
    file: String,
  },
  data() {
    return {
      state: this.data,
      fileName: null,

      gridOptions: {
        show: true,
        color: [0, 0, 0, 1],
        subColor: [0, 0, 1, 0.5],
        fadeOut: false,
        transparent: true,
        size: [100, 100],
        ticks: [100, 10],
      },
      axisOptions: {
        show: true,
      },
      viewerOptions: {
        rotateSpeed: 0.002,
        zoomSpeed: 0.08,
        doubleClickSpeed: 300, // ms
      },
    };
  },

  computed: {
    update() {
      if (this.state) {
        Renderer.updateSolids(this.state, this.$store.state.solids);
      }
      // update the fake DOM entry
      return this.$store.state.count;
    },
    solids() {
      return this.$store.state.solids;
    },
  },

  methods: {
    // mouse event handling
    onMouseDown: function (event) {
      this.fileName = "down";

      Renderer.MouseDown(event, this.state);
    },
    onMouseUp: function () {
      this.fileName = "up";

      Renderer.MouseUp(this.state, this.viewerOptions);
    },
    onMouseMove: function (event) {
      this.fileName = "move";
      Renderer.MouseMove(event, this.state);
    },
    onScroll: function (event) {
      this.fileName = "scroll";
      Renderer.Scroll(event, this.state);
    },
  },

  // VUE lifecycle additions
  created: function () {
    numberOfInstances++;
    this.id = numberOfInstances;
  },
  mounted: function () {
    this.$el.id = `viewer${this.id}`;

    console.log(this.$el);
    this.renderer = Renderer.setupRenderer(this.$el, this.$data);
    this.$store.commit("setSolids", solids);
    Renderer.updateSolids(this.state, this.$store.state.solids);
  },
  // VUE HTML template for the viewer (and 3D canvas)

  ////////// set default solid ////////////

  // set the solids, which updates the viewer as well
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.viewer {
  margin-left: auto;
  margin-right: auto;
  width: 8cm;
  height: 8cm;
  outline: 1px solid black;
  background-color: transparent;
}
</style>
