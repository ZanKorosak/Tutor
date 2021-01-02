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
  Alert 
} from 'react-native';
import { db, auth, logout} from '../components/Firebase/firebase';

export default class ProfileView extends Component {

  constructor(props) {
    super(props);
    this.state = {
        subject: [],
        data: [],
        subjectName :this.props.route.params.SubjectName,
        user: auth.currentUser.uid,
        tutors: [],
    };
    this.fillDataSubjects(); 
  }

  fillDataSubjects = async() => {
    await db.ref('/subjects').once('value').then((querySnapshot) => {
        this.setState({
          subject: querySnapshot.val()[this.state.subjectName],
        });
        let tempArr = this.state.subject.tutors.split(",");
        this.setState({
          data:tempArr
        })
    });


    await db.ref('/tutors').once('value').then((querySnapshot) => {
      let tmpTutors = querySnapshot.val();
      let tempArr = [];
      let subs = this.state.data;
      let tmp;
      for (let i = 0 ; i < subs.length; i++) {
        try {
          tmp = tmpTutors[subs[i]]
          tempArr.push({
            id: subs[i],
            name: tmp.name,
            navigatePath: tmp.name,
          })
        }catch{}
      }
      this.setState({
        tutors:tempArr
      })

    });
  }



  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Current tutors for {this.state.subjectName}</Text>
        
        <FlatList 
                style={styles.container} 
                enableEmptySections={true}
                data={this.state.tutors}
                keyExtractor= {(item) => {
                  return item.id.toString();
                }}
                renderItem={({item}) => {
                    return (
                    <TouchableOpacity onPress={()=> {

                        //this.props.navigation.navigate(item.navigatePath)}}>
                        this.props.navigation.navigate("Tutor", {TutorName: item.name, TutorId: item.id})
                        }}>
                        <View style={styles.box} >
                        <Text style={styles.subject}>{item.name}</Text>
  
                        </View>
                    </TouchableOpacity>
                    )
                }}/>

        <View style={styles.foot} >
          <Text style={styles.text}>Favourite this subject </Text>
          <Image style={styles.icon} source={{uri: "https://freeiconshop.com/wp-content/uploads/edd/heart-compact-outline-filled.png"}}/>
        </View>

      </View>
      )
      
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#EE82EE",
  },
  text:{ 
    fontWeight: 'bold',
    color:"#009B72",
    fontSize:22,
    alignSelf:'center',
    marginLeft:10,
    paddingBottom:20,
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
    padding:7,
    marginBottom:7,
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
  foot: {
    padding:7,
    marginBottom:7,
    backgroundColor: '#1a1c1e',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:1,
      width:-2
    },
    marginRight:30,
    marginLeft:30,
    elevation:2
  },
  subject:{
    fontSize:18,
    color:"#F26430",
    marginLeft:4,
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',

  },
});
                                            