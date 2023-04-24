import {StyleSheet} from 'react-native';

const Stylecomponent = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: '#FAC983',
    padding: 90,
  },
  root_signin: {
    alignItems: 'center',
    backgroundColor: '#FAC983',
    // flex: 1,
    // justifyContent: 'flex-end'
    // padding:100
  },
  root_register: {
    alignItems: 'center',

    backgroundColor: '#FAC983',
  },
  logos_umbrella: {
    borderRadius: 20,
    resizeMode: 'cover',
    height: 400,
    width: 300,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
  },
  button_login: {
    borderRadius: 12,
    justifycontent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#E35205',
    width: 300,
  },
  button_register: {
    borderRadius: 12,
    justifycontent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: 'white',
    width: 300,
  },
  text_black: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
  },
  text_white: {
    fontSize: 17,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  text_grey: {
    fontSize: 17,
    color: 'grey',
    paddingLeft: 11,
    paddingRight: 4,
  },
  buttons_goback: {
    position: 'absolute',
    top: 10,
    left: 0,
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: 'white',
    width: 30,
    margin: 20,
  },
  text_padding: {
    marginTop: 20,
  },
  header_text: {
    fontSize: 38,
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
    paddingLeft: 30,
  },
  text_forgotpassword: {
    fontWeight: 'bold',
    left: 102,
    textAlign: 'right',
  },
  text_blue: {
    textAlign: 'center',
    color: '#35C2C1',
    fontWeight: 'bold',
  },
  inputsignin_label: {
    borderRadius: 5,
    margin: 10,
    padding: 10,
    width: 320,
    height: 50,
    position: 'relative',
    height: 50,
    justifycontent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default Stylecomponent;
