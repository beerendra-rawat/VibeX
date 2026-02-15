import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
} from "react-native";

const playlistData = [
    {
        id: "1",
        title: "Starlit Reverie",
        artist: "Budiarti",
        songs: "8 Songs",
        image: require("../assets/img/avtar.jpeg"),
    },
    {
        id: "2",
        title: "Midnight Confessions",
        artist: "Aria Moon",
        songs: "12 Songs",
        image: require("../assets/img/avtar.jpeg"),
    },
    {
        id: "3",
        title: "Lost in the Echo",
        artist: "Nova Beats",
        songs: "10 Songs",
        image: require("../assets/img/avtar.jpeg"),
    },
];

export default function PlaylistScreen() {
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            activeOpacity={0.7}
        >
            <Image source={item.image} style={styles.image} />

            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.subtitle}>
                    By {item.artist} • {item.songs}
                </Text>
            </View>

            <TouchableOpacity
                style={styles.playButton}
            >
                <Image
                    source={require("../assets/img/playy.png")}
                    style={styles.playIcon}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Top daily playlists</Text>

                <TouchableOpacity onPress={() => console.log("See All Pressed")}>
                    <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={playlistData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        paddingTop: 18,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#fff",
    },
    seeAll: {
        fontSize: 14,
        color: "#A5B4FC",
        fontWeight: "600",
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 18,
    },
    image: {
        width: 65,
        height: 65,
        borderRadius: 15,
    },
    textContainer: {
        flex: 1,
        marginLeft: 15,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
    },
    subtitle: {
        fontSize: 13,
        color: "#aaa",
        marginTop: 4,
    },
    playButton: {
        width: 42,
        height: 42,
        borderRadius: 25,
        backgroundColor: "#1F2635",
        alignItems: "center",
        justifyContent: "center",
    },
    playIcon: {
        width: 18,
        height: 18,
        tintColor: "#fff",
        resizeMode: "contain",
    },
});