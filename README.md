# Portfolio-main

Personal portfolio built with React, TypeScript and Vite.

> This repository contains a frontend portfolio project scaffolded with Vite and TypeScript. It uses React 19, Tailwind CSS, GSAP for animations, and React Router for client-side routing.


## Table of contents

- [About](#about)
- [Tech stack](#tech-stack)
- [Features](#features)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Available scripts](#available-scripts)
- [Build & deploy](#build--deploy)
- [Project structure (high level)](#project-structure-high-level)
- [Tips](#tips)
- [Contributing](#contributing)
- [Credits](#credits)
- [License](#license)


## About

This is a personal portfolio site intended to showcase projects, skills and contact information. The repo is configured for modern front-end development using Vite and TypeScript and is ready to be deployed (for example on Vercel).


## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS (configured via @tailwindcss/vite)
- GSAP (for animations)
- React Router


## Features

- Fast development experience with Vite
- Type-safe code using TypeScript
- Modern styling with Tailwind CSS
- Smooth animations using GSAP
- Client-side routing with React Router


## Getting started

### Prerequisites

- Node.js (recommended 18+)
- npm or pnpm (this repo contains lockfiles for npm and pnpm)

### Install

1. Clone the repository

   git clone https://github.com/Jatinyadav29/Portfolio-main.git
   cd Portfolio-main

2. Install dependencies

- Using npm

  npm install

- Or using pnpm

  pnpm install


### Available scripts

The package.json defines the following scripts:

- npm run dev — Run the development server (Vite). It uses `vite --host 0.0.0.0` so the dev server is reachable on the LAN.
- npm run build — Build the app for production using Vite.
- npm run preview — Serve the built app locally for testing with Vite preview.
- npm run format — Run the configured formatter (`oxfmt`) if installed.

Example (development):

npm run dev


## Build & deploy

- Build the app:

  npm run build

- Preview the production build locally:

  npm run preview

This repository includes a vercel.json file which indicates it can be deployed to Vercel with minimal configuration: connect the GitHub repo in your Vercel account and it will use Vite's build step.


## Project structure (high level)

- index.html — Vite entry HTML
- src/ — source files (React + TypeScript)
- package.json — project metadata & scripts
- tsconfig.json — TypeScript configuration
- vite.config.ts — Vite configuration


## Tips

- If you are using Tailwind, ensure the Tailwind config and postcss setup (if any) are present and that `tailwindcss` is configured in your project. The devDependencies include `tailwindcss` and `@tailwindcss/vite`.
- If you run into type errors, try installing the matching @types packages or adjust `tsconfig.json` as needed.


## Contributing

Contributions are welcome. Open an issue or submit a pull request.


## Credits

- Built with Vite, React, TypeScript, Tailwind and GSAP.


## License

No license specified. Add a LICENSE file if you want to set an open-source license.


---

If you'd like, I can:
- Add more detailed setup instructions (Tailwind config, environment variables)
- Create example components or route structure in src/
- Add a demo GIF or screenshots and a live demo link

