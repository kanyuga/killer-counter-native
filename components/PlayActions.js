import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Button } from 'react-native';
import { playTypes } from '../utils/dataDef.js';

export default class PlayActions extends Component {
    render() {
        return (
            <View style={styles.playActions}>
                { Object.keys(playTypes).map((button) => (
                    <View key={button} style={styles.buttonWrapper}>
                        <Button
                            style={styles.button}
                            color={playTypes[button].color}
                            onPress={() => this.props.onPress(button)}
                            title={playTypes[button].label}
                            key={button}
                        />
                        {this.props.type === button && this.props.children}
                    </View>
                ))}
            </View>
        );
    }
}

PlayActions.propTypes = {
    children: PropTypes.element,
    type: PropTypes.oneOf(['port', 'foulPort']).isRequired,
    onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    playActions: {
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