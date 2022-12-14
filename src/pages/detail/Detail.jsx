import { ArrowBackOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import MovieList from "../../components/MovieList/MovieList";
// import "./watch.scss";
import { Player } from "video-react";

export default function Detail() {
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
  console.log(movie);

  return (
    <div className="homeUser">
      <Header></Header>
      <main>
        <article>
          <section className="movie-detail">
            <div className="containerUser detail">
              <figure className="movie-detail-banner">
                <img src={movie.imgTitle} alt="" />

                <button className="play-btn">
                  <ion-icon name="play-circle-outline"></ion-icon>
                </button>
              </figure>

              <div className="movie-detail-content">
                <p className="detail-subtitle">MOVIE</p>

                <h1 className="h1 detail-title">
                  {movie.title}
                </h1>

                <div className="meta-wrapper">
                  <div className="badge-wrapper">
                  {movie.vip && <div className="badge badge-fill">VIP</div>}

                    <div className="badge badge-outline">HD</div>
                  </div>

                  <div className="ganre-wrapper">
                    <a href="#">Comedy,</a>

                    <a href="#">Action,</a>

                    <a href="#">Adventure,</a>

                    <a href="#">Science Fiction</a>
                  </div>

                  <div className="date-time">
                    <div>
                      <ion-icon name="calendar-outline"></ion-icon>

                      <time datetime="2021">{movie.year}</time>
                    </div>

                    <div>
                      <ion-icon name="time-outline"></ion-icon>

                      <time dateTime="PT115M">115 min</time>
                    </div>
                  </div>
                </div>

                <p className="storyline">
                  {movie.description}
                </p>

                <div className="details-actions">
                  {/* <button className="share">
                    <ion-icon name="share-social"></ion-icon>

                    <span>Share</span>
                  </button> */}

                  <div className="title-wrapper">
                    <p className="title">Prime Video</p>
                    <p className="text">Streaming Channels</p>
                  </div>
                  <Link to={`/watch/${movie.id}`}>
                    <button className="btn btn-primary">
                      <ion-icon name="play"></ion-icon>
                      <span>Watch Now</span>
                    </button>
                  </Link>
                </div>
               

              </div>
            </div>
            <div className="trailer">
              <div className="trailer__container">
                  <h3>Trailer</h3>
                <Player>
                  <source src={movie.trailer} />
                </Player>
                </div>
              </div>
          </section>
          <MovieList movies={movies}></MovieList>
        </article>
      </main>
    </div>
  );
}
