import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/UseContext/AuthContext";

export default function JoinGroup() {
  const [identifier, setIdentifier] = useState("Group Identifier");
  const { profile, joinGroup, profileURL } = UserAuth();

  const navigate = useNavigate();

  const joinData = {
    firstName: profile.firstName,
    lastName: profile.lastName,
    profileID: profile._id,
    displayName: profile.displayName,
    id: identifier
  }

  const handleJoinGroup = (e) => {
    e.preventDefault();
    joinGroup({ joinData })
  };


  return (
    <div>
      <div className="mx-auto sm:max-w-2xl max-w-xl p-12 mt-20">
        <h1 className="font-bold text-4xl text-center">Join your Group</h1>
        <p className="text-indigo-800 text-center text-lg font- max-w-2xl mx-auto">
          Groups are how we share information. By creating a group you can then
          invite others to join, and keep your conversations private and
          meaningful
        </p>
        <form className="mt-4">
          <div>
            <div className="mt-3 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-lg">
                #
              </span>
              <input
                type="text"
                name="company-website"
                id="company-website"
                className="block w-full min-w-0 flex-1 rounded-r-md border-gray-300 px-3 py-4 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder={identifier}
                onChange={(e) => {setIdentifier(e.target.value)}}
              />
            </div>
            <p className="text-xs text-gray-800 ml-10">
              *This is the key to getting added to a group. By default groups are not searchable. You must obtain the Identifeir from another member of the group
            </p>
          </div>
          <button
            type="button"
            className="w-full mx-auto rounded-md border border-transparent bg-indigo-600 px-6 py-3 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-12"
            onClick={handleJoinGroup}
          >
            Join Group
          </button>
        </form>
      </div>
    </div>
  );
}
