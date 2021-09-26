import React, { useContext } from 'react';
import { ImageContext } from '../context/ImageContext';
const ImageList = () => {
    const { images } = useContext(ImageContext);
    const imgList = images.map((image) => {
        return <img key={image.key} style={{ width: '100%' }} src={`http://localhost:5000/uploads/${image.key}`} alt="NotLoadImage" />;
    });
    return (
        <div style={{ width: '50%' }}>
            <h1>Image List</h1>
            {imgList}
        </div>
    );
};

export default ImageList;
