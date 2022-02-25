import React, { useState, useEffect } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";
import loadMore from "../assets/loadMore.png";
import profileImgDaily from "../assets/profileImgDaily.png";
import like from "../assets/like.png";
import rodjo from "../assets/rodjo.png";
import addImage from "../assets/addImage.png";
import { useSelector } from "react-redux";

export default function DailyChallenge() {
	const { user } = useSelector((state) => state.user);
	const [data, setData] = useState([]);
	const [postdata, setPostData] = useState([]);
	const [reply, setReply] = useState("");
	const [id, setID] = useState("");
	const [count, setCounter] = useState(0);
	const getData = async () => {
		const res = await fetch(
			"https://high-voltage-9884-backend.zendev.se/api/daily-challenge",
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
		setID(answer.data[0].id);
		setData(answer.data);
	};
	const postData = async () => {
		const res = await fetch(
			"https://high-voltage-9884-backend.zendev.se/api/user-activities",
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({
					activity_id: id,
					description: reply,
				}),
			},
			setReply(""),
			setCounter(count + 1)
		);
		const answer = await res.json();
		setPostData(answer.data);
	};
	useEffect(() => {
		let mounted = true;
		if (mounted) setPostData(postdata);
		return () => (mounted = false);
	}, []);

	useEffect(() => {
		let mounted = true;
		if (mounted) getData(data);
		return () => (mounted = false);
	}, [count]);

	const addReply = async () => {
		postData();
	};
	return (
		<View>
			{data
				? data.map(function (data) {
						return (
							<View style={styles.dailyChallengeContainer} key={data.id}>
								<View>
									<Text style={styles.title1}>Daily Challenge</Text>
								</View>
								<View>
									<Text style={styles.title2}></Text>
								</View>
								<View style={styles.challengeContainer}>
									<View style={styles.topSection}>
										<Image style={styles.imgStyle} source={rodjo} />
										<View>
											<Text style={styles.name}>{data.creator}</Text>
											<View style={styles.comment}>
												<Text style={styles.textComment}>
													{data.description}
												</Text>
											</View>
										</View>
									</View>

									<View
										style={styles.replyProfile}
										style={{
											flexDirection: "column",
										}}
									>
										{data.user_activities
											? data.user_activities.map(function (user_activities) {
													return (
														<View key={user_activities.id}>
															<View>
																<View
																	style={styles.replyProfile}
																	key={user_activities.id}
																>
																	<View style={styles.comment1}>
																		<Text style={styles.textComment1}>
																			{user_activities.description}
																		</Text>
																	</View>

																	<Image
																		style={{
																			marginLeft: 10,
																			width: 38,
																			height: 38,
																			borderRadius: 100,
																		}}
																		source={{
																			uri: user_activities.user_photo,
																		}}
																	/>
																</View>
															</View>
														</View>
													);
											  })
											: ""}
									</View>
									<View style={styles.bottomSection}>
										<Image source={like} style={{ margin: 5 }} />
										<Text>{data.user_activities_count} people done</Text>
										<View style={styles.bottomRightSection}>
											<View style={styles.reply}>
												<TextInput
													placeholder="Reply..."
													onChangeText={setReply}
													value={reply}
												></TextInput>
											</View>
											<View>
												<TouchableOpacity
													style={{ margin: 5 }}
													onPress={() => addReply()}
												>
													<Image source={addImage} style={{ width: 25 }} />
												</TouchableOpacity>
											</View>
										</View>
									</View>
								</View>
							</View>
						);
				  })
				: ""}
		</View>
	);
}
const styles = StyleSheet.create({
	dailyChallengeContainer: {
		backgroundColor: "white",
		alignSelf: "center",
		width: 347,
		borderBottomRightRadius: 10,
		borderBottomLeftRadius: 10,
	},
	title1: {
		alignSelf: "center",
		fontSize: 25,
		color: "#5571A3",
		margin: 5,
	},
	title2: {
		alignSelf: "center",
		fontSize: 18,
	},
	challengeContainer: {
		backgroundColor: "#E5E5E5",
		width: 320,
		margin: 12,
		borderRadius: 8,
	},
	imgStyle: {
		width: 100,
		height: 103,
		borderRadius: 15,
		margin: 5,
	},
	topSection: {
		flexDirection: "row",
	},
	name: {
		fontSize: 18,
		margin: 15,
	},
	comment: {
		backgroundColor: "#85CCD6",
		borderRadius: 10,
		marginBottom: 5,
	},
	textComment: {
		margin: 8,
		marginLeft: 10,
		width: 120,
	},
	comment1: {
		backgroundColor: "#C4C4C4",
		borderRadius: 10,
		width: 100,
	},
	textComment1: {
		margin: 8,
		marginLeft: 10,
	},
	replyProfile: {
		flexDirection: "row",
		alignSelf: "flex-end",
		marginRight: 10,
		marginBottom: 10,
	},
	loadMore: {
		flexDirection: "row",
		alignSelf: "flex-end",
		marginRight: 70,
	},
	bottomSection: {
		flexDirection: "row",
	},
	reply: {
		width: 95,
		backgroundColor: "#D8E6FF",
		borderRadius: 5,
	},
	bottomRightSection: {
		flexDirection: "row",
		marginLeft: 50,
		marginBottom: 5,
	},
});
