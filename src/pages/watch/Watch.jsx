import { Player } from 'video-react';
import { ArrowBackOutlined } from "@mui/icons-material";
import Header from "../../components/Header/Header";
import MovieList from "../../components/MovieList/MovieList";
import 'video-react/dist/video-react.css';
import "./watch.scss";
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';

export default function Watch() {
  const state = useSelector((state) => state.movie);
  
  const location = useLocation();
  let movieId = location.pathname.split("/")[2];
  let movies = [
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

  let movie = movies.find((movie) => movie.id == movieId);
  if(!movie) return <div>404</div>
  if(movie.vip) {
    
    console.log("VIP")
  }
  return (
    
    <div className="homeUser">
      <Header></Header>
      <main className='containerUser mt100'>
        <article>
          <section className="movie-watch">
            <div className="title">You watching movie: {movie.title}</div>
            <div className="movie-watch__container">
              <Player>
                <source src={movie.video}/>
              </Player>
            </div>
          </section>
          <MovieList movies={movies}></MovieList>
        </article>
      </main>
    </div>
  );
}
