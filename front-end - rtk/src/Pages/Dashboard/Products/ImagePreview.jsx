import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ImagePreview = (props) => {
  return (
    <>
      <div className='overlay'>
        <h1>Image preview</h1>
        <img src={props.image || "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg"} alt="" className="image" />
        <FontAwesomeIcon icon={faClose} onClick={() => props.setPreview(false)} />
      </div>
    </>
  )
}

export default ImagePreview