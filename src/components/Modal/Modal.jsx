import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { UserAuth } from '../../context/UseContext/AuthContext';

export default function Modal() {
  const [open, setOpen] = useState(true)
  const [status, setStatus] = useState('Update Status')
  const { user } = UserAuth()

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "users", user.uid), {status: status});
      setOpen(false)
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
    
  }

  
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
        <form>
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-lime-100">
                    <PencilSquareIcon className="h-6 w-6 text-lime-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      Update Your Status
                    </Dialog.Title>
                    <div className="mt-2">
                      
                        <input className='rounded-md w-full focus:border-lime-500 border-lime-900' type="text" placeholder='Update Status' onChange={(e) => { setStatus(e.target.value)} }/>
                      
                      <p className="text-xs text-gray-500">
                        Your status is persistant. People will see it when they visit your profile
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-lime-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 sm:text-sm"
                    onClick={handleUpdateStatus}
                  >
                    Update Status
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
          </form>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
