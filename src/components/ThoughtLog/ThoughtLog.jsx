import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/UseContext/AuthContext";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  CodeBracketIcon,
  EllipsisHorizontalIcon,
  FlagIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../config/firebase";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ThoughtLog() {
  const { posts, profile, profileUrl } = UserAuth();
  const [postIDs, setPostIDs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [group, setGroup] = useState('lava884');

  const pid = profile._id;

  function getMessages(callback, groupRef) {
    return onSnapshot(
      query(
        collection(db, "group-posts", groupRef, "posts"),
        orderBy("timestamp", "desc")
      ),
      (querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(messages);
      }
    );
  }

  useEffect(() => {
    const unsubscribe = getMessages(setMessages, group);
    console.log(messages);
    return unsubscribe;
  }, [messages]);

  // const getPosts = async (code) => {
  //   const postsRef = doc(db, "posts", code);
  //   const data = await getDoc(postsRef);

  //   if (data.exists()) {
  //     if (data.data().posts.length > 0)
  //     for (let i = 0; i < data.data().posts.length; i++) {
  //       setPostIDs(prevPostIDs => [...prevPostIDs, data.data().posts[i]])
  //     }
  //   } else {
  //     console.log('DoesNot Exist')
  //   }

  // }

  // useEffect(() => {
  //   if (pid) {
  //     onSnapshot(doc(db, "users", pid), (doc) => {
  //       doc.data().familyCode.forEach(code =>
  //         getPosts(code._id)
  //         )
  //     })
  //   } else {
  //     console.log("Nothing")
  //   }
  //   console.log("Running")

  // }, [])

  return (
    <div>
      <label className="text-md font-semibold">Select a group </label>
      <select
        id="group"
        name="group"
        autoComplete="group"
        className="mt-4 lock w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:max-w-xs sm:text-sm"
        onChange={(e) => {setGroup(e.target.value)}}
      >
        <option>Select All Groups</option>
        {profile.familyCode?.map((item) => (
          <option key={item._id} value={item._id} to={item.link} >
            {item.name}
          </option>
        ))}
      </select>

      {messages.map((post) => (
        <div className="bg-white px-4 py-5 sm:px-6 border mt-4 rounded-sm shadow-md">
          <div className="flex space-x-3">
            <div key={post.id}>
              <div className="flex">
                <div className="mr-4 flex-shrink-0 self-center">
                  <img
                    className="h-12 rounded-full"
                    src={post.profileImg}
                    alt=""
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold">
                    {post.firstName} {post.lastName}
                  </h4>
                  <p className="-mt-1">{post.displayName}</p>
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <h1 className="text-lg font-semibold mt-4">{post.title}</h1>
                <p className="text-sm ">{post.post}</p>
              </div>
            </div>
            <Menu as="div" className="absolute inline-block right-4 text-left">
              <div>
                <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Open options</span>
                  <EllipsisHorizontalIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "flex px-4 py-2 text-sm"
                          )}
                        >
                          <StarIcon
                            className="mr-3 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span>Add to favorites</span>
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "flex px-4 py-2 text-sm"
                          )}
                        >
                          <CodeBracketIcon
                            className="mr-3 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span>Embed</span>
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "flex px-4 py-2 text-sm"
                          )}
                        >
                          <FlagIcon
                            className="mr-3 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span>Report content</span>
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <div className="flex flex-shrink-0 self-center"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
