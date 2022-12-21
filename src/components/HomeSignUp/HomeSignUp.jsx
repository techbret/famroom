import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import world from '../../assets/world.png'
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { UserAuth } from "../../context/UseContext/AuthContext";

export default function HomeSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { createUser } = UserAuth();

  const navigate = useNavigate();

  const createNewAccount = async (e) => {
    e.preventDefault();
    setError("");
    if (password === confirmPassword) {
      try {
        await createUser(email, password, displayName);
        navigate("/user/" + displayName);
      } catch (e) {
        setError(e.message);
        console.log(e.message);
      }
    }
    
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-emerald-50">
      <div className="relative pt-6 pb-16 sm:pb-24">
        <main className="mt-12 sm:mt-12">
          <div className="mx-auto max-w-7xl">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="px-4 sm:px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left">
                <div>
                  <h1 className="mt-4 text-4xl font-bold tracking-tight text-emerald-900 sm:text-5xl md:text-4xl">
                    Keep your family connected
                  </h1>
                  <p className="mt-3 text-base text-emerald-900 sm:mt-5 sm:text-xl lg:text-lg ">
                    Tega Chat connects <span className="font-bold">FAMILIES</span> across the world. TEGA stands for Teams Events and Group Architecture!
                  </p>
                  <form action="">
                    <input type="text" className="w-1/2 mt-4 rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 stext-lg h-14" placeholder="Have a Family Code?" />
                    <button className="ml-4 w-36 rounded-md border border-transparent bg-emerald-600 py-3 px-5 text-lg font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">Sign Up</button>
                  </form>

                  <img src={world} className="w-full mt-4" alt="" />

                  <p className="mt-8 text-base font-semibold text-emerald-900 sm:mt-10">
                    Features Include
                  </p>
                  <div className="mt-5 w-full sm:mx-auto sm:max-w-lg lg:ml-0">
                    <div className="flex flex-wrap items-start justify-between">
                      <div className="flex justify-center px-1">
                        <h1 className="text-2xl font-bold text-emerald-900">
                          Calanders
                        </h1>
                      </div>
                      <div className="flex justify-center px-1">
                        <h1 className="text-2xl font-bold text-emerald-900">
                          Chatrooms
                        </h1>
                      </div>
                      <div className="flex justify-center px-1">
                        <h1 className="text-2xl font-bold text-emerald-900">
                          Status Logs
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-16 sm:mt-24 lg:col-span-6 lg:mt-0 ">
                <div className="bg-white sm:mx-auto sm:w-full shadow-xl sm:max-w-md sm:overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-8 sm:px-10">
                  

                    <div className="relative ">
                      
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-emerald-700 text-4xl font-bold">Sign Up Today</span>
                      </div>
                      <div className="relative flex justify-center text-sm mt-2">
                        <span className="bg-white px-2 text-emerald-700 text-md">We strive to keep your data private and secure</span>
                      </div>
                      
                    </div>

                    <div className="mt-6">
                      <form className="space-y-2">
                        <div>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="name"
                            placeholder="Username"
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 stext-lg h-14"
                            onChange={(e) => {
                              setDisplayName(e.target.value);
                            }}
                          />
                        </div>
                        

                        <div>
                          <input
                            type="text"
                            name="mobile-or-email"
                            id="mobile-or-email"
                            autoComplete="email"
                            placeholder="Email"
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 stext-lg h-14"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <div>
                          <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 stext-lg h-14"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>

                        <div>
                          <input
                            id="confirmpassword"
                            name="confirmpassword"
                            type="password"
                            placeholder="Confirm Password"
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 stext-lg h-14"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="flex w-full justify-center rounded-md border border-transparent bg-emerald-600 py-4 px-4 text-lg font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 "
                            onClick={createNewAccount}
                          >
                            Create your account
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="border-t-2 border-gray-200 bg-gray-50 px-4 py-6 sm:px-10">
                    <p className="text-xs leading-5 text-gray-500">
                      By signing up, you agree to our{" "}
                      <a
                        href="#"
                        className="font-medium text-gray-900 hover:underline"
                      >
                        Terms
                      </a>
                      ,{" "}
                      <a
                        href="#"
                        className="font-medium text-gray-900 hover:underline"
                      >
                        Data Policy
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="font-medium text-gray-900 hover:underline"
                      >
                        Cookies Policy
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
