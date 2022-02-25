import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import title from "../assets/title.png";
import historyBtn from "../assets/historyBtn.png";
import Profilestatistics from "../components/ProfileStatistic";
import Login from "./Login";
import {
	TouchableOpacity,
	ImageBackground,
	ScrollView,
	Image,
	StyleSheet,
	Text,
	View,
	KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/user";
export default function Profile({ navigation }) {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);

	const handleLogout = () => {
		navigation.navigate("Home");
		AsyncStorage.removeItem("user");
		dispatch(logout());
	};
	return (
		<View>
			{user ? (
				<View>
					<TouchableOpacity
						onPress={() => navigation.navigate("Home")}
						style={{
							height: 40,
							backgroundColor: "#5571A3",
							width: 100,
							borderRadius: 15,
							alignSelf: "flex-start",
							marginLeft: 10,
							marginTop: 40,
							borderRadius: 100,
						}}
					>
						<Text
							style={{
								color: "white",
								fontWeight: "bold",
								alignSelf: "center",
								fontSize: 20,
								marginTop: 5,
							}}
						>
							Back
						</Text>
					</TouchableOpacity>
					<View style={styles.btnSection}>
						<TouchableOpacity onPress={() => navigation.navigate("Profile")}>
							<View style={styles.profileBtn}>
								<Text style={styles.btnText}> Profile</Text>
							</View>
						</TouchableOpacity>
					</View>
					<View style={styles.profileImgContainer}>
						<Image
							style={styles.profileImg}
							source={{
								uri: user.user.profile_photo_url,
							}}
						/>
					</View>
					<View style={styles.midSection}>
						<View style={{ marginLeft: 10 }}>
							<Text style={styles.userName}>{user.user.name}</Text>
						</View>
					</View>
					<Profilestatistics />
					<TouchableOpacity
						style={styles.logout}
						onPress={() => handleLogout()}
					>
						<Text
							style={{
								color: "white",
								fontWeight: "bold",
								alignSelf: "center",
								fontSize: 20,
							}}
						>
							Logout
						</Text>
					</TouchableOpacity>
				</View>
			) : (
				<Login />
			)}
		</View>
	);
}
const styles = StyleSheet.create({
	logout: {
		height: 30,
		backgroundColor: "#5571A3",
		width: 120,
		borderRadius: 15,
		marginLeft: 30,
		marginTop: 20,
	},
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
	midSection1: {
		flexDirection: "row",
		margin: 8,
		height: 50,
	},
	midSection: {
		alignSelf: "center",
		marginTop: 10,
		marginBottom: 10,
		width: 320,
	},
});
