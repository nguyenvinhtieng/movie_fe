import request from "../services/request";
import planSlice from "../store/slice/planSlice.js"
import { path } from "./apiPath";

export const getAllPlanAPI = async (dispatch) => {
  try {
    const res = await request("GET", path.getPlan);
    console.log("res", res)
    dispatch(planSlice.actions.getPlansSuccess(res));
  } catch (err) {
    // dispatch(planSlice.actions.getMoviesFailure());
    console.log("err")
  }
};
