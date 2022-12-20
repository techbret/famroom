import React from "react";
import { UserAuth } from "../../context/UseContext/AuthContext";
import { useMessages } from "../../hooks/useMessages";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function MessageList({ roomID }) {
  const { user } = UserAuth();
  const messages = useMessages(roomID);

  return (
    <div className="message-list-container">
      <ul className="message-list">
        {messages.map((x) => (
          <Message key={x.id} message={x} isOwnMessage={x.uid === user.uid} />
        ))}
      </ul>
    </div>
  );
}

function Message({ message, isOwnMessage }) {
  const { displayName, text } = message;
  return (
    <div className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-emerald scrollbar-thumb-rounded scrollbar-track-emerald-lighter scrollbar-w-2 scrolling-touch">
    <div className={classNames( isOwnMessage ? "flex items-end justify-end" : "flex items-end")}>
      <div className={classNames( isOwnMessage ? "flex flex-col space-y-2 text-sm max-w-xs mx-2 order-1 items-end " : "flex flex-col space-y-2 text-sm max-w-xs mx-2 order-2 items-start")}>
        <div
          className={classNames(
            isOwnMessage
              ? "px-4 py-2 rounded-lg inline-block rounded-br-none bg-emerald-600 text-white shadow-md "
              : "px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600",
            "w-fit rounded-md shadow-md"
          )}
        >
          <h4 className="text-emerald-500 font-bold">{isOwnMessage ? "" : displayName}</h4>
          <div>{text}</div>
        </div>
      </div>
    </div>
    </div>
  );
}

export { MessageList };
