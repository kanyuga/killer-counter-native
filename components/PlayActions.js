import React, {Component} from 'react';
import { StyleSheet, View, Button } from 'react-native';
import playTypes from '../utils/PlayTypes.js';

export default class PlayActions extends Component {
    render() {
        return (
            <View style={styles.playActions}>
                { Object.keys(playTypes).map((button) => (
                    <View key={button} style={styles.buttonWrapper}>
                        <Button style={styles.button} onPress={() => this.props.onPress(button)} title={playTypes[button]} key={button} />
                        {this.props.type === button && this.props.children}
                    </View>
                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    playActions: {
        flex: 1,
        width: '100%'
    },
    buttonWrapper: {
        margin: 5
    },
    button: {
        width: '100%',
        margin: 5,
    }
});