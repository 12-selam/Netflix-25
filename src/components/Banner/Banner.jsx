import React, { useEffect, useState } from 'react'
import axios from '../../Utils/axios';
import requests from '../../Utils/requests'
import './Banner.css'





const Banner = () => {


    const [movie, setMovie] = useState([]);


    useEffect(() => {
        (async () => {
            try {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        })()
    },[]);





  return (
    <div className="banner"
        style= {{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            backgroundPosition: "center center",
            baqckgroundRepeat: "no-repeat",
        }} >




        <div className="banner_contents">


            <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name}</h1>


            <div className="banner_buttons">


                <button className="banner_button play">Play</button>


                <button className="banner_button">My List</button>
            </div>


            <h1 className="banner_description">{movie?.overview}</h1>





         </div>   


        <div className="banner_fadeBottom" />

    </div>
  )
}

export default Banner
