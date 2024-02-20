/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import HomeScreen from 'app/screen/Home/HomeScreen';
import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import LoginScreen from './app/screen/Login/LoginScreen';
import HomeScreen from './app/screen/Home/HomeScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Auth0Provider} from 'react-native-auth0';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    console.log('umad poshte navigation');
  }, []);
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Auth0Provider
        domain={'shayanfarshad.us.auth0.com'}
        clientId={'o4pZrpZ4KzcyN2VIDAp1AYQDMytN6yZZ'}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Auth0Provider>
    </SafeAreaProvider>
  );
}

export default App;
