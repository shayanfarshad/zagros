import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useAuth0} from 'react-native-auth0';
import {saveString} from '../../utils/storage';

const LoginScreen: React.FC = () => {
  const nav = useNavigation();
  const {authorize, user, clearSession, isLoading} = useAuth0();

  const onLogin = async () => {
    try {
      await authorize()
        .then(res => {
          if (res?.accessToken) {
            saveString('accessToken', res.accessToken);
            if (res?.refreshToken) {
              saveString('refreshToken', res.refreshToken);
            }
          }
          if (user && !isLoading) {
            nav.navigate('Home' as never);
          }
        })
        .catch(err => {
          console.log({err});
        });
    } catch (e) {
      console.log(e);
    }
  };

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log('Log out cancelled');
    }
  };

  const loggedIn = user !== undefined && user !== null;

  const goHomeScreen = () => {
    nav.navigate('Home' as never);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={{marginVertical: 20}} />
      ) : (
        <>
          <Text style={styles.title}>Login</Text>
          {loggedIn && <Text>You are logged in as {user.name}</Text>}
          {loggedIn && (
            <TouchableOpacity style={styles.button} onPress={goHomeScreen}>
              <Text style={styles.buttonText}>GO TO HOME</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={loggedIn ? onLogout : onLogin}>
            <Text style={styles.buttonText}>
              {loggedIn ? 'Log Out' : 'Log In'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
