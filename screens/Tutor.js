import React, { Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { db, auth, logout} from '../components/Firebase/firebase';

export default class ProfileView extends Component {

  constructor(props) {
    super(props);
    this.state = {
        tutor: {},
        data: [],
        id: this.props.route.params.TutorId,
        tutorName :this.props.route.params.TutorName,
        user: auth.currentUser.uid,
        liked: 0,
    };
    this.addLikes = this.addLikes.bind(this);
    this.fillDataSubjects(); 
  }

  fillDataSubjects = async() => {
    await db.ref('/tutors').once('value').then((querySnapshot) => {
        this.setState({
          tutor: querySnapshot.val()[parseInt(this.state.id)],
        });
        this.setState({
          liked:this.state.tutor["likes"]
        });
    });

  }

  addLikes() {
    // A post entry.
    let tid = this.state.id;
    var postData = {
      email: this.state.tutor["email"],
      likes: this.state.liked+1,
      name: this.state.tutorName,
      phone: this.state.tutor["phone"],
      picture: this.state.tutor["picture"],
    };
    this.setState({
      liked: this.state.liked+1
    })
    var updates = {};
    updates['/tutors/' + tid] = postData;
    db.ref().update(updates)

  }



  render() {
    let rend;
    if(Object.keys(this.state.tutor).length) {
      rend = 
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar} source={{uri: this.state.tutor["picture"]}}/>
            </View>
          </View>
          <Text style={styles.text}>Tutor Name</Text>
            <TouchableOpacity>
                        <View style={styles.box} >
                        <Text style={styles.subject}>{this.state.tutorName}</Text>
                        </View>
            </TouchableOpacity>
          <Text style={styles.text}>Email contact</Text>
          <TouchableOpacity>
                        <View style={styles.box} >
                        <Text style={styles.subject}>{this.state.tutor["email"]}</Text>
                        </View>
            </TouchableOpacity>
          <Text style={styles.text}>Phone contact</Text>
          <TouchableOpacity>
                        <View style={styles.box} >
                        <Text style={styles.subject}>{this.state.tutor["phone"]}</Text>
                        </View>
            </TouchableOpacity>
          <Text style={styles.text}>Tutor Likes</Text>
          <TouchableOpacity onPress={()=> {
                        //this.props.navigation.navigate(item.navigatePath)}}>
                        this.addLikes();}}>
                        <View style={styles.box} >
                          <Text style={styles.subject}>{this.state.liked}</Text>
                          <Image style={styles.icon} source={{uri: "https://freeiconshop.com/wp-content/uploads/edd/heart-compact-outline-filled.png"}}/>
                        </View>
            </TouchableOpacity>

        </View>
    }
    else {
      rend = <View></View>
    }
    return (
      <View style={styles.container}>
        {rend}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#009B72",
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
  text:{
    color:"#009B72"
  },
  icon:{
    width: 40,
    height: 40,
    alignItems: 'center',
    marginRight:'auto',
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
    flexDirection:'row',
    alignItems:'center',
    padding:5,
    marginBottom:2,
    backgroundColor: '#1a1c1e',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:1,
      width:-2
    },
    flex:1,
    elevation:2
  },
  username:{
    color: "#20B2AA",
    fontSize:22,
    alignSelf:'center',
    marginLeft:10
  },
  subject:{
    fontSize:18,
    color:"#F26430",
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  container: {
    flex: 1,
    backgroundColor: "#1C1E1F"
  },
});
                                            