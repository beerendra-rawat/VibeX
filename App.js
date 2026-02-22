import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './scr/navigations/BottomTab';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, AuthContext } from './scr/context/AuthContext';
import { FavoriteProvider } from './scr/context/FavoriteContext';
import MusicScreen from './scr/screens/MusicScreen';
import GoogleAuthScreen from './scr/screens/GoogleAuthScreen';
import PrivacyScreen from './scr/screens/PrivacyScreen';
import HelpAndSupportScreen from './scr/screens/HelpAndSupportScreen';
import AboutAppScreen from './scr/screens/AboutAppScreen';
import AccountScreen from './scr/screens/AccountScreen';
import SearchScreen from './scr/screens/SearchScreen';
import { MusicProvider } from './scr/context/MusicContext';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useContext, useEffect } from 'react';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Main" component={BottomTab} />
          <Stack.Screen name='MusicScreen' component={MusicScreen} />
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="Privacy" component={PrivacyScreen} />
          <Stack.Screen name="HelpAndSupport" component={HelpAndSupportScreen} />
          <Stack.Screen name="AboutApp" component={AboutAppScreen} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
        </>
      ) : (
        <Stack.Screen name='GoogleAuthScreen' component={GoogleAuthScreen} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {

  useEffect(() => {
    GoogleSignin.configure({
      "webClientId": "349500459690-id6rht9d5a1hodim2pvrpch4ipqng644.apps.googleusercontent.com",
      scopes: ["profile", "email"],
      offlineAccess: true,
    });
  }, [])
  return (
    <AuthProvider>
      <MusicProvider>
        <FavoriteProvider>
          <NavigationContainer>
            <StatusBar style='light' />
            <AppNavigator />
          </NavigationContainer>
        </FavoriteProvider>
      </MusicProvider>
    </AuthProvider>
  );
}