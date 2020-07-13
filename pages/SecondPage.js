import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet, AsyncStorage } from 'react-native';
import Button from 'react-native-button';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { strings } from '../translate';
export default class SecondPage extends Component {
  constructor() {
    super();
    this.state = {
      token: ''
    }
  }

  async turnOnNotifications() {
    
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (status !== 'granted') {
      this.turnOffNotifications()
    } else {
      AsyncStorage.setItem('notification', 'on');
      this.props.navigation.navigate('Third');
    }
  }

  turnOffNotifications() {
    AsyncStorage.setItem('notification', 'off');
    this.props.navigation.navigate('Home');
  }

  render() {
    console.log(this.props.navigation)
    return (
      <View style={styles.container}>
        <Image
        style = {styles.logo}
        source = { require ('../assets/img/megaphone.png') }
        />
        <Text style={styles.title}>{strings('second.title')}</Text>
        <Text style={styles.text}>{strings('second.text')}</Text>
        <Button
            containerStyle = {styles.button}
            style = {styles.buttonText}
            onPress={() => this.turnOnNotifications()}
        >
            {strings('second.button')}
        </Button>
        <TouchableHighlight onPress={() => this.turnOffNotifications() }>
          <Text style = {styles.link}>
          {strings('second.reject')}
          </Text>
        </TouchableHighlight>
        <View style = {styles.pagination}>
          <View style = {styles.nonactive} />
          <View style = {styles.active} />
          <View style = {styles.nonactive} />
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
    paddingTop: hp('13.55%'),
    paddingBottom: hp('4.99%'),
    paddingHorizontal: wp('8.53%'),
    flexDirection: 'column',
  },
  
  
  logo: {
    width: 110,
    marginBottom: hp('8%')
  },

  title: {
    color: '#ffffff',
    fontSize: wp('7.5%'),
    textAlign: 'center',
    marginBottom: hp('3.4%'),
    fontFamily: 'medium',
    lineHeight: hp('5.2%')
  },

  text: {
    color: '#ffffff',
    fontSize: wp('4.2%'),
    textAlign: 'center',
    marginBottom: hp('6.85%'),
    fontFamily: 'light',
    lineHeight: hp('3.5%')
  },

  button: {
    height: hp('7.8%'),
    borderRadius: 28,
    backgroundColor: '#fff',
    width: wp('59.74%'),
    alignItems: 'center',
    justifyContent:"center",
    paddingTop: hp(0.5)
  },

  buttonText: {
    color: '#000',
    fontFamily: 'bold',
    fontSize: hp('2.35%'),
  },

  link: {
    color: '#fff',
    fontFamily: 'bold',
    fontSize: wp('4%'),
    marginTop: hp('5%')
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