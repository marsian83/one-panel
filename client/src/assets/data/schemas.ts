import { Schema } from "../../interfaces/Data.d";

const dummySchemas: Schema[] = [
  {
    id: 0,
    definition: [
      {
        name: "name",
        type: "string",
      },
      {
        name: "description",
        type: "string",
      },
      {
        name: "imageUrl",
        type: "string",
      },
      {
        name: "example",
        type: "string",
        optional: true,
      },
      {
        name: "interval",
        type: "number",
      },
      {
        name: "cost",
        type: "number",
      },
      {
        name: "location",
        type: [
          { name: "googleMapsCode", type: "string" },
          { name: "appleMapsCode", type: "string" },
          {
            name: "coordinates",
            type: [
              { name: "latitude", type: "number" },
              { name: "longitude", type: "number" },
            ],
          },
        ],
      },
      {
        name: "references",
        type: "number",
      },
    ],
  },
];

export default dummySchemas;
