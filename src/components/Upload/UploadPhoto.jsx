import React, { useState } from 'react';
import { storage } from '../../config/firebase';
import { ref, uploadBytes } from "firebase/storage";

export default function UploadPhoto() {
    const [file, setFile] = useState(null);

    const uploadeImage = () => {
        if (file == null) return;
        const imageRef = ref(storage, `userProfilePics/${imagename}`)
    }

    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });

      const handleImageAsFile = (e) => {
        const image = e.target.files[0]
        setFile(imageFile => (image))
    }



  return (
    <div>
        <h1>Upload a Profile Picture</h1>
        <input type="file" name="file" id="file" onChange={e => setFile(e.target.files[0])}/>
    </div>
  )
}
