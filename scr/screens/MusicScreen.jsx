import { StatusBar } from "expo-status-bar";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
    Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Slider from "@react-native-community/slider";
import { useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";
import { formatTime } from "../utils/Helper";
import { Ionicons } from '@expo/vector-icons';
import { useFavorite } from "../context/FavoriteContext";

const { width } = Dimensions.get("window");

export default function MusicScreen({ navigation, route }) {

    const { song, songs } = route.params;

    const sound = useRef(null);


    const [currentIndex, setCurrentIndex] = useState(
        songs.findIndex((item) => item.id === song.id)
    );

    const [currentSong, setCurrentSong] = useState(song);
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(1);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isLoop, setIsLoop] = useState(false);

    useEffect(() => {
        loadSong(currentSong);

        return () => {
            if (sound.current) {
                sound.current.unloadAsync();
            }
        };
    }, [currentSong]);

    useEffect(() => {
        const setupAudio = async () => {
            await Audio.setAudioModeAsync({
                staysActiveInBackground: true,   // ✅ IMPORTANT
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
                interruptionModeAndroid: 1,
                interruptionModeIOS: 1,
                playThroughEarpieceAndroid: false,
            });
        };

        setupAudio();
    }, []);

    const { addToFavorite, removeFromFavorite, isFavorite } = useFavorite();

    const favorite = isFavorite(currentSong.id);

    const handleFavorite = () => {
        if (favorite) {
            removeFromFavorite(currentSong.id);
        } else {
            addToFavorite(currentSong);
        }
    };

    //Load Song
    const loadSong = async (selectedSong) => {
        try {
            if (sound.current) {
                await sound.current.unloadAsync();
            }

            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: selectedSong.uri },
                { shouldPlay: true },
                onPlaybackStatusUpdate
            );

            sound.current = newSound;
            setIsPlaying(true);
        } catch (error) {
            console.log("Error loading song:", error);
        }
    };

    //Playback Status
    const onPlaybackStatusUpdate = (status) => {
        if (status.isLoaded) {
            setPosition(status.positionMillis / 1000);
            setDuration(status.durationMillis / 1000);
            setIsPlaying(status.isPlaying);

            if (status.didJustFinish) {
                if (isLoop) {
                    sound.current.replayAsync();
                } else {
                    handleNext();
                }
            }
        }
    };

    const togglePlayPause = async () => {
        if (!sound.current) return;

        if (isPlaying) {
            await sound.current.pauseAsync();
            console.log("Song Stop....")
        } else {
            await sound.current.playAsync();
            console.log("Song playing....")
        }
    };

    const handleNext = () => {
        let nextIndex;

        if (isShuffle) {
            nextIndex = Math.floor(Math.random() * songs.length);
        } else {
            nextIndex =
                currentIndex === songs.length - 1 ? 0 : currentIndex + 1;
        }

        setCurrentIndex(nextIndex);
        setCurrentSong(songs[nextIndex]);
    };

    const handlePrevious = () => {
        const prevIndex =
            currentIndex === 0 ? songs.length - 1 : currentIndex - 1;

        setCurrentIndex(prevIndex);
        setCurrentSong(songs[prevIndex]);
        console.log("You tab Prev button....")
    };

    return (
        <View style={{ flex: 1 }}>
            <StatusBar style="light" />

            <ImageBackground
                source={require("../assets/img/avtar.jpeg")}
                style={styles.background}
                blurRadius={40}
            >
                <LinearGradient
                    colors={["rgba(0,0,0,0.3)", "#0E0F1A", "#000"]}
                    style={StyleSheet.absoluteFill}
                />

                <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>

                    <View style={styles.topRow}>
                        <TouchableOpacity
                            style={styles.topIcon}
                            onPress={() => navigation.goBack()}
                        >
                            <Image
                                source={require("../assets/img/arrow.png")}
                                style={styles.icons}
                            />
                        </TouchableOpacity>

                        <Text style={styles.title}>Now Playing</Text>

                        <TouchableOpacity
                            style={styles.topIcon}
                            onPress={handleFavorite}
                        >
                            <Image
                                source={
                                    favorite
                                        ? require("../assets/img/redHeart.png")
                                        : require("../assets/img/heart.png")
                                }
                                style={styles.icons}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.centerContainer}>
                        <View style={styles.avatarWrap}>
                            <Image
                                source={require("../assets/img/avtar.jpeg")}
                                style={styles.avatar}
                            />
                        </View>

                        <View style={styles.songInfo}>
                            <Text style={styles.songTitle}>
                                {currentSong.filename}
                            </Text>
                            <Text style={styles.artist}>
                                {currentSong.mediaType}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.bottomContainer}>
                        <Slider
                            minimumValue={0}
                            maximumValue={duration}
                            value={position}
                            onSlidingComplete={async (val) => {
                                await sound.current.setPositionAsync(val * 1000);
                            }}
                            minimumTrackTintColor="#C6F36A"
                            maximumTrackTintColor="rgba(255,255,255,0.2)"
                            thumbTintColor="#C6F36A"
                        />

                        <View style={styles.timeRow}>
                            <Text style={styles.timeText}>
                                {formatTime(position)}
                            </Text>
                            <Text style={styles.timeText}>
                                {formatTime(duration)}
                            </Text>
                        </View>

                        <View style={styles.mediaControlRow}>
                            <TouchableOpacity
                                style={styles.controlIcon}
                                onPress={() => setIsShuffle(!isShuffle)}
                            >
                                <Image
                                    source={require("../assets/img/shuffle.png")}
                                    style={[
                                        styles.controlImage,
                                        { tintColor: isShuffle ? "#34D399" : "#fff" }
                                    ]}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.controlIcon}
                                onPress={handlePrevious}
                            >
                                <Image
                                    source={require("../assets/img/prev.png")}
                                    style={styles.controlImage}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.controlIcon, styles.playButton]}
                                onPress={togglePlayPause}
                            >
                                <Image
                                    source={
                                        isPlaying
                                            ? require("../assets/img/pause.png")
                                            : require("../assets/img/play-3.png")
                                    }
                                    style={styles.controlImage}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.controlIcon}
                                onPress={handleNext}
                            >
                                <Image
                                    source={require("../assets/img/next.png")}
                                    style={styles.controlImage}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.controlIcon}
                                onPress={() => setIsLoop(!isLoop)}
                            >
                                <Ionicons
                                    name="repeat-outline"
                                    size={24}
                                    color={isLoop ? "#34D399" : "#fff"}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1 },
    safeArea: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: "space-between",
    },
    topRow: {
        paddingTop: 18,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    topIcon: {
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: "rgba(255,255,255,0.15)",
        alignItems: "center",
        justifyContent: "center",
    },
    icons: {
        width: 22,
        height: 22,
    },
    title: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
    centerContainer: {
        alignItems: "center"
    },
    avatarWrap: {
        width: width * 0.7,
        height: width * 0.7,
        borderRadius: (width * 0.7) / 2,
        overflow: "hidden",
        marginBottom: 30,
    },
    avatar: {
        width: "100%",
        height: "100%",
    },
    songInfo: {
        alignItems: "center",
    },
    songTitle: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "600",
    },
    artist: {
        color: "rgba(255,255,255,0.6)",
        marginTop: 6,
        fontSize: 16,
    },
    bottomContainer: {
        marginBottom: 30
    },
    timeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
        paddingHorizontal: 12,
    },
    timeText: {
        color: "#fff",
        fontSize: 14
    },
    mediaControlRow: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    controlIcon: {
        width: 55,
        height: 55,
        borderRadius: 30,
        backgroundColor: "rgba(255,255,255,0.08)",
        alignItems: "center",
        justifyContent: "center",
    },
    controlImage: {
        width: 22,
        height: 22,
        tintColor: "#fff",
    },
    playButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#34D399",

        shadowColor: "#34D399",
        shadowOpacity: 0.6,
        shadowRadius: 10,
        elevation: 8,

    },
});