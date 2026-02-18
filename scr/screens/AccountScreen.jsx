import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const AccountScreen = ({ navigation, route }) => {
    const { user } = route.params || {};

    // Dummy fallback data
    const profile = {
        name: user?.name || "Beerendra Rawat",
        email: user?.email || "beerendra@example.com",
        photo:
            user?.photo ||
            "https://i.pravatar.cc/300",
        totalSongs: 128,
        totalPlaylists: 12,
    };

    return (
        <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
            <StatusBar style="light" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>

                <Text style={styles.title}>My Profile</Text>

                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <Image source={{ uri: profile.photo }} style={styles.avatar} />

                    <Text style={styles.name}>{profile.name}</Text>
                    <Text style={styles.email}>{profile.email}</Text>
                </View>

                {/* Stats Section */}
                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Ionicons name="musical-notes-outline" size={22} color="#6366F1" />
                        <Text style={styles.statNumber}>{profile.totalSongs}</Text>
                        <Text style={styles.statLabel}>Total Songs</Text>
                    </View>

                    <View style={styles.statBox}>
                        <Ionicons name="list-outline" size={22} color="#22D3EE" />
                        <Text style={styles.statNumber}>{profile.totalPlaylists}</Text>
                        <Text style={styles.statLabel}>Playlists</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AccountScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0F172A",
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
    },

    title: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "600",
    },

    content: {
        paddingHorizontal: 20,
        paddingBottom: 30,
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
        borderWidth: 3,
        borderColor: "#6366F1",
        marginBottom: 15,
    },

    name: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "600",
    },

    email: {
        color: "#94A3B8",
        fontSize: 14,
        marginTop: 4,
    },

    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    statBox: {
        flex: 1,
        backgroundColor: "#1E293B",
        marginHorizontal: 5,
        paddingVertical: 20,
        borderRadius: 18,
        alignItems: "center",
    },

    statNumber: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 8,
    },

    statLabel: {
        color: "#94A3B8",
        fontSize: 13,
        marginTop: 4,
    },
});