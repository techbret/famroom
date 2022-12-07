import React, { useState } from 'react';
import { storage } from '../../config/firebase';
import { ref, uploadBytes } from "firebase/storage";
import { useParams } from 'react-router-dom';

export default function UploadPhoto() {
    const [file, setFile] = useState(null);
    let { userId } = useParams();

    const uploadeImage = () => {
        if (file == null) return;
        const imageRef = ref(storage, `/userProfilePics/${userId + "profilePic"}`);
        uploadBytes(imageRef, file).then(() => {
            alert('Image Uploaded')
        })
    }   



  return (
    <div>
        <h1>Upload a Profile Picture</h1>
        <input type="file" name="file" id="file" onChange={e => setFile(e.target.files[0])}/>
        <button onClick={uploadeImage}>Upload</button>
    </div>
  )
}
