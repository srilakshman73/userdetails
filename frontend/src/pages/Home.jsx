import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchTerm);
  };
  
  const handleClear = (e) => {
 if(!e.target.value) {
   setSearchTerm("");
   setSearch("");
   setPage(1);
  }
};
  const { data, isLoading, error } = useQuery({
    queryKey: ["users", page, search],
    queryFn: () => 
      axios.get(`http://localhost:5000/api/users`, {
        params: { page, search: search || undefined },
     })
     .then((res) => res.data),
    keepPreviousData: true,
  });

  if (isLoading && !data) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  console.log(data);

  return ( 
   <main className="max-w-250 mx-auto mt-20 mb-12 px-5">
    <section className="flex flex-col items-center mb-5 gap-4">
      <h2 className="text-2xl font-medium text-[#333] text-center w-full">
        Employee Management</h2>
        <form 
        onSubmit={handleSearch} 
        className="w-full max-w-4xl mx-auto flex items-center gap-3">
          <input 
            type="search" 
            className="w-full px-4 p-2 border border-gray-300
            rounded-md outline-none  focus:ring-2 focus:border-blue-500 transition-colors" 
            placeholder="Search users..."
            value={searchTerm}
            onInput={handleClear}
            onChange={(e) => setSearchTerm(e.target.value)} />
           <button type="submit" className="px-4 py-2 text-base bg-blue-600 text-white 
            border-none rounded-md cursor-pointer hover:bg-blue-700 transition-colors"> 
           Search 
        </button>
      </form>
    </section>
    <div className="overflow-x-auto shadow-sm rounded-lg mb-12">
      <table className="w-full border-collapse bg-white">
        <thead className="bg-[#333] text-white">  
          <tr>
            <th className="p-4 text-left font-normal border-b border-gray-200">Name</th>
            <th className="p-4 text-left font-normal border-b border-gray-200">Age</th>
            <th className="p-4 text-left font-normal border-b border-gray-200">Dept</th>
            <th className="p-4 text-center font-normal border-b border-gray-200">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.users.length > 0 ? (
            data.users.map((user) => (
              <tr key={user.Id}>
                <td className="p-4 text-[#333]">{user.EmpName}</td>
                <td className="p-4 text-[#333]">{user.EmpAge}</td>
                <td className="p-4 text-[#333]">{user.EmpDept}</td>
                <td className="p-4 text-center">
                  <Link to={`/user/${user.Id}`}
                      className="inline-block px-3 py-1.5 bg-green-600 text-white no-underline rounded hover:bg-green-700 transition-colors text-sm">
                        View
                   </Link> 
               </td>
            </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-10 text-center text-gray-500 font-medium">No users Found</td>
            </tr>
           )}
        </tbody>
      </table>
    </div>
    <div>
      {data.users.length > 0 && (
        <div className="flex justify-center items-center gap-2.5 mt-5">
         <button className="px-4 py-2 text-base bg-green-600 text-white border-none rounded-md cursor-pointer 
         disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
         onClick={() => setPage((p) => Math.max(1, p -1))}
         disabled={page === 1}>
          Previous</button>
        <span className="text-base font-medium text-[#333]">
          {data.currentPage} Page of {data.totalPage}
        </span>
        <button className="px-4 py-2 text-base bg-green-600 text-white border-none rounded-md cursor-pointer 
         disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
         onClick={() => setPage((p) => p + 1)} 
         disabled={page === data.totalPages}>
          Next</button>
      </div>
    )}
    </div>
  </main>
  );
};

export default Home;