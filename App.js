import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { AuthProvider } from "./scr/context/AuthContext";
import { FavoriteProvider } from "./scr/context/FavoriteContext";
import { MusicProvider } from "./scr/context/MusicContext";
import StackNavigator from "./scr/navigations/StackNavigator";

export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "349500459690-id6rht9d5a1hodim2pvrpch4ipqng644.apps.googleusercontent.com",
      scopes: ["profile", "email"],
      offlineAccess: true,
    });
  }, []);

  return (
    <AuthProvider>
      <MusicProvider>
        <FavoriteProvider>
          <NavigationContainer>
            <StatusBar style="light" />
            <StackNavigator />
          </NavigationContainer>
        </FavoriteProvider>
      </MusicProvider>
    </AuthProvider>
  );
}
