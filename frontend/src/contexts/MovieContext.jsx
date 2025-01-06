import React from 'react'
import { createContext, useState, useContext, useEffect } from 'react'

const MovieContext = createContext() 

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({children}) => {
    const [favourites, setfavourites] = useState([])

    useEffect(() => {
      const storedFavs = localStorage.getItem('favourites')

      if (storedFavs) setfavourites(JSON.parse(storedFavs))
    }, [])

    useEffect(() => {
      localStorage.setItem('favourites', JSON.stringify(favourites))
    }, [favourites])

    const addToFavourites = (movie) => {
        setfavourites(prev =>[...prev, movie])
    }

    const removeFromFavourites = (movieId) => {
        setfavourites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavourite = (movieId) =>{
        return favourites.some(movie => movie.id === movieId)
    }

    const value = {
        favourites, 
        addToFavourites, 
        removeFromFavourites, 
        isFavourite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}