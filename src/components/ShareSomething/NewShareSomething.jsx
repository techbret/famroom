import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CalendarIcon,
  PaperClipIcon,
  TagIcon,
  UserCircleIcon,
  VideoCameraIcon,
  PhotoIcon,
  CalendarDaysIcon,
  UsersIcon,
} from "@heroicons/react/20/solid";
import { UserAuth } from "../../context/UseContext/AuthContext";
import { serverTimestamp, Timestamp } from "firebase/firestore";

const assignees = [
  { name: "Unassigned", value: null },
  {
    name: "Wade Cooper",
    value: "wade-cooper",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  // More items...
];
const labels = [
  { name: "Unlabelled", value: null },
  { name: "Engineering", value: "engineering" },
  // More items...
];
const dueDates = [
  { name: "No due date", value: null },
  { name: "Today", value: "today" },
  // More items...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NewShareSomething() {
  const { profile, createPost, profileUrl } = UserAuth();
  const [assigned, setAssigned] = useState(assignees[0]);
  const [post, setPost] = useState("Share your thoughts...");
  const [title, setTitle] = useState("Title");

  const allGroups = {
    name: "All Groups"
  }

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (assigned._id === undefined) {
      console.log(profile.familyCode);
      profile.familyCode.forEach((code) => {
        createPost({
          firstName: profile.firstName,
          lastName: profile.lastName,
          groupID: code._id,
          id: Math.floor(Math.random() * 10000000),
          post: post,
          title: title,
          displayName: profile.displayName,
          profileImg: profileUrl,
          timestamp: serverTimestamp(),
          profileID: profile._id
        });
      });
    } else {
      createPost({
        firstName: profile.firstName,
        lastName: profile.lastName,
        groupID: assigned._id,
        post: post,
        title: title,
        displayName: profile.displayName,
        profileImg: profileUrl,
        timestamp: serverTimestamp(),
        profileID: profile._id
      });
      setAssigned(assignees[0]);
      setTitle("Title")
    }
  };
console.log(assigned)
  return (
    <form action="#" className="relative shadow-lg bg-white rounded-lg">
      <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
        <input
          type="text"
          name="title"
          id="title"
          className="block w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0"
          placeholder={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          rows={2}
          name="description"
          id="description"
          className="block w-full border-0 py-0 placeholder-gray-500 focus:ring-0 sm:text-sm"
          placeholder={post}
          onChange={(e) => {
            setPost(e.target.value);
          }}
        />

        {/* Spacer element to match the height of the toolbar */}
        <div aria-hidden="true">
          <div className="py-2">
            <div className="h-9" />
          </div>
          <div className="h-px" />
          <div className="py-2">
            <div className="py-px">
              <div className="h-9" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-px bottom-0">
        {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
        <div className="flex flex-nowrap justify-end space-x-2 py-2 px-2 sm:px-3">
          <Listbox
            as="div"
            value={assigned}
            onChange={setAssigned}
            className="flex-shrink-0"
          >
            {({ open }) => (
              <>
                <Listbox.Label className="sr-only">
                  {" "}
                  Select Groups{" "}
                </Listbox.Label>
                <div className="relative">
                  <Listbox.Button className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 py-2 px-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                    {assigned.value === null ? (
                      <UsersIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <UsersIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                    )}

                    <span
                      className={classNames(
                        assigned.value === null ? "" : "text-gray-900",
                        "hidden truncate sm:ml-2 sm:block"
                      )}
                    >
                      {assigned.value === null ? "Select Group" : assigned.name}
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      <Listbox.Option
                        className={({ active }) =>
                          classNames(
                            active ? "bg-gray-100" : "bg-white",
                            "relative cursor-default select-none py-2 px-3"
                          )
                          
                        }
                        value={allGroups}
                      >
                        <div className="flex items-center">
                          <UsersIcon
                            className="h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />

                          <span className="ml-3 block truncate font-medium" >
                            All Groups
                          </span>
                          
                        </div>
                      </Listbox.Option>
                      {profile.groups?.map((assignee) => (
                        <Listbox.Option
                          key={assignee._id}
                          className={({ active }) =>
                            classNames(
                              active ? "bg-gray-100" : "bg-white",
                              "relative cursor-default select-none py-2 px-3"
                            )
                          }
                          value={assignee}
                        >
                          <div className="flex items-center">
                            {assignee.avatar ? (
                              <img
                                src={assignee.avatar}
                                alt=""
                                className="h-5 w-5 flex-shrink-0 rounded-full"
                              />
                            ) : (
                              <UsersIcon
                                className="h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                              />
                            )}

                            <span className="ml-3 block truncate font-medium">
                              {assignee.name}
                            </span>
                          </div>
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
        <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
          <div className="flex">
            <button
              type="button"
              className=" group -my-2 inline-flex items-center rounded border border-transparent bg-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <PhotoIcon
                className="-ml-1 mr-2 h-5 w-5 text-indigo-600"
                aria-hidden="true"
              />
              Photo
            </button>

            <button
              type="button"
              className=" group -my-2 ml-2 inline-flex items-center rounded border border-transparent bg-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <VideoCameraIcon
                className="-ml-1 mr-2 h-5 w-5 text-blue-500"
                aria-hidden="true"
              />
              Video
            </button>

            <button
              type="button"
              className=" group -my-2 ml-2 inline-flex items-center rounded border border-transparent bg-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <CalendarIcon
                className="-ml-1 mr-2 h-5 w-5 text-red-500"
                aria-hidden="true"
              />
              Event
            </button>
          </div>
          <div className="flex-shrink-0">
            <button
              type="submit"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={handleSubmitPost}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
