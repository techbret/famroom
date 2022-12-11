import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/UseContext/AuthContext";

export default function CreateGroup() {
  const [identifier, setIdentifier] = useState("Group Identifier");
  const [groupName, setGroupName] = useState("");
  const { profile, createGroup } = UserAuth();

  const navigate = useNavigate();

  const handleGenerate = (e) => {
    e.preventDefault();
    const firstFour = groupName.slice(0, 4);
    const randomNum = Math.floor(Math.random() * 10000).toString();
    const newID = firstFour + randomNum;
    setIdentifier(newID);
  };

  const groupData = {
    groupName: groupName,
    id: identifier,
    admin: profile._id,
    members: [profile._id],    
  };

  const handleCreateGroup = (e) => {
    e.preventDefault();
    createGroup({ groupData });
    navigate('/profile')
  };

  return (
    <div>
      <div className="mx-auto sm:max-w-2xl max-w-xl p-12 mt-20">
        <h1 className="font-bold text-4xl text-center">Create a Group</h1>
        <p className="text-lime-800 text-center text-lg font- max-w-2xl mx-auto">
          Groups are how we share information. By creating a group you can then
          invite others to join, and keep your conversations private and
          meaningful
        </p>
        <form className="mt-4">
          <div className="relative rounded-md border border-gray-300 px-6 py-4 shadow-sm focus-within:border-lime-600 focus-within:ring-1 focus-within:ring-lime-600">
            <label
              htmlFor="name"
              className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
            >
              Group Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
              placeholder="What is the name of your group?"
              onChange={(e) => {
                setGroupName(e.target.value);
              }}
            />
          </div>

          <div>
            <div className="mt-3 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-lg">
                #
              </span>
              <input
                type="text"
                name="company-website"
                id="company-website"
                className="block w-full min-w-0 flex-1 rounded-none border-gray-300 px-3 py-4 focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
                placeholder={identifier}
              />
              <button
                type="button"
                className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-lime-500 focus:outline-none focus:ring-1 focus:ring-lime-500"
                onClick={handleGenerate}
              >
                <ArrowPathRoundedSquareIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span>Random Generate</span>
              </button>
            </div>
            <p className="text-xs text-gray-800 ml-10">
              *This is how people will find your group, and what you will send
              them for invites
            </p>
          </div>
          <button
            type="button"
            className="w-full mx-auto rounded-md border border-transparent bg-lime-600 px-6 py-3 font-medium text-white shadow-sm hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 mt-12"
            onClick={handleCreateGroup}
          >
            Create Group
          </button>
        </form>
      </div>
    </div>
  );
}
