import React, { createContext, useState, useContext } from "react";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorite = (song) => {
    setFavorites((prev) => {
      const exist = prev.find((item) => item.id === song.id);
      if (exist) return prev;
      return [...prev, song];
    });
  };

  const removeFromFavorite = (songId) => {
    setFavorites((prev) =>
      prev.filter((item) => item.id !== songId)
    );
  };

  const isFavorite = (songId) => {
    return favorites.some((item) => item.id === songId);
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        addToFavorite,
        removeFromFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => useContext(FavoriteContext);