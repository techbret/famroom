import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/20/solid'
import { Link, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { loggedInState, paramState, userState } from '../../context/recoil/loginAtoms'
import Logo from '../../assets/logo.svg'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase"; 
import { set } from 'firebase/database'


const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Family', href: '#', current: false },
  { name: 'News', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' }
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn1] = useState(false)   
  const [userID, setUserID] = useState('')
  const [user, setUser] = useRecoilState(userState);
  const [isUser, setIsLoggedIn] = useRecoilState(loggedInState || window.localStorage.getItem("auth") === true);
  

  const navigate = useNavigate();
  const auth = getAuth();
  

  useEffect(() => {
    setUserID(window.localStorage.getItem('displayName'));
    const getData = async () => {
      const docRef = doc(db, "users", window.localStorage.getItem('displayName'));
      const docSnap = await getDoc(docRef);
      setUser({ ...docSnap.data() });
    };   
    getData();
    console.log(isUser)
  }, [])

  const logout = (e) => {
    signOut(auth).then(() => {
      window.localStorage.setItem("auth", "false");
      setIsLoggedIn(false)
      navigate('/')
    }).catch((error) => {
      // An error happened.
    });
  }


  return (
    <Disclosure as="nav" className="bg-lime-600">
      {({ open }) => (
        <>
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-lime-400 hover:bg-lime-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src={Logo}
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src={Logo}
                    alt="Your Company"
                  />
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-white text-lime-600' : 'text-white hover:bg-lime-300 hover:text-lime-600',
                        'px-3 py-2 rounded-md text-sm font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </a>                    
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                {isUser ? (
                  <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                    <button
                      type="button"
                      className="rounded-md bg-lime-800 p-1 text-lime-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-lime-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-lg bg-lime-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-lime-800">
                          <span className="sr-only">Open user menu</span>
                          <img className="h-8 w-8 rounded-lg" src="https://firebasestorage.googleapis.com/v0/b/fambook-c536f.appspot.com/o/userProfilePics%2FSF5BIlAfJ1cFTPz6s1eHbWG3DM53profilePic?alt=media&token=d9b1c589-d354-4ed4-b849-2e3e1c9888b" alt="" />
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
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? 'bg-lime-100' : '',
                                    'block px-4 py-2 text-sm text-lime-700'
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                          <button className='block px-4 py-2 text-sm text-lime-700 hover:bg-lime-100' onClick={logout}>Sign Out</button>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>



                ) : (
                  <>
                    <div className="flex-shrink-0">
                      <Link
                        type="button"
                        to="/login"
                        className="relative inline-flex items-center rounded-md border border-transparent bg-lime-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-lime-800"
                      >
                        <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        <span>Login</span>
                      </Link>
                    </div>


                  </>

                )

                }


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
                    item.current ? 'bg-lime-900 text-white' : 'text-lime-300 hover:bg-lime-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-lime-700 pt-4 pb-3">
              <div className="flex items-center px-5 sm:px-6">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-lg" src="https://firebasestorage.googleapis.com/v0/b/fambook-c536f.appspot.com/o/userProfilePics%2FSF5BIlAfJ1cFTPz6s1eHbWG3DM53profilePic?alt=media&token=d9b1c589-d354-4ed4-b849-2e3e1c9888b" alt="" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">{user.firstName} {user.lastName}</div>
                  <div className="text-sm font-medium text-lime-400">{user.email}</div>
                </div>
                <button
                  type="button"
                  className="ml-auto flex-shrink-0 rounded-md bg-lime-800 p-1 text-lime-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-lime-800"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2 sm:px-3">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-lime-400 hover:bg-lime-700 hover:text-white"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
