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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ThoughtLog() {
  const { profile, messages } = UserAuth();
  
  const uniqueMessages = messages.filter((message, index, self) => self.findIndex(m => m.id === message.id) === index);
  

  const convertToString = (date) => {
    const newDate = date.toDate();
    const dateString = newDate.toLocaleDateString();

    return dateString;
  }

  return (
    <div>
      {uniqueMessages.map((post, index) => (
        <div className="bg-white px-4 py-5 sm:px-6 border mt-4 rounded-sm shadow-md">
          <div className="flex space-x-3">
            <div key={index}>
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
                    className="h-5 w-5 text-emerald-500"
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
            

            
          </div>
          <div className="relative  ">
            <p className="absolute bottom-0 right-0">{profile.timestamp ? convertToString(profile.timestamp) : ''}</p> 
            </div>
        </div>
        
      ))}
      
    </div>
  );
}
