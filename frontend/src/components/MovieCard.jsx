import React from 'react'
import '../css/MovieCard.css'
import { useMovieContext } from '../contexts/MovieContext'

const MovieCard = ({movie}) => {
    const {isFavourite, addToFavourites, removeFromFavourites} = useMovieContext() 
    const favourite = isFavourite(movie.id)
    function onFavClick(e) {
        e.preventDefault()
        if (favourite) removeFromFavourites(movie.id)
        else addToFavourites(movie)    
    }
  return (
    <div className='movie-card'>
      <div className='movie-poster'>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <div className='movie-overlay'>
        <button className={`favorite-btn ${favourite ? "active" : ""}`} onClick={onFavClick}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
</svg>
</button>
        </div>
      </div>
      <div className='movie-info'>
        <h3>{movie.title}</h3>
        <p>{movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  )
}

export default MovieCard
