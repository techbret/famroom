import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { UserAuth } from "../../context/UseContext/AuthContext";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function UploadPhoto() {
  const [file, setFile] = useState();
  const [cropped, setCropped] = useState(null);
  let { uploadProfile, profileUrl } = UserAuth();
  const navigate = useNavigate();

  const cropperRef = useRef(null);

  const onCrop = (e) => {
    e.preventDefault()
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    const croppedImage = cropper.getCroppedCanvas().toDataURL();
  };  

  const uploadImage = () => {
    const croppedImage = cropperRef.current.cropper.getCroppedCanvas();
    croppedImage.toBlob((blob) => {
      const newFile = new File([blob], 'cropped.jpg', {
        type: 'image/jpeg'
      });
      uploadProfile(newFile);
    });    
    navigate("/profile");
  };

  return (
    <div className="m-4 mt-24 sm:mx-auto max-w-2xl">
      {file ? (
        <>
          <Cropper
            src={URL.createObjectURL(file)}
            style={{ height: "100%", width: "100%" }}
            aspectRatio={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            guides={false}
            crop={onCrop}
            ref={cropperRef}
          />
          <button
        type="button"
        className="rounded-md border w-full mt-4 border-transparent bg-emerald-600 px-6 py-3 text-center font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        onClick={uploadImage}
      >
        Upload
      </button>
        </>
      ) : (
        <form action="">
          <label
            htmlFor="photo-file"
            className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            {file ? (
              <p>{file.name}</p>
            ) : (
              <UserCircleIcon className="h-12 mx-auto text-emerald-600" />
            )}

            <span className="mt-2 block text-sm font-medium text-gray-900">
              Add your Profile Picture
            </span>
          </label>
          <input
            type="file"
            name="file"
            id="photo-file"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
        </form>
      )}
    </div>
  );
}
