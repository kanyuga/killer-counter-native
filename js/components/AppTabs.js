import React, {Component} from 'react';
import Tabs from 'react-native-tabs';
import {ScrollView, StyleSheet, View} from "react-native";
import AppText from './AppText';

export default class AppTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 1
    }
  }

  switchTab(index) {
    this.setState({
      currentTab: index
    })
  };

  render() {
    return (
      <ScrollView
        stickyHeaderIndices={[0]}
        style={{ paddingHorizontal: 10 }}
      >
        <View style={{height: 50}}>
          <Tabs
            selected={this.state.currentTab}
            onSelect={(el) => { this.switchTab(el.props.name) }}
            iconStyle={styles.tab}
            selectedIconStyle={styles.selectedTab}
            selectedStyle={styles.selectedTabText}
          >
            <AppText name={1} style={styles.text}>Players</AppText>
            <AppText name={2} style={styles.text}>Leaderboard</AppText>
            <AppText name={3} style={styles.text}>Log</AppText>
          </Tabs>
        </View>
        <View>
          {this.props.children[this.state.currentTab - 1]}
        </View>
      </ScrollView>
    );
  }
}

Tabs.propTypes = {

};

const styles = StyleSheet.create({
  tabWrapper : {
    display: 'flex',
    flexDirection: 'row'
  },
  tab : {
    backgroundColor: '#222',
    flex: 1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    borderBottomColor: '#333'
  },
  selectedTab: {
    backgroundColor: 'black',
    borderTopColor: '#333',
    borderBottomColor: 'transparent'
  },
  selectedTabText: {
    color: 'white'
  },
  text: {
    color: '#aaa'
  },
  button: {
    color: '#ffffff'
  }
});