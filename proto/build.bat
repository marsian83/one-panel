@echo off
cd server
yarn proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=proto/ ../proto/databases.proto