import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import listSlice from "./slice/listSlice";
import movieSlice from "./slice/movieSlice";
import categorySlice from "./slice/categorySlice";
import modalSlice from "./slice/modalSlice";
import planSlice from "./slice/planSlice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        movie: movieSlice.reducer,
        list: listSlice.reducer,
        category: categorySlice.reducer,
        modal: modalSlice.reducer,
        plan: planSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default store;