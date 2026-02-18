import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './scr/navigations/BottomTab';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FavoriteProvider } from './scr/context/FavoriteContext';
import MusicScreen from './scr/screens/MusicScreen';
import GoogleAuthScreen from './scr/screens/GoogleAuthScreen';
import PrivacyScreen from './scr/screens/PrivacyScreen';
import HelpAndSupportScreen from './scr/screens/HelpAndSupportScreen';
import AboutAppScreen from './scr/screens/AboutAppScreen';
import AccountScreen from './scr/screens/AccountScreen';

const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <FavoriteProvider>
      <NavigationContainer>
        <StatusBar style='light' />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='GoogleAuthScreen' component={GoogleAuthScreen} />
          <Stack.Screen name="Main" component={BottomTab} />
          <Stack.Screen name='MusicScreen' component={MusicScreen} />
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="Privacy" component={PrivacyScreen} />
          <Stack.Screen name="HelpAndSupport" component={HelpAndSupportScreen} />
          <Stack.Screen name="AboutApp" component={AboutAppScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </FavoriteProvider>
  );
}