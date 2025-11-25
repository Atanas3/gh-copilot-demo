# gh-copilot-demo Project Documentation

## Overview
This project is a full-stack demo application for managing and visualizing music album data. It consists of:
- A .NET 8 Web API backend (`albums-api`) for album data
- A Vite + Vue 3 frontend (`album-viewer`) for displaying and visualizing albums
- Infrastructure as Code (IaC) for cloud deployment (Terraform, Bicep, Kubernetes, GitHub Actions)

---

## Backend: albums-api
- **Location:** `/albums-api`
- **Tech:** .NET 8, C#, ASP.NET Core Web API
- **Key Files:**
	- `Program.cs`: Main entry point for the API
	- `Controllers/AlbumController.cs`: API endpoints for albums (CRUD, sorting)
	- `Models/Album.cs`: Album model and static data
- **Features:**
	- List all albums: `GET /albums`
	- Get album by ID: `GET /albums/{id}`
	- Sort albums by price, name, or genre: `GET /albums/sort/{by}`

---

## Frontend: album-viewer
- **Location:** `/album-viewer`
- **Tech:** Vite, Vue 3, TypeScript, D3.js
- **Key Files:**
	- `src/App.vue`: Main app shell
	- `src/components/AlbumCard.vue`: Album display component
	- `src/utils/validators.ts`: Validation utilities (album title, artist, year, GUID, IPv6, French date parsing)
	- `src/utils/viz.ts`: D3.js utilities for plotting album sales by month/year
	- `src/utils/validators.test.ts`: Mocha/Chai unit tests for all validators
- **Features:**
	- Display albums and details
	- Validate album data on the client
	- Visualize album sales by month using D3.js
	- Load sales data from external JSON

---

## Infrastructure as Code (IaC)
- **Location:** `/iac`
- **Tech:** Terraform, Bicep, Kubernetes YAML
- **Key Files:**
	- `iac/bicep/main.bicep`: Azure resources (e.g., ACR, AKS)
	- `iac/terraform/apps.tf`: Terraform for cloud resources
	- `iac/bicep/modules/`: Bicep modules for container app, Dapr statestore
	- `iac/terraform/`: Terraform modules
- **Features:**
	- Provision Azure Container Registry (ACR)
	- Provision Azure Kubernetes Service (AKS)
	- Deploy backend and frontend containers

---

## CI/CD: GitHub Actions
- **Location:** `.github/workflows/workflow.yml`
- **Features:**
	- On push to `main`:
		- Build and push Docker image for `albums-api` to ACR and Docker Hub (tagged with run ID)
		- Run tests on the built Docker image
		- Deploy the image to the dev AKS cluster
	- Uses repository secrets for credentials and configuration

---

## Testing
- **Backend:** Use `dotnet test` for C# unit/integration tests (if present)
- **Frontend:** Run `npm test` or `npx mocha` in `album-viewer` for validator tests
- **Validation:** All validators are covered with unit tests for edge cases

---

## How to Run Locally
1. **Backend:**
	 - `cd albums-api`
	 - `dotnet run`
2. **Frontend:**
	 - `cd album-viewer`
	 - `npm install`
	 - `npm run dev`
3. **Tests:**
	 - `cd album-viewer`
	 - `npm test` (or `npx mocha`)

---

## Deployment
- Use the provided IaC (Terraform/Bicep) to provision Azure resources
- Use the GitHub Actions workflow for automated build, test, and deployment
- Ensure all required secrets are set in the GitHub repository

---

## Notes
- All code is TypeScript or C# with type safety and validation
- D3.js is used for interactive data visualization
- The project is modular and ready for extension (add more endpoints, visualizations, etc.)

---

For more details, see the code comments and each folder's README (if present).
# Github Copilot demo 

## Demo Scenarios

### To start discovering Github Copilot jump to [`The Ultimate GitHub Copilot Tutorial on MOAW`](https://aka.ms/github-copilot-hol)
<br/>


## Solution Overview


This repository has been inspired by the [Azure Container Apps: Dapr Albums Sample](https://github.com/Azure-Samples/containerapps-dapralbums)

It's used as a code base to demonstrate Github Copilot capabilities.

The solution is composed of two services: the .net album API and the NodeJS album viewer.


### Album API (`album-api`)

The [`album-api`](./album-api) is an .NET 8 minimal Web API that manage a list of Albums in memory.

### Album Viewer (`album-viewer`)

The [`album-viewer`](./album-viewer) is a modern Vue.js 3 application built with TypeScript through which the albums retrieved by the API are surfaced. The application uses the Vue 3 Composition API with full TypeScript support for enhanced developer experience and type safety. In order to display the repository of albums, the album viewer contacts the backend album API.

## Getting Started

There are multiple ways to run this solution locally. Choose the method that best fits your development workflow.

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [TypeScript](https://www.typescriptlang.org/) (automatically installed with project dependencies)
- [Visual Studio Code](https://code.visualstudio.com/) (recommended)

### Option 1: Using VS Code Debug Panel (Recommended)

This is the easiest way to run the solution with full debugging capabilities.

1. Open the solution in Visual Studio Code
2. Open the Debug panel (Ctrl+Shift+D / Cmd+Shift+D)
3. Select **"All services"** from the dropdown
4. Click the green play button or press F5

This will automatically:
- Build the .NET API and start it on `http://localhost:3000`
- Start the Vue.js TypeScript app on `http://localhost:3001`
- Open both services in your default browser

You can also run individual services:
- **"C#: Album API Debug"** - Runs only the .NET API
- **"Node.js: Album Viewer Debug"** - Runs only the Vue.js TypeScript frontend

### Option 2: Command Line

#### Starting the Album API (.NET)

```powershell
# Navigate to the API directory
cd albums-api

# Restore dependencies (first time only)
dotnet restore

# Run the API
dotnet run
```

The API will start on `http://localhost:3000` and you can access the Swagger documentation at `http://localhost:3000/swagger`.

#### Starting the Album Viewer (Vue.js + TypeScript)

```powershell
# Navigate to the viewer directory
cd album-viewer

# Install dependencies (first time only)
npm install

# Start the development server
npm run dev

# Optional: Run TypeScript type checking
npm run type-check
```

The Vue.js TypeScript app will start on `http://localhost:3001` and automatically open in your browser.

#### Running Both Services

You can run both services simultaneously using separate terminal windows:

```powershell
# Terminal 1 - Start the API
cd albums-api
dotnet run

# Terminal 2 - Start the Vue TypeScript app
cd album-viewer
npm run dev
```

### Environment Configuration

The solution uses the following default configuration:

- **Album API**: Runs on `http://localhost:3000`
- **Album Viewer**: Runs on `http://localhost:3001` (TypeScript + Vue 3)
- **API Endpoint**: The Vue app is configured to call the API at `localhost:3000`

If you need to change these settings, you can modify:
- API port: `albums-api/Properties/launchSettings.json`
- Vue app configuration: Environment variables in `.vscode/launch.json` or set `VITE_ALBUM_API_HOST` environment variable

### Alternative: GitHub Codespaces

The easiest way is to open this solution in a GitHub Codespace, or run it locally in a devcontainer. The development environment will be automatically configured for you.