import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore.js";

interface Movie {
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
}

const HomePage = () => {
  const [movies, setMovies] = useState<Movie[] | null>([]);
  const { user } = useUserStore();
  const [searchMovie, setSearchMovie] = useState("");
  const navigate = useNavigate();
  const apiKey = "a071d3520a50cb268394a221b6696c24";

  const fetchMovies = async (searchTerm = "") => {
    const endpoint = searchTerm
      ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
          searchTerm
        )}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

    try {
      const res = await fetch(endpoint);
      const json = await res.json();
      setMovies(json.results || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchMovie(e.target.value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMovies(searchMovie.trim());
  };

  return (
    <div className="min-h-screen text-white">
      {/* Title */}
      <div className="flex items-center justify-end mt-8 mb-6 px-8">
        <img
          src={user?.profilePic ? user.profilePic : "/avatar.png"}
          alt="Profile img"
          onClick={() => navigate("/me")}
          className="size-11 rounded-full cursor-pointer"
        />
      </div>

      <div className="flex flex-col items-center justify-center">
        <h3 className="text-2xl font-bold  gap-2 justify-around w-full text-center">
          🎬 Search Movies For Free
        </h3>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center items-center mb-6">
        <form onSubmit={handleSubmit} className="flex gap-2 mt-5 mb-3">
          <input
            type="text"
            placeholder="Search movie..."
            value={searchMovie}
            onChange={handleInputChange}
            className="px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
          />
          <button
            type="submit"
            className="text-purple-500 hover:text-purple-300"
          >
            <FaSearch size={24} />
          </button>
        </form>
      </div>

      {/* Movie Grid */}
      <div className="px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="hover:scale-105 transition-transform duration-300 ease-in flex flex-col items-center"
            >
              <img
                className="rounded-2xl w-full object-cover h-62"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.title}
                onClick={() => navigate(`/movies/${movie.id}`)}
              />
              <div className="rounded-2xl p-4 w-full">
                <h2 className="text-xl mb-1.5">Title: {movie.title}</h2>
                <span className="text-xs mb-1.5">
                  {movie.release_date ? movie.release_date.slice(0, 4) : ""}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
