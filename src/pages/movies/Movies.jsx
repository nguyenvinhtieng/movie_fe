import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/Header/Header'
import MovieList from '../../components/MovieList/MovieList'
export default function Movies() {
  const [movies, setMovies] = useState([])
  const movie = useSelector(state => state.movie)

  const categories = [
    {
      id: 1,
      name: "Hành động",
    },
    {
      id: 2,
      name: "Hài hước",
    },
    {
      id: 3,
      name: "Lãng mạn",
    }
  ]

  let moviesStore = [
    {
      id: 1,
      'title': '123123asdasd',
      'description':'typetest345',
      'imgTitle': '/images/movie-1.png',
      'imgSm': '/images/movie-1.png',
      'trailer': '/video.mp4',
      'video': '/video.mp4',
      'year': '2022',
      'limitAge': 18,
      'active': true,
      'vip': true,
      'categories': [1, 2],
      'series': 1
    },
    {
      id: 2,
      'title': '123123asdasd',
      'description':'typetest345',
      'imgTitle': '/images/movie-1.png',
      'imgSm': '/images/movie-1.png',
      'trailer': '/video.mp4',
      'video': '/video.mp4',
      'year': '2022',
      'limitAge': 18,
      'active': true,
      'vip': true,
      'categories': [1, 2],
      'series': 1
    },
    {
      id: 3,
      'title': '123123asdasd',
      'description':'typetest345',
      'imgTitle': '/images/movie-1.png',
      'imgSm': '/images/movie-1.png',
      'trailer': '/video.mp4',
      'video': '/video.mp4',
      'year': '2022',
      'limitAge': 18,
      'active': true,
      'vip': false,
      'categories': [1, 2],
      'series': 1
    },
  ]
  useEffect(()=> {
    setMovies(moviesStore)
  }, [movie])

  const chooseCategory = (id) => {
    console.log("id: ", id)
    let newMovies = moviesStore.filter(movie => movie.categories.includes(id))
    setMovies(newMovies)
  }

  return (
    <div className="homeUser">
      <Header></Header>
      <div className="containerUser">
        <section className="top-rated">
          <div className="containerMovieList">
            <p className="section-subtitle">Movies</p>
            <h2 className="h2 section-title">Top movies</h2>
            <ul className="filter-list">
              {categories.length > 0 && categories.map((category) => 
                <li><button className="filter-btn" onClick={()=>chooseCategory(category.id)}>{category.name}</button></li>
              )}
            </ul>
            <MovieList movies={movies}></MovieList>
          </div>
        </section>
      </div>
    </div>
  )
}
