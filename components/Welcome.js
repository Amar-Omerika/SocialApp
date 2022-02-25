import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import background from "../assets/background.png";

export default function Welcome() {
	return (
		<View style={styles.mainContaine}>
			<View style={styles.topContainer}>
				<ImageBackground
					source={background}
					resizeMode="cover"
					style={styles.image}
				>
					<Text style={styles.headerTitle}>Postani i ti dio ZenZone</Text>
					<Text style={styles.headerText1}>
						Prijavi se postavi svoje aktivnosti i
					</Text>
					<Text style={styles.headerText2}>sudjeluj u dnevnim izazovima</Text>
				</ImageBackground>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	mainContaine: {
		alignSelf: "center",
	},
	topContainer: {
		backgroundColor: "white",
		width: 345,
		height: 239,
		margin: 10,
		marginTop: 0,
		alignSelf: "center",
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	headerTitle: {
		fontSize: 18,
		color: "#5571A3",
		width: 257,
		height: 34,
		marginTop: 10,
		marginLeft: 5,
	},
	headerText1: {
		fontSize: 15,
		color: "#5571A3",
		marginLeft: 10,
	},
	headerText2: {
		fontSize: 15,
		color: "#5571A3",
		marginLeft: 25,
	},

	image: {
		flex: 1,
	},
});
