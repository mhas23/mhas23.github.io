import React, { useState, useEffect } from "react";
import "./Movies.scss";
import MovieCard from "./MovieCard";
import ClipLoader from "react-spinners/ClipLoader";

const MovieList = ({ movies, isLoggedIn, userID }) => {
  const [loading, setLoading] = useState(true);
  let renderedList;

  useEffect(() => {
    let time = setTimeout(() => {
      setLoading(false);
    }, 1000);


    return () => {
      clearTimeout(time);
      setLoading(true);

    };
  }, [movies]);

  if (movies.length === 0) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h4>No results</h4>{" "}
      </div>
    );
  }

  if (loading) {
    return (
      <ClipLoader
        size={150}
        color={"#123abc"}
        css={`
          display: block;
          margin: 0 auto;
          border-color: black;
        `}
        loading={loading}
      ></ClipLoader>
    );
  } else {
    renderedList = movies
      .filter((movie) => movie.poster_path !== null)
      .map((movie, key) => {
        return (
          <div
            key={key}
            className="movie-list"
          >
            <MovieCard
              image={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
              id={movie.id}
              title={movie.title}
              release_date={movie.release_date}
              isLoggedIn={isLoggedIn}
              userID={userID}
            />
          </div>
        );
      });
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div className="movie-rendered-list">{renderedList}</div>
    </div>
  );
};

export default MovieList;
