import request from "../services/request";
import categorySlice from "../store/slice/categorySlice";
import { path } from "./apiPath";

export const getPlansAPI = async (dispatch) => {
    dispatch(categorySlice.actions.getPlansStart());
    try {
      const res = await request("GET", path.getPlans);
      dispatch(categorySlice.actions.getPlansSuccess(res));
    } catch (err) {
      console.log(err)
      dispatch(categorySlice.actions.getPlansFailure({error_message: err.message}));
    }
  };
  
  //create
  export const createPlanAPI = async (category, dispatch) => {
    dispatch(categorySlice.actions.createPlanStart());
    if (!category.name) {
      return dispatch(categorySlice.actions.createPlanFailure({error_message: "Tên danh mục không hợp lệ!"}));
    }
    try {
      const res = await request("POST", path.createPlan, {body: category.name});
      dispatch(categorySlice.actions.createPlanSuccess(res));
    } catch (err) {
      console.log(err)
      dispatch(categorySlice.actions.createPlanFailure({error_message: err.message}));
    }
  };

  export const updatePlanAPI = async (id, category, dispatch) => {
    dispatch(categorySlice.actions.updatePlanStart());
    if (category.name === "") {
      return dispatch(categorySlice.actions.updatePlanFailure({error_message: "Tên danh mục không hợp lệ!"}));
    }
    try {
      const res = await request("PUT", path.updatePlan(id), {body: category.name});
      dispatch(categorySlice.actions.updatePlanSuccess(res.data));
    } catch (err) {
      console.log(err)
      dispatch(categorySlice.actions.updatePlanFailure({error_message: err.message}));
    }
  };
  
  //delete
  export const deletePlanAPI = async (id, dispatch) => {
    dispatch(categorySlice.actions.deletePlanStart());
    try {
      await request("DELETE" , path.deletePlan(id));
      dispatch(categorySlice.actions.deletePlanSuccess(id));
    } catch (err) {
      console.log(err)
      dispatch(categorySlice.actions.deletePlanFailure({error_message: err.message}));
    }
  };