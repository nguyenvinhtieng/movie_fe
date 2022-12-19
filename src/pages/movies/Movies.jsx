import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/Header/Header'
import MovieList from '../../components/MovieList/MovieList'
export default function Movies() {
  const [movies, setMovies] = useState([])
  const { category, movie } = useSelector(state => state)
  const [search, setSearch] = useState('')
  const [hightLightSearch, setHightLightSearch] = useState([])
  useEffect(()=> {
    let movieActive = movie?.movies?.filter(item => item.active)
    setMovies(movieActive)
  }, [movie?.movies])

  const chooseCategory = (id) => {
    let movieActive = movie?.movies?.filter(item => item.active)
    let newMovies = movieActive.filter(movie => {
      let isOfCategory = false
      movie.categories.forEach(category => {
        if (category.id === id) {
          isOfCategory = true
        }
      })
      return isOfCategory
    })
    setMovies(newMovies)
  }
  
  const searchMovie = () => {
    let movieActive = movie?.movies?.filter(item => item.active)
    let newMovies = movieActive.filter(movie => {
      if(movie.title.toLowerCase().includes(search.toLowerCase()) || movie.description.toLowerCase().includes(search.toLowerCase())) {
        return true
      }
      return false
    })
    setMovies(newMovies)
    setHightLightSearch([search])
  }

  return (
    <div className="homeUser">
      <Header></Header>
      <div className="containerUser">
        <section className="top-rated">
          <div className="containerMovieList">

            <p className="section-subtitle">Movies</p>
            <div className="movie__search">
              <input type="text" placeholder='Search your movie...' value={search} onChange={(e)=>setSearch(e.target.value)}/>
              <button onClick={searchMovie}>Search</button>
            </div>
            <ul className="filter-list">
              {category?.categories?.length > 0 && category.categories.map((category) => 
                <li><button className="filter-btn" onClick={()=>chooseCategory(category.id)}>{category.name}</button></li>
              )}
              <li>
                <button className="filter-btn" onClick={()=>setMovies(movie?.movies)}>All</button>
              </li>
            </ul>
            <MovieList movies={movies} hightLightSearch={hightLightSearch}></MovieList>
          </div>
        </section>
      </div>
    </div>
  )
}
