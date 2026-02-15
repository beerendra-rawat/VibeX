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

export default function MusicListScreen({ navigation }) {
    const favoriteSongs = [
        {
            id: "1",
            title: "Starlit Reverie",
            artist: "Budiarti",
            image: require("../assets/img/avtar.jpeg"),
        },
        {
            id: "2",
            title: "Midnight Confessions",
            artist: "Arlo James",
            image: require("../assets/img/avtar.jpeg"),
        },
        {
            id: "3",
            title: "Lost in the Echo",
            artist: "Nova Sky",
            image: require("../assets/img/avtar.jpeg"),
        },
        {
            id: "4",
            title: "Dreamscape",
            artist: "Luna Ray",
            image: require("../assets/img/avtar.jpeg"),
        },
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.songItem}
            onPress={() => navigation.navigate("MusicScreen") } >
            <Image source={item.image} style={styles.songImage} />

            <View style={styles.songInfo}>
                <Text style={styles.songTitle}>{item.title}</Text>
                <Text style={styles.songArtist}>{item.artist}</Text>
            </View>

            <View style={styles.rightSection}>
                <Ionicons name="play-circle" size={50} color="#A5B4FC" />
            </View>
        </TouchableOpacity >
    );

    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <StatusBar style="light" />
            <FlatList
                data={favoriteSongs}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
                ListHeaderComponent={
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>My Songs</Text>
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
        paddingTop: 18,
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