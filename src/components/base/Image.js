import React from "react"
import UpLoadIcon from "../../assets/upload.png"
import '../../styles/base/Image.css'

const Image = ({src, width, height}) => {

    return (
        <img className="image" 
        style={{
            width:`${width}`,
            height:`${height}`,
            filter: src ?  'invert(0)' : 'invert(0.5)',
        }}
        src={src ? src : UpLoadIcon} />
    );
}

export default Image;