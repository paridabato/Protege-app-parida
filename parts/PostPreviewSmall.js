import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ThemeIcon from '../parts/ThemeIcon';
import TypeAndDate from './PostTypeAndDate';
import i18n from '../translate';
export default class Item extends Component {
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
            onPress={()=> this.state.nav.push('Post', {
                postData: this.state.post.id, lang: this.state.lang
            })}
          >
            <View style={ styles.item }>
                <View style={ styles.left }>
                    <Text style={ styles.title }>{ this.state.post.title }</Text>
                    <TypeAndDate type={this.state.post.post_type} date={this.state.post.post_date} />
                </View>
                <View style={ styles.imagebox }>
                    <Image
                        style={ styles.image }
                        source={{uri: image.replace('public://', 'https://protege.spc.int/sites/default/files/')}}
                    />
                    <View>
                        <ThemeIcon theme={this.state.post.theme_name} size={'iconSmall'}/>
                    </View>
                </View>
            </View>
          </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        width: '100%',
        paddingTop: hp('2.35%'),
        paddingHorizontal: wp('5.53%'),
        borderBottomWidth: 1,
        borderColor: '#eee',
        flexDirection: 'row',
        paddingBottom: hp('2.05%'),
    },

    left: {
        flex: 1,
        paddingRight: wp('9.6%')
    },

    title: {
        fontSize: hp('2.35%'),
        color: '#4d4d4d',
        lineHeight: hp('3.53%'),
        fontFamily: 'medium'
    },

    imagebox: {
        position: 'relative',
        height: wp('19.2%'),
        width: wp('21.87%'),
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#eeeeee'
    },

    image: {
        height: wp('19.2%'),
        width: wp('21.87%')
    },

    iconbox: {
        backgroundColor: '#52bbb5',
        height: 46,
        width: 46,
        borderRadius: 9999,
        position: 'absolute',
        bottom: -23,
        right: -23
    },

    themeIcon: {
        position: 'absolute',
        width: 10,
        height: 10,
        left: 10,
        top: 8,
    }
});