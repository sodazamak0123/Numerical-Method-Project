const axios = require('axios')

const api = axios.create({
    baseURL : "https://my-json-server.typicode.com/sodazamak0123/Numerical-Method-Project/"
})

const getAllInterpolation = () => api.get("/interpolation")

const apis = {
    getAllInterpolation
}

export default apis