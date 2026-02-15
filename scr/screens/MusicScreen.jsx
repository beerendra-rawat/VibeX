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
import { useState } from "react";

const { width } = Dimensions.get("window");

const mediaControl = [
    { id: 1, img: require("../assets/img/shuffle.png") },
    { id: 2, img: require("../assets/img/prev.png") },
    { id: 3, img: require("../assets/img/pause.png") },
    { id: 4, img: require("../assets/img/next.png") },
    { id: 5, img: require("../assets/img/playlist.png") },
];

export default function MusicScreen({ navigation }) {
    const [value, setValue] = useState(28);
    const duration = 135;

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

                <SafeAreaView style={styles.safeArea} edges={["top"]}>
                    <View style={styles.topRow}>
                        <TouchableOpacity style={styles.topIcon} onPress={() => navigation.goBack()}>
                            <Image
                                source={require("../assets/img/arrow.png")}
                                style={styles.icons}
                            />
                        </TouchableOpacity>

                        <Text style={styles.title}>Now Playing</Text>

                        <TouchableOpacity style={styles.topIcon}>
                            <Image
                                source={require("../assets/img/heart.png")}
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
                            <Text style={styles.songTitle}>Starlit Reverie</Text>
                            <Text style={styles.artist}>Budiarti x Lil magrib</Text>
                        </View>
                    </View>

                    <View style={styles.bottomContainer}>
                        <Slider
                            minimumValue={0}
                            maximumValue={duration}
                            value={value}
                            onValueChange={setValue}
                            minimumTrackTintColor="#C6F36A"
                            maximumTrackTintColor="rgba(255,255,255,0.2)"
                            thumbTintColor="#C6F36A"
                        />

                        <View style={styles.timeRow}>
                            <Text style={styles.timeText}>0:28</Text>
                            <Text style={styles.timeText}>-2:15</Text>
                        </View>
                        <View style={styles.mediaControlRow}>
                            {mediaControl.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[
                                        styles.controlIcon,
                                        item.id === 3 && styles.playButton,
                                    ]}
                                >
                                    <Image source={item.img} style={styles.controlImage} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>


                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: "space-between",
    },
    topRow: {
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
        tintColor: "#fff",
    },
    title: {
        color: "#fff",
        fontSize: 26,
        fontWeight: "600",
    },
    centerContainer: {
        alignItems: "center",
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
        fontWeight: 600,
    },
    artist: {
        color: "rgba(255,255,255,0.6)",
        marginTop: 6,
        fontSize: 16,
    },
    bottomContainer: {
        marginBottom: 30,
    },
    timeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
        paddingHorizontal: 12
    },
    timeText: {
        color: "#fff",
        fontSize: 14,
    },
    mediaControlRow: {
        marginBottom: 30,
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
        backgroundColor: "#C6F36A",
    },
});