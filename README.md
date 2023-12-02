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
    <a href="https://onepanel.okeanos.solutions">View Demo</a>
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
       <li><a href="#system-architecture">System Architecture</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#screenshots">Screenshots</a></li>
    <li><a href="#usage">Usage - Demo Video</a></li>
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

## System Architecture
<img width="825" alt="image" src="https://github.com/marsian83/one-panel/assets/114365550/8e648458-ed77-4d5a-82cc-7d65f6392810">

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

You will need to have the following dependencies installed on your system

- Golang [click here](https://go.dev/doc/install)
- NodeJs [click here](https://nodejs.org/en/download/releases)
- Access to a remote or local mongodb instance (connection URI)

## Screenshots

#### Auth Page
<img width="1120" alt="Screenshot 2023-08-11 135804" src="https://github.com/marsian83/one-panel/assets/114365550/c739cfc6-b282-4c5f-846c-731d22437ab5">

#### Databases
<img width="1120" alt="Screenshot 2023-08-11 140109" src="https://github.com/marsian83/one-panel/assets/114365550/999559ec-8fb0-4581-952d-108637dbecfb">

#### Creating new Databases
<img width="1120" alt="Screenshot 2023-08-11 140245" src="https://github.com/marsian83/one-panel/assets/114365550/4354634a-1901-4839-82d7-0e43d07f575e">

#### Search through Databases
<img width="1120" alt="Screenshot 2023-08-11 140416" src="https://github.com/marsian83/one-panel/assets/114365550/14b30144-1c9e-4646-80ac-4de55f8af309">

#### Single Database view -> Artifacts page
<img width="1120" alt="Screenshot 2023-08-11 140615" src="https://github.com/marsian83/one-panel/assets/114365550/50caa8bd-2c7c-4996-b55e-a1f8f75707c6">

#### Panel/New Entry form
<img width="1120" alt="Screenshot 2023-08-11 140756" src="https://github.com/marsian83/one-panel/assets/114365550/ff959f51-f393-42db-b6b6-859c5b9c693e">

#### Current entries
<img width="1120" alt="Screenshot 2023-08-11 141035" src="https://github.com/marsian83/one-panel/assets/114365550/c764d390-8a45-4232-bd4c-fb51372bdeb1">

#### Schema
<img width="1120" alt="Screenshot 2023-08-11 142640" src="https://github.com/marsian83/one-panel/assets/114365550/892a5542-885a-4da9-87b2-bb4a01053b2b">


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

https://github.com/marsian83/one-panel/assets/114365550/a5370e4d-914d-4daa-b541-c786dd46e31e

<p align="right">(<a href="#readme-top">back to top</a>)</p>
