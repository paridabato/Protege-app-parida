import React, { Component } from 'react';
import { ScrollableTabView, ScrollableTabBar } from '@valdio/react-native-scrollable-tabview';
import Tab from './Tab';
import { strings } from '../translate';

export default class Content extends Component {
    constructor(props){
        super(props);
        this.state = {
            nav: props.navigate,
            currentTab: '#4fafcd',
            orientation: props.orientation
        }
    }

    onChangeTab = (tab) => {
        let colors= {
            0: '#4fafcd',
            1: '#917d55',
            2: '#4bb1e3',
            3: '#50b7b1',
            4: '#eb8181'
        }
        if(tab){
            this.setState({
                currentTab: colors[tab.i]
            })
        } else {
            return
        }
    }

    render() {
        return (
            <ScrollableTabView
                renderTabBar={() => <ScrollableTabBar/>}
                tabBarBackgroundColor='#fff'
                tabBarInactiveTextColor='#dadada'
                tabBarUnderlineStyle={{backgroundColor: this.state.currentTab}}
                tabBarActiveTextColor = {this.state.currentTab}
                showsHorizontalScrollIndicator={false}
                tabBarTextStyle={{ fontFamily: 'bold', fontSize: 16 }}
                onChangeTab = {this.onChangeTab}
            >
                <Tab tabLabel={strings('tabs.tab1')} postsData={'all'} func={'getAllPosts'} navigate={this.state.nav} orientation={this.props.orientation}/>
                <Tab tabLabel={strings('tabs.tab2')}  postsData={'Agriculture et foresterie'} func={'getPostsByTheme'} navigate={this.state.nav} orientation={this.props.orientation}/>
                <Tab tabLabel={strings('tabs.tab3')}  postsData={'Pêche côtière et aquaculture'} func={'getPostsByTheme'} navigate={this.state.nav} orientation={this.props.orientation}/>
                <Tab tabLabel={strings('tabs.tab4')}  postsData={'Eau'} func={'getPostsByTheme'} navigate={this.state.nav} orientation={this.props.orientation}/>
                <Tab tabLabel={strings('tabs.tab5')}  postsData={'Espèces envahissantes'} func={'getPostsByTheme'} navigate={this.state.nav} orientation={this.props.orientation}/>
            </ScrollableTabView>
        );
    }
}