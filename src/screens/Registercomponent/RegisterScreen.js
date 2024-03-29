import { Text, View, Image,TouchableOpacity,TextInput ,StyleSheet,} from 'react-native'
import React, { Component } from 'react'
import Logo from '../../../assets/images/Google.png';

export default class RegisterScreen extends Component {
  render() {
    return (
        
      <View style={styles.root}>
         <TouchableOpacity title="<"  style={styles.buttons} >
         <Text style={styles.text0}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.text} >{'\n'}{'\n'}Hello! Register to get started</Text>
        <TextInput placeholder=" Username " style={styles.inputlabel} ></TextInput>
        <TextInput placeholder=" Email " style={styles.inputlabel}></TextInput>
        <TextInput placeholder=" Password " style={styles.inputlabel}></TextInput>
        <TextInput placeholder=" Confirm password " style={styles.inputlabel}></TextInput>
        <TouchableOpacity style={styles.button2}>
        <Text style={styles.text4}>Register</Text>
        </TouchableOpacity >
        <Text>──────────   or Register with   ────────── {'\n'}</Text>
        <TouchableOpacity style={styles.button3} >
        <Image source={Logo} style={styles.logos} ></Image>
        </TouchableOpacity>
        <Text>{'\n'}{'\n'}Already have an account?<Text style={styles.text3}> Login Now{'\n'}{'\n'}</Text></Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    root:{
        alignItems:'center',
        // margin:5,
        backgroundColor:"#FAC983"
        // padding:100
      },
    buttons:{
      position: 'absolute',
      top: 10,
      left: 0,
      borderRadius: 10,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical:12,
      backgroundColor:"white",
      width:30,
      margin:20,
      },
      text0:{
        fontSize:17,
        // alignSelf: 'flex-start',
        // left: 110,
        textAlign: 'center',
        // color: 'white',
        fontWeight:"bold"
      },
    text:{
      fontSize:38,
      textAlign: 'center',
      color: 'black',
      fontWeight:"bold",
      // paddingBottom:50,
      },
      text3:{
        // fontSize:13,
        // alignSelf: 'flex-start',
        // left: 110,
        textAlign: 'center',
        color: '#35C2C1',
        fontWeight:"bold"
      },
      text4:{
        fontSize:17,
        // alignSelf: 'flex-start',
        // left: 110,
        textAlign: 'center',
        color: 'white',
        fontWeight:"bold"
      },
    inputlabel:{
        borderRadius: 5,
        margin:10,
        padding:10,
        width:320,
        height:50,
        justifycontent:"center",
        alignItems:"center",
        backgroundColor:"white"
    },
    button2:{
      borderRadius: 12,
      justifycontent:'center',
      alignItems:'center',
      paddingVertical:12,
      textColor: 'black',
      backgroundColor:"#E35205",
      width:200,
      margin:20,
    },
    button3:{
      borderRadius: 12,
      position: 'relative',
      justifycontent:'center',
      alignItems:'center',
      paddingVertical:5,
      backgroundColor:"white",
      width:60,
      // height:50,
      // margin:20,
    },
    logos:{
      resizeMode: "cover",
      height: 35,
    width: 35,
      alignItems: 'center'
    },

})