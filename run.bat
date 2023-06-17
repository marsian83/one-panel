@echo off
cd client
start cmd /c yarn dev
cd ../server
start cmd /c yarn dev
cd ..
@echo on