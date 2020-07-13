import React, { Component } from 'react';
import { View, Text, Image,StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import HTML from 'react-native-render-html';
import Constants from 'expo-constants';
import { strings } from '../translate';
import i18n from '../translate';

const STATUS_BAR_HEIGHT = Constants.statusBarHeight;

export default class Terms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            post_id: i18n.locale.includes('fr') ? 124 : 138,
            lang: i18n.locale.includes('fr') ? 'fr' : 'en',
            nav: props.navigation,
            post: null,
            link: 'https://protege.spc.int'
        }
    }

    componentDidMount() {
        this.getTerms();
    }

    openSite = () => {
        Linking.canOpenURL(this.state.link).then(supported => {
          if (supported) {
            Linking.openURL(this.state.link);
          } else {
            console.log("Don't know how to open URI: " + this.state.link);
          }
        });
    };

    getTerms() {
        var param = new Object();
        param.id = this.state.post_id;
        param.lang = 'fr';

        var data = new FormData();
        data.append("func", "getTerms");
        data.append("data", JSON.stringify(param));
    
        return fetch('https://protege.spc.int/api.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: data,
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
                post: responseJson[0]
            })
        })
        .catch((error) => {
            console.error(error);
        });
    }

    render(){
        if (this.state.isLoading){
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size="large" color="#3da2c0" />
                </View>
            )
        } else {
        return(
            <View>
            <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: '#3da2c0' }} />
            <ScrollView>
                <View style={ styles.mainImageBox }>
                    <Image
                        style={ styles.mainImage }
                        source={require('../assets/img/logo.png')}
                    />
                    <View style={ styles.btnCont}>
                        <TouchableOpacity
                            style= { styles.btn}
                            onPress={()=> this.state.nav.goBack()}
                        >
                            <Image
                                source = { require('../assets/img/back_btn.png') }
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={ styles.content }>
                    <Text style={ styles.title }>{this.state.post.title}</Text>
                    <View style={ styles.contentInner }>
                        <HTML 
                            html={this.state.post.body} 
                            tagsStyles = { 
                                {
                                    p: {
                                        fontFamily: 'light',
                                        fontSize: hp('2.35%'),
                                        color: '#706f6f',
                                        lineHeight: hp('3.53%'),
                                        marginBottom: hp('4.41%')
                                    },

                                    a: {
                                        fontFamily: 'light',
                                        fontSize: hp('2.35%'),
                                        color: '#52bbb5'
                                    }
                                } 
                            }
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={()=> this.openSite()}
                            style={ [styles.backCont, styles.linkCont] }
                        >
                            <Text style={ styles.link }>{strings('terms.link')}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={()=> this.state.nav.goBack()}
                        style={ styles.backCont }
                    >
                        <Image
                            style={{marginRight: 14, maxWidth: 7}}
                            source={require('../assets/img/arrow_back.png')}
                        />
                        <Text style={ styles.back }>{strings('post.back')}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
        )
        }
    }
}

const styles = StyleSheet.create({

    mainImageBox : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: hp('35.73%'),
        position: 'relative',
        backgroundColor: 'linear-gradient(to right, rgba(82,178,208,1) 0%,rgba(27,136,167,1) 100%)',
    },

    mainImage: {
        width: '100%',
        height: '60%',
        resizeMode: 'contain'
    },

    btnCont: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp('5.53%'),
        position: 'absolute',
        top: 30
    },

    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('5.88%'),
        width: hp('5.88%'),
        borderRadius: 9999,
        backgroundColor: '#fff'
    },

    content: {
        paddingHorizontal: wp('5.53%'),
        paddingBottom: hp('8.23%'),
    },

    title: {
        fontFamily: 'medium',
        fontSize: hp('4.3%'),
        color: '#4d4d4d',
        lineHeight: hp('4.3%'),
        marginBottom: hp('1.78%'),
        marginTop: hp('5%'),
        textAlign: 'center'
    },
    
    backCont: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        height: hp('2.35%')
    },

    back: {
        color: '#000',
        fontFamily: 'bold',
        fontSize: hp('2.35%'),
        lineHeight: hp('2.35%'),
        textAlignVertical: "center"
    },

    linkCont: {
        marginBottom: hp('4.41%')
    },

    link: {
        color: 'rgba(27,136,167,1)',
        fontFamily: 'bold',
        fontSize: hp('2.35%'),
        lineHeight: hp('2.35%'),
        textAlignVertical: "center",
    }
});