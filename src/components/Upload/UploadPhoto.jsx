import React, { useState } from "react";
import { storage } from "../../config/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { UserAuth } from "../../context/UseContext/AuthContext";

export default function UploadPhoto() {
  const [file, setFile] = useState(null);
  let { userId } = useParams();
  let { profile } = UserAuth();
  const navigate = useNavigate();

  const uploadImage = () => {
    if (file == null) return;
    const imageRef = ref(storage, "/userProfilePics/" + profile.displayName + "_profilepic");
    uploadBytes(imageRef, file);
    navigate('/profile')
  };

  return (
    <div className="m-4 mt-24 sm:mx-auto max-w-2xl">
      <form action="">
        <label
          htmlFor="photo-file"
          className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {file ? (
            <p>{file.name}</p>
          ) : (
            <UserCircleIcon className="h-12 mx-auto text-lime-600" />
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
        {file ? <button onClick={uploadImage}>Upload</button> : ""}
      </form>
    </div>
  );
}
