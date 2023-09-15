import { useEffect, useRef, useState } from "react";
import axios from 'axios';

import Slider from "./Slider";

import keyAndURL from "../url&keys";

export default function Home({ orientation }) {
  const heroShowDelay = 6500;

  const [trendingShows, setTrendingShows] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [topTv, setTopTv] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const [heroShowIndex, setHeroShowIndex] = useState(0);

  const intervalRef = useRef(null);

  const fetchTrendingShows = async () => {
    const {data} = await axios.get(`${keyAndURL.API_URL}/trending/all/day`, {
      params: {
        api_key: keyAndURL.API_KEY
      }
    })
    console.log(data.results)
    setTrendingShows(data.results);
    return data.results.length;
  }

  const fetchUpcomingMovies = async () => {
    const {data} = await axios.get(`${keyAndURL.API_URL}/movie/upcoming`, {
      params: {
        api_key: keyAndURL.API_KEY
      }
    })
    setUpcomingMovies(data.results);
    return 1;
  }

  const fetchTopMovies = async () => {
    const {data} = await axios.get(`${keyAndURL.API_URL}/movie/top_rated`, {
      params: {
        api_key: keyAndURL.API_KEY
      }
    })
    setTopMovies(data.results);
    return 1;
  }

  const fetchTopTv = async () => {
    const {data} = await axios.get(`${keyAndURL.API_URL}/tv/top_rated`, {
      params: {
        api_key: keyAndURL.API_KEY
      }
    })
    setTopTv(data.results);
    return 1;
  }

  useEffect(() => {
    fetchTopTv().then(
      fetchTopMovies().then(
        fetchUpcomingMovies().then(
          fetchTrendingShows().then(res => {
            function intervalHeroIndex() {
              setHeroShowIndex(i => {/* console.log(i);  */return i === res-1 ? 0 : i + 1});
            }     
            intervalRef.current = setInterval(intervalHeroIndex, heroShowDelay);
          })
        )
      )
    )
    return () => clearInterval(intervalRef.current); 
  }, [])

  function getPosterOrBackdrop(show) {
    if (orientation === 'landscape') {
      return show.backdrop_path;
    }
    return show.poster_path;
  }

  return (
    <div className="home anim"
    key={trendingShows[heroShowIndex] && trendingShows[heroShowIndex].id}
      style = {trendingShows.length !==0 ? {
        backgroundImage:
        `linear-gradient(to top, rgb(0,0,0,1) 0%, rgb(0,0,0,0.3) 100%), url(${keyAndURL.imgURLFull + getPosterOrBackdrop(trendingShows[heroShowIndex])})`,
      } : {
        backgroundImage:
        `url("https://via.placeholder.com/500")`,
      }
    }  
    >
      {trendingShows.length !==0 &&  
        <div className="home__hero">
          <h2 className="home__hero-title">{trendingShows[heroShowIndex].title || trendingShows[heroShowIndex].name}</h2>
          <button className="home__hero-btn">About</button>
        </div>
      }

      {trendingShows.length !==0 &&  
        <div className="home__sliders">
          <h2 className="home__titles">Trending Shows</h2>
          <Slider items={trendingShows} />
          <h2 className="home__titles">Top Movies</h2>
          <Slider items={topMovies} />
          <h2 className="home__titles">Top TV Shows</h2>
          <Slider items={topTv} />
          <h2 className="home__titles">Upcoming Movies</h2>
          <Slider items={upcomingMovies} />
        </div>
      }
      
    </div>
  );
}
  