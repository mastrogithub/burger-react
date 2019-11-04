import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://udemy-burger-9f60b.firebaseio.com/'
})

export default instance