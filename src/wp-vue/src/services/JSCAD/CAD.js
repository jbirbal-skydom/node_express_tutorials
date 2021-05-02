export const CAD = [
  {
    polygons: [
      {
        vertices: [
          [-11, -11, -11],
          [-11, -11, 11],
          [-11, 11, 11],
          [-11, 11, -11],
        ],
        plane: [-1, 0, 0, 11],
      },
      {
        vertices: [
          [11, -11, -11],
          [11, 11, -11],
          [11, 11, 11],
          [11, -11, 11],
        ],
        plane: [1, 0, 0, 11],
      },
      {
        vertices: [
          [-11, -11, -11],
          [11, -11, -11],
          [11, -11, 11],
          [-11, -11, 11],
        ],
        plane: [0, -1, 0, 11],
      },
      {
        vertices: [
          [-11, 11, -11],
          [-11, 11, 11],
          [11, 11, 11],
          [11, 11, -11],
        ],
        plane: [0, 1, 0, 11],
      },
      {
        vertices: [
          [-11, -11, -11],
          [-11, 11, -11],
          [11, 11, -11],
          [11, -11, -11],
        ],
        plane: [0, 0, -1, 11],
      },
      {
        vertices: [
          [-11, -11, 11],
          [11, -11, 11],
          [11, 11, 11],
          [-11, 11, 11],
        ],
        plane: [0, 0, 1, 11],
      },
    ],
    isRetesselated: false,
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    color: [1, 1, 0, 1],
  },
];