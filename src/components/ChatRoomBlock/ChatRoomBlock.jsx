import {
  ArrowDownLeftIcon,
  ArrowLeftIcon,
  ArrowLeftOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/UseContext/AuthContext";

export default function ChatRoomBlock() {
  const { profile, removeFromGroup } = UserAuth();

  const handleClick = (userID, groupID, link, name) => {
    removeFromGroup(userID, groupID, link, name);
  };

  console.log(profile.groups)

  return (
    <div className="bg-zinc-100">
      <div className="divide-y divide-solid divide-emerald-300">
        <h1 className="text-lg font-bold text-zinc-600  divide-y divide-dashed">
          Chatrooms
        </h1>
      </div>

      {profile.groups ? (
        <>
          {Object.entries(profile.groups)?.map(([key, value]) => (
            <div className="flex items-start" key={key}>
              <Link
                className="flex items-start text-emerald-600"
                to={"/chat" + value.link}
              >
                <ChatBubbleLeftRightIcon className="h-6 mr-1" /> {value.name}
              </Link>
              <button
                className="flex items-start mt-1.5 ml-4 text-xs text-zinc-300 hover:text-emerald-500"
                onClick={() => {
                  handleClick(profile._id, value._id, value.link, value.name);
                }}
              >
                {" "}
                <ArrowLeftOnRectangleIcon className="h-4 " />
                Leave Group
              </button>
            </div>
          ))}
        </>
      ) : ''}


      {profile.pendingGroups ? (
        <>
          {Object.entries(profile.pendingGroups)?.map(([key, value]) => (
            <div className="flex items-start" key={key}>
              <Link
                className="flex items-start text-emerald-300 italic"
                to={"/chat" + value.link}
              >
                <ChatBubbleLeftRightIcon className="h-6 mr-1" /> {value.name}
              </Link>
              <button
                className="flex items-start mt-1.5 ml-4 text-xs text-zinc-300 hover:text-emerald-500"
                onClick={() => {
                  handleClick(profile._id, value._id, value.link, value.name);
                }}
              >
                {" "}
                <ArrowLeftOnRectangleIcon className="h-4 " />
                Cancel
              </button>
            </div>
          ))}
        </>
      ) : ''}



      <div className="mt-6">
        <Link to="/join" className="flex text-emerald-500">
          <PlusCircleIcon className="h-5" />
          <p className="ml-1 text-sm">Join a Group</p>
        </Link>

        <Link to="/create-group" className="flex text-emerald-500">
          <PlusCircleIcon className="h-5" />
          <p className="ml-1 text-sm">Create a Group</p>
        </Link>
      </div>
    </div>
  );
}
