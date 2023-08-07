import { Schema } from "../../interfaces/Data.d";

const dummySchemas: Schema[] = [
  {
    id: 0,
    definition: [
      {
        name: "Name",
        type: "string",
      },
      {
        name: "Description",
        type: "string",
      },
      {
        name: "imageUrl",
        type: "string",
      },
      {
        name: "Cost",
        type: "number",
      },
      {
        name: "Location",
        type: [
          { name: "latitude", type: "number" },
          { name: "longitude", type: "number" },
        ],
      },
      {
        name: "References",
        type: "number",
      },
    ],
  },
];

export default dummySchemas;
