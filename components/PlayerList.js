import React, { Component } from 'react';
import {View, Text, Button, ScrollView} from 'react-native';

export default class PlayerList extends Component {
    _renderItem = ((player, index) => (
        <View key={index} style={{flexDirection: "row", alignItems: 'center', paddingVertical: 2}}>
            <Text style={{flex: 4}} >{player.name}</Text>
            <Text style={{flex: 1, textAlign: 'right', marginRight: 10}} >{player.score}</Text>
            <Button style={{flex: 1, alignSelf: 'flex-end'}} onPress={() => this.props.onDelete(index)} title="×"/>
        </View>
    ));

    render() {
        return (
            <ScrollView style={{ width: '100%', padding: 5}}>
                {this.props.players.map(this._renderItem)}
            </ScrollView>
        );
    }
}