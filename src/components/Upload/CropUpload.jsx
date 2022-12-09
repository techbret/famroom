import React, { useState } from 'react';
import Cropper from 'react-cropper';
import firebase from 'firebase/app';
import 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
  // Your Firebase configuration goes here
};
firebase.initializeApp(firebaseConfig);

const MyCropper = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleCrop = () => {
    // Get the cropped image data from the Cropper component
    const imageData = cropperRef.current.getCroppedCanvas().toDataURL();

    // Upload the image data to Firebase Storage
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child('my-cropped-image.png');
    imageRef.putString(imageData, 'data_url').then((snapshot) => {
      // Handle the successful upload
    });
  };

  // Reference to the Cropper component
  const cropperRef = React.createRef();

  return (
    <div>
      {/* Input to select a file */}
      <input type="file" onChange={handleFileChange} />

      {/* Cropper component to crop the selected image */}
      {file && (
        <Cropper
          ref={cropperRef}
          src={file}
          style={{ height: 400, width: '100%' }}
          // Other props for the Cropper component go here
        />
      )}

      {/* Button to crop the image and upload it to Firebase Storage */}
      <button onClick={handleCrop}>Crop and Upload</button>
    </div>
  );
};
