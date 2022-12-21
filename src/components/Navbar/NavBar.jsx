import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  BellIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  PlusIcon,
  ChevronDownIcon,
  ArrowLongRightIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import photo from "../../assets/blankPhoto.jpeg";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/UseContext/AuthContext";
import Profile from "../../pages/Profile/Profile";
import { getStorage, ref } from "firebase/storage";

const navigation = [
  { name: "register", href: "/", current: true },
  { name: "about", href: "#", current: false },
];

const userNavigation = [
  { name: "home", href: "/", current: true },
  { name: "calender", href: "#", current: false },
  { name: "help", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const { logout, isLoggedIn, profile, profileUrl, signIn } = UserAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState();
  const [error, setError] = useState('')

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/profile" );
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <Disclosure as="nav" className="bg-emerald-600 z-40">
      {({ open }) => (
        <>
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-emerald-400 hover:bg-emerald-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center ">
                  <p className="block text-4xl text-emerald-300 font-extrabold lg:hidden"><span className="text-emerald-100">TEGA</span>CHAT</p>
                  <p className="hidden text-4xl text-emerald-300 font-extrabold lg:block">
                    <span className="text-emerald-100">TEGA</span>CHAT
                  </p>
                </div>
                {isLoggedIn ? (
                  ""
                ) : (
                  <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-white text-emerald-600"
                            : "text-white hover:bg-emerald-300 hover:text-emerald-600",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex">
                {isLoggedIn ? (
                  <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                    {userNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-emerald-200 text-emerald-600"
                            : "text-white hover:bg-emerald-300 hover:text-emerald-600",
                          "px-3 py-2 rounded-md text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="flex items-center">
                {isLoggedIn ? (
                  <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="flex rounded-lg bg-emerald-800 p-1 text-emerald-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-800">
                          <BellIcon className="h-8 w-8" aria-hidden="true" />
                          {profile?.notifications &&
                          profile?.notifications[0] ? (
                            <span className="absolute top-0 right-0 block h-3 w-3 -tranemerald-y-1/2 tranemerald-x-1/2 transform rounded-full bg-green-400 ring-2 ring-white" />
                          ) : (
                            ""
                          )}
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
                            <Menu.Item as="div">
                              {profile?.notifications &&
                              profile?.notifications[0] ? (
                                profile.notifications?.map((notice, index) => (
                                  <div key={index}>
                                    <Link
                                      to={"/group-add/" + notice.groupID}
                                      className="text-gray-700 block px-4 py-2 text-sm"
                                    >
                                      {notice.firstName} {notice.lastName} would
                                      like to join {notice.groupID}
                                    </Link>
                                  </div>
                                ))
                              ) : (
                                <div className="text-gray-700 block px-4 py-2 text-sm">
                                  No New Notifications
                                </div>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-2">
                      <div>
                        <Menu.Button className="flex rounded-lg bg-emerald-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-800">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-10 w-10 rounded-lg bg-white object-fit-cover object-position-center"
                            src={profileUrl ? profileUrl : photo}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Link
                            to={`/profile/${profile.displayName}`}
                            className="block px-4 py-2 text-sm text-emerald-700 hover:bg-emerald-100"
                          >
                            Your Profile
                          </Link>
                          <Link
                            className="block px-4 py-2 text-sm text-emerald-700 hover:bg-emerald-100"
                            to="/settings"
                          >
                            Settings
                          </Link>
                          <a
                            className="block px-4 py-2 text-sm text-emerald-700 hover:bg-emerald-100"
                            onClick={handleLogout}
                          >
                            Sign Out
                          </a>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                ) : (
                  <>
                    <form className="relative inline-flex items-center lg:block hidden focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-emerald-800">
                      <input
                        type="text"
                        className="px-4 py-2 mr-2 rounded-md"
                        placeholder="Email"
                        onChange={(e) => {setEmail(e.target.value)}}
                      />
                      <input
                        type="password"
                        className="px-4 py-2 mr-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-emerald-800"
                        placeholder="Password"
                        onChange={(e) => {setPassword(e.target.value)}}
                      />
                    </form>
                    <div className="flex-shrink-0 lg:block hidden">
                      <button
                        type="button"
                        className="relative inline-flex items-center rounded-md border border-transparent bg-emerald-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-emerald-800"
                        onClick={handleSignIn}
                      >
                        <ArrowRightOnRectangleIcon
                          className="-ml-1 mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        <span>Login</span>
                      </button>
                    </div>
                    <div className="flex-shrink-0 lg:hidden">
                      <Link
                        type="button"
                        to="/login"
                        className="relative inline-flex items-center rounded-md border border-transparent bg-emerald-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-emerald-800"
                      >
                        <ArrowRightOnRectangleIcon
                          className="-ml-1 mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        <span>Login</span>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-emerald-900 text-white"
                      : "text-emerald-300 hover:bg-emerald-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-emerald-700 pt-4 pb-3">
              <div className="flex items-center px-5 sm:px-6">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-lg"
                    src={profileUrl}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    {profile.firstName} {profile.lastName}
                  </div>
                  <div className="text-sm font-medium text-emerald-400">
                    {profile.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-auto flex-shrink-0 rounded-md bg-emerald-800 p-1 text-emerald-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2 sm:px-3">
                <a className="block rounded-md px-3 py-2 text-base font-medium text-emerald-400 hover:bg-emerald-700 hover:text-white">
                  Your Profile
                </a>
                <a className="block rounded-md px-3 py-2 text-base font-medium text-emerald-400 hover:bg-emerald-700 hover:text-white">
                  Settings
                </a>
                <a className="block rounded-md px-3 py-2 text-base font-medium text-emerald-400 hover:bg-emerald-700 hover:text-white">
                  Sign Out
                </a>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
