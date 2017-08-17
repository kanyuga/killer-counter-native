import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Modal, StyleSheet, View} from 'react-native';

export default class PlayerModal extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={true}
                    style={styles.modal}
                    onRequestClose={this.props.onRequestClose}
                >
                    {this.props.children}
                    <Button title="Close" color="black" onPress={this.props.onRequestClose}/>
                </Modal>
            </View>
        );
    }
}

PlayerModal.propTypes = {
    children: PropTypes.element.isRequired
};

const styles = StyleSheet.create({
    container: {
        marginTop: 22,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    modal: {

    }
});