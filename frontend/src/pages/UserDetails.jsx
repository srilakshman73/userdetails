import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const UserDetail = () => {
  const { Id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: user, isLoading, error,
  } = useQuery({
   queryKey: ["user", Id],
   queryFn: () => axios.get(`http://localhost:5000/api/users/${Id}`   
   ).then((res) => res.data),
  });

  const deleteMutation = useMutation({
    mutationFn: () => axios.delete(`http://localhost:5000/api/users/${Id}`
    ),
    onSuccess: () => {
     queryClient.invalidateQueries(["users"]);
     navigate("/");
   },
   onError: (error) => {
    alert("Error deleting user: " + error.message);
   },
  });
  const handleDelete = () => {
      if (window.confirm("Are you sure you want to delete this user? ")) {
        deleteMutation.mutate();
      }
  };


  if (isLoading) return <div className="text-center">Loading...
  </div>;

  if (error) return <div className="text-center text-red-600">Error:{error.message}</div>;

  return (
    <div className="max-w-150 mx-auto mt-24 mb-12 p-6 bg-white 
    shadow-sm rounded-lg  border  border-gray-100 flex flex-col items-center">
      <h2 className="text-2xl font-semibold  text-[#333] mb-6  self-start  border-b  border-gray-200 w-full pb-4">
      UserDetail</h2>

      {user.photo && (
        <div className="mb-6 w-full flex justify-center bg-gray-50 
        rounded-lg p-4 border border-gray-100">
         <img 
          className="w-32 h-32 object-cover rounded-full"
          src={`http://localhost:5000/uploads/${user.photo}`} 
          alt={user.photo}  
          onError={(e) => { 
           e.target.onerror = null;
           e.target.src = "./user.png";
        }}
       />
      </div>
     )}
     <div className="w-full space-y-4 mb-8">
      <div className="flex items-center border-b border-gray-100 pb-2">
        <span className="w-24 font-medium text-graay-500 ">Name</span>
        <span className="text-lg text-[#333] font-semibold">{user.EmpName}</span>
      </div>
      <div className="flex items-center border-b border-gray-100 pb-2">
        <span className="w-24 font-medium text-graay-500">Age</span>
        <span className="text-lg text-[#333] font-semibold" >{user.EmpAge}</span>
      </div>
      <div className="flex items-center border-b border-gray-100 pb-2"> 
        <span className="w-24 font-medium text-graay-500">Dept</span>
        <span className="text-lg text-[#333] font-semibold">{user.EmpDept}</span>
      </div>
     </div>
     <div className="flex flex-wrap gap-3 w-full">
      <Link className="flex-1 text-center py-2.5 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 
      transition-colors" to={`/edit/${user.Id}`}>
        Edit Details</Link>
      <button className="flex-1 py-2.5 bg-red-600 text-white font-medium rounded hover:bg-red-700
       transition-colors disabled:bg-grap-400" onClick={handleDelete}>Delete User</button>
      <Link className="w-full text-center py-2.5 bg-gray-500 text-white font-medium 
      rounded hover:bg-gray-600 transition-colors mt-2" to="/" >Back to List</Link>
     </div>
    </div>  
  );
};

export default UserDetail;