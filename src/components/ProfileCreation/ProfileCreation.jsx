import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useRecoilValue } from "recoil";
import {
    userState,
} from "../../context/recoil/loginAtoms";

export default function ProfileCreation() {
    let { userId } = useParams();
    const auth = getAuth();
    const navigate = useNavigate();
    const userUNQ = window.localStorage.getItem("uid");


    // USER ACCOUNT CREATION //
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");    
    

    const userData = {
        email: auth.currentUser.email,
        _id: auth.currentUser.uid,
        firstName: firstName,
        lastName: lastName,
        birthday: birthday,
        city: city,
        state: state,
        zip: zip,
    };

    useEffect(() => {
        if (window.localStorage.getItem("refresh") !== "true") {
            window.localStorage.setItem("refresh", "true");
            window.location.reload();
        } 
    })


    const setAccountInDb = async (e) => {
        e.preventDefault();
        try {
            await setDoc(doc(db, "users", userUNQ), userData);
        } catch (err) {
            console.log(err);
            alert(`Im sorry there was an error ${err}`);
        }
    };

    const goToProfile = () => {
        const { uid } = getAuth().currentUser;
        navigate('/upload/' + uid)
    }



    return (
        <>
            <h1>Welcome {auth.currentUser.uid}</h1>
            <h3>
                Please fill out the form below to finish setting up your account
            </h3>
            <form>
                            
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                />
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                />
                <input
                    type="date"
                    name="Birthday"
                    id="birthday"
                    onChange={(e) => {
                        setBirthday(e.target.value);
                    }}
                />
                <input
                    type="text"
                    name="City"
                    id="city"
                    placeholder="City"
                    onChange={(e) => {
                        setCity(e.target.value);
                    }}
                />
                <input
                    type="text"
                    name="State"
                    id="state"
                    placeholder="State"
                    onChange={(e) => {
                        setState(e.target.value);
                    }}
                />
                <input
                    type="text"
                    name="Zip Code"
                    id="zip"
                    placeholder="Zipcode"
                    onChange={(e) => {
                        setZip(e.target.value);
                    }}
                />
                <button onClick={setAccountInDb}>Submit</button>
            </form>

            <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12 max-w-3xl">
                  <h3 className="text-lg font-medium text-warm-gray-900">Send us a message</h3>
                  <form action="#" method="POST" className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                    <div>
                      <label htmlFor="first-name" className="block text-sm font-medium text-warm-gray-900">
                        First name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="last-name" className="block text-sm font-medium text-warm-gray-900">
                        Last name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          autoComplete="family-name"
                          className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-warm-gray-900">
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <label htmlFor="phone" className="block text-sm font-medium text-warm-gray-900">
                          Phone
                        </label>
                        <span id="phone-optional" className="text-sm text-warm-gray-500">
                          Optional
                        </span>
                      </div>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          autoComplete="tel"
                          className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                          aria-describedby="phone-optional"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="subject" className="block text-sm font-medium text-warm-gray-900">
                        Subject
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="subject"
                          id="subject"
                          className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="flex justify-between">
                        <label htmlFor="message" className="block text-sm font-medium text-warm-gray-900">
                          Message
                        </label>
                        <span id="message-max" className="text-sm text-warm-gray-500">
                          Max. 500 characters
                        </span>
                      </div>
                      <div className="mt-1">
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          className="block w-full rounded-md border-warm-gray-300 py-3 px-4 text-warm-gray-900 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                          aria-describedby="message-max"
                          defaultValue={''}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2 sm:flex sm:justify-end">
                      <button
                        type="submit"
                        className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-teal-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:w-auto"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>

        </>
    )
}
