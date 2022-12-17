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
  const [curentMovie, setCurentMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  let movieId = location.pathname.split("/")[2];
  console.log("curentMovie: ", curentMovie)
  useEffect(()=> {
    if(movie.movies.length > 0) {
      console.log("run here")
      let currentMovieFind = movie.movies.find(item => item.id == movieId);
      setCurentMovie(currentMovieFind);
      // console.log(currentMovie)
      if(currentMovieFind.vip && auth.user && !auth.user.vip) {
        toast.error("You need to be VIP to watch this movie");
        navigate("/movies");
      }
    }
  }, [movie, movieId])
  return (
    <>
    <div className="bodyUser">

      <Header></Header>
      <main className='containerUser'>
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
    </>
  );
}
