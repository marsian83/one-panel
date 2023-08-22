import { servicesBaseUrl } from "../../config";

export enum Service {
  DB_ACCESS = `${servicesBaseUrl}:9081`,
  MOCKDATA = `${servicesBaseUrl}:9082`,
}
