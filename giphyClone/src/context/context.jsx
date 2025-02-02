import {GiphyFetch} from "@giphy/js-fetch-api";
import {createContext, useContext, useEffect, useState} from "react";

const GifContext = createContext();

const GifProvider = ({children}) => {
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");
  const [favorites, setFavorites] = useState([]);

  const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoriteGIFs")) || [];
    setFavorites(favorites);
  }, []);
  return (
    <GifContext.Provider
      value={{gf, gifs, setGifs, addToFavorites, filter, setFilter, favorites}}
    >
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => {
  return useContext(GifContext);
};

export default GifProvider;