import React from 'react';
import FileUpload from './components/FileUpload';
import ImageList from './components/ImageList';
import { ImageProvider } from './context/ImageContext';
function App() {
    return (
        <div style={{ margin: 'auto' }}>
            <ImageProvider>
                <FileUpload />
                <ImageList />
            </ImageProvider>
        </div>
    );
}

export default App;
