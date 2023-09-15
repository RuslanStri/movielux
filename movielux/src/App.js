import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Random from "./components/Random";
import Search from "./components/Search";
import TVs from "./components/TVs";
import WatchLater from './components/WatchLater';
import NoPage from "./components/NoPage";

import keyAndURL from "./url&keys";

export default function App() {
  const [orientation, setOrientation] = useState('landscape');

  useEffect(() => {
    if(window.matchMedia("(min-width: 2000px)").matches){
      console.log('the viewport is at least 2000 pixels wide');
      keyAndURL.imgURLFull = keyAndURL.imgURLRoot + '/original';
    } else if (window.matchMedia("(min-width: 1200px)").matches) {
      console.log('the viewport is at least 1200 pixels wide');
      keyAndURL.imgURLFull = keyAndURL.imgURLRoot + '/w1280';
    } else if (window.matchMedia("(min-width: 770px)").matches) {
      console.log('the viewport is at least 770 pixels wide');
      keyAndURL.imgURLFull = keyAndURL.imgURLRoot + '/w780';
    } else {
      console.log('the viewport is less than 770 pixels wide');
      keyAndURL.imgURLFull = keyAndURL.imgURLRoot + '/w500';
    }

    function handleResize() {
      if (window.innerHeight > window.innerWidth) {
        setOrientation('portrait');
      } else {
        setOrientation('landscape');
      }  
    }
    handleResize();
    window.addEventListener('resize', handleResize);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigation orientation={orientation} />}>
          <Route index element={<Home orientation={orientation} />} />
          <Route path="/random" element={<Random />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tvs" element={<TVs />} />
          <Route path="/watch-later" element={<WatchLater />} />
          <Route path="*" element={<NoPage />} />
        </Route>  
      </Routes>
    </BrowserRouter>
  )
}
