import React, { Component } from 'react';
import { View, Text, Image, Switch, StyleSheet, AsyncStorage } from 'react-native';
import Button from 'react-native-button';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PushNotifications from '../parts/Notifications';
import { strings } from '../translate';
import i18n from '../translate';


class ThirdPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agriculture: false,
      fish: false,
      water: false,
      animals: false,
      lang: i18n.locale.includes('fr') ? 'fr' : 'en'
    }
  }

  componentDidMount() {
    this.getThemeConfig();
  }

  toggleSwitch = (value) => {
    this.setThemeConfig(value[0], value[1]);
  }

  setThemeConfig(theme, status) {
    let themes = this.state;
    themes[theme] = status;
    AsyncStorage.setItem('themes', JSON.stringify(themes));
    this.setState({[theme]: status})
  }

  getThemeConfig () {
    AsyncStorage.getItem('themes')
    .then( value => {
     let parsed = JSON.parse(value)
     if(parsed) {
       this.setState({
        agriculture: parsed.agriculture? parsed.agriculture : false ,
        fish: parsed.fish? parsed.fish : false,
        water: parsed.water? parsed.water : false,
        animals: parsed.animals? parsed.animals : false
       })
     } else {
       return
     }
    })
    .catch( (error) => {
      console.log(error); 
    })
  }

  saveConfig() {
    PushNotifications(this.state.agriculture, this.state.fish, this.state.water, this.state.animals, this.state.lang);
    this.props.navigation.navigate('App');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{strings('third.title')}</Text>
        <View style={styles.optionsBox}>
          <View style={styles.optionsRow}>
            <Image
              style = {styles.icon}
              source = { require ('../assets/img/agr.png') }
              />
              <Text style = {styles.name}>
              {strings('themes.agr')}
              </Text>
              <Switch
                style = {styles.switch}
                trackColor = {{false: '#e5e5e7', true: '#8e7b53'}}
                onValueChange={(value) => this.toggleSwitch(['agriculture', value])}
                value = {this.state.agriculture}
              />
          </View>
          <View style={styles.optionsRow}>
            <Image
              style = {styles.icon}
              source = { require ('../assets/img/fish.png') }
              />
              <Text style = {styles.name}>
              {strings('themes.fish')}
              </Text>
              <Switch
                style = {styles.switch}
                trackColor = {{false: '#e5e5e7', true: '#4bb1e3'}}
                onValueChange={(value) => this.toggleSwitch(['fish', value])}
                value = {this.state.fish}
              />
          </View>
          <View style={styles.optionsRow}>
            <Image
              style = {styles.icon}
              source = { require ('../assets/img/water.png') }
              />
              <Text style = {styles.name}>
              {strings('themes.water')}
              </Text>
              <Switch
                style = {styles.switch}
                trackColor = {{false: '#e5e5e7', true: '#51b8b2'}}
                onValueChange={(value) => this.toggleSwitch(['water', value])}
                value = {this.state.water}
              />
          </View>
          <View style={styles.optionsRowLast}>
            <Image
              style = {styles.icon}
              source = { require ('../assets/img/animals.png') }
              />
              <Text style = {styles.name}>
              {strings('themes.anim')}
              </Text>
              <Switch
                style = {styles.switch}
                trackColor = {{false: '#e5e5e7', true: '#ec8282'}}
                onValueChange={(value) => this.toggleSwitch(['animals', value])}
                value = {this.state.animals}
              />
          </View>
        </View>
        <Button
          containerStyle = {styles.button}
          style = {styles.buttonText}
          onPress={() => this.saveConfig()}
        >
          Suivant
        </Button>
        <View style = {styles.pagination}>
          <View style = {styles.nonactive} />
          <View style = {styles.nonactive} />
          <View style = {styles.active} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'linear-gradient(to right, rgba(82,178,208,1) 0%,rgba(27,136,167,1) 100%);',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: hp('11.82%'),
    paddingBottom: hp('4.99%'),
    paddingHorizontal: wp('7.53%'),
    flexDirection: 'column',
  },

  title: {
    color: '#ffffff',
    fontSize: wp('7%'),
    textAlign: 'center',
    marginBottom: hp('4%'),
    fontFamily: 'medium',
    lineHeight: hp('4.2%')
  },

  optionsBox: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: hp('3.91%')
  },

  optionsRow: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: hp('1.72%'),
    paddingHorizontal: 22,
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    borderStyle: 'solid'
  },

  optionsRowLast: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: hp('1.72%'),
    paddingHorizontal: 22,
    alignItems: 'center'
  },

  icon: {
    width: 38,
    marginRight: wp('5%')
  },

  name: {
    fontSize: hp('2.45%'),
    color: '#706f6f',
    maxWidth: wp('34.66%'),
    fontFamily: 'regular',
    paddingTop: hp(0.73)
  },

  switch: {
    marginLeft: 'auto',
    marginRight: 0,
  },

  button: {
    height: hp('7.8%'),
    borderRadius: 28,
    backgroundColor: '#fff',
    width: wp('44.8%'),
    padding: hp('2.6%')
  },

  buttonText: {
    color: '#000',
    fontFamily: 'bold',
    fontSize: hp('2.35%')
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 'auto'
  },

  active: {
    height: 8,
    width: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
    opacity: 1,
    marginRight: 8
  },

  nonactive: {
    height: 8,
    width: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
    opacity: 0.3,
    marginRight: 8
  }
});

export default ThirdPage
