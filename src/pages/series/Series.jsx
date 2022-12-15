import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/Header/Header'
import MovieList from '../../components/MovieList/MovieList'
export default function Series() {
  const [movies, setMovies] = useState([])
  const { category, movie } = useSelector(state => state)

  return (
    <div className="homeUser">
      <Header></Header>
      <div className="containerUser">
        <section className="top-rated">
          <div className="containerMovieList">
            <MovieList movies={movies}></MovieList>
          </div>
        </section>
      </div>
    </div>
  )
}
