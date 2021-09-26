import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadContainer, PreviewContainer, ImagePreview, UploadButton } from './styles';
import ProgressBar from '../ProgressBar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const FileUpload = () => {
    const [acceptedFile, setAcceptedFile] = useState([]);
    const [percent, setPercent] = useState(0);
    const [imageSrc, setImageSrc] = useState(null);
    const onDrop = useCallback(
        (acceptedFiles) => {
            const reader = new FileReader();
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');
            if (acceptedFiles[0]) {
                reader.readAsDataURL(acceptedFiles[0]);
                reader.onload = (e) => {
                    setImageSrc(e.target.result);
                };
            }
            setAcceptedFile(acceptedFiles[0]);
        },
        [setImageSrc],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, minSize: 0, maxSize: 1024 * 1024 * 10 });

    const onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', acceptedFile);
        try {
            const res = await axios.post('/images/image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (e) => {
                    setPercent(Math.round((e.loaded * 100) / e.total));
                },
            });

            setTimeout(() => {
                setImageSrc(null);
                setPercent(0);
            }, 3000);

            toast.success('이미지 업로드 성공');
        } catch (err) {
            toast.error(err.message);
            console.log(err);
        }
    };
    return (
        <>
            <ToastContainer />
            <form onSubmit={onsubmit}>
                <UploadContainer>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        {isDragActive ? <p>여기에 파일을 드래그 해주세요</p> : <p>여기에 파일을 드레그 하거나 파일을 선택해 주세요</p>}
                    </div>
                </UploadContainer>
                <PreviewContainer>
                    <ImagePreview src={imageSrc} />
                </PreviewContainer>
                <ProgressBar percent={percent} />
                <UploadButton type="submit">파일 업로드</UploadButton>
            </form>
        </>
    );
};

export default FileUpload;
