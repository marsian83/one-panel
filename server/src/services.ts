import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoloader from "@grpc/proto-loader";

import { ProtoGrpcType } from "../proto/databases";
import { DatabasesHandlers } from "../proto/databases/Databases";

const PROTO_FILE = "../proto/databases";
const PORT = 9099;

const packageDef = protoloader.loadSync(path.resolve(__dirname, PROTO_FILE));

const grpcObj = grpc.loadPackageDefinition(
  packageDef
) as unknown as ProtoGrpcType;

const databasesPackage = grpcObj.databases;

function main() {
  const server = getServer();

  server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(err);
        return;
      }
      server.start();
      console.log(`server started 0.0.0.0:${PORT}`);
    }
  );
}

function getServer() {
  const server = new grpc.Server();
  server.addService(databasesPackage.Databases.service, {
    Databases: (req: any, res: any) => {
      console.log(req);
    },
  });

  return server;
}
