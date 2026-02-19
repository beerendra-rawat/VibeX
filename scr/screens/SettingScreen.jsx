import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const settingsData = [
    {
        id: 1,
        title: "Account",
        icon: "person-outline",
        screen: "Account",
    },
    {
        id: 2,
        title: "Privacy",
        icon: "lock-closed-outline",
        screen: "Privacy",
    },
    {
        id: 3,
        title: "Help & Support",
        icon: "help-circle-outline",
        screen: "HelpAndSupport",
    },
    {
        id: 4,
        title: "About",
        icon: "information-circle-outline",
        screen: "AboutApp",
    },
];

export default function SettingScreen({ navigation }) {
    const [userInfo, setUserInfo] = useState("")


    const { user } = useContext(AuthContext)

    const signOut = async () => {
        try {
            await GoogleSignin.signOut()
            console.log("Successfully signed out from Google.")
            setUserInfo(null)
            navigation.navigate("GoogleAuthScreen")
        }
        catch (error) {
            console.error("error occurred during sign-out: ", error)
        }
        finally {
            console.log("sign-out process completed.")
        }
    }
    return (
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
            <StatusBar style="light" />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 60 }}
            >
                <View style={styles.header}>
                    <Text style={styles.screenTitle}>Settings</Text>
                </View>

                <View style={styles.userCard}>
                    <Image source={{ uri: user?.photo }} style={styles.avatar} />
                    <View>
                        <Text style={styles.userName}>{user.name}</Text>
                        <Text style={styles.userEmail}>{user.email}</Text>
                    </View>
                </View>

                <View style={styles.listContainer}>
                    {settingsData.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.listItem}
                            onPress={() => navigation.navigate(item.screen)}>
                            <View style={styles.leftRow}>
                                <Ionicons name={item.icon} size={20} color="#A5B4FC" />
                                <Text style={styles.listText}>{item.title}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#888" />
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.logoutBtn}
                    onPress={signOut}>
                    <Ionicons name="log-out-outline" size={24} color="#fff" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

            </ScrollView>
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
    screenTitle: {
        fontSize: 28,
        fontWeight: "600",
        color: "#fff",
    },
    userCard: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 24,
        marginTop: 30,
        padding: 20,
        backgroundColor: "rgba(255,255,255,0.06)",
        borderRadius: 22,
    },
    avatar: {
        width: 75,
        height: 75,
        borderRadius: 50,
        marginRight: 18,
    },
    userName: {
        fontSize: 20,
        fontWeight: "600",
        color: "#fff",
    },

    userEmail: {
        fontSize: 14,
        color: "#aaa",
        marginTop: 6,
    },
    listContainer: {
        marginTop: 35,
        marginHorizontal: 24,
        backgroundColor: "rgba(255,255,255,0.04)",
        borderRadius: 20,
        paddingVertical: 10,
    },
    listItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 18,
        paddingVertical: 18,
    },
    leftRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
    },
    listText: {
        fontSize: 16,
        color: "#fff",
    },
    logoutBtn: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        marginHorizontal: 24,
        marginTop: 30,
        marginBottom: 40,
        paddingVertical: 18,
        borderRadius: 18,
        backgroundColor: "#EF4444",
    },
    logoutText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
    },
});