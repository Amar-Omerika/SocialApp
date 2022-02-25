import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Image, StyleSheet, View } from "react-native";
import logo from "../assets/logo.png";
import popular from "../assets/popular.png";
import notification from "../assets/notification.png";

export default function Header({ navigation }) {
	return (
		<View>
			<View style={styles.header}>
				<Image style={styles.logo} source={logo} />
				<View style={styles.icons}>
					<TouchableOpacity>
						<Image style={styles.iconPopular} source={popular} />
					</TouchableOpacity>
					<TouchableOpacity>
						<Image source={notification} />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	header: {
		backgroundColor: "#132C58",
		height: 84,
		flexDirection: "row",
	},
	logo: {
		marginTop: 30,
		marginLeft: 15,
		height: 50,
		width: 50,
	},

	iconPopular: { marginRight: 20 },
	icons: {
		flexDirection: "row",
		alignSelf: "flex-end",
		marginBottom: 10,
		marginLeft: 200,
	},
});
