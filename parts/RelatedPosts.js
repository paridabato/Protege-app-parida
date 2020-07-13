import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import PostPreviewSmall from './PostPreviewSmall';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { strings } from '../translate';

export default class RelatedPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme_name: props.theme_name,
            post_id: props.post_id,
            isLoading: true,
            lang: props.lang,
            relPosts: []
        }
    }

    componentDidMount() {
        this.getRelatedPosts()
    }

    getRelatedPosts() {
        var param = new Object();
        param.theme = this.state.theme_name;
        param.offset = 0;
        param.limit = 3;
        param.lang = this.state.lang;

        var data = new FormData();
        data.append("func", "getPostsByTheme");
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
                relPosts: responseJson
            })
        })
        .catch((error) => {
            console.error(error);
        });
    }

    renderPosts() {
        return this.state.relPosts.map((item) => {
            if(item.id != this.state.post_id) {
                return (
                    <PostPreviewSmall key={item.id} postData={item} nav={this.props.navigate} />
                );
            }
        });
    }

    content () {
        if (this.state.isLoading){
            return (
                <View>
                    <ActivityIndicator size="large" color="#3da2c0" />
                </View>
            )
        } else if(this.state.relPosts.length > 1){
            return (
                <View style={ styles.relContainer}>
                    <Text style={ styles.relTitle}>{strings('post.rel')}</Text>
                    <View style={{marginHorizontal: -wp('5.53%'),paddingBottom: hp('6.47%'),}}>
                        { this.renderPosts() }
                    </View>
                </View>
            )
        } else {
            return (
                <View></View>
            )
        }
    }

    render() {
        return this.content();
    }
}

const styles = StyleSheet.create({
    relContainer: {
        borderTopColor: '#eee',
        borderTopWidth: 1,
        paddingTop: hp('4.7%')
    },

    relTitle: {
        fontFamily: 'medium',
        fontSize: hp('3.23%'),
        color: '#4d4d4d',
        marginBottom: hp('4.9%'),
    }
})