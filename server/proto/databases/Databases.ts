// Original file: ../proto/databases.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { DB as _databases_DB, DB__Output as _databases_DB__Output } from '../databases/DB';
import type { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from '../google/protobuf/Empty';

export interface DatabasesClient extends grpc.Client {
  CreateDatabase(metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientWritableStream<_databases_DB>;
  CreateDatabase(metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientWritableStream<_databases_DB>;
  CreateDatabase(options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientWritableStream<_databases_DB>;
  CreateDatabase(callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientWritableStream<_databases_DB>;
  createDatabase(metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientWritableStream<_databases_DB>;
  createDatabase(metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientWritableStream<_databases_DB>;
  createDatabase(options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientWritableStream<_databases_DB>;
  createDatabase(callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientWritableStream<_databases_DB>;
  
}

export interface DatabasesHandlers extends grpc.UntypedServiceImplementation {
  CreateDatabase: grpc.handleClientStreamingCall<_databases_DB__Output, _google_protobuf_Empty>;
  
}

export interface DatabasesDefinition extends grpc.ServiceDefinition {
  CreateDatabase: MethodDefinition<_databases_DB, _google_protobuf_Empty, _databases_DB__Output, _google_protobuf_Empty__Output>
}
