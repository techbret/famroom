import React, { useState } from 'react';
import firebase from 'firebase';

// Define a component that allows users to select and upload multiple pictures to Firebase Storage
const PictureUploader = () => {
  // Create a state variable to store the selected files
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Handle file input change events
  const onFilesChange = (event) => {
    // Update the selected files state with the selected files
    setSelectedFiles(event.target.files);
  };

  // Handle file uploads
  const onUpload = () => {
    // Get a reference to the Firebase Storage service
    const storage = firebase.storage();

    // Create a storage reference for the user's photos folder
    const photosRef = storage.ref('photos');

    // Loop through the selected files
    for (const file of selectedFiles) {
      // Create a new storage reference for the file
      const fileRef = photosRef.child(file.name);

      // Upload the file to Firebase Storage
      fileRef.put(file).then(() => {
        // Get the uploaded file's download URL
        fileRef.getDownloadURL().then((url) => {
          // Log the download URL to the console
          console.log(url);
        });
      });
    }
  };

  return (
    <div>
      {/* Render a file input that allows users to select multiple files */}
      <input
        type="file"
        multiple
        onChange={onFilesChange}
      />

      {/* Render a button that lets users upload the selected files to Firebase Storage */}
      <button onClick={onUpload}>Upload</button>
    </div>
  );
};


