const axios = require('axios')

const api = axios.create({
    baseURL : "https://my-json-server.typicode.com/sodazamak0123/Numerical-Method-Project/"
})

const getAllRootOfEquation = () => api.get("/root-of-equation")
const getAllMatrix = () => api.get("/matrix")
const getAllInterpolation = () => api.get("/interpolation")

const apis = {
    getAllRootOfEquation,
    getAllMatrix,
    getAllInterpolation
}

export default apis