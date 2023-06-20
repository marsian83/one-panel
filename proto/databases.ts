import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { DatabasesClient as _databases_DatabasesClient, DatabasesDefinition as _databases_DatabasesDefinition } from './databases/Databases';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  databases: {
    DB: MessageTypeDefinition
    Databases: SubtypeConstructor<typeof grpc.Client, _databases_DatabasesClient> & { service: _databases_DatabasesDefinition }
  }
  google: {
    protobuf: {
      Empty: MessageTypeDefinition
    }
  }
}

