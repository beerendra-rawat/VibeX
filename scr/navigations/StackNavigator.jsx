import { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";

import BottomTab from "./BottomTab";
import MusicScreen from "../screens/MusicScreen";
import GoogleAuthScreen from "../screens/GoogleAuthScreen";
import PrivacyScreen from "../screens/PrivacyScreen";
import HelpAndSupportScreen from "../screens/HelpAndSupportScreen";
import AboutAppScreen from "../screens/AboutAppScreen";
import AccountScreen from "../screens/AccountScreen";
import SearchScreen from "../screens/SearchScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    const { user, loading } = useContext(AuthContext);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
                <>
                    <Stack.Screen name="Main" component={BottomTab} />
                    <Stack.Screen name="MusicScreen" component={MusicScreen} />
                    <Stack.Screen name="Account" component={AccountScreen} />
                    <Stack.Screen name="Privacy" component={PrivacyScreen} />
                    <Stack.Screen name="HelpAndSupport" component={HelpAndSupportScreen} />
                    <Stack.Screen name="AboutApp" component={AboutAppScreen} />
                    <Stack.Screen name="SearchScreen" component={SearchScreen} />
                </>
            ) : (
                <Stack.Screen name="GoogleAuthScreen" component={GoogleAuthScreen} />
            )}
        </Stack.Navigator>
    );
};

export default StackNavigator;