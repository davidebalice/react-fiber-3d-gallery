# React Fiber 3D Gallery

A virtual 3D art gallery built with React Three Fiber.
Images are fetched from a REST API and displayed as framed pictures on the walls of a room; click a picture to move the camera in front of it.

**Live demo:** <https://react-fiber-3d-gallery.davidebalice.dev/>

![Screenshot](https://www.aroundweb.it/screenshot/gallery3d.jpg)

## Features

- 3D room with textured walls, ceiling and a reflective floor
- Pictures loaded from a REST API and placed on the walls
- Click a picture to fly the camera to it, click again or on empty space to go back
- Animated hover effect on the frames
- Spotlight models and lights over each picture
- Zoom controls, with an initial zoom based on the screen width
- Loading screen while the assets are loading

## Tech stack

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [Three.js](https://threejs.org/)
- [React Three Fiber](https://r3f.docs.pmnd.rs/) and [Drei](https://drei.docs.pmnd.rs/)
- [maath](https://github.com/pmndrs/maath) for camera easing
- [wouter](https://github.com/molefrog/wouter) for routing
- [Axios](https://axios-http.com/)

## Getting started

### Requirements

- Node.js 20 or later
- npm

### Installation

```bash
git clone https://github.com/davidebalice/react-fiber-3d-gallery.git
cd react-fiber-3d-gallery
npm install
```

### Configuration

Copy `.env.example` to `.env` and set the URL of the images API:

| Variable            | Description                                   |
| ------------------- | --------------------------------------------- |
| `VITE_API_BASE_URL` | Base URL of the API that returns the gallery  |
| `VITE_BACKEND_URL`  | Base URL used to load the image thumbnails    |

### Available scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## Project structure

```
public/assets/     # Textures, logos and the spotlight glTF model
src/
├── Gallery.jsx    # Canvas, API call, frames and camera logic
├── Walls.jsx      # Room walls, ceiling and reflective floor
├── Spotlight.jsx  # Spotlight models
├── Overlay.jsx    # Logo, links and zoom controls
├── Preloader.jsx  # Loading screen
└── main.jsx       # Application entry point
```

## Author

**Davide Balice** – [davidebalice.dev](https://www.davidebalice.dev)
