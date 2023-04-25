import {StyleSheet} from 'react-native';

const StyleMaincomponent = StyleSheet.create({
  background_views: {
    alignItems: 'center',
    backgroundColor: '#FAC983',
    padding: 80,
    justifyContent: 'center',
    flex: 1,
  },
  texts_menu: {
    paddingTop: 10,
    fontSize: 15,
    paddingLeft: 30,
  },
  buttons_white: {
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    width: 350,
    height: 50,
    // justifyContent: 'center',
    flexDirection: 'row',
  },
  logo_history: {
    height: 20,
    width: 20,
    alignItems: 'center',
    resizeMode: 'stretch',
    marginRight: 40,
  },
  logo_help: {
    resizeMode: 'cover',
    height: 20,
    width: 20,
    alignItems: 'center',
  },
  logo_aboutus: {
    resizeMode: 'cover',
    height: 20,
    width: 20,
    alignItems: 'center',
  },
  logo_umbrella: {
    position: 'absolute',
    top: 30,
    left: 20,
    resizeMode: 'cover',
    height: 130,
    width: 130,
    alignItems: 'center',
  },
  navigate_icon: {
    height: 10,
    width: 10,
    alignItems: 'center',
    justifycontent: 'flex-end',
    position: 'absolute',
    right: 4,
  },
  setting_icon: {
    position: 'absolute',
    top: 40,
    right: 30,
    height: 40,
    width: 40,
    alignItems: 'center',
  },
  texts_profile_white: {
    alignContent: 'center',
    paddingBottom: 30,
    right: 80,
    color: 'white',
    fontWeight: 'bold',
  },
  rectangle: {
    position: 'absolute',
    top: 0,
    borderBottomRightRadius: 80,
    width: 410,
    height: 250,
    marginBottom: 20,
    backgroundColor: '#E35205',
  },
  rectangle_small: {
    position: 'absolute',
    top: 0,
    borderBottomRightRadius: 80,
    width: 410,
    height: 80,
    marginBottom: 20,
    backgroundColor: '#E35205',
  },
  button_goback: {
    position: 'absolute',
    top: 5,
    left: 0,
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    margin: 20,
  },
  text_navigation: {
    fontsize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  text_name: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  text_back: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    paddingLeft: 30,
    position: 'absolute',
    top: 20,
    left: 40,
  },
  rectangle_square: {
    position: 'absolute',
    top: 480,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 330,
    height: 140,
    backgroundColor: 'white',
  },
  logo_umbrella_profile: {
    borderRadius: 20,
    resizeMode: 'cover',
    height: 350,
    width: 300,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
    marginBottom: 100,
  },
});

export default StyleMaincomponent;
