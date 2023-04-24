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
    //right: 100,
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
});

export default StyleMaincomponent;
