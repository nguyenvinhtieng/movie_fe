export const path = {
    register: '/api/auth/signup',
    changePassword: '/api/auth/change-password',
    login: '/api/auth/signin',
    resetPass: "/api/auth/reset-password",
    verifyPath: "/api/auth/reset-verify",
    getLists: `/api/seri`,
    createList: `/api/admin/series/`,
    updateList: (id) => `/api/admin/series/${id}`,
    deleteList: (id) => `/api/admin/series/${id}`,
    getMovies: `/api/movie`,
    createMovie: `/api/admin/movies/`,
    updateMovie: (id) => `/api/admin/movies/${id}`,
    activeMovie: (id, status) => status ? `/api/admin/movies/${id}/hide` : `/api/admin/movies/${id}/show`,
    deleteMovie: (id) => `/api/admin/movies/${id}`,
    getCategories: `/api/category/`,
    addReview: `/api/review`,
    deleteReview: (id) => `/api/review/${id}`,
    updateInfoUser: `/api/user`,
    getChat: `/api/chat`,
    createCategory: `/api/admin/categories/`,
    deleteCategory: (id) => `/api/admin/categories/${id}`,
    updateCategory: (id) => `/api/admin/categories/${id}`,
    getPlans: `/api/plan/`,
    createPlan: `/api/admin/plan/`,
    deletePlan: (id) => `/api/admin/plan/${id}`,
    updatePlan: (id) => `/api/admin/plan/${id}`,
    billing: `/api/billing`,
    getUsers: `/api/admin/users`,
    createUser: `/api/admin/users/`,
    updateUser: (id) => `/api/admin/users/${id}`,
    activeUser: (id, status) => status ? `/api/admin/users/${id}/lock` : `/api/admin/users/${id}/unlock`,
    deleteUser: (id) => `/api/admin/users/${id}`,
    getAdminBillings: '/api/admin/billing',
    confirmAdminBilling: (id) => `/api/admin/billing/${id}/confirm`,
    deleteAdminBilling: id => `/api/admin/billing/${id}`,
    getLatestUser: `/api/admin/home/users`,
    getLatestBilling: `/api/admin/home/billing`,
    getTotalBilling: `/api/admin/home/billing-summary`,
    getTotalMovie: `/api/admin/home/movie-count-all`,
    getTotalMovieActive: `/api/admin/home/movie-count`,
    getTotalAnalysis: `/api/admin/home/analysis`,
    getAdminReviews: `/api/admin/reviews`,
    deleteAdminReview: (id) => `/api/admin/reviews/${id}`,
    updateAdminReview: (id) => `/api/admin/reviews/${id}`,
}