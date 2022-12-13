import React , {Component} from 'react'
import { Text, View,StyleSheet,TouchableOpacity,TextInput } from 'react-native'

export default class SigninScreen extends Component {
  render() {
    return (
      <View style={styles.root}>
        <TouchableOpacity title="<" style={styles.buttons}>
        <Text>Back</Text>
        </TouchableOpacity>
        <Text style={styles.text}> Welcome back! Glad to see you, Again</Text>
        <TextInput placeholder=" Enter your email " style={styles.inputlayout}></TextInput>
        <TextInput placeholder=" Enter your password " style={styles.inputlayout}></TextInput>
        <Text>Forgot Password?</Text>
        <TouchableOpacity style={styles.button2} >
        <Text >Login</Text>
        </TouchableOpacity >
        <Text>or Login with</Text>
        <TouchableOpacity style={styles.button3} >
        <Text>google</Text>
        </TouchableOpacity>
        <Text>Don't have an account Register Now</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  root:{
    alignItems:'center',
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
  inputlayout:{
    margin:20,
    padding:40,
    width:300,
    // height:50,
    justifycontent:"center",
    alignItems:"center",
    backgroundColor:"red"
  },
  button2:{
    justifycontent:'center',
    alignItems:'center',
    paddingVertical:12,
    backgroundColor:"orange",
    width:200,
    margin:20,
  },

  button3:{
    justifycontent:'center',
    alignItems:'center',
    paddingVertical:12,
    backgroundColor:"grey",
    width:50,
    margin:20,
  },

})

