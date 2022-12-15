import { DataGrid } from "@mui/x-data-grid";
import "./movieList.css";
import { Link } from "react-router-dom";
import { DeleteOutline } from "@mui/icons-material";
import {  useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import movieSlice from "../../../store/slice/movieSlice";
import { useEffect } from "react";
import { LoadingButton } from "@mui/lab";

const MovieList = () => {
  const { movies, isFetching, error, success} = useSelector(state => state.movie);
  
  const dispatch = useDispatch()

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
    if (success) {
      toast.success(success)
    }
    dispatch(movieSlice.actions.refreshErrorAndSuccess())
  },[error, success])

  const handleDelete = (id) => {
    
  };

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "movie",
      headerName: "Movie",
      width: 280,
      renderCell: (params) => {
        return (
          <div className="product-list__product">
            <img src={params.row.img} alt="" className="product-list__img" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "genre",
      headerName: "Genre",
      width: 120,
    },
    {
      field: "year",
      headerName: "Year",
      width: 120,
    },
    {
      field: "limit",
      headerName: "Limit",
      width: 120,
    },
    {
      field: "isSeries",
      headerName: "IsSeries",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 140,
      renderCell: (params) => {
        return (
          <div className="product-list__action">
            <Link
              to={{ pathname: "/movies/" + params.row._id, movie: params.row }}
            >
              <button className="product-list__button--edit">Edit</button>
            </Link>
            <LoadingButton
            size="small"
            onClick={handleDelete}
            loading={isFetching}
            loadingPosition="end"
            variant="contained"
            className="add-product-button"
          >
            Delete
          </LoadingButton>
          </div>
        );
      },
    },
  ];

  return (
    <div className="product-list">
      <Link to="/admin/new-movie">
        <button className="product-add--button">Create</button>
      </Link>
      <DataGrid
        className="product-list__table"
        rows={movies}
        columns={columns}
        pageSize={movies.length}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(r) => r._id}
      />
    </div>
  );
};

export default MovieList;