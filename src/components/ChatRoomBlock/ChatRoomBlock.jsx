import { ChatBubbleLeftRightIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/UseContext/AuthContext";

export default function ChatRoomBlock() {
  const { profile } = UserAuth() 

  return (
    <div className="bg-zinc-100">
      <div className="divide-y divide-solid divide-indigo-300">
        <h1 className="text-lg font-bold text-zinc-600  divide-y divide-dashed">Chatrooms</h1>
        <div className="mb-4"></div>
      </div>
      {profile.groups?.map((item) => (
        <Link className="flex items-start text-indigo-600" key={item._id} to={'/chat' + item.link}>
          <ChatBubbleLeftRightIcon className="h-6 mr-1" /> {item.name}
        </Link>
      ))}

      <div className="flex float-right mt-4">
        <Link
        to="/create-group"
        className="flex text-indigo-500">
        <PlusCircleIcon className="h-5" /><p className="ml-1 text-sm">Join a Group</p>
      </Link>
     
      <Link
        to="/create-group"
        className="flex mt-4 text-indigo-500">
        <PlusCircleIcon className="h-5" /><p className="ml-1 text-sm">Create a Group</p>
      </Link>
      </div>
      

      
      



    </div>
  );
}
