import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground } from "react-native";
import ScrollTab from "../components/ScrollTab";
import AutoSliderCard from "../components/AutoSliderCard";
import PlaylistScreen from "./PlaylistScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen({ route }) {

    const user = route.params.user;


    return (
        <View style={{ flex: 1, }}>
            <StatusBar style="light" />
            <ImageBackground source={require("../assets/img/bgImgg.png")}
                style={styles.bgImg} resizeMode="cover" >

                <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
                    <View style={styles.container}>

                        <View style={styles.topRow}>
                            <View style={styles.avtarWrap}>
                                <Image source={{ uri: user.photo }} 
                                    style={styles.avtarIcon} />
                            </View>
                            <View style={styles.rightIcons}>
                                <TouchableOpacity style={styles.iconsWrap}>
                                    <Image source={require("../assets/img/search.png")}
                                        style={styles.icons} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconsWrap}>
                                    <Image source={require("../assets/img/heart.png")}
                                        style={styles.icons} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={styles.title}>Hi, {user.name}</Text>
                    </View>

                    <View style={styles.scrollContainer}>
                        <ScrollTab />
                    </View>

                    <View style={styles.container}>
                        <Text style={styles.subTitle}>Curated & Trending</Text>
                    </View>

                    <View style={styles.cardContainer}>
                        <AutoSliderCard />
                    </View>
                    <PlaylistScreen />
                </SafeAreaView>
            </ImageBackground>
        </View>

    )
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    bgImg: {
        width: "100%",
        height: "100%",
    },
    container: {
        paddingHorizontal: 24,
        paddingTop: 18,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
    },
    avtarWrap: {
        width: 70,
        height: 70,
        borderWidth: 1,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderColor: '#e577dd',
    },
    avtarIcon: {
        width: 70,
        height: 70,
        borderRadius: 50,
    },
    rightIcons: {
        flexDirection: 'row',
        gap: 14,
    },
    iconsWrap: {
        width: 45,
        height: 45,
        borderWidth: 1,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: "rgba(255,255,255,0.1)",
    },
    icons: {
        width: 24,
        height: 24,
        tintColor: "#fff",
    },
    title: {
        fontSize: 35,
        fontWeight: 600,
        color: '#fff',
    },
    scrollContainer: {
        paddingLeft: 24,
        paddingTop: 12,
    },
    subTitle: {
        fontSize: 22,
        fontWeight: 600,
        color: "#fff",
    },
    cardContainer: {
        paddingTop: 18,
    }
})

