import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Button, ScrollView} from 'react-native';
import { Player } from '../utils/dataDef';
import baseStyles from '../utils/styles';

export default class PlayerList extends Component {
    _renderItem = ((player, index) => {
        const fontWeight = index === this.props.currentPlayer ? 'bold' : 'normal';
        const strikeThrough = !player.active ? { textDecorationLine: 'line-through', textDecorationColor: baseStyles.colors.secondaryDark } : {};
        return(
            <View key={index} style={ styles.row }>
                    <Text style={{flex: 4, ...strikeThrough }} >{player.name}</Text>
                    <Text style={{flex: 1, fontWeight: fontWeight, textAlign: 'right', marginRight: 10}} >{player.score}</Text>
                <Button style={{flex: 1, alignSelf: 'flex-end'}} color='red' onPress={() => this.props.onDelete(index)} title="×"/>
            </View>
        )
    });

    render() {
        return (
            <ScrollView style={styles.container}>
                {this.props.players.map(this._renderItem)}
            </ScrollView>
        );
    }
}

PlayerList.propTypes =  {
    onDelete: PropTypes.func.isRequired,
    players: PropTypes.arrayOf(PropTypes.instanceOf(Player)).isRequired
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 5
    },
    row: {
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 2
    }
});