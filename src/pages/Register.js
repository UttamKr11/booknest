import { AuthResponseHandler } from '../util/AuthResponseHandler'
import { useNavigate } from 'react-router-dom';
export const Register = () => {
  const navigate = useNavigate();
  const handleRegister = async (event) => {
    event.preventDefault();
    const authDetail =
    {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
      PhoneNumber: event.target.phone.value,
      Role: event.target.role.value
    }

    const requestOption = {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(authDetail)
    };

    const response = await fetch("https://localhost:7083/api/auth/Register", requestOption);
    if (!response.ok) {
      AuthResponseHandler(response);
    }
    else if (response.ok) {
      const isPasses = AuthResponseHandler(response);
      if (isPasses) {
        navigate("/products");
      }
    }
  };
  return (
    <main>
      <section>
        <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">Register</p>
      </section>
      <form onSubmit={handleRegister} className="mx-auto max-w-3xl">
        <div className="mb-5 grid grid-cols-1 items-center gap-2 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4">
          <label htmlFor="name" className="text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
          <input type="name" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Your Name" required autoComplete="off" />
        </div>
        <div className="mb-5 grid grid-cols-1 items-center gap-2 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4">
          <label htmlFor="email" className="text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
          <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="someone@example.com" required autoComplete="off" />
        </div>
        <div className="mb-5 grid grid-cols-1 items-center gap-2 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4">
          <label htmlFor="password" className="text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
          <input type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required minLength="8" />
        </div>
        <div className="mb-5 grid grid-cols-1 items-center gap-2 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4">
          <label htmlFor="phone" className="text-sm font-medium text-gray-900 dark:text-gray-300">Phone</label>
          <input type="text" id="phone" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required minLength="10" />
        </div>
        <div className="mb-5 grid grid-cols-1 items-center gap-2 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4">
          <label htmlFor="role" className="text-sm font-medium text-gray-900 dark:text-gray-300">Register as</label>
          <select id="role" name="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required defaultValue="Customer">
            <option value="Customer">Customer</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
        </div>
      </form>
    </main>
  )
}
