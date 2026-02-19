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

export default function LoadSong({ songs, navigation }) {

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.songItem}
            onPress={() =>
                navigation.navigate("MusicScreen", {
                    song: item,
                    songs: songs,
                })
            }
        >
            <Image
                source={require("../assets/img/icon.png")}
                style={styles.songImage}
            />

            <View style={styles.songInfo}>
                <Text style={styles.songTitle}>{item.filename}</Text>
                <Text style={styles.songDuration}>
                    {formatTime(item.duration)}
                </Text>
            </View>

            <Ionicons name="play-circle" size={45} color="#A5B4FC" />
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={songs}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
        />
    );
}

const styles = StyleSheet.create({
    songItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingVertical: 14,
    },
    songImage: {
        width: 35,
        height: 35,
        borderRadius: 14,
    },
    songInfo: {
        flex: 1,
        marginLeft: 16,
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