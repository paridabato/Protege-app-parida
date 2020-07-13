import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Button from 'react-native-button';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { strings } from '../translate';
class FirstPage extends Component {

  componentDidMount() {
    const { nav } = this.props
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
        style = {styles.logo}
        source = { require ('../assets/img/logo.png') }
        />
        <Text style={styles.title}>{strings('first.title')}</Text>
        <Text style={styles.text}>{strings('first.text')}</Text>

        <Button
          containerStyle = {styles.button}
          style = {styles.buttonText}
          onPress={() => this.props.navigation.navigate('Second')}
        >
          {strings('first.button')}
        </Button>
        <View style = {styles.pagination}>
          <View style = {styles.active} />
          <View style = {styles.nonactive} />
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
    width: 153,
    marginBottom: hp('7%')
  },

  title: {
    color: '#ffffff',
    fontSize: wp('7.5%'),
    textAlign: 'center',
    marginBottom: hp('4.4%'),
    fontFamily: 'medium',
    lineHeight: hp('5.2%')
  },

  text: {
    color: '#ffffff',
    fontSize: hp('2.64%'),
    textAlign: 'center',
    marginBottom: hp('4.85%'),
    fontFamily: 'light',
    lineHeight: hp('3.5%')
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

export default FirstPage