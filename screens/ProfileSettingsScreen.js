import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Button
} from 'react-native';
import { db, auth} from '../components/Firebase/firebase';

export default class SettingsScreen  extends Component {

  constructor(props) {
    super(props);
    this.state = {
        user: [],
    };
    db.ref('/users').once('value').then((querySnapshot) => {
      this.setState({
        user: querySnapshot.val()[auth.currentUser.uid],
      });
    });
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePicChange = this.handlePicChange.bind(this);
    this.writeUserData = this.writeUserData.bind(this);
  }


  handleNameChange(name) {
    this.state.user.name = name;
  }

  handleEmailChange(email) {
    this.state.user.email = email;
  }

  handlePicChange(profile_picture) {
    this.state.user.profile_picture = profile_picture;
  }

  writeUserData() {
    // A post entry.
    let uid = auth.currentUser.uid;
    var postData = {
      email: this.state.user.email,
      liked: this.state.user.liked,
      name: this.state.user.name,
      profile_picture: this.state.user.profile_picture,
      subjects: this.state.user.subjects,
      isTutor: this.state.user.isTutor,
      likedTutors: this.state.user.likedTutors,
    };
  
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/users/' + uid] = postData;
  
    this.state.user = db.ref().update(updates)
    this.props.navigation.navigate('NajdiTutorja');

  }


  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.inputContainer}>
          <Text style={styles.text}>Your Profile Name</Text>
          <TextInput
            style={styles.textInput}
            placeholder={this.state.user.name}
            maxLength={20}
            onChangeText={this.handleNameChange}
          />
          <Text style={styles.text}>Your Profile Picture</Text>
          <TextInput
            style={styles.textInput}
            placeholder={this.state.user.profile_picture}
            onChangeText={this.handlePicChange}
          />
        <View style={styles.inputContainer}>
          <Button
            title="Save"
            onPress={this.writeUserData}
          />
        </View>
    </View>
</ScrollView>
      </View>
    );
  }
}
    


const styles = StyleSheet.create({
  saveButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5
  },
  text:{
    color:"#009B72"
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  },  
  inputContainer: {
    paddingTop: 15
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    color:"#F26430",
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20
  },  
  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: '#042b37',
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  header:{
    backgroundColor: "#EE82EE",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#FF6347",
    marginBottom:10,
  },
  icon:{
    width: 40,
    height: 40,
  },
  title:{
    fontSize:18,
    color:"#EE82EE",
    marginLeft:4
  },
  btn:{
    marginLeft: 'auto',
     width: 40,
    height: 40,
  },
  body: {
    backgroundColor :"#E6E6FA",
  },
  box: {
    padding:5,
    marginBottom:2,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:1,
      width:-2
    },
    elevation:2
  },
  username:{
    color: "#20B2AA",
    fontSize:22,
    alignSelf:'center',
    marginLeft:10
  }
});
                                            