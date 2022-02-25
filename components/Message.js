import React, { useState, useEffect, Component } from "react";
import { TouchableOpacity } from "react-native";
import { Text, Image, StyleSheet, View, Picker } from "react-native";
import { Dropdown } from "react-native-material-dropdown";

class Message extends Component {
	state = { gender: "" };
	showGender = (option) => {
		alert(option);
		this.setState({ gender: option });
	};
	render() {
		return (
			<View style={styles.body}>
				<Text style={styles.text}>neki dropdown</Text>
				<Picker
					onValueChange={this.showGender}
					selectedValue={this.state.gender}
				>
					<Picker.Item label="Male" value="male" />
					<Picker.Item label="Fmael" value="Fmael" />
					<Picker.Item label="Nesto" value="nesto" />
				</Picker>
			</View>
		);
	}
}

export default Message;
const styles = StyleSheet.create({
	text: {
		fontSize: 20,
		alignContent: "center",
	},
	body: {
		flex: 1,
		margin: 30,
	},
});
