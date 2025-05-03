import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function Character() {
  const [details, setDetails] = useState({});
  const [loading,setLoading]=useState(false)
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const url = `https://rickandmortyapi.com/api/character/${id}`;
  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch(url);
      const data = await res.json();

      console.log(data);
      setDetails(data);
    } catch (error) {
      console.log("error", error.message);
    }
    finally{
        setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(details);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg text-gray-700 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!details.name&&!loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-6 bg-white rounded-xl shadow-md border border-gray-300">
          <h2 className="text-2xl font-semibold text-red-600 mb-2">Character Not Found</h2>
          <p className="text-gray-700">This character doesn't exist or couldn't be loaded.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-6 py-2 border-2 border-gray-900 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
      >
        ← Back
      </button>

      <div className="w-full flex flex-col items-center gap-4 p-6 bg-amber-100 rounded-2xl shadow-md">
        <img
          src={details.image}
          alt={details.name}
          className=" rounded-2xl  object-cover   border-4 border-white shadow-md"
        />

        <h2 className="text-2xl font-bold text-gray-800">{details.name}</h2>

        <div className="text-gray-700 text-lg text-center">
          <p>
            <span className="font-semibold">Origin:</span> {details.origin.name}
          </p>
          <p>
            <span className="font-semibold">Location:</span>{" "}
            {details.location.name}
          </p>
          <p>
            <span className="font-semibold">Species:</span> {details.species}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {details.status}
          </p>
          {details.type && (
            <p>
              <span className="font-semibold">Type:</span> {details.type}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Character;
