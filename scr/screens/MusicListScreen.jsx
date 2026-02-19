// import {
//     View,
//     Text,
//     StyleSheet,
//     Image,
//     TouchableOpacity,
//     FlatList,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from "@expo/vector-icons";
// import { StatusBar } from "expo-status-bar";
// import { useEffect, useState } from "react";
// import { formatTime, requestPermission } from "../utils/Helper";

// export default function MusicListScreen({ navigation }) {

//     const [songs, setSongs] = useState([]);

//     useEffect(() => {
//         requestPermission(setSongs);
//     }, []);

//     const renderItem = ({ item }) => (
//         <TouchableOpacity
//             style={styles.songItem}
//             onPress={() =>
//                 navigation.navigate("MusicScreen", {
//                     song: item,
//                     songs: songs,
//                 })
//             }
//         >
//             <Image
//                 source={require("../assets/img/avtar.jpeg")}
//                 style={styles.songImage}
//             />

//             <View style={styles.songInfo}>
//                 <Text style={styles.songTitle}>{item.filename}</Text>
//                 <Text style={styles.songduration}>
//                     {formatTime(item.duration)}
//                 </Text>
//             </View>

//             <View style={styles.rightSection}>
//                 <Ionicons name="play-circle" size={50} color="#A5B4FC" />
//             </View>
//         </TouchableOpacity>
//     );

//     return (
//         <SafeAreaView style={styles.safeArea} edges={["top"]}>
//             <StatusBar style="light" />

//             <FlatList
//                 data={songs}
//                 renderItem={renderItem}
//                 keyExtractor={(item) => item.id}
//                 showsVerticalScrollIndicator={false}
//                 contentContainerStyle={{ paddingBottom: 40 }}
//                 ListHeaderComponent={
//                     <View style={styles.header}>
//                         <Text style={styles.headerTitle}>My Songs</Text>
//                     </View>
//                 }
//             />
//         </SafeAreaView>
//     );
// }
// const styles = StyleSheet.create({
//     safeArea: {
//         flex: 1,
//         backgroundColor: "#0B0F1A",
//     },
//     header: {
//         paddingHorizontal: 24,
//         paddingTop: 18,
//     },
//     headerTitle: {
//         fontSize: 26,
//         fontWeight: "600",
//         color: "#fff",
//     },
//     songItem: {
//         flexDirection: "row",
//         alignItems: "center",
//         paddingHorizontal: 24,
//         paddingVertical: 14,
//     },
//     songImage: {
//         width: 60,
//         height: 60,
//         borderRadius: 14,
//     },
//     songInfo: {
//         flex: 1,
//         marginLeft: 16,
//     },
//     songTitle: {
//         fontSize: 16,
//         fontWeight: "600",
//         color: "#fff",
//     },
//     songduration: {
//         fontSize: 13,
//         color: "#aaa",
//         marginTop: 4,
//     },
//     rightSection: {
//         alignItems: "center",
//     },
// });



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
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
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
        fontSize: 28,
        fontWeight: "700",
        color: "#fff",
    },
});