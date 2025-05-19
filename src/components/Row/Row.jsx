import React, { useEffect, useState } from 'react'
import './Row.css'
import axios from '../../Utils/axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovie] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const base_url = 'https://image.tmdb.org/t/p/original/'

  useEffect(
    () => {
    (async () =>{      
        try{
        const request = await axios.get(fetchUrl);
        setMovie(request.data.results);
    }
  catch (error){
    console.log(error);
  }
    })()
}, [fetchUrl]
)



    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('')
        } else {
            movieTrailer(movie?.name || movie?.title || movie?.original_name)
            .then((url) => {
                console.log(url)             
                const urlParams = new URLSearchParams(new URL(url).search)               
                setTrailerUrl(urlParams.get('v'))
            })
            .catch((error) => console.log(error))
        }
    }


  return (
    <div className='row'>
        <h2>{title}</h2>
        <div className='row_posters'>
            {movies?.map((movie, i) => (
                <img
                    key={i}
                    onClick={() => handleClick(movie)}
                    className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
                    src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                    alt={movie.name}
                />
            ))}
        </div>
        <div style={{padding:`40px`}}>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
        </div>
      
    </div>
  )
}

export default Row
