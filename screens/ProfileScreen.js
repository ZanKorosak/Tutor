import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList  
} from 'react-native';
import { db, auth} from '../components/Firebase/firebase';

export default class ProfileView extends Component {

  constructor(props) {
    super(props);
    this.state = {
        user: [],
        data: [
            {id:1, image: "https://img.icons8.com/color/70/000000/heart-broken.png",     title:"Your tutors", navigatePath: "ProfileTutorScreen"},
            {id:2, image: "https://img.icons8.com/color/70/000000/book.png",     title:"Your subjects", navigatePath: "ProfileSubjectScreen"},
            {id:3, image: "https://img.icons8.com/color/70/000000/checkmark.png", title:"Terms and conditions", navigatePath: "TermsScreen"},
            {id:4, image: "https://img.icons8.com/color/70/000000/gear.png",        title:"Settings", navigatePath: "ProfileSettingsScreen"},
            {id:5, image: "https://img.icons8.com/color/70/000000/shutdown.png",         title:"Log out", navigatePath: "ProfileSettingsScreen" },
      ],
    };
  }

  componentDidMount() {
    db.ref('/users').orderByChild("id").equalTo(auth.currentUser.uid).on('child_added', querySnapShot => {
      let data = querySnapShot.val() ? querySnapShot.val() : {};
      this.setState({
        user: data,
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar} source={{uri: this.state.user.profile_picture}}/>
                <Text style={styles.name}>{this.state.user.name}</Text>
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
                    this.props.navigation.navigate(item.navigatePath)}}>
                    <View style={styles.box} >
                      <Image style={styles.icon} source={{uri: item.image}}/>
                      <Text style={styles.title}>{item.title}</Text>
                      <Image style={styles.btn} source={{uri: "https://img.icons8.com/customer/office/40"}}/>

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
    backgroundColor: "#EE82EE",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
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
                                            