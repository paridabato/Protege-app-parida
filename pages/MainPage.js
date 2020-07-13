import React, { Component } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import Header from '../parts/Header';
import Content from '../parts/Content';
import Modal from '../parts/Modal';
import Constants from 'expo-constants';
import Moment from 'react-moment';
import 'moment/locale/fr';
import i18n from 'i18n-js';
import { Notifications } from 'expo';
import ApiBadgeReset from '../parts/ApiBadgeReset';
import * as Device from 'expo-device';
import { ScreenOrientation } from 'expo';


export default class MainPage extends Component {
  constructor(props){
    super(props);
    Device.getDeviceTypeAsync().then(val => {
      if(val != 2){
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      }
      else {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
        Dimensions.addEventListener('change', () => {
          this.setState({
            orientation: isPortrait() ? 'portrait' : 'landscape'
          });
        });
      }
    });


    const isPortrait = () => {
          const dim = Dimensions.get('screen');
          return dim.height >= dim.width;
        };
    this.state = {
      notification: null,
      modalShow: false,
      bg: {fadeIn: new Animated.Value(0)},
      modalPage: 'profile',
      lang: i18n.locale.includes('fr') ? 'fr' : 'en',
      orientation: isPortrait() ? 'portrait' : 'landscape'
    };


  }

  componentDidMount() {
    Moment.globalFormat = 'D MMMM YYYY';
    this.setMomentLocale();
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  componentDidUpdate() {
    if(this.state.modalShow) {
      Animated.timing(this.state.bg.fadeIn, {
        toValue: 0.5,
        duration: 500,
        useNativeDriver: true
      }).start();
    }
  }

  _handleNotification = notification => {
    this.setState({ notification: notification.data.post_id });
    if(this.state.notification){
      this.props.navigation.push('Post', {
        postData: this.state.notification, lang: this.state.lang
      });
      Notifications.setBadgeNumberAsync(0);
      ApiBadgeReset();
    }
  };

  showModal = () => {
    this.setState({
      modalShow: !this.state.modalShow
    });
  }

  hideModal = () => {
    this.setState({
      modalShow: false
    });
  }

  setPage = (page) => {
    this.setState({
      modalPage: page
    })
  }

  setMomentLocale() {
    if (i18n.locale.includes('fr')) {
      Moment.globalLocale = 'fr';
    } else {
      Moment.globalLocale = 'en';
    }
  }

  render() {
    let fadeIn = this.state.bg.fadeIn;
    if (this.state.orientation === 'portrait') {
    return (
            <View style={styles.container}>
              <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: '#3da2c0' }} />
              <Header showModal={this.showModal} />
              <Content navigate={this.props.navigation} orientation={this.state.orientation} />
              <Modal navigate={this.props.navigation} modalStatus={this.state.modalShow} hideModal={this.hideModal} showModal={this.showModal} page={this.state.modalPage} setPage={this.setPage}/>
              {this.state.modalShow ?
                <Animated.View style={{backgroundColor: '#000', position: 'absolute', height: '100%', width: '100%', opacity: fadeIn}}/>:
                null
              }
            </View>
        );
    }
    else {
    return (
                <View style={styles.container}>
                  <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: '#3da2c0' }} />
                  <Content navigate={this.props.navigation} orientation={this.state.orientation}/>
                </View>
            );
    }
  }

}

const STATUS_BAR_HEIGHT = Constants.statusBarHeight

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
    zIndex: 2
  }
});