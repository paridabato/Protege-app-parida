import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Share, Linking, ActivityIndicator } from 'react-native';
import RelatedPosts from '../parts/RelatedPosts';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import HTML from 'react-native-render-html';
import Constants from 'expo-constants';
import PostTheme from '../parts/SinglePostTheme';
import TypeAndDate from '../parts/PostTypeAndDate';
import { strings } from '../translate';

const STATUS_BAR_HEIGHT = Constants.statusBarHeight;
export default class PostPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            post_id: props.navigation.state.params.postData,
            lang: props.navigation.state.params.lang,
            nav: props.navigation,
            post: null
        }
    }

    componentDidMount() {
        this.getPost();
    }

    onShare = async() => {
        Share.share(
            {
                title: this.state.post.title,
                message: this.state.post.title +', ' + 'https://protege.spc.int/node/'+ this.state.post_id,
                url: 'https://protege.spc.int/node/'+ this.state.post_id
            }
        ).then(({action, activityType}) => {
            if(action === Share.sharedAction)
              console.log('Share was successful');
            else
              console.log('Share was dismissed');
            });
    }

    getPost() {
        var param = new Object();
        param.id = this.state.post_id;
        param.lang = this.state.lang;

        var data = new FormData();
        data.append("func", "getPostById");
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


    render() {
        if (this.state.isLoading){
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size="large" color="#3da2c0" />
                </View>
            )
        } else {
            let image = this.state.post.image_url;
            return (
                <View>
                    <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: '#3da2c0' }} />
                    <ScrollView>
                        <View style={ styles.mainImageBox }>
                            <Image
                                style={ styles.mainImage }
                                source={{uri: image.replace('public://', 'https://protege.spc.int/sites/default/files/')}}
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
                                <TouchableOpacity
                                    style= { styles.btn}
                                    onPress={()=> this.onShare()}
                                >
                                    <Image
                                        source = { require('../assets/img/share_btn.png') }
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <PostTheme theme={this.state.post.theme_name} />
                        <View style={ styles.content }>
                            <Text style={ styles.title }>{this.state.post.title}</Text>
                            <TypeAndDate date={this.state.post.post_date} type={this.state.post.post_type} />
                            <View style={ styles.contentInner }>
                                <Text style={ styles.subTitle }>{this.state.post.sub_title}</Text>
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
                                            },

                                            img: {
                                                marginBottom: hp('4.41%')
                                            },

                                            h3: {
                                                fontFamily: 'regular',
                                                fontSize: hp('2.64%'),
                                                color: '#706f6f',
                                                lineHeight: hp('3.53%'),
                                                marginBottom: hp('2.2%')
                                            }
                                        } 
                                    }
                                    imagesMaxWidth={wp('88.94%')}
                                    onLinkPress = {(evt, href) => {Linking.openURL(href)}}
                                />
                            </View>
                            <RelatedPosts lang={this.state.lang} navigate={this.state.nav} theme_name={this.state.post.theme_name} post_id={this.state.post_id} />
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
        width: '100%',
        height: hp('35.73%'),
        position: 'relative'
    },

    mainImage: {
        width: '100%',
        height: hp('35.73%')
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
        lineHeight: hp('4.5%'),
        marginBottom: hp('1.78%')
    },

    subTitle: {
        fontFamily: 'medium',
        fontSize: hp('3.23%'),
        color: '#706f6f',
        lineHeight: hp('3.5%'),
        marginBottom: hp('4.41%'),
        paddingTop: hp('6.61%')
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
    }
});