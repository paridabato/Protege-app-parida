import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
import { strings } from '../../translate';

export default class EditProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: 'Nom',
            lastname: 'Prénom',
            avatar: null
        }
    }

    componentDidMount() {
        this.getUserConfig();
    }

    onChangeText = (text, type) => {
        this.setState({
            [type]: text
        })
    }

    setUserConfig() {
        let user = this.state;
        AsyncStorage.setItem('user', JSON.stringify(user));
        this.props.setPage('profile')
    }

    getUserConfig() {
        AsyncStorage.getItem('user')
        .then( value => {
         let parsed = JSON.parse(value)
         if(parsed != null) {
             this.setState({
              name: parsed.name? parsed.name : 'Nom',
              lastname: parsed.lastname? parsed.lastname : 'Prénom',
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

    selectPicture = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
        if (permissionResult.granted === false) {
            return
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({aspect:1, allowsEditing: true});
        if (pickerResult.cancelled === true) {
            return;
        }

        this.setState({ 
            avatar: pickerResult.uri 
        });
    }

    render(){
        return (
            <KeyboardAvoidingView 
                style={ styles.modal }
                behavior="padding"
            >
                <View>
                    <View style={styles.container}>
                        <View style={ styles.header }>
                            <TouchableOpacity
                                onPress={()=>this.props.setPage('profile')}
                            >
                                <Text style={ styles.link }>{strings('settings.back')}</Text>
                            </TouchableOpacity>
                            <Text style={ styles.headTitle }>{strings('settings.info')}</Text>
                            <TouchableOpacity
                                onPress={()=>this.setUserConfig()}
                            >
                                <Text style={ styles.linkSave }>{strings('settings.save')}</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity 
                            style={ styles.top }
                            onPress={()=> this.selectPicture()}
                        >
                            {this.state.avatar ? 
                                <Image style={ styles.avatarPic } source = {{ uri: this.state.avatar }} /> : 
                                <Image style={ styles.avatar } source = { require ('../../assets/img/avatar.png') } />
                            }
                            <View>
                                <Text style={ styles.edit }>{strings('settings.photo')}</Text>
                            </View>
                            <Image
                                style={ styles.arrow }
                                source = { require ('../../assets/img/forward_btn.png') }
                            />
                        </TouchableOpacity>
                        <View style={ styles.inputBox }>
                            <Text style={ styles.label }>{strings('settings.name')}</Text>
                            <TextInput 
                                style={ styles.input }
                                value={this.state.name}
                                onChangeText={text => this.onChangeText(text, 'name')}
                            />
                        </View>
                        <View style={ styles.inputBox }>
                            <Text style={ styles.label }>{strings('settings.last_name')}</Text>
                            <TextInput
                                style={ styles.input }
                                value={this.state.lastname}
                                onChangeText={text => this.onChangeText(text, 'lastname')}
                            />
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
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

    top: {
        paddingHorizontal: wp('5.53%'),
        paddingVertical: hp('4.7%'),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        marginBottom: hp('2.35%')
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

    inputBox: {
        paddingHorizontal: wp('5.53%'),
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        paddingTop: hp('3.53%'),
        paddingBottom: hp('2.5%'),
    },

    label: {
        fontFamily: 'light',
        fontSize: hp('1.76%'),
        color: '#706f6f',
        marginBottom: 10
    },

    input: {
        fontFamily: 'bold',
        fontSize: hp('2.35%'),
        color: '#000'
    }
});