import { ArrowBackOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import MovieList from "../../components/MovieList/MovieList";
import Rating  from "react-rating"
import { AiFillStar, AiOutlineStar } from "react-icons/ai"
// import "./watch.scss";
import { Player } from "video-react";
import { useRef, useState } from "react";
import { useEffect } from "react";
function makerandomString() {
  let length = Math.floor(Math.random() * 100);
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export default function Detail() {
  const state = useSelector((state) => state.movie);
  const [showTrailer, setShowTrailer] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const reviewContentRef = useRef();
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
  useEffect(()=> {
    setReviews(new Array(10).fill({}).map(item => {
      return {
        content: makerandomString(),
        rating: Math.floor(Math.random() * 5),
        movieId: 1
        }
      }))
  },[])
  const saveReview = () => {
    let content = reviewContentRef.current.value;
    console.log("reviews content: ", content);
    console.log("rating: ", rating);
  }

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

                  {/* <div className="title-wrapper">
                    <p className="title">Prime Video</p>
                    <p className="text">Streaming Channels</p>
                  </div> */}
                  <Link to={`/watch/${movie.id}`}>
                    <button className="btn btn-primary">
                      <ion-icon name="play"></ion-icon>
                      <span>Watch Now</span>
                    </button>
                  </Link>
                  {/* <Link to={`/watch/${movie.id}`} > */}
                    <button className="btn btn-primary"  onClick={()=>setShowTrailer(true)}>
                      <ion-icon name="play"></ion-icon>
                      <span>View Trailer</span>
                    </button>
                  {/* </Link> */}
                </div>
               

              </div>
            </div>
            
            <div className={`trailer ${showTrailer ? "is-show" : ""}`}>
              <div className="trailer__overlay" onClick={()=>setShowTrailer(false)}></div>
              <div className="trailer__container">
                <Player>
                  <source src={movie.trailer} />
                </Player>
                </div>
              </div>
          </section>
          <section className="review containerUser">
            <h3>REVIEWS</h3>

            <div className="review__form">
              {/* <div className="review__form--avatar"> */}
              <h4>Add your reviews</h4>
              <div className="review__form--main">
                  <textarea name="" id="" cols="30" rows="10" placeholder="Enter your reviews...." ref={reviewContentRef}></textarea>
                  <Rating emptySymbol={<AiOutlineStar />} onChange={(val)=>setRating(val)} fullSymbol={<AiFillStar />}></Rating>
                  <button onClick={saveReview}>Save</button>
              </div>
            </div>
            <div className="review__list">
              {reviews.length > 0 && reviews.map((review, index) => 
              <div className="review__item">
                <div className="review__item--head">
                  <div className="review__item--avatar">
                    <img src="https://source.unsplash.com/random" alt="" />
                  </div>
                  <div className="review__item--name">Nguyn Van A</div>
                </div>
                <div className="review__item--content">
                  <p>{review.content}</p>
                  <div className="review__item--star">{review.rating}/5⭐</div>
                </div>
              </div>)}
              
            </div>
          </section>
          <MovieList movies={movies}></MovieList>
        </article>
      </main>
    </div>
  );
}

