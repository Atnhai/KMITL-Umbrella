import { Text, View,TouchableOpacity,TextInput ,StyleSheet,} from 'react-native'
import React, { Component } from 'react'

export default class RegisterScreen extends Component {
  render() {
    return (
        
      <View style={styles.root}>
         <TouchableOpacity title="<"  style={styles.buttons} >
        <Text>Back</Text>
        </TouchableOpacity>
        <Text style={styles.text} > Hello! Register to get started</Text>
        <TextInput placeholder=" Username " style={styles.inputlabel} ></TextInput>
        <TextInput placeholder=" Email " style={styles.inputlabel}></TextInput>
        <TextInput placeholder=" Password " style={styles.inputlabel}></TextInput>
        <TextInput placeholder=" Confirm password " style={styles.inputlabel}></TextInput>
        <TouchableOpacity  >
        <Text >Register</Text>
        </TouchableOpacity >
        <Text>or Register with</Text>
        <TouchableOpacity  >
        <Text>google</Text>
        </TouchableOpacity>
        <Text>Already have an account? Login Now</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    root:{
        alignItems:'center',
        margin:5
        // padding:100
      },
    buttons:{
        justifycontent:'center',
        alignItems:'center',
        paddingVertical:12,
        backgroundColor:"orange",
        width:50,
        margin:20,
      },
    text:{
        fontSize:40,
        fontWeight:"bold"
      },
    inputlabel:{
        margin:10,
        padding:10,
        width:300,
        height:100,
        justifycontent:"center",
        alignItems:"center",
        backgroundColor:"yellow"
    }

})