export const path = {
    register: '/api/auth/signup',
    login: '/api/auth/signin',
    getLists: `/api/admin/series/`,
    createList: `/api/admin/series/`,
    updateList: (id) => `/api/admin/series/${id}`,
    deleteList: (id) => `/api/admin/series/${id}`,
    getMovies: `/api/movie`,
    createMovie: `/api/admin/movies/`,
    updateMovie: (id) => `/api/admin/movies/${id}`,
    deleteMovie: (id) => `/api/admin/movies/${id}`,
    getCategories: `/api/category/`,
    createCategory: `/api/admin/categories/`,
    deleteCategory: (id) => `/api/admin/categories/${id}`,
    updateCategory: (id) => `/api/admin/categories/${id}`,
    addReview: `/api/review`,
    
}