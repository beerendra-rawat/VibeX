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
import * as MediaLibrary from 'expo-media-library';
import { useEffect, useState } from "react";
import { formatTime } from "../utils/Helper";

export default function MusicListScreen({ navigation }) {

    const [songs, setSongs] = useState([])

    useEffect(() => {
        requestPermisssion()
    }, [])

    const requestPermisssion = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync()
        console.log("permissions response data: ", status)

        if (status === 'granted') {
            loadSongs()
            console.log("Songs load successfully")
        }
        else {
            alert("Permission required to load songs")
        }
    }

    const loadSongs = async () => {
        const media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
            first: 100,
        })
        setSongs(media.assets)
        console.log("Media Assest: ", media.assets)
    }


    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.songItem}
            onPress={() => navigation.navigate("MusicScreen", { song: item, songs: songs, })} >
            <Image source={require("../assets/img/avtar.jpeg")} style={styles.songImage} />

            <View style={styles.songInfo}>
                <Text style={styles.songTitle}>{item.filename}</Text>
                <Text style={styles.songduration}>{formatTime(item.duration)}</Text>
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
                data={songs}
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
    songduration: {
        fontSize: 13,
        color: "#aaa",
        marginTop: 4,
    },
    rightSection: {
        alignItems: "center",
    },
});