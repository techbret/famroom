import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import Logo from '../../assets/green-logo.svg'

export default function NewProfile() {
    let { userId } = useParams();
    const auth = getAuth();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        displayName: "New User"
    });
    const [document, setDocument] = useState({})

    //USER ACCOUNT CREATION //
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [phone, setPhoneNumber] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [familyCode, setFamilyCode] = useState([]);


    useEffect(() => {
        if (auth.currentUser) {
            setUser(auth.currentUser)
        };
        getDocument()

    }, [])

    const getDocument = async () => {
        try {
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setDocument(docSnap.data())
            } else {
                console.log("No Such Document!")
            }

        } catch (e) {
            console.log("Test")
        }
    }

    const userData = {
        firstName: firstName,
        lastName: lastName,
        birthday: birthday,
        city: city,
        state: state,
        zip: zip,
        phone: phone,
        familyCode: [familyCode]
    };

    const setAccountInDb = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(doc(db, "users", auth.currentUser.uid), userData);
        } catch (err) {
            console.log(err);
            alert(`Im sorry there was an error ${err}`);
        }
    };

    return (
        <>
            <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-lime-100">
                <div className="sm:mx-auto sm:w-full sm:max-w-md sm:-mt-36">
                    <img
                        className="mx-auto h-12 w-auto"
                        src={Logo}
                        alt="Famtree"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Finish Setting Up your Account</h2>

                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-2 shadow sm:rounded-lg px-4">
                        <form className="space-y-2">
                            <h1 className='-mb-3 text-xl font-extrabold'>Welcome {document.displayName}</h1>
                            <p className=''>Please Finish Setting Up Your Account</p>
                            <div className='grid grid-cols-1 sm:grid-cols-4 sm:gap-x-2 gap-y-1'>
                                <div className="sm:col-span-2">
                                    <div className="mt-1">
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            autoComplete="first name"
                                            required
                                            className="block w-full bg-zinc-100 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
                                            placeholder='First Name'
                                            onChange={(e) => { setFirstName(e.target.value) }}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <div className="mt-1">
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            autoComplete="last name"
                                            required
                                            className="block w-full bg-zinc-100 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
                                            placeholder='Last Name'
                                            onChange={(e) => { setLastName(e.target.value) }}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-4">
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="familyCode"
                                            id="familyCode"
                                            className="block w-full bg-zinc-100 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
                                            placeholder='Family Code (optional)'
                                            onChange={(e) => { setFamilyCode(e.target.value) }}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-4">
                                    <div className="mt-1">
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            id="phoneNumber"
                                            className="block w-full bg-zinc-100 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
                                            placeholder='Phone Number (Optional)'
                                            onChange={(e) => { setPhoneNumber(e.target.value) }}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <div className="mt-1">
                                        <input
                                            id="city"
                                            name="city"
                                            type="text"
                                            autoComplete="city"
                                            required
                                            className="block w-full bg-zinc-100 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
                                            placeholder='City'
                                            onChange={(e) => { setCity(e.target.value) }}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-1">
                                    <div className="mt-1">
                                        <input
                                            id="state"
                                            name="state"
                                            type="text"
                                            autoComplete="state"
                                            required
                                            className="block w-full bg-zinc-100 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
                                            placeholder='State'
                                            onChange={(e) => { setState(e.target.value) }}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-1">
                                    <div className="mt-1">
                                        <input
                                            id="zip"
                                            name="zip"
                                            type="text"
                                            autoComplete="zip code"
                                            required
                                            className="block w-full bg-zinc-100 appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
                                            placeholder='Zip'
                                            onChange={(e) => { setZip(e.target.value) }}
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-4">
                                    <div className="mt-1">
                                        <label className='text-xs'> Birthday</label>
                                        <input
                                            id="birthday"
                                            name="birthday"
                                            type="date"
                                            autoComplete="current-password"
                                            required
                                            className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-lime-500 focus:outline-none focus:ring-lime-500 sm:text-sm"
                                            placeholder='Birthday'
                                            onChange={(e) => { setBirthday(e.target.value) }}
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className='py-4'>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md border border-transparent bg-lime-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2"
                                    onClick={setAccountInDb}
                                >
                                    Complete Sign Up
                                </button>
                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </>
    )
}
