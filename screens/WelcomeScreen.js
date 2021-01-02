import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import AppButton from '../components/AppButton';
import Colors from '../utils/colors';
import useStatusBar from '../hooks/useStatusBar';
import { loggedIn, logout } from '../components/Firebase/firebase'

export default function WelcomeScreen({ navigation }) {
  useStatusBar('light-content');

  let userIn = loggedIn();
  
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/tutor.png')} style={styles.logo} />
        <Text style={styles.subtitle}>Najdi Tutorja</Text>
      </View>


      {!userIn ?
        <View style={styles.buttonContainer}>
          <AppButton 
          title="Login or Register" 
          onPress={() => navigation.navigate('Login')}
          /> 
          <AppButton
          title="Search for Subjects"
          color="secondary"
          onPress={() => navigation.navigate('Find Subjects')}
          />
        </View>
        :
        <View style={styles.buttonContainer}>
          <AppButton 
          title="Profile" 
          color="primary"
          onPress={() => navigation.navigate('Profile')} 
          />
          <AppButton
            title="Search for Subjects"
            color="secondary"
            onPress={() => navigation.navigate('Find Subjects')}
          />
          <AppButton 
            title="Logout" 
            color="red"
            onPress={() => { logout()}
            }>
          </AppButton>

        </View> 
      }
      
  </View>
  )
  
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: "#042b37",
  },
  logoContainer: {
    position: 'absolute',
    top: 60,
    alignItems: 'center'
  },
  logo: {
    width: 125,
    height: 125
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    paddingVertical: 20,
    color: Colors.primary
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 60,
    width: '100%'
  }
});
