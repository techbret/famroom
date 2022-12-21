import { useEffect, useState } from "react";
import { UserAuth } from "../context/UseContext/AuthContext";

function useGroups(groupID) {
    const [subscribers, setSubscribers] = useState([])
    const { getGroupAdds } = UserAuth();

  useEffect(() => {
    const unsubscribe = getGroupAdds(groupID, setSubscribers);
    return unsubscribe;
  }, [groupID]);

  return subscribers;  
}


export { useGroups };