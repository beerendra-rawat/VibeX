import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function AccountScreen({ navigation }) {

    const { user } = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
            <StatusBar style="light" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.btnWrap}>
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.title}>Account</Text>
            </View>
            <View style={styles.profileSection}>
                <Image source={{ uri: user?.photo }} style={styles.avatar} />
                <Text style={styles.name}>{user?.name}</Text>
                <Text style={styles.email}>{user?.email}</Text>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    header: {
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
        paddingHorizontal: 24,
        paddingVertical: 18,
    },
    title: {
        color: "#FFFFFF",
        fontSize: 22,
        fontWeight: "600",
    },
    btnWrap: {
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: "rgba(255,255,255,0.15)",
        alignItems: "center",
        justifyContent: "center",
    },
    profileSection: {
        alignItems: "center",
        marginTop: 40,
        marginBottom: 40,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: "#6366F1",
        marginBottom: 15,
    },
    name: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "600",
    },
    email: {
        color: "#94A3B8",
        fontSize: 14,
        marginTop: 4,
    },
});