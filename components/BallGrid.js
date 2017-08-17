import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Button, Text} from 'react-native';
import { Ball, playTypes } from '../utils/dataDef';

export default class BallGrid extends Component {
    render() {
        return (
            <View style={styles.container}>
                {Object.keys(this.props.balls).map((number) => {
                    let ball = this.props.balls[number];
                    return (
                        <View style={styles.ballWrapper} key={ball.number} >
                            { ball.active ?
                                <Button style={styles.ball}
                                        color={playTypes[this.props.type].color}
                                        onPress={() => this.props.onPress(this.props.type, ball.number)}
                                        title={number + ''}/>
                                : <Text style={{textAlign: 'center', color: '#777'}}>{number + ''}</Text>
                            }
                        </View>)
                    })}
            </View>
        );
    }
}

BallGrid.propTypes = {
    balls: PropTypes.objectOf(PropTypes.instanceOf(Ball)).isRequired,
    type: PropTypes.oneOf(['port', 'foulPort']).isRequired,
    onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    ballWrapper: {
        width: '33%',
        padding: 10,
        justifyContent: 'center'
    },
    ball: {
        borderRadius: 50,
    }
});

