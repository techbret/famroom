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

  return (
    <div className="bg-zinc-100">
      <div className="divide-y divide-solid divide-indigo-300">
        <h1 className="text-lg font-bold text-zinc-600  divide-y divide-dashed">
          Chatrooms
        </h1>
        <div className="mb-4"></div>
      </div>
      {profile.groups?.map((item, index) => (
        <div className="flex items-start" key={index}>
          <Link
            className="flex items-start text-indigo-600"
            to={"/chat" + item.link}
          >
            <ChatBubbleLeftRightIcon className="h-6 mr-1" /> {item.name}
          </Link>
          <button
            className="flex items-start mt-1.5 ml-4 text-xs text-zinc-300 hover:text-indigo-500"
            onClick={() => {
              handleClick(profile._id, item._id, item.link, item.name);
            }}
          >
            {" "}
            <ArrowLeftOnRectangleIcon className="h-4 " />
            Leave Group
          </button>
        </div>
      ))}

      {profile.pendingGroups?.map((item, index) => (
        <div className="flex items-start" key={index}>
          <Link
            className="flex items-start text-indigo-300 italic"
            to={"/chat" + item.link}
          >
            <ChatBubbleLeftRightIcon className="h-6 mr-1" /> {item.name}
          </Link>
          <button
            className="flex items-start mt-1.5 ml-4 text-xs text-zinc-300 hover:text-indigo-500"
            onClick={() => {
              handleClick(profile._id, item._id, item.link, item.name);
            }}
          >
            {" "}
            <ArrowLeftOnRectangleIcon className="h-4 " />
            Leave Group
          </button>
        </div>
      ))}

      <div className="mt-6">
        <Link to="/join" className="flex text-indigo-500">
          <PlusCircleIcon className="h-5" />
          <p className="ml-1 text-sm">Join a Group</p>
        </Link>

        <Link to="/create-group" className="flex text-indigo-500">
          <PlusCircleIcon className="h-5" />
          <p className="ml-1 text-sm">Create a Group</p>
        </Link>
      </div>
    </div>
  );
}
