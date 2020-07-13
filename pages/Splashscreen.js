import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { AsyncStorage  } from 'react-native';
import * as Font from 'expo-font';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class SplashScreen extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
          fontIsLoading: true,
          isLoading: true,
          notifications: null
        }
    }
    
    async componentDidMount() {
    this._isMounted = true;
        if (this._isMounted) {
            this.getConfig();
            await Font.loadAsync({
                'light': require('../assets/fonts/PFDinDisplayPro-Light.ttf'),
                'regular': require('../assets/fonts/PFDinDisplayPro-Regular.ttf'),
                'medium': require('../assets/fonts/PFDinDisplayPro-Medium.ttf'),
                'bold': require('../assets/fonts/PFDinDisplayPro-Bold.ttf'),
            });
            this.setState({fontIsLoading : false });
            this.rootNav();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    
    getConfig () {
        AsyncStorage.getItem('notification')
        .then( value => {
            this.setState({
            isLoading: false,
            notifications: value
            })
        })
        .catch( (error) => {
            console.log(error); 
        })
    }

    rootNav = () => {
        if(!this.state.isLoading && this.state.notifications && !this.state.fontIsLoading) {
            this.props.navigation.navigate("App");
        } else {
            this.props.navigation.navigate("Onboard");
        }
    }

    render() {
      return (
        <View stlyle={styles.container}>
            <Image
                style = {styles.bg}
                source = { require ('../assets/img/splash_bg.png') }
            />
            <View style = {styles.logo}>
                <Image
                    source = { require ('../assets/img/logo_color.png') }
                />
            </View>
            <Text style = {styles.version}>
                V 1.0
            </Text>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        justifyContent: "center",
        alignItems: "center"
    },

    bg: {
        height: '100%',
        width: '100%'
    },

    logo: {
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0,
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center'
    },

    version: {
        width: '100%',
        position: 'absolute',
        textAlign: 'center',
        bottom: hp('10%'),
        color: '#b3b3b3',
        fontSize: 14
    }
});