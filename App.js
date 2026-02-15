import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './scr/navigations/BottomTab';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MusicScreen from './scr/screens/MusicScreen';
import GoogleAuthScreen from './scr/screens/GoogleAuthScreen';

const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='light' />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='GoogleAuthScreen' component={GoogleAuthScreen} />
        <Stack.Screen name="Main" component={BottomTab} />
        <Stack.Screen name='MusicScreen' component={MusicScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}