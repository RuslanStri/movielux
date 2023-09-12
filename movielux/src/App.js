import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Movies from "./components/Movies";
import Random from "./components/Random";
import Search from "./components/Search";
import TVs from "./components/TVs";
import WatchLater from './components/WatchLater';
import NoPage from "./components/NoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
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
