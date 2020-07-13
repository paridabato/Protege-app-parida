import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import First from './pages/FirstPage';
import Second from './pages/SecondPage';
import Third from './pages/ThirdPage';
import Main from './pages/MainPage';
import Post from './pages/PostPage';
import Terms from './pages/Terms';
import SplashScreen from './pages/Splashscreen';

const App = createStackNavigator({
    Home: {
      screen: Main,
      navigationOptions: {
        gestureEnabled: false,
        headerLeft: () =>null
      }
    },
    Post: {
        screen: Post
    },
    Terms: {
      screen: Terms
    }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  });

const OnBoarding = createStackNavigator({
    First: { screen: First },
    Second: { screen: Second },
    Third: { screen: Third },
    },
    {
        initialRouteName: 'First',
        headerMode: 'none'
    }
);

const RootNavigator = createSwitchNavigator(
  {
    Splash: SplashScreen,
    App: App,
    Onboard: OnBoarding,
  },
  {
    initialRouteName: 'Splash',
  }
);

export default createAppContainer(RootNavigator);