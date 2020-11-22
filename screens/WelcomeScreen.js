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
      <Image source={require('../assets/flame.png')} style={styles.logo} />
      <Text style={styles.subtitle}>Najdi Tutorja</Text>
    </View>


      {!userIn ?
        <View style={styles.buttonContainer}>
          <AppButton title="Login or Register" onPress={() => navigation.navigate('Login')}/> 
          <AppButton
          title="Search for Tutors"
          color="secondary"
          onPress={() => navigation.navigate('Register')}
          />
        </View>
        :
        <View style={styles.buttonContainer}>
          <AppButton title="Profile" onPress={() => navigation.navigate('ProfileScreen')} />
          <AppButton title="Logout" onPress={() => { logout()}}></AppButton>
          <AppButton
            title="Search for Tutors"
            color="secondary"
            onPress={() => navigation.navigate('Register')}
            />
        </View> 
      }
      
  </View>
  )
  
}


  /*
    if (loggedIn) {
      return (
        <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/flame.png')} style={styles.logo} />
          <Text style={styles.subtitle}>Najdi Tutorja</Text>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton title="Profile" onPress={() => navigation.navigate('Profile')} />
          <AppButton title="Logout" onPress={() => { logout()
          } }/>
          <AppButton
            title="Search for Tutors"
            color="secondary"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
      </View>
      )
    }
    else {
      return ( 
        <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/flame.png')} style={styles.logo} />
          <Text style={styles.subtitle}>Najdi Tutorja</Text>
        </View>
        <View style={styles.buttonContainer}>
          <AppButton title="Login or Register" onPress={() => navigation.navigate('Login')} />
          <AppButton
            title="Search for Tutors"
            color="secondary"
            onPress={() => navigation.navigate('Register')}
            
          />
        </View>
      </View>
      )
    }
  }
  */


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: Colors.mediumGrey
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
