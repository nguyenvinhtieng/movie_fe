import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMoviesAPI } from "../../API/movies.api";

const Home = () => {
  // const state = useSelector(state => state)
  // console.log("state: ", state)
  const dispatch = useDispatch();
  const loadMovie = async () => {
    await getMoviesAPI(dispatch); 
  }
  useEffect(()=> {
    loadMovie()
  }, [])
  return (
    <div className="home">
      <Navbar />
      <Featured/>
      <List/>
      {/* <List/> */}
      {/* <List/> */}
      {/* <List/> */}
    </div>
  );
};

export default Home;
