import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem("favorites");
      if (stored !== null) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.log("Error loading favorites", error);
    }
  };

  useEffect(() => {
    saveFavorites();
  }, [favorites]);

  const saveFavorites = async () => {
    try {
      await AsyncStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
      );
    } catch (error) {
      console.log("Error saving favorites", error);
    }
  };

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

