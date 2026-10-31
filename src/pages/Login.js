import { AuthResponseHandler } from '../util/AuthResponseHandler'
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { UseAuthInfo } from '../context/AuthContext'
export const Login = () => {
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const { setUserName } = UseAuthInfo();
  const handleLogin = async (event) => {
    event.preventDefault();
    const authDetail =
    {

      email: email.current.value,
      password: password.current.value,

    }

    const requestOption = {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(authDetail)
    };

    const response = await fetch("https://localhost:7083/api/auth/login", requestOption);
    if (!response.ok) {
      AuthResponseHandler(response);
    }
    else if (response.ok) {
      const isPasses = await AuthResponseHandler(response);
      if (isPasses) {
        setUserName(sessionStorage.getItem("name") || "");
        navigate("/products");
      }
    }
  };
  return (
    <main>
      <section>
        <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">Login</p>
      </section>
      <form onSubmit={handleLogin} className="mx-auto max-w-3xl">
        <div className="mb-5 grid grid-cols-1 items-center gap-2 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4">
          <label htmlFor="email" className="text-sm font-medium text-gray-900 dark:text-gray-300">Enter email</label>
          <input ref={email} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="shubham@example.com" required autoComplete="off" />
        </div>
        <div className="mb-5 grid grid-cols-1 items-center gap-2 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4">
          <label htmlFor="password" className="text-sm font-medium text-gray-900 dark:text-gray-300">Enter password</label>
          <input ref={password} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4">
          <button type="submit" className="justify-self-start sm:col-start-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log In</button>
        </div>
      </form>
      {/* <button className="mt-3 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login As Guest</button> */}
    </main>
  )
}
