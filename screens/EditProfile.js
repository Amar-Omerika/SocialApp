import React, { useState, useEffect } from "react";
import uploadImage from "../assets/uploadImage.png";

import {
	TouchableOpacity,
	ScrollView,
	Image,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function EditProfile({ navigation }) {
	const [Username, setUsername] = useState("");
	const [Email, setEmail] = useState("");
	const [Phone, setPhone] = useState("");
	return (
		<ScrollView>
			<View>
				<View style={styles.btnSection}>
					<TouchableOpacity onPress={() => navigation.navigate("Profile")}>
						<View style={styles.profileBtn}>
							<Text style={styles.btnText}> Profile</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
						<View style={styles.profileBtn1}>
							<Text style={styles.btnText1}> Edit Profile</Text>
						</View>
					</TouchableOpacity>
				</View>
				<View style={styles.pictureBox}>
					<TouchableOpacity style={styles.uploadImg}>
						<Image source={uploadImage} />
					</TouchableOpacity>
				</View>
				<View style={styles.midSection}>
					<View style={{ marginLeft: 10 }}>
						<Text style={styles.userName}>Senad Šantić</Text>
					</View>
				</View>
				<View style={{ width: 320, alignSelf: "center" }}>
					<Text style={{ fontSize: 20, marginTop: 5 }}>Username</Text>
					<View style={styles.inputField}>
						<TextInput
							style={styles.input}
							onChangeText={setUsername}
							placeholder="Username"
							value={Username}
						></TextInput>
					</View>
					<Text style={{ fontSize: 20, marginTop: 5 }}>Email</Text>
					<View style={styles.inputField}>
						<TextInput
							style={styles.input}
							onChangeText={setEmail}
							placeholder="Email"
							value={Email}
						></TextInput>
					</View>
					<TouchableOpacity style={styles.changePassBtn}>
						<Text
							style={{
								color: "white",
								fontWeight: "bold",
								alignSelf: "center",
								fontSize: 20,
								marginTop: 5,
							}}
						>
							Change Password
						</Text>
					</TouchableOpacity>
					<Text style={{ fontSize: 20, marginTop: 5 }}>Phone</Text>
					<View style={styles.inputField1}>
						<TextInput
							style={styles.input}
							onChangeText={setPhone}
							placeholder="+387"
							value={Phone}
						></TextInput>
					</View>

					<View
						style={{ width: 320, alignSelf: "center", flexDirection: "row" }}
					>
						<TouchableOpacity style={styles.save}>
							<Text
								style={{
									color: "white",
									fontWeight: "bold",
									alignSelf: "center",
									fontSize: 20,
									marginTop: 5,
								}}
							>
								Save
							</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.cancel}>
							<Text
								style={{
									color: "white",
									fontWeight: "bold",
									alignSelf: "center",
									fontSize: 20,
									marginTop: 5,
								}}
							>
								Cancel
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	btnSection: {
		marginTop: 50,
		alignSelf: "center",
		flexDirection: "row",
	},
	profileBtn: {
		width: 150,
		height: 37,
		backgroundColor: "#5571A3",
		borderRadius: 15,
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
	},
	profileBtn1: {
		width: 150,
		height: 37,
		backgroundColor: "white",
		borderBottomRightRadius: 15,
		borderTopRightRadius: 15,
		marginLeft: -1,
	},
	btnText: {
		color: "white",
		alignSelf: "center",
		fontWeight: "bold",
		fontSize: 18,
		marginTop: 5,
		marginBottom: 5,
		marginRight: 10,
	},
	btnText1: {
		color: "black",
		alignSelf: "center",
		fontWeight: "bold",
		fontSize: 18,
		marginTop: 5,
		marginBottom: 5,
	},
	profileImgContainer: {
		alignSelf: "center",
	},
	profileImg: {
		width: 108,
		height: 108,
		borderRadius: 100,
		marginTop: 25,
		borderColor: "white",
		borderWidth: 3,
	},
	userName: {
		fontSize: 20,
	},

	midSection: {
		alignSelf: "center",
		marginTop: 10,
		width: 320,
	},
	pictureBox: {
		backgroundColor: "white",
		height: 186,
		width: 186,
		borderRadius: 90,
		alignSelf: "center",
		marginTop: 50,
		width: 128,
		height: 128,
		borderRadius: 100,
	},
	uploadImg: {
		marginTop: 50,
		marginLeft: 70,
	},
	input: {
		color: "#8F8282",
		marginLeft: 5,
		width: 300,
	},
	inputPhone: {
		color: "#8F8282",
		marginLeft: 5,
		width: 300,
	},
	inputField: {
		backgroundColor: "white",
		borderRadius: 5,
		flexDirection: "row",
		marginTop: 8,
		width: 320,
		alignSelf: "center",
		height: 39,
		alignItems: "center",
		paddingLeft: 5,
	},
	inputField1: {
		backgroundColor: "white",
		borderRadius: 5,
		flexDirection: "row",
		marginTop: 12,
		width: 320,
		alignSelf: "center",
		height: 39,
		alignItems: "center",
		paddingLeft: 5,
	},
	changePassBtn: {
		height: 40,
		backgroundColor: "#5571A3",
		width: 320,
		borderRadius: 15,
		alignSelf: "center",
		marginTop: 20,
		borderRadius: 8,
	},
	save: {
		height: 40,
		backgroundColor: "#5571A3",
		width: 150,
		borderRadius: 15,
		marginTop: 20,
		borderRadius: 8,
	},
	cancel: {
		height: 40,
		backgroundColor: "#5571A3",
		width: 150,
		borderRadius: 15,
		marginTop: 20,
		marginLeft: 18,
		borderRadius: 8,
	},
});
