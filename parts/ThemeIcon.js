import React, { Component } from 'react';
import { View, Image } from 'react-native';

const icons = {
    Agriculture: require('../assets/img/agriculture.png'),
    Pêche: require('../assets/img/peche.png'),
    Coastal: require('../assets/img/peche.png'),
    Eau: require('../assets/img/eau.png'),
    Water: require('../assets/img/eau.png'),
    Espèces: require('../assets/img/especes.png'),
    Invasive: require('../assets/img/especes.png')
}

export default class ThemeIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: props.theme,
            iconSize: props.size
        }
    }

    componentDidMount() {
        if(this.state.theme){
            this.cutTheme(this.state.theme)
        }
    }

    cutTheme(theme) {
        var trimmedTheme = theme.split(' ')[0];
        this.setState({
            theme: trimmedTheme
        });
    }

    render() {
        return (
            <View style={[icon[this.state.iconSize].box, styles[this.state.theme]]}>
                <Image
                    resizeMode='contain'
                    style={ icon[this.state.iconSize].icon }
                    source={icons[this.state.theme]}
                />
            </View>
        )
    }
}

const icon = {
    iconBig: {
        box: {
            height: 134,
            width: 134,
            borderTopLeftRadius: 9999,
            borderTopRightRadius: 9999,
            borderBottomLeftRadius: 9999,
            borderBottomRightRadius: 9999,
            position: 'absolute',
            bottom: -65,
            right: -65
        },
    
        icon: {
            position: 'absolute',
            width: 28,
            height: 34,
            left: 30,
            top: 25
        }
    },

    iconSmall: {
        box: {
            height: 46,
            width: 46,
            borderTopLeftRadius: 9999,
            borderTopRightRadius: 9999,
            borderBottomLeftRadius: 9999,
            borderBottomRightRadius: 9999,
            position: 'absolute',
            bottom: -23,
            right: -23
        },
    
        icon: {
            position: 'absolute',
            width: 10,
            height: 10,
            left: 10,
            top: 8,
        }
    }
}

const styles = {

    Pêche: {
        backgroundColor: '#4bb1e3'
    },

    Agriculture: {
        backgroundColor: '#917d55'
    },

    Eau: {
        backgroundColor: '#50b7b1'
    },

    Espèces: {
        backgroundColor: '#eb8181'
    },

    Coastal: {
        backgroundColor: '#4bb1e3'
    },

    Water: {
        backgroundColor: '#50b7b1'
    },

    Invasive: {
        backgroundColor: '#eb8181'
    },
}