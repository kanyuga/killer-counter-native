import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import baseStyles from '../utils/styles';
import {deletePlayer} from "../actions";
import {connect} from "react-redux";
import AppButton from "./AppButton";
import AppText from "./AppText";

export class PlayerList extends Component {
    _renderItem = ((player, index) => {
        const fontWeight = player.current ? 'bold' : 'normal';
        const strikeThrough = !player.active ? { textDecorationLine: 'line-through', textDecorationColor: 'white' } : {};
        return(
            <View key={index} style={{ ...StyleSheet.flatten(styles.row), 'backgroundColor': player.current ? '#111' : player.active? 'black' : baseStyles.colors.secondaryDark }}>
                <AppText style={{flex: 4, fontWeight: fontWeight, ...strikeThrough }} >{player.name}</AppText>
                <AppText style={{flex: 1, fontWeight: fontWeight, textAlign: 'right', marginRight: 10, ...strikeThrough}} >{player.score}</AppText>
                <AppButton style={{flex: 1, alignSelf: 'flex-end', padding: 5, margin: 0 }} color={baseStyles.colors.secondaryLight} onPress={() => this.props.onDelete(index)} title="×"/>
            </View>
        )
    });

    render() {
        return (
            <View style={styles.container}>
                {this.props.players.map(this._renderItem)}
            </View>
        );
    }
}

PlayerList.propTypes =  {
    onDelete: PropTypes.func.isRequired,
    players: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 5
    },
    row: {
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 5
    }
});

const mapStateToProps = state => ({ players: state.players });
const mapDispatchToProps = dispatch => ( { onDelete: index => dispatch(deletePlayer(index))});


PlayerList = connect(mapStateToProps, mapDispatchToProps)(PlayerList);

export default PlayerList;