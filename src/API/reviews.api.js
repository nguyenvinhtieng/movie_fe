import request from "../services/request";
import movieSlice from "../store/slice/movieSlice"
import { path } from "./apiPath";

export const addReviewAPI = async (dispatch) => {
  dispatch(movieSlice.actions.getMoviesStart());
  try {
    const res = await request("GET", path.getMovies);
    dispatch(movieSlice.actions.getMoviesSuccess(res));
  } catch (err) {
    dispatch(movieSlice.actions.getMoviesFailure());
  }
};