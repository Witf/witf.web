## Getting started
- Open in the newest Visual Studio, atleast 2015 SP3
- Restore npm packages
- Set the environment variable and then restart dotnet run. On Windows
thats:
```bash
set ASPNETCORE_ENVIRONMENT=Development
dotnet run
```bash
Or on Mac/Linux:
```
set ASPNETCORE_ENVIRONMENT=Development
export ASPNETCORE_ENVIRONMENT=Development
dotnet run
```

This starts the app in dev mode and enables hot module reload.
If your having trubble with the HMR (Hot module reload) ensure that 
the environment variable has been set correctly. Make sure your 
environment have access to the variable. If all fails, edit startup.cs for HMR.
