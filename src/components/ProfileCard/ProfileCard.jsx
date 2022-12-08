import { PencilIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { loggedInState, userState } from "../../context/recoil/loginAtoms";
import { UserAuth } from "../../context/UseContext/AuthContext";
import Modal from "../Modal/Modal";

export default function ProfileCard() {
  const { profile } = UserAuth();
  const [modal, setModal] = useState(false)

  const handleModal = (e) => {
   e.preventDefault();
   setModal(!modal);
  }

  return (
    <div>
        
      <div className="mx-auto text-center shadow-lg bg-white p-5 rounded-md">
        <img
          className="mx-auto mt-4 mb-4 rounded-lg h-24 shadow-lg"
          src="https://firebasestorage.googleapis.com/v0/b/fambook-c536f.appspot.com/o/userProfilePics%2FSF5BIlAfJ1cFTPz6s1eHbWG3DM53profilePic?alt=media&token=d9b1c589-d354-4ed4-b849-2e3e1c9888bf"
          alt=""
        />
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
              <div className="font-bold">256</div> <div>Posts</div>
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
