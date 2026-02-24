import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import ScrollTab from "../components/ScrollTab";
import AutoSliderCard from "../components/AutoSliderCard";
import LoadSongs from "../components/LoadSongs";
import { requestPermission } from "../utils/Helper";
import { AuthContext } from "../context/AuthContext";
import { MusicContext } from "../context/MusicContext";
import MiniPlayer from "../components/MiniPlayer";

export default function HomeScreen({ navigation }) {
    const { user } = useContext(AuthContext);
    const { playSong } = useContext(MusicContext);
    const [songs, setSongs] = useState([]);
    const [activeTab, setActiveTab] = useState("all");

    useEffect(() => {
        requestPermission(setSongs);
    }, []);

    const handleSongPress = (song, songList) => {
        playSong(song, songList);
        navigation.navigate("MusicScreen");
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
            <StatusBar style="light" />
            <View style={styles.headerContainer}>
                <View style={styles.topRow}>
                    <View style={styles.avtarWrap}>
                        <TouchableOpacity onPress={() => navigation.navigate("Account")}>
                            <Image
                                source={{ uri: user?.photo }}
                                style={styles.avtarIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.iconsWrap}
                        onPress={() => navigation.navigate("SearchScreen")}
                    >
                        <Image
                            source={require("../assets/img/search.png")}
                            style={styles.icons}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>
                    Hi, {user?.name}
                </Text>
            </View>
            <View style={styles.sliderSection}>
                <AutoSliderCard />
            </View>
            <View style={styles.tabSection}>
                <ScrollTab
                    activeTab={activeTab}
                    onTabPress={setActiveTab}
                />
            </View>
            <View style={styles.songList}>
                {activeTab === "all" && (
                    <LoadSongs
                        songs={songs}
                        navigation={navigation}
                        onSongPress={(song) => handleSongPress(song, songs)}
                    />
                )}
                {activeTab === "newrelease" && (
                    <LoadSongs
                        songs={[...songs].sort(
                            (a, b) => b.modificationTime - a.modificationTime
                        )}
                        navigation={navigation}
                        onSongPress={(song) => handleSongPress(song, songs)}
                    />
                )}


            </View>
            <View style={styles.miniPlayer}>
                <MiniPlayer />
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#000",
    },
    headerContainer: {
        paddingHorizontal: 24,
        paddingTop: 10,
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    avtarWrap: {
        width: 70,
        height: 70,
        borderRadius: 35,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: "#333",
    },
    avtarIcon: {
        width: "100%",
        height: "100%",
    },
    iconsWrap: {
        width: 44,
        height: 44,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#b0acac8a",
    },
    icons: {
        width: 22,
        height: 22,
        tintColor: "#fff",
    },
    title: {
        fontSize: 32,
        fontWeight: "600",
        color: "#fff",
        marginTop: 16,
    },
    sliderSection: {
        marginTop: 24,
    },
    tabSection: {
        marginTop: 28,
        paddingLeft: 24,
    },
    songList: {
        marginTop: 16,
        flex: 1,
    },
    miniPlayer: {
        marginBottom: 80,
        marginHorizontal: 24,
    }
});