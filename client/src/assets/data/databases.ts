import { Database, Plan } from "../../interfaces/Data.d";

const databases: Database[] = [
  {
    id: 0,
    name: "Primary clients",
    plan: Plan.basic,
    icon: {
      imageUrl: "https://shantitrip.in/favicon.ico",
    },
    artifacts: [0, 1, 2],
    lastUpdated: Date.now() - 0.4 * 24 * 3600 * 1000,
  },
  {
    id: 1,
    name: "testDB",
    plan: Plan.basic,
    icon: {
      imageUrl:
        "https://d1c4rk9le5opln.cloudfront.net/02c15640188f96966cd91a35b5bd7859_big.jpg",
    },
    artifacts: [],
    lastUpdated: Date.now() - 1 * 24 * 3600 * 1000,
  },
  {
    id: 2,
    name: "testDB",
    plan: Plan.basic,
    icon: {
      codepoint: "e865",
    },
    artifacts: [],
    lastUpdated: Date.now() - 21 * 24 * 3600 * 1000,
  },
  {
    id: 3,
    name: "testDB",
    plan: Plan.basic,
    icon: {},
    artifacts: [],
    lastUpdated: Date.now() - 72 * 24 * 3600 * 1000,
  },
];

export default databases;
