import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatTime } from "../utils/Helper";
import { useContext } from "react";
import { MusicContext } from "../context/MusicContext";

export default function LoadSong({ songs, navigation }) {
    const { playSong, currentSong, isPlaying } = useContext(MusicContext);

    const handlePress = (item) => {
        playSong(item, songs);

        if (navigation) {
            navigation.navigate("MusicScreen");
        }
    };

    const renderSong = ({ item }) => {
        const isCurrent = currentSong?.id === item.id;

        return (
            <TouchableOpacity
                style={[
                    styles.songItem,
                    isCurrent && styles.activeSongItem
                ]}
                onPress={() => handlePress(item)}
            >
                <View style={styles.imageContainer}>
                    <Image
                        source={require("../assets/img/icon.png")}
                        style={[styles.songImage, isCurrent && { tintColor: '#67E8F9' }]}
                    />
                    {isCurrent && isPlaying && (
                        <View style={styles.playingOverlay}>
                            <Ionicons name="stats-chart" size={14} color="#67E8F9" />
                        </View>
                    )}
                </View>

                <View style={styles.songInfo}>
                    <Text
                        numberOfLines={1}
                        style={[styles.songTitle, isCurrent && { color: "#67E8F9" }]}
                    >
                        {item.filename}
                    </Text>
                    <Text style={styles.songDuration}>
                        {item.mediaType} • {formatTime(item.duration)}
                    </Text>
                </View>

                <Ionicons
                    name={isCurrent && isPlaying ? "pause-circle" : "play-circle"}
                    size={45}
                    color={isCurrent ? "#67E8F9" : "#9fa1af"}
                />
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={songs}
            renderItem={renderSong}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 120 }}
        />
    );
}
const styles = StyleSheet.create({
    songItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingVertical: 12,
    },
    activeSongItem: {
        backgroundColor: "rgba(103, 232, 249, 0.1)",
    },
    imageContainer: {
        position: 'relative',
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1A1B28',
        borderRadius: 10,
    },
    songImage: {
        width: 25,
        height: 25,
    },
    playingOverlay: {
        position: 'absolute',
        bottom: 2,
        right: 2,
    },
    songInfo: {
        flex: 1,
        marginLeft: 16,
        paddingRight: 10,
    },
    songTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
    },
    songDuration: {
        fontSize: 13,
        color: "#aaa",
        marginTop: 4,
    },
});