import React, { useState, useEffect } from "react";
import {
	KeyboardAvoidingView,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { StyleSheet, Text, View, Image, Modal, Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import uploadImage from "../assets/uploadImage.png";
import { useSelector } from "react-redux";
import Login from "./Login";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";

export default function Add() {
	const [title, setTitle] = useState();
	const [description, setDescription] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const [modalVisible1, setModalVisible1] = useState(false);
	const [data, setData] = useState([]);
	const [activitydata, setActivityData] = useState([]);
	const [image, setImage] = useState(null);
	const [category, setCategory] = useState("Category");
	const { user } = useSelector((state) => state.user);
	const navigation = useNavigation();
	const isFocused = useIsFocused();
	const [count, setCounter] = useState(0);

	const getData = async () => {
		const res = await fetch(
			"https://high-voltage-9884-backend.zendev.se/api/categories",
			{
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
			}
		);
		const answer = await res.json();
		setData(answer.data);
	};

	const getActivitiy = async () => {
		const res = await fetch(
			"https://high-voltage-9884-backend.zendev.se/api/activities",
			{
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
			}
		);
		const answer = await res.json();
		setActivityData(answer.data);
	};

	const postData = async (formdata) => {
		axios(
			"https://high-voltage-9884-backend.zendev.se/api/AddUserActivity",
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
				data: formdata,
			},
			setCounter(count + 1)
		).then((res) => console.log(res.data));

		//setPostData(answer.data);
	};

	useEffect(() => {
		let mounted = true;
		if (mounted) getData(data);
		return () => (mounted = false);
	});

	useEffect(() => {
		let mounted = true;
		if (mounted) getActivitiy(activitydata);
		return () => (mounted = false);
	});

	useEffect(() => {
		(async () => {
			if (Platform.OS !== "web") {
				const { status } =
					await ImagePicker.requestMediaLibraryPermissionsAsync();
				await ImagePicker.requestCameraPermissionsAsync();
				if (status !== "granted") {
					alert("Sorry, we need camera roll permissions to make this work!");
				}
			}
		})();
	}, []);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			base64: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.cancelled) {
			setImage({ uri: result.uri, base64: result.base64 });
		}
	};
	const takeImage = async () => {
		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: false,
			base64: true,
		});

		console.log(result.uri);

		if (!result.cancelled) {
			setImage({ uri: result.uri, base64: result.base64 });
		}
	};
	const addPost = () => {
		/*if (!title) {
			return alert("Popunite fieldove ");
		}*/
		const formdata = {
			file: image ? image.base64 : null,
			description: description,
			category_id: category,
			name: title,
		};

		postData(formdata);

		navigation.navigate("Home");
	};

	return (
		<ScrollView>
			{user ? (
				<View>
					<View style={styles.container}>
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
						<View style={styles.pictureBox}>
							<TouchableOpacity
								style={styles.uploadImg}
								onPress={() => pickImage()}
							>
								<Image source={uploadImage} />
							</TouchableOpacity>
							{image && (
								<Image
									source={{ uri: image.uri }}
									style={{
										height: 186,
										width: 186,
										borderRadius: 90,
										alignSelf: "center",
										marginLeft: -210,
									}}
								/>
							)}
						</View>
						<TouchableOpacity
							style={styles.takePictureBtn}
							onPress={() => takeImage()}
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
								Take Picture
							</Text>
						</TouchableOpacity>
						<KeyboardAvoidingView>
							<View style={styles.mainInputCont}>
								<TextInput
									style={styles.input}
									onChangeText={setTitle}
									placeholder="Add Title"
									value={title}
								></TextInput>
								<TextInput
									style={styles.input1}
									onChangeText={setDescription}
									placeholder="Add Description"
									value={description}
								></TextInput>
							</View>
						</KeyboardAvoidingView>
					</View>
					<View style={styles.centeredView}>
						<Modal
							animationType="slide"
							transparent={true}
							visible={modalVisible}
							onRequestClose={() => {
								setModalVisible(!modalVisible);
							}}
						>
							<View style={styles.centeredView}>
								<View style={styles.modalView}>
									<View style={[styles.button, styles.buttonClose]}>
										<Text style={styles.textStyle}>ZenOne</Text>
									</View>
									{data
										? data.map(function (data) {
												return (
													<View key={data.id}>
														<TouchableOpacity
															onPress={() => {
																setCategory(data.id);
																setModalVisible(!modalVisible);
															}}
														>
															<Text style={styles.modalText}>{data.name}</Text>
														</TouchableOpacity>
													</View>
												);
										  })
										: ""}
								</View>
							</View>
						</Modal>
						<Modal
							animationType="slide"
							transparent={true}
							visible={modalVisible1}
							onRequestClose={() => {
								setModalVisible1(!modalVisible1);
							}}
						>
							<View style={styles.centeredView}>
								<ScrollView>
									<View style={styles.modalView1}>
										<View style={[styles.button, styles.buttonClose]}>
											<Text style={styles.textStyle}>ZenOne</Text>
										</View>
										{activitydata
											? activitydata.map(function (activitydata, index) {
													return (
														<View key={activitydata.id}>
															<TouchableOpacity
																onPress={() => {
																	setTitles(activitydata.id);
																	setModalVisible1(!modalVisible1);
																}}
															>
																<Text style={styles.modalText}>
																	{activitydata.name}
																</Text>
															</TouchableOpacity>
														</View>
													);
											  })
											: ""}
									</View>
								</ScrollView>
							</View>
						</Modal>

						<Pressable
							style={[styles.button, styles.buttonOpen]}
							onPress={() => setModalVisible(true)}
						>
							<View style={styles.modal}>
								<View>
									<Text style={styles.textStyle1}>{category}</Text>
								</View>
							</View>
						</Pressable>

						<TouchableOpacity
							style={styles.takePictureBtn}
							onPress={() => addPost()}
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
								Post
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			) : (
				<Login />
			)}
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	pictureBox: {
		backgroundColor: "white",
		height: 186,
		width: 186,
		borderRadius: 90,
		alignSelf: "center",
		marginTop: 50,

		flexDirection: "row",
	},
	uploadImg: {
		marginTop: 100,
		marginLeft: 120,
		elevation: 3,
	},
	mainInputCont: {
		alignSelf: "center",
	},
	input: {
		color: "#8F8282",
		marginTop: 15,
		width: 300,
		height: 44,
		backgroundColor: "white",
		borderRadius: 8,
		textAlignVertical: "top",
	},
	input1: {
		textAlignVertical: "top",
		color: "#8F8282",
		marginTop: 15,
		width: 300,
		height: 44,
		backgroundColor: "white",
		borderRadius: 8,
		alignSelf: "center",
		height: 100,
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},

	button: {
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		padding: 10,
		width: 300,
	},
	buttonOpen: {
		backgroundColor: "white",
	},
	buttonClose: {
		backgroundColor: "#5571A3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		fontSize: 20,
	},
	textStyle1: {
		color: "grey",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginTop: 15,
		padding: 2,
		borderBottomWidth: 1,
		borderBottomColor: "#E5E5E5",
		width: 300,
		textAlign: "center",
	},
	modal: {
		flexDirection: "row",
	},
	takePictureBtn: {
		height: 40,
		backgroundColor: "#5571A3",
		width: 300,
		borderRadius: 15,
		alignSelf: "center",
		marginTop: 20,
		borderRadius: 8,
	},
	modalView1: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		//padding: 15,
		width: 300,
		height: 550,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		//padding: 15,
		width: 300,
		height: 320,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
});
