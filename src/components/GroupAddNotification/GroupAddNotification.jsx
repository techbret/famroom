import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { UserAuth } from "../../context/UseContext/AuthContext";
import { useGroups } from "../../hooks/useGroups"


export default function GroupAddNotification() {
  const { groupID } = useParams()
  const subscribers = useGroups(groupID);
  const { profile, approveAdd } = UserAuth()
  const [uid, setUid] = useState([])

  
  

  const handleApprove = (person, id) => {
    const userData = {
      groupID: groupID,
      docRef: person,
      groupName: "FindFunction",
      uid: id
    };
    approveAdd(userData);
  }

 
  const handleReject = () => {

  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-full py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-8 sm:space-y-12">
          <div className="space-y-5 sm:mx-auto sm:space-y-4 max-w-full">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The People</h2>
            <p className="text-xl text-gray-500">
              Risus velit condimentum vitae tincidunt tincidunt. Mauris ridiculus fusce amet urna nunc. Ut nisl ornare
              diam in.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-full lg:gap-x-8 lg:gap-y-12 xl:grid-cols-5"
          >
            {subscribers?.map((person, index) => (
              <li key={index}>
                <div className="space-y-4">
                  <img className="mx-auto h-20 w-20 rounded-lg lg:h-48 lg:w-48" src={person.profilePic} alt="" />
                  <div className="space-y-2">
                    <div className="text-xs font-medium lg:text-sm">
                      <h3>{person.firstName} {person.lastName}</h3>
                      <p className="text-emerald-600">{person.link}</p>
                      <div className="mt-1 flex justify-center">
                        <div className="inline-flex rounded-md shadow">
                          <button
                            className="inline-flex items-center justify-center rounded-sm bg-emerald-600 w-20 h-8 text-base font-medium text-white hover:bg-emerald-700 border-1 border border-emerald-900"
                            onClick={() => handleApprove(person.id, person.profileID)}
                          >
                            Approve
                          </button>
                        </div>
                        <div className="ml-3 inline-flex">
                          <button
                            className="inline-flex items-center justify-center rounded-sm border-1 border border-zinc-900  bg-zinc-100 w-20 h-8 text-base font-medium text-zinc-900 hover:bg-zinc-200"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
