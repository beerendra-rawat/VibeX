import { useContext } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Slider from "@react-native-community/slider";
import { Ionicons } from '@expo/vector-icons';
import { formatTime } from "../utils/Helper";
import { MusicContext } from "../context/MusicContext";
import { useFavorite } from "../context/FavoriteContext";

const { width } = Dimensions.get("window");

export default function MusicScreen({ navigation }) {
    const {
        currentSong, isPlaying, position, duration,
        togglePlayPause, handleNext, handlePrevious,
        seek, isLoop, setIsLoop, isShuffle, setIsShuffle
    } = useContext(MusicContext);

    const { addToFavorite, removeFromFavorite, isFavorite } = useFavorite();

    if (!currentSong) return null;

    const favorite = isFavorite(currentSong.id);

    return (
        <View style={{ flex: 1 }}>
            <LinearGradient
                colors={["rgba(0,0,0,0.3)", "#0E0F1A", "#000"]}
                style={StyleSheet.absoluteFill}
            />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.topRow}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()} style={styles.btnWrap}
                    >
                        <Image
                            source={require("../assets/img/arrow.png")}
                            style={styles.icons}
                        />
                    </TouchableOpacity>
                    <Text style={styles.title}>Now Playing</Text>
                    <TouchableOpacity
                        onPress={() => favorite ? removeFromFavorite(currentSong.id)
                            : addToFavorite(currentSong)}
                        style={styles.btnWrap}
                    >
                        <Image
                            source={favorite ? require("../assets/img/redHeart.png")
                                : require("../assets/img/heart.png")}
                            style={styles.faveIcon}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.centerContainer}>
                    <View style={styles.avatarWrap}>
                        <Image
                            source={require("../assets/img/cd.png")}
                            style={styles.avatar}
                        />
                    </View>
                    <Text style={styles.songTitle}>{currentSong.filename}</Text>
                    <Text style={styles.artist}>{currentSong.mediaType}</Text>
                </View>
                <View style={styles.bottomContainer}>
                    <Slider
                        minimumValue={0}
                        maximumValue={duration}
                        value={position}
                        onSlidingComplete={seek}
                        minimumTrackTintColor="#67E8F9"
                        maximumTrackTintColor="#fff"
                    />
                    <View style={styles.timeRow}>
                        <Text style={styles.timeText}>{formatTime(position)}</Text>
                        <Text style={styles.timeText}>{formatTime(duration)}</Text>
                    </View>

                    <View style={styles.mediaControlRow}>
                        <TouchableOpacity onPress={() => setIsShuffle(!isShuffle)}>
                            <Ionicons name="shuffle" size={24}
                                color={isShuffle ? "#34D399" : "#fff"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handlePrevious}>
                            <Image
                                source={require("../assets/img/prev.png")}
                                style={styles.controlImage}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.playButton}
                            onPress={togglePlayPause}
                        >
                            <Image
                                source={isPlaying ? require("../assets/img/pause.png")
                                    : require("../assets/img/play-3.png")}
                                style={styles.controlImage}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleNext}>
                            <Image source={require("../assets/img/next.png")}
                                style={styles.controlImage} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsLoop(!isLoop)}>
                            <Ionicons name="repeat" size={24}
                                color={isLoop ? "#34D399" : "#fff"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}
const styles = StyleSheet.create({
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
    icons: {
        tintColor: '#fff',
        width: 22,
        height: 22,
    },
    btnWrap: {
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: "rgba(255,255,255,0.15)",
        alignItems: "center",
        justifyContent: "center",
    },
    faveIcon: {
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
        width: width * 0.8,
        height: width * 0.8,
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
        textAlign: 'center',
        color: "#fff",
        fontSize: 22,
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
        alignSelf: 'center',
        width: 22,
        height: 22,
        tintColor: "#fff",
    },
    playButton: {
        paddingTop: 24,
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#06B6D4",

        shadowColor: "#67E8F9",
        shadowOpacity: 0.6,
        shadowRadius: 10,
        elevation: 8,

    },
});