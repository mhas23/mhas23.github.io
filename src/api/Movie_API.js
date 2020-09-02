import axios from 'axios'

const Search = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

const Info = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie'
})


export const Movie_API =  {
    Search,
    Info
};