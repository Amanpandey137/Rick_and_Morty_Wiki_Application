// import { useEffect, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";

// function Character() {
//   const [details, setDetails] = useState({});
//   const [loading,setLoading]=useState(false)
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const { id } = useParams();
//   console.log(id);
//   const url = `https://rickandmortyapi.com/api/character/${id}`;
//   const fetchData = async () => {
//     setLoading(true)
//     try {
//       const res = await fetch(url);
//       const data = await res.json();

//       console.log(data);
//       setDetails(data);
//     } catch (error) {
//       console.log("error", error.message);
//     }
//     finally{
//         setLoading(false)
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   console.log(details);
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="flex flex-col items-center">
//           <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
//           <p className="text-lg text-gray-700 font-semibold">Loading...</p>
//         </div>
//       </div>
//     );
//   }
  
//   if (!details.name&&!loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="text-center p-6 bg-white rounded-xl shadow-md border border-gray-300">
//           <h2 className="text-2xl font-semibold text-red-600 mb-2">Character Not Found</h2>
//           <p className="text-gray-700">This character doesn't exist or couldn't be loaded.</p>
//         </div>
//       </div>
//     );
//   }
  
//   return (
//     <div className="min-h-screen p-4 bg-gray-100">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-6 px-6 py-2 border-2 border-gray-900 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
//       >
//         ← Back
//       </button>

//       <div className="w-full flex flex-col items-center gap-4 p-6 bg-amber-100 rounded-2xl shadow-md">
//         <img
//           src={details.image}
//           alt={details.name}
//           className=" rounded-2xl  object-cover   border-4 border-white shadow-md"
//         />

//         <h2 className="text-2xl font-bold text-gray-800">{details.name}</h2>

//         <div className="text-gray-700 text-lg text-center">
//           <p>
//             <span className="font-semibold">Origin:</span> {details.origin.name}
//           </p>
//           <p>
//             <span className="font-semibold">Location:</span>{" "}
//             {details.location.name}
//           </p>
//           <p>
//             <span className="font-semibold">Species:</span> {details.species}
//           </p>
//           <p>
//             <span className="font-semibold">Status:</span> {details.status}
//           </p>
//           {details.type && (
//             <p>
//               <span className="font-semibold">Type:</span> {details.type}
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Character;
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";

export default function Character() {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  
  // In a real component, these would come from react-router
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  // const id = 1; // Simulated ID for demo
  // const navigate = () => console.log("Navigate back"); // Mock navigate function
  
  const url = `https://rickandmortyapi.com/api/character/${id}`;
  
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setDetails(data);
    } catch (error) {
      console.log("error", error.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900">
        <div className="w-24 h-24 border-8 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-2xl font-bold text-white mt-6">Loading...</p>
      </div>
    );
  }
  
  if (!details.name && !loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-800 p-4 text-white">
        <h1 className="text-4xl font-bold mb-4">Character Not Found</h1>
        <p className="text-xl mb-8">This character doesn't exist or couldn't be loaded.</p>
        <button
          onClick={() => navigate(-1)}
          className="px-8 py-3 border-2 border-white rounded-2xl bg-red-600 text-white hover:bg-red-700 transition duration-200 flex items-center space-x-2"
        >
          {/* <ArrowLeft size={20} /> */}
          <span>Back</span>
        </button>
      </div>
    );
  }
  
  const getStatusColor = (status) => {
    switch (status) {
      case "Alive": return "bg-green-500";
      case "Dead": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };
  
  return (
    <div className="min-h-screen bg-blue-900 flex flex-col">
      {/* Header with back button */}
      <div className="bg-blue-800 p-4">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 border-2 border-white rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition duration-200 flex items-center space-x-2"
        >
          {/* <ArrowLeft size={16} /> */}
          <span>Back</span>
        </button>
      </div>
      
      {/* Character image - large and prominent */}
      <div className="w-full flex justify-center bg-gray-800 p-4">
        {details.image ? (
          <img 
            src={details.image} 
            alt={details.name} 
            className="w-full max-w-2xl rounded-lg shadow-2xl border-4 border-blue-300"
            onError={(e) => {
              e.target.src = "/api/placeholder/600/600";
              e.target.alt = "Image not available";
            }}
          />
        ) : (
          <div className="w-full max-w-2xl h-96 bg-gray-700 rounded-lg flex items-center justify-center text-white text-2xl">
            No Image Available
          </div>
        )}
      </div>
      
      {/* Character name - prominent */}
      <div className="w-full bg-blue-700 text-center py-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white">{details.name}</h1>
        
        {/* Status indicator */}
        <div className="mt-4 flex justify-center">
          <span className={`px-4 py-1 rounded-full text-white font-medium ${getStatusColor(details.status)}`}>
            {details.status || "Unknown"}
          </span>
        </div>
      </div>
      
      {/* Character details */}
      <div className="flex-1 bg-blue-900 p-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-800 rounded-2xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-blue-600 pb-2">Origin</h2>
            <p className="text-xl">{details.origin?.name || "Unknown"}</p>
          </div>
          
          <div className="bg-blue-800 rounded-2xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-blue-600 pb-2">Location</h2>
            <p className="text-xl">{details.location?.name || "Unknown"}</p>
          </div>
          
          <div className="bg-blue-800 rounded-2xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-4 border-b-2 border-blue-600 pb-2">Species</h2>
            <p className="text-xl">{details.species || "Unknown"}</p>
          </div>
          
          {details.type && (
            <div className="bg-blue-800 rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-4 border-b-2 border-blue-600 pb-2">Type</h2>
              <p className="text-xl">{details.type}</p>
            </div>
          )}
          
          {details.gender && (
            <div className="bg-blue-800 rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-4 border-b-2 border-blue-600 pb-2">Gender</h2>
              <p className="text-xl">{details.gender}</p>
            </div>
          )}
          
          {details.created && (
            <div className="bg-blue-800 rounded-2xl p-6 text-white">
              <h2 className="text-2xl font-bold mb-4 border-b-2 border-blue-600 pb-2">Created</h2>
              <p className="text-xl">{new Date(details.created).toLocaleDateString()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}