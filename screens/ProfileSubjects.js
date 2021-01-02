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
  Button,
} from 'react-native';
import { db, auth} from '../components/Firebase/firebase';
import AppButton from '../components/AppButton';

export default class SettingsScreen  extends Component {

  constructor(props) {
    super(props);
    this.state = {
        user: [],
        data: [],
        filled:0
    };
    this.fillData();

  }

  fillData = async() => {
    await db.ref('/users').once('value').then((querySnapshot) => {
      this.setState({
        user: querySnapshot.val()[auth.currentUser.uid],
      });
    });

    let tempArr = [];
    if (!Array.isArray(this.state.user)) {
      let subs = this.state.user.subjects.split(",");
      for (let i = 0 ; i < subs.length; i++) {
          tempArr.push({
              id:i,
              name: subs[i],
              navigatePath: subs[i]
          })
      }
    }
    this.setState({
      data:tempArr
    })
    this.setState({
      filled:1
    })
  
  }
  writeUserData() {
    // A post entry.
    let uid = auth.currentUser.uid;
    var postData = {
      email: this.state.user.email,
      liked: this.state.user.liked,
      name: this.state.user.name,
      profile_picture: this.state.user.profile_picture,
      tutor: this.state.user.tutor,
    };
    var updates = {};
    updates['/users/' + uid] = postData;
    this.state.user = db.ref().update(updates)
    this.props.navigation.navigate('Welcome');

  }




  render() {
    let rend;
    if(this.state.data.length && this.state.filled) {
      rend = 
        <View style={styles.container}>
            <FlatList 
                style={styles.container} 
                enableEmptySections={true}
                data={this.state.data}
                keyExtractor= {(item) => {
                    return item.id.toString();
                }}
                renderItem={({item}) => {
                    return (
                    <TouchableOpacity onPress={()=> {
                        //this.props.navigation.navigate(item.navigatePath)}}>
                        this.props.navigation.navigate("Subject", {SubjectName: item.name})}}>
                        <View style={styles.box} >
                        <Text style={styles.subject}>{item.name}</Text>
  
                        </View>
                    </TouchableOpacity>
                    )
                }}/>
        </View>
    }
    else {
      rend = <View style={styles.buttonContainer}>
                <Text style={styles.subject}>You have no favourite subjects</Text>
                <AppButton 
                  
                  title="Press to find subjects" 
                  onPress={() => this.props.navigation.navigate('SearchSubjects')}
                /> 
            </View>
      }
    return (
      <View style={styles.container}>
        <View style={styles.box} >
            <Text style={styles.text}>Your favourite subjects </Text>
        </View>
        {rend}
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
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  }, 
  text:{ 
    fontWeight: 'bold',
    color:"#009B72",
    fontSize:22,
    alignSelf:'center',
    marginLeft:45,
    paddingBottom:5,
  }, 
  inputContainer: {
    paddingTop: 15
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20
  },  
  container: {
    flex: 1,
    backgroundColor: '#042b37',
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },
  header:{
    backgroundColor: "#EE82EE",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  icon:{
    width: 40,
    height: 40,
  },
  subject:{
    fontSize:18,
    color:"#F26430",
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',

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
    padding:10,
    marginBottom:2,
    backgroundColor: '#1a1c1e',
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
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 60,
    width: '100%'
  }
});
                                            