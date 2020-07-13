import React, { Component } from 'react';
import { View, Text, Image, Switch, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';
import Button from 'react-native-button';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PushNotifications from '../Notifications';
import { strings } from '../../translate';
import i18n from '../../translate';

export default class Notifications extends Component {
  constructor() {
    super();
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

  saveConfig() {
    PushNotifications(this.state.agriculture, this.state.fish, this.state.water, this.state.animals, this.state.lang);
    this.props.setPage('profile')
  }

  getThemeConfig () {
    AsyncStorage.getItem('themes')
    .then( value => {
     let parsed = JSON.parse(value)
     this.setState({
      agriculture: parsed.agriculture? parsed.agriculture : false ,
      fish: parsed.fish? parsed.fish : false,
      water: parsed.water? parsed.water : false,
      animals: parsed.animals? parsed.animals : false
     })
    })
    .catch( (error) => {
      console.log(error); 
    })
  }

  render() {
    return (
        <View style={ styles.modal }>
            <View style={styles.container}>
                <View style={ styles.header }>
                    <TouchableOpacity
                        onPress={()=>this.props.setPage('profile')}
                    >
                        <Text style={ styles.link }>{strings('settings.back')}</Text>
                    </TouchableOpacity>
                    <Text style={ styles.headTitle }>{strings('settings.notifications')}</Text>
                    <TouchableOpacity
                        onPress={()=>this.saveConfig()}
                    >
                        <Text style={ styles.linkSave }>{strings('settings.save')}</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>{strings('third.title')}</Text>
                <View style={styles.optionsBox}>
                    <View style={styles.optionsRow}>
                        <Image
                        style = {styles.icon}
                        source = { require ('../../assets/img/agr.png') }
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
                        source = { require ('../../assets/img/fish.png') }
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
                        source = { require ('../../assets/img/water.png') }
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
                        source = { require ('../../assets/img/animals.png') }
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
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    modal: {
        position: "absolute", 
        top: 'auto', 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: "center"
    },

    container: {
        zIndex: 1,
        backgroundColor: "white",
        paddingBottom: hp('2.65%'),
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp('5.53%'),
        paddingTop: hp('3.23%'),
        marginBottom: hp('8.23$')
    },

    link: {
        fontFamily: 'regular',
        fontSize: hp('2.5%'),
        color: '#007aff'
    },

    linkSave: {
        fontFamily: 'medium',
        fontSize: hp('2.5%'),
        color: '#007aff'
    },

    headTitle: {
        fontFamily: 'bold',
        fontSize: hp('2.35%'),
        color: '#000'
    },

    title: {
        color: '#4d4d4d',
        fontSize: hp('3.1%'),
        textAlign: 'center',
        marginBottom: hp('4.4%'),
        fontFamily: 'medium',
        lineHeight: hp('4.2%'),
        paddingHorizontal: wp('5.53%'),
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
        fontSize: hp('2.35%'),
        color: '#706f6f',
        fontFamily: 'regular'
    },

    switch: {
        marginLeft: 'auto',
        marginRight: 0,
    }
});
