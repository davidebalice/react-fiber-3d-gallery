export const Overlay = () => {
  //const [images, setImages] = useState([])

  return (
    <div className="overlay">
      <a href="#">
        <img src="./assets/logoWhite.png" className="logo" />
      </a>

      <a href="https://github.com/davidebalice/react-fiber-3d-gallery" target="_blank">
        <img src="./assets/github_white.png" className="github" />
      </a>

      <div className="footer">
        <a href="https://www.davidebalice.dev" target="_blank">
          www.davidebalice.dev
        </a>
      </div>
    </div>
  )
}
