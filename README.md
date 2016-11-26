## Getting started
- Install node.js

- Set environment variables on your system
```bash
ASPNETCORE_ENVIRONMENT=Development
WITF_API=www.host.com
```
On windows you can open visual studio and everything gets restored. 
But it might be good to restore everything the first time manually (and you have to on mac).

- CD to the root of the project
- Run these commands one by one
```bash
npm install yarn webpack -g
yarn install
webpack webpack.config.vendor.js
webpack webpack.config.js
dotnet restore
```

##### Environment
Mac seems to be a "run and test" but for smooth sailing with hot module restore 
and everything windows seems to be prefered for now.

###Now give her a spin with
```bash
dotnet run
```