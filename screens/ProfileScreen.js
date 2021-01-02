import React, { Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Button,
  Alert,
  
} from 'react-native';
import { db, auth, logout} from '../components/Firebase/firebase';
import Colors from '../utils/colors';


export default class ProfileView extends Component {

  constructor(props) {
    super(props);
    this.state = {
        user: [],
        data: [
            {id:1, image: "https://img.icons8.com/color/70/000000/heart.png",     title:"Your tutors", navigatePath: "Your Tutors"},
            {id:2, image: "https://img.icons8.com/color/70/000000/book.png",     title:"Your subjects", navigatePath: "Your Subjects"},
            {id:3, image: "https://img.icons8.com/color/70/000000/checkmark.png", title:"Terms and conditions", navigatePath: "Terms"},
            {id:4, image: "https://img.icons8.com/color/70/000000/gear.png",        title:"Settings", navigatePath: "Settings"},
            {id:5, image: "https://img.icons8.com/color/70/000000/shutdown.png",         title:"Log out", navigatePath: "Logout" },
      ],
    };
    db.ref('/users').once('value').then((querySnapshot) => {
      this.setState({
        user: querySnapshot.val()[auth.currentUser.uid],
      });
    });
    this.msg = "If you create an account on the Website, you are responsible for maintaining the security of your account, and you are fully responsible for all activities that occur under the account and any other actions taken in connection with the account. You agree to provide and maintain accurate, current and complete information, including your contact information for notices and other communications from us and your payment information. You may not use false or misleading information in connection to your account, or trade on the name or reputation of others, and Usabilla may change or remove any information that it considers inappropriate or unlawful, or otherwise likely to expose Usabilla to claims of third parties. You agree that we may take steps to verify the accuracy of information you have provided to us."
  }

  createTwoButtonAlert() {
    alert(
      this.msg,
      "My Alert Msg",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
      );
  }

  startRefreshing() {
    setTimeout(() => {
    }, 1500);
  }

  componentDidMount(){
    db.ref('/users').once('value').then((querySnapshot) => {
      this.setState({
        user: querySnapshot.val()[auth.currentUser.uid],
      });
    });
  }

 



  render() {
    return (
      
      <View style={styles.container}>

          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar} source={{uri: this.state.user.profile_picture}}/>
                <Text style={styles.username}>{this.state.user.name}</Text>
            </View>
          </View>

          <View style={styles.body}>
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
                    if (item.navigatePath === 'Logout') {
                      logout()
                    }
                    if (item.navigatePath === 'Terms') {
                      this.createTwoButtonAlert()
                    }
                    else {
                      this.props.navigation.navigate(item.navigatePath)}}}>
                    <View style={styles.box} >
                      <Image style={styles.icon} source={{uri: item.image}}/>
                      <Text style={styles.title}>{item.title}</Text>

                    </View>
                  </TouchableOpacity>
                )
            }}/>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#009B72",
  },

  container: {
    flex: 1,
    backgroundColor: "#1C1E1F"
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth:  4,
    borderColor: "#2A2D34",
    marginBottom:10,
  },
  icon:{
    width: 40,
    height: 40,
  },
  title:{
    fontSize:18,
    color:"#F26430",
    marginLeft:4,

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
    marginTop:5,
    marginBottom:5,
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
    fontWeight: 'bold',
    color: "#2A2D34",
    fontSize:22,
    alignSelf:'center',
    marginLeft:10
  }
});
                                            