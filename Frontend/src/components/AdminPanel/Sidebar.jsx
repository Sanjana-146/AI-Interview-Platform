export default function Sidebar({ setPage, logout }) {
  return (
    <div className="w-64 bg-[#111827] min-h-screen flex flex-col">
      <h2 className="text-lg font-semibold p-4 text-white">Dashboard</h2>

      <button
        onClick={() => setPage("upload")}
        className="mx-4 my-2 bg-blue-500 text-white py-2 rounded hover:bg-gray-400 transition duration-200"
      >
        Upload Questions
      </button>

      <button
        onClick={() => setPage("system")}
        className="mx-4 my-2 bg-blue-500 py-2 rounded hover:bg-gray-400 transition duration-200 text-white"
      >
        System Access
      </button>

      <div className="mt-auto p-4">
        <button
          onClick={logout}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-400 transition duration-400"
        >
          Logout
        </button>
      </div>
    </div>
  );
}