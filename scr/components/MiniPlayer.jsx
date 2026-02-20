import { useContext } from "react";
import {
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from "react-native";
import { MusicContext } from "../context/MusicContext";
import { useNavigation } from "@react-navigation/native";

export default function MiniPlayer() {
    const { currentSong, isPlaying, togglePlayPause } = useContext(MusicContext);
    const navigation = useNavigation();

    if (!currentSong) return null;

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate("MusicScreen")}
        >
            <Text style={styles.text}>{currentSong.filename}</Text>
            <TouchableOpacity onPress={togglePlayPause}>
                <Image
                    source={isPlaying ? require("../assets/img/pause.png")
                        : require("../assets/img/play-3.png")
                    }
                    style={{ width: 30, height: 30, tintColor: '#fff' }}
                />
            </TouchableOpacity>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 60,
        backgroundColor: '#111',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: '#333'
    },
    text: {
        color: '#fff',
        flex: 1,
    }
});