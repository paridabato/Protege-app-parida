import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import TypeAndDate from './PostTypeAndDate';
import ThemeIcon from '../parts/ThemeIcon';
import i18n from '../translate';
export default class ItemBig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: props.postData,
            nav: props.nav,
            lang: i18n.locale.includes('fr') ? 'fr' : 'en'
        }
    }

    render(){
        let image = this.state.post.image_url;
        return (
            <TouchableOpacity
                onPress={()=> this.state.nav.navigate('Post', {
                    postData: this.state.post.id, lang: this.state.lang
                })}
            >
            <View style={ styles.item }>
                <View style={ styles.imagebox }>
                    <Image
                        resizeMode='cover'
                        style={ styles.image }
                        source={{uri: image.replace('public://', 'https://protege.spc.int/sites/default/files/')}}
                    />
                    <View>
                        <ThemeIcon theme={this.state.post.theme_name} size={'iconBig'}/>
                    </View>
                </View>
                <View style={ styles.bottom }>
                    <Text style={ styles.title }>{ this.state.post.title }</Text>
                    <TypeAndDate type={this.state.post.post_type} date={this.state.post.post_date} />
                </View>
            </View>
          </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        width: '100%',
        paddingVertical: hp('2.35%'),
        paddingHorizontal: wp('5.53%'),
        borderBottomWidth: 1,
        borderColor: '#eee',
        flexDirection: 'column'
    },

    bottom: {
        width: '100%'
    },

    title: {
        fontSize: hp('3.23%'),
        color: '#4d4d4d',
        lineHeight: hp('4.7%'),
        fontFamily: 'medium'
    },

    imagebox: {
        position: 'relative',
        height: hp('28%'),
        width: '100%',
        marginBottom: hp('3,94%'),
        borderRadius: hp('0.74%'),
        overflow: 'hidden',
        backgroundColor: '#eeeeee'
    },

    image: {
        height: hp('28%'),
        width: '100%'
    },

    iconbox: {
        backgroundColor: '#52bbb5',
        height: 134,
        width: 134,
        borderRadius: 9999,
        position: 'absolute',
        bottom: -65,
        right: -65
    },

    themeIcon: {
        position: 'absolute',
        width: 28,
        height: 34,
        left: 30,
        top: 25
    }
});