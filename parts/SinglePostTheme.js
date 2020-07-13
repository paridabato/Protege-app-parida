import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const icons = {
    Agriculture: require('../assets/img/agriculture.png'),
    Pêche: require('../assets/img/peche.png'),
    Coastal: require('../assets/img/peche.png'),
    Eau: require('../assets/img/eau.png'),
    Water: require('../assets/img/eau.png'),
    Espèces: require('../assets/img/especes.png'),
    Invasive: require('../assets/img/especes.png')
}

export default class SinglePostTheme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: props.theme,
            themeShort: null
        }
    }

    componentDidMount() {
        if(this.state.theme){
            this.cutTheme(this.state.theme)
        }
    }

    cutTheme(theme) {
        var trimmedTheme = theme.split(' ')[0];
        this.setState({
            themeShort: trimmedTheme
        });
    }

    render() {
        return (
            <View style={[styles.themeCont, styles[this.state.themeShort]]} >
                <Image
                    style = { styles.themeIcon }
                    source={icons[this.state.themeShort]}
                />
                <Text style={ styles.themeName }>{this.state.theme}</Text>
            </View>
        )
    }
}

const styles = {
    
    Pêche: {
        backgroundColor: '#4bb1e3'
    },

    Agriculture: {
        backgroundColor: '#917d55'
    },

    Eau: {
        backgroundColor: '#50b7b1'
    },

    Espèces: {
        backgroundColor: '#eb8181'
    },

    Coastal: {
        backgroundColor: '#4bb1e3'
    },

    Water: {
        backgroundColor: '#50b7b1'
    },

    Invasive: {
        backgroundColor: '#eb8181'
    },

    themeCont: {
        flexDirection: 'row',
        height: hp('7.05%'),
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: hp('3.53%'),
        borderRadius: hp('3.53%'),
        borderTopLeftRadius:hp('3.53%'),
        borderTopRightRadius:hp('3.53%'),
        borderBottomLeftRadius:hp('3.53%'),
        borderBottomRightRadius:hp('3.53%'),
        marginTop: -hp('3.525%'),
        marginBottom: hp('4.85%')
    },

    themeIcon: {
        width: hp('3.53%'),
        height: hp('4.11%'),
        marginRight: 10
    },

    themeName: {
        color: '#fff',
        fontFamily: 'bold',
        fontSize: hp('2.05%')
    }
}