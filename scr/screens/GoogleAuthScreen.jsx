import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function GoogleAuthScreen({ navigation }) {

    return (
        <ImageBackground
            source={require("../assets/img/onboard.png")}
            style={styles.background}
            resizeMode='contain'
        >
            <SafeAreaView style={styles.container} edges={['top']}>
                <StatusBar style="light" />
                <View style={styles.logoContainer}>
                    <Ionicons name="musical-notes" size={70} color="#5b1f81" />
                    <Text style={styles.appName}>VibeX Music</Text>
                </View>

                <TouchableOpacity
                    style={styles.googleBtn}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("Main")}
                >
                    <Image
                        source={require("../assets/img/google.png")}
                        style={styles.googleIcon}
                    />
                    <Text style={styles.googleText}>
                        Continue with Google
                    </Text>
                </TouchableOpacity>

            </SafeAreaView>

        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#5e95a9',
    },
    overlay: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 100,
    },
    logoContainer: {
        alignItems: "center",
    },
    appName: {
        fontSize: 32,
        fontWeight: 800,
        color: "#5b1f81",
        marginTop: 10,
        letterSpacing: 2,
    },
    googleBtn: {
        width: "85%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 18,
        paddingHorizontal: 25,
        borderRadius: 50,

        backgroundColor: "rgba(255,255,255,0.15)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.25)",

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 12,

        elevation: 10,
    },
    googleIcon: {
        width: 22,
        height: 22,
        marginRight: 12,
    },
    googleText: {
        fontSize: 17,
        fontWeight: "600",
        color: "#fff",
        letterSpacing: 0.5,
    },
});