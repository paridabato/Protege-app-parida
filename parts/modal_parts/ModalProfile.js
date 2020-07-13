import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback , TouchableOpacity, Image, AsyncStorage, Linking } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import i18n, { strings, changeLang } from '../../translate';
import { Updates } from 'expo';
import ApiLang from '../ApiLang';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav: props.navigate,
            name: strings('settings.name'),
            lastname: strings('settings.last_name'),
            avatar: null,
            lang: i18n.locale.includes('fr') ? 'fr' : 'en'
        }
    }

    componentDidMount() {
        this.getUserConfig();
    }

    loadInBrowser = () => {
        Linking.openURL('https://www.google.com/').catch(err => console.error("Couldn't load page", err));
    };

    getUserConfig() {
        AsyncStorage.getItem('user')
        .then( value => {
         let parsed = JSON.parse(value)
         if(parsed != null) {
             this.setState({
              name: parsed.name? parsed.name : strings('settings.name'),
              lastname: parsed.lastname? parsed.lastname : strings('settings.last_name'),
              avatar: parsed.avatar? parsed.avatar : null
             })
         } else {
             return
         }
        })
        .catch( (error) => {
          console.log(error)
        })
    }

    handleLangChange(lang) {
        changeLang(lang);
        ApiLang(lang);
        this.setState({
            lang: lang
        });
        Updates.reload();
    }

    handleTerms(){
        this.props.hideModal();
        this.state.nav.push('Terms');
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <TouchableWithoutFeedback onPress={() => this.props.hideModal('modalShow')}>
                    <View style={{flex: 1}} />
                </TouchableWithoutFeedback >
                <View style={ styles.modal }>
                    <View style={styles.container}>
                        <TouchableOpacity 
                            style={ styles.top }
                            onPress={()=> this.props.setPage('edit')}
                        >
                            {this.state.avatar ? 
                                <Image style={ styles.avatarPic } source = {{ uri: this.state.avatar }} /> : 
                                <Image style={ styles.avatar } source = { require ('../../assets/img/avatar.png') } />
                            }
                            <View>
                                <Text style={ styles.name }>{this.state.name} {this.state.lastname}</Text>
                                <Text style={ styles.edit }>{strings('settings.edit')}</Text>
                            </View>
                            <Image
                                style={ styles.arrow }
                                source = { require ('../../assets/img/forward_btn.png') }
                            />
                        </TouchableOpacity>
                        <View>
                            <TouchableOpacity 
                                style={ styles.option }
                                onPress={()=> this.props.setPage('notifications')}
                            >
                                <Image
                                    style={ styles.icon }
                                    source = { require ('../../assets/img/bell.png') }
                                />
                                <Text style={ styles.optName}>{strings('settings.notifications')}</Text>
                                <Image
                                    style={ styles.arrow }
                                    source = { require ('../../assets/img/forward_btn.png') }
                                />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={()=> this.handleTerms()}
                                style={ styles.option }
                            >
                                <Image
                                    style={ styles.icon }
                                    source = { require ('../../assets/img/info.png') }
                                />
                                <Text style={ styles.optName}>{strings('settings.about')}</Text>
                                <Image
                                    style={ styles.arrow }
                                    source = { require ('../../assets/img/forward_btn.png') }
                                />
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={()=>this.handleLangChange(this.state.lang=='fr' ? 'en' : 'fr')}
                                style={ styles.option }
                            >
                                <Image
                                    style={ styles.icon }
                                    source = { require ('../../assets/img/lang_ico.png') }
                                />
                                <Text style={ styles.optName}>{strings('settings.lang')}{this.state.lang=='fr' ? 'English' : 'Français'}</Text>
                                <Image
                                    style={ styles.arrow }
                                    source = { require ('../../assets/img/forward_btn.png') }
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
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
        paddingBottom: hp('2.65%')
    },

    bg: {
        flex: 1,
        backgroundColor: '#000'
    },

    top: {
        paddingHorizontal: wp('5.53%'),
        paddingVertical: hp('4.7%'),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#eee',
        borderBottomWidth: 1
    },

    avatar: {
        height: hp('7.79%'),
        width: hp('7.79%'),
        marginRight: 18
    },

    avatarPic: {
        height: hp('7.79%'),
        width: hp('7.79%'),
        marginRight: 18,
        borderRadius: 9999
    },

    name: {
        fontSize: hp('3.23%'),
        fontFamily: 'medium',
        color: '#4d4d4d',
        lineHeight: hp('4.7%')
    },

    edit: {
        fontFamily: 'bold',
        fontSize: hp('2.35%'),
        color: '#000',
    },
    
    arrow: {
        maxWidth: 11,
        marginRight: 0,
        marginLeft: 'auto'
    },

    option: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp('5.53%'),
        paddingVertical: hp('2.05%'),
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        height: hp('6.45%'),
    },

    icon: {
        maxWidth: 18,
        marginRight: 17,
    },

    optName: {
        fontFamily: 'bold',
        color: '#000',
        fontSize: hp('2.35%')
    }
});