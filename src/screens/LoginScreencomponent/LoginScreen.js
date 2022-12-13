import React ,{Component} from 'react';
import { Text, View , Image , StyleSheet, Button , Pressable , TouchableOpacity} from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';

export default class LoginScreen extends Component {
  render() {
    return (
      <View>
        <Image source={Logo} style={styles.logos} ></Image>
        <Text></Text>
        <TouchableOpacity title="Login" style={styles.button_color}>
        <Text style={styles.text}>Logins</Text>
        </TouchableOpacity>
        <Text></Text>
        <TouchableOpacity  style={styles.button_color} >
        <Text style={styles.text}>Register</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  root:{
    // alignItems:'center',
    // backgroundColor: ,

    padding:100
  },
  logos:{
    resizeMode: "cover",
    height: 500,
    width: 400,
    alignItems: 'center'
  },
  button_color:{
    justifycontent:'center',
    alignItems:'center',
    paddingVertical:12,
    backgroundColor:"orange",
    width:300,
    margin:20,
  },
  text:{
    fontsize:56,
    color:''
  }
});





