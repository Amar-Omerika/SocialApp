import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { ScrollView, Image, StyleSheet, Text, View } from "react-native";
import star from "../assets/star.png";
import { useSelector } from "react-redux";
import activities from "../assets/activities.png";
import comments from "../assets/comment.png";
import likes from "../assets/likes.png";
import Login from "./Login";
import { useNavigation } from "@react-navigation/native";
export default function Leaderboard() {
	const [data, setData] = useState([]);
	const { user } = useSelector((state) => state.user);
	const navigation = useNavigation();
	const getData = async () => {
		const res = await fetch(
			"https://high-voltage-9884-backend.zendev.se/api/leaderboard",
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
	useEffect(() => {
		let mounted = true;
		if (mounted) getData(data);
		return () => (mounted = false);
	}, []);

	return (
		<View style={{ backgroundColor: "#E5E5E5" }}>
			<TouchableOpacity
				onPress={() => navigation.navigate("Home")}
				style={{
					height: 40,
					backgroundColor: "#5571A3",
					width: 100,
					borderRadius: 15,
					alignSelf: "flex-start",
					marginLeft: 10,
					marginTop: 25,
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
			{user ? (
				<ScrollView style={{ marginBottom: 30 }}>
					<View style={styles.topText}>
						<View style={{ flexDirection: "row", alignSelf: "center" }}>
							<Text style={{ fontSize: 25, marginVertical: 10 }}>Top 5</Text>
							<Image
								source={star}
								style={{ marginLeft: 100, marginVertical: 10 }}
							/>
						</View>
					</View>
					{data
						? data.map(function (data, index) {
								return (
									<View key={data.id} id={index} style={{ marginBottom: 30 }}>
										<View style={styles.activityCard}>
											<View>
												<Image
													style={styles.imageStyle}
													source={{
														uri: data.profile_photo_url,
													}}
												/>
											</View>

											<View style={{ width: 235 }}>
												<View style={{ flexDirection: "row" }}>
													<View style={{ width: 150 }}>
														<Text
															style={{
																fontSize: 18,
																marginLeft: 10,
																marginVertical: 5,
															}}
														>
															{data.name}
														</Text>
													</View>
													<View
														style={{
															marginLeft: 60,
															marginVertical: 2,
															backgroundColor: "#E5E5E5",
															width: 30,
															height: 30,
															borderRadius: 100,
														}}
													>
														<Text
															style={{ alignSelf: "center", marginVertical: 2 }}
														>
															{index + 1}.
														</Text>
													</View>
												</View>
												<View>
													<View style={styles.mainContainer}>
														<View style={{ flexDirection: "row", margin: 10 }}>
															<Text style={{ marginLeft: 5 }}>Activities</Text>
															<View>
																<Text style={{ marginLeft: 20 }}>Comments</Text>
															</View>
															<View>
																<Text style={{ marginLeft: 20 }}>Likes</Text>
															</View>
														</View>
														<View style={{ flexDirection: "row" }}>
															<Image
																style={{
																	marginLeft: 10,
																	width: 25,
																	height: 25,
																}}
																source={activities}
															/>
															<Text style={{ marginLeft: 5, fontSize: 20 }}>
																{data.activities_count
																	? data.activities_count
																	: "0"}
															</Text>
															<Image
																style={{
																	width: 20,
																	height: 20,
																	marginLeft: 40,
																	marginTop: 6,
																	marginRight: 2,
																}}
																source={comments}
															/>
															<Text style={{ marginLeft: 2, fontSize: 20 }}>
																{data.comments_count
																	? data.comments_count
																	: "0"}
															</Text>
															<Image
																source={likes}
																style={{
																	marginLeft: 30,
																	width: 25,
																	height: 25,
																}}
															/>
															<Text style={{ marginLeft: 8, fontSize: 20 }}>
																{data.likes_count ? data.likes_count : "0"}
															</Text>
														</View>
													</View>
												</View>
											</View>
										</View>
									</View>
								);
						  })
						: ""}
				</ScrollView>
			) : (
				<Login />
			)}
		</View>
	);
}
const styles = StyleSheet.create({
	topText: {
		width: 300,
		height: 56,
		backgroundColor: "white",
		alignSelf: "center",
		marginTop: 10,
		marginBottom: 50,
		borderRadius: 8,
	},
	activityCard: {
		width: 332,
		height: 150,
		backgroundColor: "white",
		borderRadius: 8,
		marginBottom: 10,
		alignSelf: "center",
		flexDirection: "row",
	},
	imageStyle: {
		borderRadius: 15,
		width: 74,
		height: 74,
		margin: 5,
	},
	mainContainer: {
		width: 240,
		height: 100,
		backgroundColor: "#E5E5E5",
		alignSelf: "center",
		borderRadius: 8,
		marginLeft: 5,
	},
});
