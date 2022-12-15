import { Player } from 'video-react';
import { ArrowBackOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import MovieList from "../../components/MovieList/MovieList";
import 'video-react/dist/video-react.css';
import "./watch.scss";
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";

export default function Watch() {
  const {movie, auth} = useSelector((state) => state);
  const [curentMovie, setCurentMovie] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  let movieId = location.pathname.split("/")[2];
  useEffect(()=> {
    if(movie.movies.length > 0) {
      let currentMovie = movie.movies.find(item => item.id == movieId);
      setCurentMovie(curentMovie);
      if(currentMovie.vip && auth.user && !auth.user.vip) {
        toast.error("You need to be VIP to watch this movie");
        navigate("/movies");
      }
    }
  }, [movie.movies])

  return (
    
    <div className="homeUser">
      <Header></Header>
      <main className='containerUser mt100'>
        <article>
          <section className="movie-watch">
            <div className="title">You watching movie: {curentMovie?.title}</div>
            <div className="movie-watch__container">
              <Player>
                <source src={curentMovie?.video}/>
              </Player>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
