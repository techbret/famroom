import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/UseContext/AuthContext";

export default function ChatRoomBlock() {
    const { profile } = UserAuth()
    const [familyCodes, setFamilyCodes] = useState(profile.familyCodes)
    
  return (
    <div>
       <Link
      to="/create-group" 
      className="flex items-start">
        <PlusCircleIcon className="h-6" />
        {/* {profile.familyCode.map((group) => (
            <li key={group.id}>
                <a
                href={group.link}
                >{group.name}</a>
            </li>
        ))} */}
        <p className="ml-2">Create a Group or Join One</p>
      </Link>
    </div>
  );
}
