import * as MediaLibrary from "expo-media-library";

// Request Permission
export const requestPermission = async (setSongs) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    console.log("Permission status:", status);

    if (status === "granted") {
        await loadSongs(setSongs);
        console.log("Songs loaded successfully");
    } else {
        alert("Permission required to load songs");
    }
};

// Load Songs
export const loadSongs = async (setSongs) => {
    const media = await MediaLibrary.getAssetsAsync({
        mediaType: "audio",
        first: 100,
    });

    setSongs(media.assets);
    console.log("Media Assets:", media.assets);
};

// Format Time
export const formatTime = (sec) => {
    if (!sec) return "0:00";

    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

