import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileSettingsScreen from '../screens/ProfileSettingsScreen';
import ProfileSubjects from '../screens/ProfileSubjects';
import ProfileTutors from '../screens/ProfileTutors';
import Subject from '../screens/Subject';
import Tutor from '../screens/Tutor';
import SearchSubjects from '../screens/SearchSubjects';

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="NajdiTutorja" component={WelcomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={ProfileSettingsScreen} />
      <Stack.Screen name="Your Subjects" component={ProfileSubjects} />
      <Stack.Screen name="Your Tutors" component={ProfileTutors} />
      <Stack.Screen name="Subject" component={Subject} />
      <Stack.Screen name="Tutor" component={Tutor} />
      <Stack.Screen name="Find Subjects" component={SearchSubjects} />


    </Stack.Navigator>
  );
}
