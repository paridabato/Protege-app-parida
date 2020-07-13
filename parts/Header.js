import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Constants from 'expo-constants';

export default class Header extends Component {
    
    render() {
        return (
          <View style={ styles.header }>
            <View style={styles.logoBox}>
                <Image 
                    style= {styles.logo}
                    source = { require ('../assets/img/header_logo.png') }
                />
            </View>
            <TouchableOpacity
                style={ styles.userButton}
                onPress={()=> this.props.showModal()}
            >
                <Image
                    style = { styles.icon }
                    source = { require ('../assets/img/user_icon.png') }
                />
            </TouchableOpacity>
          </View>
        );
    }
}

const STATUS_BAR_HEIGHT = Constants.statusBarHeight;

const styles = StyleSheet.create({
    header: {
        width: '100%',
        paddingTop: hp('6.02%') - STATUS_BAR_HEIGHT,
        paddingHorizontal: wp('5.53%'),
        paddingBottom: hp('2%'),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: "center"
    },

    logo: {
        width: wp('35.13%'),
        resizeMode: 'contain'
    },

    userButton: {
        width: 50,
        alignItems: 'flex-end',
        paddingVertical: 10
    },

    icon: {
        width: 20
    }
});