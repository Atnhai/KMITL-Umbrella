import {StyleSheet} from 'react-native';

const Stylecomponent = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: '#FAC983',
    padding: 90,
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
});

export default Stylecomponent;
