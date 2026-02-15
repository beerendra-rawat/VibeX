import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import HomeScreen from "../screens/HomeScreen";
import SettingScreen from "../screens/SettingScreen";
import FavoriteSong from "../screens/FavoriteSong";
import MusicListScreen from "../screens/MusicListScreen";

const Tab = createBottomTabNavigator();

export default function BottomTab() {
    const insets = useSafeAreaInsets();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,

                tabBarStyle: {
                    position: "absolute",
                    justifyContent: 'center',
                    left: 20,
                    right: 20,
                    bottom: insets.bottom + 10,
                    height: 65,
                    borderRadius: 35,
                    backgroundColor: "rgba(255,255,255,0.08)",
                    borderWidth: 1,
                    borderColor: "#C6F36A",
                    paddingBottom: Platform.OS === "ios" ? insets.bottom : 8,
                },

                tabBarItemStyle: {
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 10,
                },

                tabBarIcon: ({ focused }) => {
                    let iconName;

                    if (route.name === "Home") iconName = "home-outline";
                    else if (route.name === "Music") iconName = "musical-notes-outline";
                    else if (route.name === "FavoriteSong") iconName = "heart-outline";
                    else if (route.name === "Settings") iconName = "settings-outline";

                    return (
                        <View
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: focused ? "#C6F36A" : "transparent",
                                shadowColor: "#C6F36A",
                                shadowOpacity: focused ? 0.8 : 0,
                                shadowRadius: 15,
                                elevation: focused ? 10 : 0,
                            }}
                        >
                            <Ionicons
                                name={iconName}
                                size={22}
                                color={focused ? "#000" : "#fff"}
                            />
                        </View>
                    );
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Music" component={MusicListScreen} />
            <Tab.Screen name="FavoriteSong" component={FavoriteSong} />
            <Tab.Screen name="Settings" component={SettingScreen} />
        </Tab.Navigator>
    );
}