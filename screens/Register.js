import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
} from "react-native";

import { Image } from "react-native";
import logo from "../assets/logo.png";
import profile from "../assets/profile.png";
import password from "../assets/password.png";
import email from "../assets/email.png";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, userSelector } from "../store/user";
import { useNavigation } from "@react-navigation/native";
export default function Register() {
	const [Username, setUsername] = useState();
	const [Name, setName] = useState();
	const [Email, setEmail] = useState();
	const [Password, setPassword] = useState();
	const [Confirm, setConfrim] = useState();
	const [messageVisible, setMessageVisible] = useState(false);
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	const { errorMessage, isError } = useSelector((state) => state.user);
	const navigation = useNavigation();
	//Need to add redux here for user

	const handleRegister = () => {
		if (!Username || !Email || !Password || !Confirm) {
			if (!messageVisible) {
				setMessageVisible("Please check your inputs");
			}
			return;
		} else if (Confirm !== Password) {
			if (!messageVisible) {
				setMessageVisible("Please correct your password");
			}
			return;
		}
		dispatch(
			registerUser({
				name: Name,
				username: Username,
				password: Password,
				email: Email,
				password_confirmation: Confirm,
			})
		);
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
						<Text style={styles.signUp}>Sign Up</Text>

						<View style={styles.inputField}>
							<Image source={profile} />
							<TextInput
								value={Username}
								style={styles.input}
								onChangeText={setUsername}
								placeholder="Username"
							></TextInput>
						</View>
						<View style={styles.inputField}>
							<Image source={profile} />
							<TextInput
								value={Name}
								style={styles.input}
								onChangeText={setName}
								placeholder="Name"
							></TextInput>
						</View>
						<View style={styles.inputField}>
							<Image source={email} />
							<TextInput
								value={Email}
								style={styles.input}
								onChangeText={setEmail}
								placeholder="Email"
							></TextInput>
						</View>
						<View style={styles.inputField}>
							<Image source={password} />
							<TextInput
								value={Password}
								style={styles.input}
								onChangeText={setPassword}
								placeholder="Password"
								secureTextEntry={true}
							></TextInput>
						</View>
						<View style={styles.inputField}>
							<Image source={password} />
							<TextInput
								secureTextEntry={true}
								value={Confirm}
								style={styles.input}
								onChangeText={setConfrim}
								placeholder="Confrim Password"
							></TextInput>
						</View>
						<View style={{ width: 240, alignSelf: "center" }}>
							<Text style={{ color: "red", alignSelf: "center" }}>
								{isError ? errorMessage.email : null}
								{messageVisible}
							</Text>
						</View>
						<TouchableOpacity onPress={() => handleRegister()}>
							<View style={styles.signUpBigger}>
								<Text style={styles.signUpText}>Sign Up</Text>
							</View>
						</TouchableOpacity>

						<View>
							<Text
								style={styles.bottomText}
								onPress={() => navigation.navigate("Login")}
							>
								Do you have account? Sign in
							</Text>
						</View>
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
		marginTop: 90,
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
	alertBox: {
		backgroundColor: "red",
	},
});
