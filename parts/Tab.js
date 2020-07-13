import React, { Component } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import PostPreviewSmall from './PostPreviewSmall';
import PostPreviewBig from './PostPreviewBig';
import PostPreviewLandscape from './PostPreviewLandscape';
import i18n from '../translate';
import { strings } from '../translate';

export default class Tab extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            tab: props.tabLabel,
            theme_name: props.postsData,
            lang: i18n.locale.includes('fr') ? 'fr' : 'en',
            posts: [],
            func: props.func,
            refreshing: false,
            page: 0,
            postPerPage: 3,
            seed: 1,
            orientation: props.orientation
        }
    }

    componentDidMount() {
        this.getPostsByTheme();
    }

    getPostsByTheme = () => {
        var param = new Object();
        param.theme = this.state.theme_name;
        param.limit = this.state.postPerPage;
        param.lang = this.state.lang;
        if(this.state.page !=0){
            param.offset = this.state.page * this.state.postPerPage;
        } else {
            param.offset = this.state.page;
        }
        var data = new FormData();
        data.append("func", this.state.func);
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
            if(responseJson.length) {
                this.state.page == 0 ?
                    this.setState({
                        posts: responseJson,
                        isLoading: false
                    })
                    :
                    this.setState({
                        posts: this.state.posts.concat(responseJson),
                        isLoading: false
                    })
            } else {
                this.setState({
                    isLoading: false
                })
            }
        })
        .finally(()=>this.setState({refreshing: false}))
        .catch((error) => {
            console.error(error);
        });
    }

    handleRefresh = () => {
        this.setState({
            refreshing: true,
            page: 0,
            seed: this.state.seed + 1
        },
        ()=> {
        this.getPostsByTheme();
        })
    }

    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1
        },
        () =>{
        this.getPostsByTheme();
        })
    }

    render() {
        if (this.state.isLoading){
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size="large" color="#3da2c0" />
                </View>
            )
        } else {
            if(this.state.posts.length) {
            if (this.state.orientation === 'portrait') {
            return (
                            <View style={ styles.container }>
                                <FlatList
                                    data={this.state.posts}
                                    renderItem={({ item, index }) => (
                                        index == 0 ?
                                        <PostPreviewBig postData={item} nav={this.props.navigate} /> :
                                        <PostPreviewSmall postData={item} nav={this.props.navigate} />
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                    refreshing ={this.state.refreshing}
                                    onRefresh={this.handleRefresh}
                                    onEndReached={this.handleLoadMore}
                                    onEndReachedThreshold={0.02}
                                />
                            </View>
                            );
            }
            else {
            return (
                                        <View style={ styles.container } style={{ flexDirection: "row", flex: 1 }} >
                                            <FlatList
                                                data={this.state.posts}
                                                renderItem={({ item, index }) => (
                                                    <PostPreviewLandscape postData={item} nav={this.props.navigate} />
                                                )}
                                                keyExtractor={(item, index) => index.toString()}
                                                refreshing ={this.state.refreshing}
                                                onRefresh={this.handleRefresh}
                                                onEndReached={this.handleLoadMore}
                                                onEndReachedThreshold={0.02}
                                                numColumns = {3}
                                                horizontal={false}
                                            />
                                        </View>
                                        );
            }

            } else {
                return (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errrorText}>{strings('error.line_one')}</Text>
                        <Text style={styles.errrorText}>{strings('error.line_two')}</Text>
                    </View>
                )
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: hp('1.94%'),
        backgroundColor: '#f7f7f7',
        minHeight: '100%',
    },

    errorContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: hp('1.94%'),
        backgroundColor: '#f7f7f7',
        minHeight: '100%',
    },

    errrorText: {
        color: '#50b7b1',
        fontFamily: 'bold',
        fontSize: hp('2.05%')
    }
});