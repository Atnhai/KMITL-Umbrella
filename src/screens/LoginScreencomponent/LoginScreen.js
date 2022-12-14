import React ,{Component} from 'react';
import { Text, View , Image , StyleSheet, Button , Pressable , TouchableOpacity ,Alert} from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';
import { useNavigation } from '@react-navigation/native';



export default class LoginScreen extends Component {
  // const navigation =  useNavigation();
  
  onLoginPressed = () => {
  navigation.navigate('Signin');
  }
  render() {
    return (
      <View style={styles.root}>
        <Image source={Logo} style={styles.logos} ></Image>
        <Text>{'\n'}{'\n'}</Text>
        <TouchableOpacity title="Login" style={styles.button_login} onPress={this.onLoginPressed}>
        <Text style={styles.text4}>Login</Text>
        </TouchableOpacity>
        <Text></Text>
        <TouchableOpacity  style={styles.button_register} >
        <Text style={styles.text}>Register</Text>
        </TouchableOpacity>
      </View>
    )
  };
}


const styles = StyleSheet.create({
  root:{
    alignItems:'center',
    backgroundColor:"#FAC983",
    padding:80
  },
  logos:{
    borderRadius: 20,
    resizeMode: "cover",
    height: 400,
    width: 300,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
  },
  button_login:{
    borderRadius: 12,
    justifycontent:'center',
    alignItems:'center',
    paddingVertical:12,
    backgroundColor:"#E35205",
    width:300,
    // margin:20,
  },
  button_register:{
    borderRadius:12,
    justifycontent:'center',
    alignItems:'center',
    paddingVertical:12,
    backgroundColor:"white",
    width:300,
    // margin:20,
  },
  text:{
    fontSize:17,
    fontWeight:"bold",
    color: 'black',
    // color:''
  },
  text4:{
    fontSize:17,
    // alignSelf: 'flex-start',
    // left: 110,
    textAlign: 'center',
    color: 'white',
    fontWeight:"bold"
  },
});





