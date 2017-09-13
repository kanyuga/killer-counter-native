import React from 'react';
import {View} from "react-native";
import {undo} from "../actions";
import {connect} from "react-redux";
import AppText from './AppText';
import AppButton from './AppButton';

let PlayLog = (props) => {
  console.log(props.playLog);
  return (
    <View style={{ backgroundColor: '#333' }}>
      <AppText>View Log</AppText>
      {props.playLog.map((log, index) => (
        <AppText
          key={index}
          style = {{color : 'white' }}>
          {index + 1}: {log.log}
        </AppText>
      ))}
      {props.playLog.length > 0 &&
        <AppButton onPress={() => props.undo()} title="Undo"/>
      }
    </View>
  );
};

const mapStateToProps = state => ({ playLog: state.playLog });
const mapDispatchToProps = dispatch => ({
  undo: () => dispatch(undo())
});

PlayLog = connect(mapStateToProps, mapDispatchToProps)(PlayLog);
export default PlayLog;