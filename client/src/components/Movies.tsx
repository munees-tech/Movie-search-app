import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  runtime: number;
  genres?: Genre[];
  genre_ids?: number[];
}

const Movies = () => {
  const apiKey = "a071d3520a50cb268394a221b6696c24";
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
      );
      const data = await res.json();
      setMovie(data);
      setLoading(false);
    };
    fetchMovieDetails();
  }, [id]);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (!movie) return <div className="text-white">No movie found.</div>;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : undefined;

  return (
    <div
      className="min-h-screen px-4 py-10 text-white"
      style={{
        backgroundImage: backdropUrl
          ? `linear-gradient(rgba(20,20,20,0.85),rgba(20,20,20,0.95)), url(${backdropUrl})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "background-image 0.5s",
      }}
    >
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Movie Poster */}
        <img
          className="w-56 h-auto object-cover rounded-lg shadow-lg"
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt="Movie Poster"
        />

        {/* Movie Details */}
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold mb-2 hover:text-gray-500 cursor-pointer">
            {movie.title} ({movie.release_date?.slice(0, 4)})
          </h1>
          <p className="text-sm text-gray-400 mb-4">
            {movie.genre_ids} time {movie.runtime} min
          </p>
          <div className="flex items-center p-3">
            <div className="bg-gray-800 text-white rounded-full w-17 h-17 flex justify-center items-center mr-4">
              <span>{Math.floor(movie.vote_average * 10)}%</span>
            </div>
            <span>User</span>
            <span className="ml-2">Schore</span>
            {movie.vote_average >= 7
              ? "🙂"
              : movie.vote_average >= 5
              ? "😐"
              : "😞"}
          </div>
          <span className="text-white text-2xl p-2">OverView</span>
          <div className="text-lg leading-relaxed mt-2">{movie.overview}</div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
