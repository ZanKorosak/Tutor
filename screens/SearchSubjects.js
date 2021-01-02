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
import IconButton from '../components/IconButton';


export default class SettingsScreen  extends Component {

  constructor(props) {
    super(props);
    this.state = {
        subjects: [],
        data: [],
        filled:0
    };
    this.fillData();

  }

  fillData = async() => {
    await db.ref('/subjects').once('value').then((querySnapshot) => {
      this.setState({
        data: querySnapshot.val(),
      });
    });
    let tmpArr = [];
    for (let predm in this.state.data) {
        let currObj = this.state.data[predm]
        tmpArr.push({
            name:currObj.name,
            id:currObj.id,
        });
    }
    this.setState({
      subjects:tmpArr
    })



  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.container}>
            <FlatList 
                style={styles.container} 
                data={this.state.subjects}
                keyExtractor= {(item) => {
                    return item.id.toString();
                }}
                renderItem={({item}) => {
                    return (
                    <TouchableOpacity onPress={()=> {
                      if (item.name.includes("_")) {
                        let itemArr = item.name.split("_")
                        item.name = itemArr[0].concat(itemArr[1])
                      }
                        this.props.navigation.navigate("Subject", {SubjectName: item.name})}}>
                        <View style={styles.box}>
                        <Text style={styles.subject}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                    )
                }}/>
        </View>
        <IconButton
        style={styles.backButton}
        iconName="keyboard-backspace"
        color="#fff"
        size={30}
        onPress={() => this.props.navigation.goBack()}></IconButton>
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
    textAlign: 'center',
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
    paddingTop: 10,
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
                                            