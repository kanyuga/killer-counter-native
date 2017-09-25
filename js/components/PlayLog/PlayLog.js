import React from 'react';
import {View} from "react-native";
import AppText from '../common/AppText';
import AppButton from '../common/AppButton';
import baseStyles from "../../utils/styles";

const PlayLog = (props) => (
  <View>
    {props.playLog.map((log, index) => (
      <AppText
        key={index}
        style={{
          padding: 10,
          color: log.type === 'success'
            ? baseStyles.colors.primaryLight
            : log.type === 'fail' ? baseStyles.colors.secondaryLight : 'white'
        }}>
        {index + 1}: {log.log}
      </AppText>
    ))
    }
    {props.playLog.length > 0 &&
      <AppButton
        onPress={props.undo}
        style={{marginHorizontal: 10}}
        title="Undo"
      />
    }
    </View>
);

export default PlayLog;