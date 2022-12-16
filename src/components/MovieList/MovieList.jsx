import React from "react";
import { Link } from "react-router-dom";

export default function MovieList({movies}) {
  return (
    <section className="top-rated">
      <div className="containerMovieList">
        <ul className="movies-list">
          {movies.length === 0 && <h1 className="empty">Không có phim nào</h1>}
          {movies.length > 0 && movies.map((movie, _) => (
            <li key={movie.id}>
              <div className="movie-card">
                <Link to={`/detail/${movie.id}`}>
                  <figure className="card-banner">
                    <img src={movie.imgTitle} onError={(e) => e.target.src = "/images/movie-1.png"} alt="" />
                  </figure>
                </Link>

                <div className="title-wrapper">
                  <Link to={`/detail/${movie.id}`}>
                    <h3 className="card-title">{movie.title}</h3>
                  </Link>
                  <time datetime="2022">{movie.year}</time>
                </div>

                <div className="card-meta">
                  
                  {movie.vip && <div className="badge badge-outline">VIP</div>}

                  <div className="duration">
                    <ion-icon name="time-outline"></ion-icon>

                    <time datetime="PT122M">{movie.limitAge} + </time>
                  </div>

                  <div className="rating">
                    <ion-icon name="star"></ion-icon>
                    <data>7.8</data>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
