import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	Alert,
} from "react-native";

import { Image } from "react-native";
import logo from "../assets/logo.png";
import email from "../assets/email.png";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
export default function Forgot() {
	const navigation = useNavigation();
	const [Email, setEmail] = useState("");
	const postData = async () => {
		axios("https://high-voltage-9884-backend.zendev.se/api/forgot-password", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			data: JSON.stringify({
				email: Email,
			}),
		}).then((res) => console.log(res.data));

		//setPostData(answer.data);
	};
	const forgotPass = () => {
		postData();
		navigation.navigate("Login");
	};
	return (
		<KeyboardAvoidingView>
			<View style={styles.container}>
				<ScrollView>
					<View style={styles.bluebg}>
						<View style={styles.circle}>
							<Image source={logo} />
						</View>
					</View>
					<View style={styles.inputContainer}>
						<Text style={styles.signUp}>Recovery</Text>

						<View style={styles.inputField}>
							<Image source={email} />
							<TextInput
								value={Email}
								style={styles.input}
								onChangeText={setEmail}
								placeholder="Email"
							></TextInput>
						</View>
						<View>
							<Text style={styles.bottomText}>
								Enter your email to reset the password
							</Text>
						</View>
						<TouchableOpacity onPress={() => forgotPass()}>
							<View style={styles.signUpBigger}>
								<Text style={styles.signUpText}>Send</Text>
							</View>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
	},

	circle: {
		height: 170,
		borderRadius: 85,
		backgroundColor: "#E5E5E5",
		width: 160,
		alignSelf: "center",
		marginTop: 80,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 1,
	},
	bluebg: {
		height: 170,
		backgroundColor: "#132C58",
	},
	inputContainer: {
		height: 640,
		zIndex: -1,
	},
	signUp: {
		fontSize: 40,
		alignSelf: "center",
		marginTop: 125,
		fontWeight: "bold",
		color: "#928181",
	},
	input: {
		color: "#8F8282",
		marginLeft: 10,
		width: 300,
	},
	signUpBigger: {
		height: 39,
		backgroundColor: "#D98B7E",
		marginTop: 30,
		marginLeft: 60,
		marginRight: 60,
		borderRadius: 50,
		shadowColor: "black",
		shadowOpacity: 0.4,
		elevation: 8,
		shadowRadius: 20,
		shadowOffset: { width: 1, height: 13 },
	},
	signUpText: {
		color: "white",
		alignSelf: "center",
		margin: 10,
		fontWeight: "bold",
	},
	bottomText: {
		color: "#928181",
		alignSelf: "center",
		margin: 15,
	},
	inputField: {
		borderWidth: 1,
		borderColor: "#C4C4C4",
		borderRadius: 5,
		flexDirection: "row",
		marginTop: 15,
		width: 240,
		alignSelf: "center",
		height: 39,
		alignItems: "center",
		paddingLeft: 5,
	},
});
