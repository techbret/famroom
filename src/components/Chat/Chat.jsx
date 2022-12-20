import React from "react";
import { useParams } from "react-router-dom";
import { MessageList } from "../MessageList/MessageList";
import MessageInput from "../MessageList/MessageInput";

export default function CreateAccount() {
  let { chatID } = useParams();



  return (
    <div className="py-10">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            {chatID}
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="px-4 py-8 sm:px-0">
            <div className="h-full p-4 rounded-lg border-2 shadow-lg border-gray-200">
                <MessageList roomID={chatID} />
                <MessageInput roomID={chatID} />

            </div>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
}
