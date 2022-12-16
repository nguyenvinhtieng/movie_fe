export const path = {
    register: '/api/auth/signup',
    login: '/api/auth/signin',
    getLists: `/api/series/`,
    createList: `/api/admin/series/`,
    updateList: (id) => `/api/admin/series/${id}`,
    deleteList: (id) => `/api/admin/series/${id}`,
    getMovies: `/api/movies/`,
    createMovie: `/api/admin/movies/`,
    updateMovie: (id) => `/api/admin/movies/${id}`,
    activeMovie: (id, status) => status ? `/api/admin/movies/${id}/hide` : `/api/admin/movies/${id}/show`,
    deleteMovie: (id) => `/api/admin/movies/${id}`,
    getCategories: `/api/categories/`,
    createCategory: `/api/admin/categories/`,
    deleteCategory: (id) => `/api/admin/categories/${id}`,
    updateCategory: (id) => `/api/admin/categories/${id}`,
    getPlans: `/api/plans/`,
    createPlan: `/api/admin/plans/`,
    deletePlan: (id) => `/api/admin/plans/${id}`,
    updatePlan: (id) => `/api/admin/plans/${id}`,
}