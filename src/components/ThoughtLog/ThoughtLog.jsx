import React, { useEffect, useState } from 'react'
import { UserAuth } from '../../context/UseContext/AuthContext'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { CodeBracketIcon, EllipsisHorizontalIcon, FlagIcon, StarIcon } from '@heroicons/react/20/solid'
import { doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from '../../config/firebase'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ThoughtLog() {
  const { posts, profile, profileUrl } = UserAuth();
  const [postIDs, setPostIDs] = useState([])

  const pid = profile._id; 


  const getPosts = async (code) => {
    const postsRef = doc(db, "posts", code);
    const data = await getDoc(postsRef);

    if (data.exists()) {
      if (data.data().posts.length > 0)
      for (let i = 0; i < data.data().posts.length; i++) {
        setPostIDs(prevPostIDs => [...prevPostIDs, data.data().posts[i]])
      }
      console.log('running')
      
    } else {
      console.log('DoesNot Exist')
    }
    
  }
  
  useEffect(() => {
    if (pid) {
      onSnapshot(doc(db, "users", pid), (doc) => {
        doc.data().familyCode.forEach(code => 
          getPosts(code._id)      
          )
      })
    } else {
      console.log("Nothing")
    }
    console.log("Running")
    
  }, [])

  return (
    <div>
      {postIDs.map(post => (
        <div className="bg-white px-4 py-5 sm:px-6 border mt-4 rounded-sm shadow-md">

          <div className="flex space-x-3">

            <div key={post.id}>

              <div className="flex">
                <div className="mr-4 flex-shrink-0 self-center">
                <img
                  className="h-16 w-16 rounded-full"
                  src={post.postData.profileImg}
                  alt=""
                />
                </div>
                <div>
                  <h4 className="text-lg font-bold">{post.postData.firstName} {post.postData.lastName}</h4>
                  <p className="-mt-1">
                  {post.postData.displayName}
                  </p>
                </div>
              </div>

              <div className="min-w-0 flex-1">
              
                <h1 className='text-lg font-semibold mt-4'>{post.postData.title}</h1>
                <p className='text-sm '>{post.postData.post}</p>
              </div>
              
            </div>
            <Menu as="div" className="absolute inline-block right-4 text-left">              
                <div>
                  <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
                    <span className="sr-only">Open options</span>
                    <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
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
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'flex px-4 py-2 text-sm'
                            )}
                          >
                            <StarIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span>Add to favorites</span>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'flex px-4 py-2 text-sm'
                            )}
                          >
                            <CodeBracketIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span>Embed</span>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'flex px-4 py-2 text-sm'
                            )}
                          >
                            <FlagIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span>Report content</span>
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

            <div className="flex flex-shrink-0 self-center">
              

            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
