import React from 'react'
import Header from '../../components/Header/Header'
import MovieList from '../../components/MovieList/MovieList'
export default function Movies() {
  return (
    <div className="homeUser">
      <Header></Header>
      <div className="containerUser">
        <section className="top-rated">
          <div className="containerMovieList">
            <p className="section-subtitle">Movies</p>
            <h2 className="h2 section-title">Top movies</h2>
            <ul className="filter-list">
              <li><button className="filter-btn">Movies</button></li>
              <li><button className="filter-btn">TV Shows</button></li>
              <li><button className="filter-btn">Documentary</button></li>
              <li><button className="filter-btn">Sports</button></li>
            </ul>
            <MovieList></MovieList>
          </div>
        </section>
      </div>
    </div>
  )
}
