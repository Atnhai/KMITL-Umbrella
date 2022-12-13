import React ,{Component} from 'react';
import { Text, View , Image , StyleSheet, Button , Pressable , TouchableOpacity} from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';

export default class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.root}>
        <Image source={Logo} style={styles.logos} ></Image>
        <Text>{'\n'}{'\n'}</Text>
        <TouchableOpacity title="Login" style={styles.button_color}>
        <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <Text></Text>
        <TouchableOpacity  style={styles.button_color2} >
        <Text style={styles.text}>Register</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  root:{
    alignItems:'center',
    backgroundColor:"#FAC983",
    padding:80
  },
  logos:{
    resizeMode: "cover",
    height: 400,
    width: 300,
    alignItems: 'center'
  },
  button_color:{
    borderRadius: 10,
    justifycontent:'center',
    alignItems:'center',
    paddingVertical:12,
    backgroundColor:"#E35205",
    width:300,
    // margin:20,
  },
  button_color2:{
    borderRadius: 10,
    justifycontent:'center',
    alignItems:'center',
    paddingVertical:12,
    backgroundColor:"white",
    width:300,
    // margin:20,
  },
  text:{
    fontsize:56,
    color:''
  }
});





