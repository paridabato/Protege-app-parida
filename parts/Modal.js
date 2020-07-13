import React, { Component } from 'react';
import { Modal } from 'react-native';
import Profile from './modal_parts/ModalProfile';
import EditProfile from './modal_parts/ModalProfileEdit';
import Notifications from './modal_parts/ModalNotifications';

export default class UserModal extends Component {
    constructor(props) {
        super(props);
        this.state={
            nav: props.navigate
        }
    }

    displayPage() {
        if(this.props.page == 'profile') {
            return(<Profile navigate={this.state.nav} showModal={this.props.showModal} setPage={this.props.setPage} hideModal={this.props.hideModal}/>)
        } else if (this.props.page == 'edit') {
            return(<EditProfile setPage={this.props.setPage}/>)
        } else if (this.props.page === 'notifications') {
            return(<Notifications setPage={this.props.setPage}/>)
        }
    }

    render(){
        return (
            <Modal
                style={{margin: 0}}
                animationType="push"
                transparent={true}
                visible={this.props.modalStatus}
                onRequestClose={() => {
                    console.warn('Modal has been closed.');
                }}>
                {this.displayPage()}
            </Modal>
        );
    }
}