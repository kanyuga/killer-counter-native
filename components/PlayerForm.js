import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Button } from 'react-native';


export default class PlayerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {name: ''};
    }

    handlePress = () => {
        this.props.onSubmit(this.state.name);
        this.setState({ name: '' });
    };

    render () {
        return (
            <View style={{flexDirection: 'row', width : '100%'}}>
                <TextInput
                    style={{flex: 3, paddingVertical: 0}}
                    placeholder="Enter Player Name"
                    value={this.state.name}
                    onChangeText={(name) => this.setState({name})}
                    onSubmitEditing={this.handlePress}
                    returnKeyType="done"
                    autoFocus
                />
                <Button style={{flex: 2}}
                        onPress={this.handlePress}
                        title="Add"
                />
            </View>
        )
    }
}

PlayerForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};