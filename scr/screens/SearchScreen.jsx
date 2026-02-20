import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import LoadSongs from "../components/LoadSongs";
import { requestPermission } from "../utils/Helper";

export default function SearchScreen({ navigation }) {
    const inputRef = useRef(null);
    const [songs, setSongs] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredSongs, setFilteredSongs] = useState([]);

    useEffect(() => {
        requestPermission(setSongs);
    }, []);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        if (search.trim() === "") {
            setFilteredSongs(songs);
        } else {
            const filtered = songs.filter((song) =>
                song.filename
                    ?.toLowerCase()
                    .includes(search.toLowerCase())
            );
            setFilteredSongs(filtered);
        }
    }, [search, songs]);

    return (
        <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
            <StatusBar style="light" />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backBtn}
                            onPress={() => navigation.goBack()}
                        >
                            <Ionicons name="arrow-back" size={24} color="#fff" />
                        </TouchableOpacity>

                        <Text style={styles.headerTitle}>Search</Text>
                    </View>
                    <View style={styles.searchContainer}>
                        <Ionicons name="search" size={20} color="#aaa" />
                        <TextInput
                            ref={inputRef}
                            placeholder="Search songs..."
                            placeholderTextColor="#666"
                            value={search}
                            onChangeText={setSearch}
                            style={styles.input}
                            returnKeyType="search"
                        />
                        {search.length > 0 && (
                            <TouchableOpacity onPress={() => setSearch("")}>
                                <Ionicons name="close-circle" size={20} color="#aaa" />
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={{ flex: 1 }}>
                        {filteredSongs.length === 0 ? (
                            <Text style={styles.emptyText}>No songs found</Text>
                        ) : (
                            <LoadSongs
                                songs={filteredSongs}
                                navigation={navigation}
                            />
                        )}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#000",
    },
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 24,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 15,
    },
    backBtn: {
        marginRight: 15,
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: "rgba(255,255,255,0.15)",
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "600",
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#111",
        borderRadius: 12,
        paddingHorizontal: 24,
        marginHorizontal: 24,
        height: 50,
        marginBottom: 15,
    },
    input: {
        flex: 1,
        color: "#fff",
        marginLeft: 10,
        fontSize: 16,
    },
    emptyText: {
        color: "#777",
        textAlign: "center",
        marginTop: 30,
    },
});