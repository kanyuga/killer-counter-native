import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Modal, StyleSheet, View} from 'react-native';
import AppButton from "./AppButton";


export default class PlayerModal extends Component {
    render() {
        return (
            <Modal
                    animationType="slide"
                    transparent={true}
                    visible={true}
                    onRequestClose={this.props.onRequestClose}
                >
                  <View style={styles.container}>
                    <View style={{display: 'flex', alignItems: 'flex-end'}}>
                      <AppButton style={styles.close} title="Close ×" onPress={this.props.onRequestClose}/>
                    </View>
                    <View>
                      {this.props.children}
                    </View>
                  </View>
                </Modal>
        );
    }
}

PlayerModal.propTypes = {
    children: PropTypes.element.isRequired
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'rgba(0,0,0, 0.8)'
  },
  close: {
    backgroundColor: '#111'
  }
});