import {
    View,
    Text,
    StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { requestPermission } from "../utils/Helper";
import LoadSong from "../components/LoadSongs";

export default function MusicListScreen({ navigation }) {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        requestPermission(setSongs);
    }, []);

    return (
        <SafeAreaView style={styles.safeArea} edges={["top", 'bottom']}>
            <StatusBar style="light" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Songs</Text>
            </View>
            <LoadSong songs={songs} navigation={navigation} />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#000",
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 18,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: "600",
        color: "#fff",
    },
});