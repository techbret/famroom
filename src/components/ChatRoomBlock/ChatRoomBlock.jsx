import { ChatBubbleLeftRightIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/UseContext/AuthContext";

export default function ChatRoomBlock() {
  const { profile } = UserAuth() 

  return (
    <div className="bg-zinc-100">
      <div className="divide-y divide-solid divide-emerald-300">
        <h1 className="text-lg font-bold text-zinc-600  divide-y divide-dashed">Chatrooms</h1>
        <div className="mb-4"></div>
      </div>
      {profile.familyCode?.map((item) => (
        <Link className="flex items-start text-emerald-600" key={item._id} to={item.link}>
          <ChatBubbleLeftRightIcon className="h-6 mr-1" /> {item.name}
        </Link>
      ))}

      <Link
        to="/create-group"
        className="flex float-right mt-4 text-emerald-500">
        <PlusCircleIcon className="h-5" /><p className="ml-1 text-sm">Create a Group</p>
      </Link>



    </div>
  );
}
