import { createContext, useState, useRef, useEffect } from "react";
import { Audio } from "expo-av";

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
    const sound = useRef(new Audio.Sound());

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    const [songsList, setSongsList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isLoop, setIsLoop] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);

    useEffect(() => {
        const setupAudio = async () => {
            await Audio.setAudioModeAsync({
                staysActiveInBackground: true,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
                interruptionModeAndroid: 1,
                interruptionModeIOS: 1,
            });
        };

        setupAudio();

        return () => {
            sound.current.unloadAsync();
        };
    }, []);

    useEffect(() => {
        if (sound.current) {
            sound.current.setIsLoopingAsync(isLoop);
        }
    }, [isLoop]);

    const onPlaybackStatusUpdate = (status) => {
        if (!status.isLoaded) return;

        setPosition(status.positionMillis / 1000);
        setDuration(status.durationMillis / 1000);
        setIsPlaying(status.isPlaying);

        if (status.didJustFinish && !status.isLooping) {
            handleNext();
        }
    };

    const playSong = async (song, list) => {
        try {
            if (!song || !list?.length) return;

            const index = list.findIndex((s) => s.id === song.id);

            setCurrentSong(song);
            setSongsList(list);
            setCurrentIndex(index);

            await sound.current.unloadAsync();

            await sound.current.loadAsync(
                { uri: song.uri },
                { shouldPlay: true }
            );

            sound.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

            setIsPlaying(true);
        } catch (error) {
            console.log("Error playing song:", error);
        }
    };

    const togglePlayPause = async () => {
        if (!currentSong) return;

        try {
            if (isPlaying) {
                await sound.current.pauseAsync();
            } else {
                await sound.current.playAsync();
            }
        } catch (error) {
            console.log("Toggle error:", error);  
        }
    };

    const handleNext = async () => {
        if (!songsList.length) return;

        setCurrentIndex((prevIndex) => {
            let nextIndex;

            if (isShuffle) {
                nextIndex = Math.floor(Math.random() * songsList.length);
            } else {
                nextIndex =
                    prevIndex >= songsList.length - 1
                        ? 0
                        : prevIndex + 1;
            }

            playSong(songsList[nextIndex], songsList);
            return nextIndex;
        });
    };

    const handlePrevious = async () => {
        if (!songsList.length) return;

        setCurrentIndex((prevIndex) => {
            const prev =
                prevIndex === 0
                    ? songsList.length - 1
                    : prevIndex - 1;

            playSong(songsList[prev], songsList);
            return prev;
        });
    };

    const seek = async (value) => {
        if (!currentSong) return;
        await sound.current.setPositionAsync(value * 1000);
    };

    return (
        <MusicContext.Provider
            value={{
                currentSong,
                isPlaying,
                position,
                duration,
                playSong,
                togglePlayPause,
                handleNext,
                handlePrevious,
                seek,
                isLoop,
                setIsLoop,
                isShuffle,
                setIsShuffle,
            }}
        >
            {children}
        </MusicContext.Provider>
    );
};