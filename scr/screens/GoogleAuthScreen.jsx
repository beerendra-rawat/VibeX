import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { GoogleSignin, isErrorWithCode, statusCodes, } from '@react-native-google-signin/google-signin';
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function GoogleAuthScreen() {
    const { setUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)



    const handleGoogleSignIn = async () => {
        console.log("Google sign-in process started ")
        try {
            console.log("Checking for google play services available? ")
            setLoading(true);
            await GoogleSignin.hasPlayServices();
            console.log("yes, google play services available! ")

            console.log("Initiating google sing-in")
            const response = await GoogleSignin.signIn();
            console.log("Received response from google sign-in:", response);

            if (response.type === "success") {
                console.log("user successfully signed in.")

                const user = response.data.user
                console.log("User Info:-  ", user)
                setUser(user);
                console.log("user state update successfully")
            }
            else {
                console.log("sing-in was cancelled by the user")
            }

        } catch (error) {
            console.log("an error occurred during google sign-in: ", error)

            if (isErrorWithCode(error)) {
                console.log("handling know google sign-in error code...")

                switch (error.code) {
                    case statusCodes.IN_PROGRESS:
                        console.log("sign-in operation already in progress.")
                        break;

                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        console.error("google play services not available or outdated.")
                        break;

                    default:
                        console.error("some other google sign-in error occurred")
                }
            }
            else {
                console.error("error not related to google sign-in: ", error)
            }
        }
        console.log("google sign-in process completed")
        setLoading(false);
    };

    return (
        <ImageBackground
            source={require("../assets/img/onboard.png")}
            style={styles.background}
            resizeMode='contain'
        >
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <StatusBar style="light" />

                <TouchableOpacity style={styles.skipWrap}
                // onPress={() => navigation.navigate("Main")}
                >
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>

                <View style={styles.logoContainer}>
                    <Ionicons name="musical-notes" size={70} color="#5b1f81" />
                    <Text style={styles.appName}>VibeX Music</Text>
                </View>

                <TouchableOpacity
                    style={styles.googleBtn}
                    activeOpacity={0.8}
                    // onPress={() => navigation.navigate("Main")}
                    onPress={handleGoogleSignIn}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="large" color="#fff" />
                    ) : (
                        <>
                            <Image
                                source={require("../assets/img/google.png")}
                                style={styles.googleIcon}
                            />
                            <Text style={styles.googleText}>
                                Continue with Google
                            </Text>
                        </>
                    )}
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
    safeArea: {
        flex: 1,
    },
    overlay: {
        flex: 1,
    },
    skipWrap: {
        margin: 24,
        alignSelf: "flex-end",
        borderWidth: 1,
        borderRadius: 12,
        borderColor: "#fff",
        width: "contain",
        padding: 12,
    },
    skipText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: 600,
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
        marginTop: 350,
        width: "85%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
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
