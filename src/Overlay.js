export const Overlay = ({ zoom, setZoom }) => {
  const handleZoomChange = (action) => {
    setZoom((prev) => {
      const newZoom = action === 'in' ? prev + 1 : prev - 1
      const minZoom = 3
      const maxZoom = 17
      return Math.min(Math.max(newZoom, minZoom), maxZoom)
    })
  }

  return (
    <div className="overlay">
      <a href="#">
        <img src="./assets/logoWhite.png" className="logo" />
      </a>

      <a href="https://github.com/davidebalice/react-fiber-3d-gallery" target="_blank">
        <img src="./assets/github_white.png" className="github" />
      </a>

      <div className="zoomContainer">
        <div className="zoomContainerTitle">Zoom</div>
        <div className="zoomContainerButton" onClick={() => handleZoomChange('out')}>
          +
        </div>
        <div className="zoomContainerButton" onClick={() => handleZoomChange('in')}>
          -
        </div>
      </div>

      <div className="footer">
        <a href="https://www.davidebalice.dev" target="_blank">
          www.davidebalice.dev
        </a>
      </div>
    </div>
  )
}
