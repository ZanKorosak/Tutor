import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, TextInput, View, Text } from 'react-native';
import * as Yup from 'yup';
import firebase from 'firebase';

import Colors from '../utils/colors';
import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import IconButton from '../components/IconButton';
import FormErrorMessage from '../components/Forms/FormErrorMessage';
import { addToDB, registerWithEmail } from '../components/Firebase/firebase';
import useStatusBar from '../hooks/useStatusBar';
import Aux from '../hoc/Auxiliary'


const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .label('Name'),
  email: Yup.string()
    .required('Please enter a valid email')
    .email()
    .label('Email'),
  password: Yup.string()
    .required()
    .min(6, 'Password must have at least 6 characters')
    .label('Password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirm Password must match Password')
    .required('Confirm Password is required')
});

export default function RegisterScreen({ navigation }) {
  useStatusBar('light-content');

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState('eye');
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(
    true
  );
  const [registerError, setRegisterError] = useState('');

  function handlePasswordVisibility() {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  }

  function handleConfirmPasswordVisibility() {
    if (confirmPasswordIcon === 'eye') {
      setConfirmPasswordIcon('eye-off');
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    } else if (confirmPasswordIcon === 'eye-off') {
      setConfirmPasswordIcon('eye');
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    }
  }

  async function handleOnSignUp(values, actions) {
    const { email, password, name } = values;
    try {
      await registerWithEmail(email, password, name);
    } catch (error) {
      setRegisterError(error.message);
    }
  }

  return (
    //HEADER
    <Aux>
        <View style={{ flexDirection: 'row', backgroundColor: "#fff"}}>
        <TouchableOpacity style={styles.header}
        
        onPress={()=> {
            navigation.navigate('Login')
        }}>
        
        <Text style={{fontSize: 24}} >LOGIN</Text>
      </TouchableOpacity>
        <TouchableOpacity style={styles.headerSelected}>

          <Text style={{fontSize: 24, marginBottom:45}}>REGISTER</Text>
        </TouchableOpacity>

      </View>
    
    
    <SafeView style={styles.container}>
      <Form
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={validationSchema}
        onSubmit={values =>  {handleOnSignUp(values)
        }
        }
      >
        <FormField
          name="name"
          leftIcon="account"
          placeholder="Enter name"
          autoFocus={true}
        />
        <FormField
          name="email"
          leftIcon="email"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <FormField
          name="password"
          leftIcon="lock"
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={passwordVisibility}
          textContentType="password"
          rightIcon={rightIcon}
          handlePasswordVisibility={handlePasswordVisibility}
        />
        <FormField
          name="confirmPassword"
          leftIcon="lock"
          placeholder="Confirm password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={confirmPasswordVisibility}
          textContentType="password"
          rightIcon={confirmPasswordIcon}
          handlePasswordVisibility={handleConfirmPasswordVisibility}
        />
        <FormButton title={'Register'} />
        {<FormErrorMessage error={registerError} visible={true} />}
      </Form>
      <IconButton
        style={styles.backButton}
        iconName="keyboard-backspace"
        color={Colors.white}
        size={30}
        onPress={() => navigation.goBack()}
      />
    </SafeView>
  </Aux>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#042b37',
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  headerSelected:{
    width: 50, 
    justifyContent:"center",
    alignItems: 'center', 
    flex:1, 
    height:5,
    borderBottomColor: "#313b4e",
    borderBottomWidth: 5,
    marginTop: 45
  },
  header:{
    width: 50, 
    justifyContent:"center",
    alignItems: 'center', 
    flex:1, 
    height:50,
    
  },
});
