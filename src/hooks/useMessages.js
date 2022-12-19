import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/UseContext/AuthContext";

function useMessages(roomID) {
    const [messages, setMessages] = useState([])
    const { getMessages } = UserAuth();

  useEffect(() => {
    const unsubscribe = getMessages(roomID, setMessages);
    return unsubscribe;
  }, [roomID]);

  return messages;  
}


export { useMessages };
