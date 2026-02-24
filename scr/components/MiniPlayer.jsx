import { useContext, useRef } from "react";
import {
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Animated,
    View
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MusicContext } from "../context/MusicContext";
import { useNavigation } from "@react-navigation/native";

export default function MiniPlayer() {

    const { currentSong, isPlaying, togglePlayPause, stopMusic } = useContext(MusicContext);
    const navigation = useNavigation();
    const slideAnim = useRef(new Animated.Value(0)).current;

    if (!currentSong) return null;

    const handleClose = async () => {
        Animated.timing(slideAnim, {
            toValue: 100,
            duration: 300,
            useNativeDriver: true,
        }).start(async () => {
            await stopMusic();
            slideAnim.setValue(0);
        });
    };

    return (
        <Animated.View
            style={[
                styles.container,
                { transform: [{ translateY: slideAnim }] }
            ]}
        >
            <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => navigation.navigate("MusicScreen")}
            >
                <Text style={styles.text} numberOfLines={1}>
                    {currentSong.filename}
                </Text>
            </TouchableOpacity>

            <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>

                <TouchableOpacity onPress={togglePlayPause}>
                    <Image
                        source={
                            isPlaying
                                ? require("../assets/img/pause.png")
                                : require("../assets/img/play-3.png")
                        }
                        style={{ width: 28, height: 28, tintColor: "#fff" }}
                    />
                </TouchableOpacity>

                {!isPlaying && (
                    <TouchableOpacity onPress={handleClose}>
                        <Ionicons name="close" size={24} color="#fff" />
                    </TouchableOpacity>
                )}

            </View>
        </Animated.View>
    );
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 60,
        backgroundColor: '#121212',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: "#A855F7",
        borderRadius: 12,
    },
    text: {
        color: '#FFFFFF',
        flex: 1,
        paddingTop: 18,

    }
});