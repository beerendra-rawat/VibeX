import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useFavorite } from "../context/FavoriteContext";
import { formatTime } from "../utils/Helper";

export default function FavoriteSong({ navigation }) {

    const { favorites, removeFromFavorite } = useFavorite();

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.songItem}
            onPress={() =>
                navigation.navigate("MusicScreen", {
                    song: item,
                    songs: favorites,
                })
            }
        >
            <Image
                source={require("../assets/img/avtar.jpeg")}
                style={styles.songImage}
            />

            <View style={styles.songInfo}>
                <Text style={styles.songTitle}>{item.filename}</Text>
                <Text style={styles.songArtist}>
                    {formatTime(item.duration)}
                </Text>
            </View>

            <TouchableOpacity
                onPress={() => removeFromFavorite(item.id)}
            >
                <Ionicons name="heart" size={28} color="red" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <StatusBar style="light" />

            <FlatList
                data={favorites}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                    <Text style={{ color: "#fff", textAlign: "center", marginTop: 50 }}>
                        No Favorite Songs Yet.
                    </Text>
                }
                ListHeaderComponent={
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>
                            Favorite Songs
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#0B0F1A",
    },
    header: {
        paddingHorizontal: 24,
        paddingVertical: 18,
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: "600",
        color: "#fff",
    },
    songItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingVertical: 14,
    },
    songImage: {
        width: 60,
        height: 60,
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
    songArtist: {
        fontSize: 13,
        color: "#aaa",
        marginTop: 4,
    },
    rightSection: {
        alignItems: "center",
    },
});