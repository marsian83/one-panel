export default function Register() {
  return (
    <form className="flex flex-col m-8 gap-y-2 w-96 items-center">
      <input
        type="text"
        placeholder="username"
        className="border-black border p-2 rounded-md"
      />
      <input
        type="text"
        placeholder="email"
        className="border-black border p-2 rounded-md"
      />
      <input
        type="text"
        placeholder="password"
        className="border-black border p-2 rounded-md"
      />
      <button className="w-max bg-black text-white rounded-md px-5 py-2">
        Register
      </button>
    </form>
  );
}
