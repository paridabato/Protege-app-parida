import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Moment from 'react-moment';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { strings } from '../translate';

const icons = {
    text: require('../assets/img/doc.png'),
    audio: require('../assets/img/news.png'),
    video: require('../assets/img/video.png')
}

export default class TypeAndDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: props.date,
            type: props.type 
        }
    }

    render() {
        return (
            <View style={ styles.dateBox }>
                <Image
                    style = { styles.icon }
                    source = {icons[this.state.type]}
                    resizeMode = 'contain'
                />
                <Text style={ styles.date }>{strings('post_type.' + this.state.type)}, </Text>
                <Moment unix element={Text} style={ styles.date }>{ this.state.date }</Moment>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    dateBox: {
        flexDirection: 'row',
        alignItems: 'center',
        height: hp('1.96%'),
        marginTop: hp('1%')
    },

    date: {
        fontSize: hp('1.96%'),
        color: '#706f6f',
        lineHeight: hp('1.96%'),
        fontFamily: 'light',
        textAlignVertical: 'center'
    },

    icon: {
        width: 10,
        marginRight: wp('1.47%')
    }
});
