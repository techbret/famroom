import React, { useState } from "react";
import { UserAuth } from "../../context/UseContext/AuthContext";
import Modal from "../Modal/Modal";

export default function ProfileCard() {
  const { profile, profileUrl } = UserAuth();
  const [modal, setModal] = useState(false)

  const handleModal = (e) => {
   e.preventDefault();
   setModal(!modal);
  }

  return (
    <div className="lg:block hidden">
        
      <div className="mx-auto text-center shadow-lg bg-white p-5 rounded-md">
        <div className="flex flex-wrap justify-center ">
          {profileUrl ? (
            <img
            className="mx-auto mt-4 mb-4 w-24 h-24 object-center rounded-lg shadow-lg"
            src={profileUrl}
            alt=""
          />
          ) : (
            <div className="mx-auto mt-4 mb-4 w-24 h-24 object-center rounded-lg shadow-lg bg-white">BJ</div>
          )}
        
        </div>
        <p className="text-xl font-bold">
          {profile.firstName} {profile.lastName}
        </p>
        <p className="text-sm">{profile.jobTitle}</p>
        <p className="text-sm">
          {profile.city} {profile.state}
        </p>
        <div className="mt-4">
          <button onClick={handleModal} className="text-md inline-flex items-center">
            {profile.status} 
          </button>
          {modal ? <Modal modalStatus={modal} /> : ''}
        </div>

        <div>
          <div className="grid grid-cols-3 gap-4 mt-4 ">
            <div className="text-md">
              <div className="font-bold">{profile?.postCount || 0}</div> <div>Posts</div>
            </div>
            <div>
              <div className="font-bold">123</div> <div>Connections</div>
            </div>
            <div>
              <div className="font-bold">143</div> <div>Views</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
