import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Picker,
  TextInput,
  Button,
  AsyncStorage,
  View,
  Modal
} from 'react-native';
import { mainStyles } from '../../styles/main_styles.js';
import SetupStyles from '../../styles/setup_styles.js';
import Notifications from '../../util/notifications.js';

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: this.props.interval,
      start: this.props.start,
      end: this.props.end
    };
  }

  saveDetails() {
    const interval = this.state.interval;
    const start = this.state.start;
    const end = this.state.end;
    if (interval && start && end) {
      AsyncStorage.setItem("start", start)
      .then(() => this.props.receiveStart(start))
      .then(() => this.props.hideStart());
    }
    let notificationObject = new Notifications(this.props.notificationTimeoutID);
    notificationObject.clearAllNotifications();
    notificationObject.setDayNotifications(interval, start, end);
    notificationObject.setFutureNotifications(interval, start, end);
    this.props.receiveNotificationObject(notificationObject.timeoutID);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      interval: newProps.interval,
      start: newProps.start,
      end: newProps.end
    });
  }

  render() {
    console.log(`beans ${this.props.show}`);
    return (
      <Modal
        animationType={"fade"}
        visible={this.props.show}
        style={SetupStyles.container}>
        <Text>Select a start time for notifications:</Text>
        <Picker
          selectedValue={this.state.start}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({start: itemValue});
          }}>
          <Picker.Item label='12:00 AM' value={`${0}`} />
          <Picker.Item label='1:00 AM' value={`${1}`} />
          <Picker.Item label='2:00 AM' value={`${2}`} />
          <Picker.Item label='3:00 AM' value={`${3}`} />
          <Picker.Item label='4:00 AM' value={`${4}`} />
          <Picker.Item label='5:00 AM' value={`${5}`} />
          <Picker.Item label='6:00 AM' value={`${6}`} />
          <Picker.Item label='7:00 AM' value={`${7}`} />
          <Picker.Item label='8:00 AM' value={`${8}`} />
          <Picker.Item label='9:00 AM' value={`${9}`} />
          <Picker.Item label='10:00 AM' value={`${10}`} />
          <Picker.Item label='11:00 AM' value={`${11}`} />
          <Picker.Item label='12:00 PM' value={`${12}`} />
          <Picker.Item label='1:00 PM' value={`${13}`} />
          <Picker.Item label='2:00 PM' value={`${14}`} />
          <Picker.Item label='3:00 PM' value={`${15}`} />
          <Picker.Item label='4:00 PM' value={`${16}`} />
          <Picker.Item label='5:00 PM' value={`${17}`} />
          <Picker.Item label='6:00 PM' value={`${18}`} />
          <Picker.Item label='7:00 PM' value={`${19}`} />
          <Picker.Item label='8:00 PM' value={`${20}`} />
          <Picker.Item label='9:00 PM' value={`${21}`} />
          <Picker.Item label='10:00 PM' value={`${22}`} />
          <Picker.Item label='11:00 PM' value={`${23}`} />
        </Picker>
        <Button
          onPress={() => this.saveDetails()}
          title="Save"
          style={SetupStyles.button}
        />
    </Modal>
    );
  }
}

export default Start;
