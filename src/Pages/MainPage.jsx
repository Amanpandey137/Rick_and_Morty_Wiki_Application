import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function MainPage() {
  const [page, setPage] = useState(0);
  const url = `https://rickandmortyapi.com/api/character?page=${page}`;
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const formattedTime = time.toLocaleTimeString("en-US", { hour12: false });
  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();

      setTotalPages(data.info.pages);
      console.log(totalPages);
      //   console.log(data);
      setDetails(data.results);
    } catch (error) {
      console.log("error", error.message);
    }
    setLoading(false);
    // console.log(details)
  };

  useEffect(() => {
    fetchData();
  }, [loading, page]);

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
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="w-full bg-blue-700 text-white text-center py-5 shadow-md">
        <h1 className="text-3xl font-bold">Rick and Morty Characters</h1>
        <p className="text-sm mt-1">
          Explore the multiverse one character at a time
        </p>
      </header>

      <div className="grid grid-cols-2 gap-2 justify-center align-baseline p-3 m-2">
        {details.map((data) => (
          <Link to={`character/${data.id}`} key={data.id}>
            <div className="border-4 flex flex-col justify-center items-center p-2 bg-amber-100 rounded-2xl hover:shadow-md transition">
              <img
                src={data.image}
                alt="Image"
                className="rounded-full w-32 h-32 object-cover mb-2"
              />
              <div className="font-semibold">{data.name}</div>
              <div>{data.species}</div>
              <div>{data.status}</div>
            </div>
          </Link>
        ))}

        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 0}
          className={`
            px-4 py-2 rounded bg-blue-500 text-white transition
            hover:bg-blue-600
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500
          `}
        >
          Previous
        </button>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages - 1}
          className={`
            px-4 py-2 rounded bg-blue-500 text-white transition
            hover:bg-blue-600
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500
          `}
        >
          Next
        </button>

        <div className="col-span-2 bottom-0 w-full bg-gray-800 text-white text-center py-3 mt-4">
          <p className="text-lg font-semibold">{formattedTime}</p>
          <p className="text-sm">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
}
export default MainPage;
