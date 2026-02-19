// import {
//     ScrollView,
//     TouchableOpacity,
//     View,
//     Text,
//     StyleSheet,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// const tab = [
//     {
//         id: 1,
//         label: "All",
//         actionType: "all",
//         clickable: true,
//     },
//     {
//         id: 2,
//         label: "New Release",
//         actionType: "newrelease",
//         clickable: true,
//     },
// ];

// export default function ScrollTab() {
//     const navigation = useNavigation();

//     return (
//         <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={styles.tabContainer}
//         >
//             {tab.map((item) => (
//                 <TouchableOpacity
//                     key={item.id}
//                     onPress={() =>
//                         item.clickable && navigation.navigate(item.actionType)
//                     }
//                     activeOpacity={0.9}
//                     style={styles.tabTouchable}
//                 >
//                     <View style={styles.tabWrap}>
//                         <Text style={styles.tabText}>{item.label}</Text>
//                     </View>
//                 </TouchableOpacity>
//             ))}
//         </ScrollView>
//     );
// }


// const styles = StyleSheet.create({
//     tabContainer: {
//         flexDirection: "row",
//     },
//     tabTouchable: {
//         marginRight: 12,
//     },
//     tabWrap: {
//         paddingVertical: 10,
//         paddingHorizontal: 18,
//         borderRadius: 22,
//         backgroundColor: "#D9D9D9",
//         borderWidth: 1,
//         borderColor: "#E3EAF5",
//         elevation: 5,
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 3 },
//         shadowOpacity: 0.15,
//         shadowRadius: 4,
//     },
//     tabText: {
//         fontSize: 14,
//         fontWeight: "600",
//         color: "#2C3E50",
//         letterSpacing: 0.3,
//     },
//     activeTab: {
//         backgroundColor: "#A855F7",
//     },

//     activeText: {
//         color: "#fff",
//     },
// });





import {
    ScrollView,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
} from "react-native";

const tabs = [
    { id: 1, label: "All", actionType: "all" },
    { id: 2, label: "New Release", actionType: "newrelease" },
];

export default function ScrollTab({ activeTab, onTabPress }) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabContainer}
        >
            {tabs.map((item) => {
                const isActive = activeTab === item.actionType;

                return (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => onTabPress(item.actionType)}
                        activeOpacity={0.9}
                        style={styles.tabTouchable}
                    >
                        <View
                            style={[
                                styles.tabWrap,
                                isActive && styles.activeTab,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    isActive && styles.activeText,
                                ]}
                            >
                                {item.label}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: "row",
    },

    tabTouchable: {
        marginRight: 12,
    },

    tabWrap: {
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 22,
        backgroundColor: "#111",
        borderWidth: 1,
        borderColor: "#222",
    },

    tabText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#aaa",
    },

    activeTab: {
        backgroundColor: "#A855F7",
        borderColor: "#A855F7",
    },

    activeText: {
        color: "#fff",
    },
});