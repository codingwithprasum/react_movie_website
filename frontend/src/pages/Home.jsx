import React from "react";
import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import '../css/Home.css'

const Home = () => {
  const [searchQuery, setsearchQuery] = useState(''); 
  const [movies, setmovies] = useState([]); 
  const [error, seterror] = useState(null); 
  const [loading, setloading] = useState(true)

  useEffect(() => {
    const loadPopularMovies = async () => {
        try {
            const popularMovies = await getPopularMovies() 
            setmovies(popularMovies)
        } catch (error) {
            console.log(error)
            seterror("Failed to load movies...")
        } 
        finally {
            setloading(false)
        }
    }
    loadPopularMovies() 
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    if (loading) return 

    setloading(true)
    try{
        const searchResults = await searchMovies(searchQuery)
        setmovies(searchResults)
        seterror(null)
    } catch (err) {
        console.log(err)
        seterror('Failed to search movies...')
    } finally{
      setloading(false)
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search For Movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e)=> setsearchQuery(e.target.value)}
        />
        <button type="submit" className="search-btn">Search</button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
        ) : (
        <div className="movies-grid">
        {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    )}
    </div>
  )
}

export default Home;
