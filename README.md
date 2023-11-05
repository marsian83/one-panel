<a name="readme-top"></a>

<br />
<div align="center">
 <a href="https://github.com/marsian83/one-panel">
    <img src="https://onepanel.okeanos.solutions/logo.png" alt="Logo" width="128" height="128" />
  </a>

  <h1 align="center">OnePanel</h1>

  <p align="center">
  A plug and play Admin Panel for your applications. Designed for developers.
    <br />
    <!-- <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a> -->
    <!-- <br /> -->
    <br />
    <a href="https://one-panel.okeanos.solutions">View Demo</a>
    ·
    <a href="https://github.com/marsian83/one-panel/issues">Report Bug</a>
    ·
    <a href="https://github.com/marsian83/one-panel/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

OnePanel provides easy to use solutions for adding an Admin Panel to any development project. Data is stored in MongoDB Databases and the connection URIs for each are accessible. The data is made accessible to the developer by exposing API endpoints.

The main problem that developers face is managing data from non-technical clients who lack knowledge of data structures and database management. This leads to difficulties in gathering and structuring the required data for projects. The motivation behind this project is to streamline the data management process and provide a user-friendly solution to simplify data integration for both developers and non-technical stakeholders. By creating an 'Admin Panel as a Service,' the project aims to enhance the productivity and effectiveness of developers and businesses alike.
The primary objectives of the project are as follows:

- Develop an admin panel as a service with a simple graphical user interface for non-technical users to add and manage data efficiently.

- Provide developers with the ability to define customizable data structures and schema for their projects.

- Implement secure data handling and access control mechanisms within the admin panel.

- Expose API endpoints to enable developers to use the data with their preferred architecture plans.

- **`To Do`** Integrate a generative AI module to generate mock data, facilitating realistic visualization of projects during the approval phase.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

The following technologies contributed signifactly to the development of this project

- NodeJS
- Typescript
- ReactJs
- TailwindCSS
- golang
- MongoDB

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

You will need to have the following dependencies installed on your system

- Golang [click here](https://go.dev/doc/install)
- NodeJs [click here](https://nodejs.org/en/download/releases)
- Access to a remote or local mongodb instance (connection URI)

### Installation

_Below is a rough step by step guide on how to get the project up and running_

1. Clone the repo
   ```sh
   git clone https://github.com/marsian83/one-panel
   ```
2. Install NPM packages for client

   ```sh
   cd client

   yarn
   ```

3. Install NPM packages for server

   ```sh
   cd server

   yarn
   ```

4. Install go modules for the following services
   ```
   /api
   /services/db_access
   /services/mockdata
   ```
5. Run the client
   ```sh
   cd client
   yarn dev
   ```
6. Run the server similarly and run the aforementioned Go services

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

The landing page is very barebones and contains links to most pages within the application.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
