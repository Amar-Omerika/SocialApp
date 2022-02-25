import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { ScrollView, Image, StyleSheet, Text, View } from "react-native";
import profileActivityCardIcon from "../assets/profileActivityCardIcon.png";
import comment from "../assets/comment.png";
import like from "../assets/likee.png";
import unlike from "../assets/unlike.png";
import "intl";
import "intl/locale-data/jsonp/en";
import { useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";

const { DateTime } = require("luxon");

export default function ActivityCard({ props }) {
	const { user } = useSelector((state) => state.user);
	const [data, setData] = useState([]);

	const getData = async () => {
		const res = await fetch(
			"https://high-voltage-9884-backend.zendev.se/api/user-activities",
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

	const postLike = async (user_activity_id) => {
		const res = await fetch(
			"https://high-voltage-9884-backend.zendev.se/api/like",
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({
					user_activity_id,
				}),
			}
		);
		const answer = await res.json();
		console.log(answer);
		setPostData(answer.data);
	};
	const postUnLike = async (user_activity_id) => {
		const res = await fetch(
			"https://high-voltage-9884-backend.zendev.se/api/unlike",
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({
					user_activity_id,
				}),
			}
		);
		const answer = await res.json();
		console.log(answer);

		setPostData(answer.data);
	};
	useEffect(() => {
		let mounted = true;
		if (mounted) getData(data);
		return () => (mounted = false);
	}, []);

	const handleLike = (user_activity_id) => {
		{
			user ? postLike(user_activity_id) : null;
		}
	};
	const handleUnlike = (user_activity_id) => {
		{
			user ? postUnLike(user_activity_id) : null;
		}
	};
	return (
		<ScrollView>
			{data
				? data.map(function (data, index) {
						if (index < 9) {
							return <SingleCard key={data.id} data={data} />;
						} else {
							return null;
						}
				  })
				: ""}
		</ScrollView>
	);
}
const SingleCard = ({ data }) => {
	const [counter, setCounter] = useState(data.likes);
	const [hasLiked, setHasLiked] = useState(data.liked);
	const [postData, setPostData] = useState([]);
	const { user } = useSelector((state) => state.user);
	const postLike = async (user_activity_id) => {
		const res = await fetch(
			"https://high-voltage-9884-backend.zendev.se/api/like",
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({
					user_activity_id,
				}),
			}
		);
		const answer = await res.json();
		console.log(answer);
		setPostData(answer.data);
	};
	const postUnLike = async (user_activity_id) => {
		const res = await fetch(
			"https://high-voltage-9884-backend.zendev.se/api/unlike",
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
				body: JSON.stringify({
					user_activity_id,
				}),
			}
		);
		const answer = await res.json();
		console.log(answer);

		setPostData(answer.data);
	};
	useEffect(() => {
		let mounted = true;
		if (mounted) setPostData(postData);
		return () => (mounted = false);
	}, []);
	const likeHandler = (user_activity_id) => {
		if (hasLiked) {
			setHasLiked(!hasLiked);
			setCounter(counter - 1);
			postUnLike(user_activity_id);
		} else {
			setHasLiked(!hasLiked);
			setCounter(counter + 1);
			postLike(user_activity_id);
		}
	};
	return (
		<View style={styles.activityContainer}>
			<View style={styles.top}>
				<View style={styles.leftSection}>
					<Image
						style={styles.imageStyle}
						source={{
							uri: data.user_photo,
						}}
					/>

					<View>
						<Text style={styles.date}>
							{DateTime.fromISO(data.date).toFormat("dd LLL yyyy")}
						</Text>
					</View>
				</View>
				<View style={styles.titles}>
					<View style={styles.topSection}>
						<Text style={styles.name}>{data.user_name}</Text>

						<TouchableOpacity>
							<View style={styles.category}>
								<Text style={styles.categoryText}>{data.category.name}</Text>
							</View>
						</TouchableOpacity>
					</View>
					<Text
						style={{
							marginTop: 10,
							fontWeight: "bold",
							color: "grey",
						}}
					>
						Title :{data.activity_name}
					</Text>
				</View>
			</View>
			<View style={styles.description}>
				<Text> {data.description} </Text>
			</View>
			<View style={styles.categoryPicture}>
				<Image
					style={{ flex: 1 }}
					source={{
						uri: data.photo,
					}}
				/>
			</View>
			<View style={styles.reactions}>
				<Text style={styles.reactionsText}>
					{counter + " "}
					Reactions
				</Text>

				<TouchableOpacity onPress={() => likeHandler(data.id)}>
					{!hasLiked ? (
						<Image
							style={styles.iconStyle}
							style={{ height: 22, width: 22, marginTop: 10, marginLeft: 5 }}
							source={unlike}
						/>
					) : (
						<Image
							style={styles.iconStyle}
							style={{ height: 22, width: 22, marginTop: 10, marginLeft: 5 }}
							source={like}
						/>
					)}
				</TouchableOpacity>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	activityContainer: {
		backgroundColor: "white",
		width: 343,
		borderRadius: 8,
		alignSelf: "center",
		marginTop: 20,
		flexDirection: "column",
	},
	imageStyle: {
		borderRadius: 15,
		width: 74,
		height: 74,
		margin: 5,
	},
	profile: {
		backgroundColor: "#5571A3",
		width: 78,
		height: 21,
		borderRadius: 8,
		flexDirection: "row",
		marginLeft: 5,
	},
	profileText: {
		color: "white",
		marginLeft: 5,
		fontWeight: "900",
	},
	icon: {
		marginLeft: 12,
		marginTop: 3,
	},
	date: {
		color: "#132C58",
		marginTop: 10,
		marginLeft: 8,
	},
	name: {
		fontSize: 18,
		marginTop: 10,
		marginRight: 40,
		width: 90,
	},
	topSection: {
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	category: {
		backgroundColor: "#85CCD6",
		width: 90,
		borderRadius: 10,
		marginTop: 10,
	},
	categoryText: {
		color: "black",
		paddingLeft: 10,
		marginRight: 5,
	},
	titles: {
		flexDirection: "column",
	},
	titleContainer: {
		flexDirection: "row",
		paddingTop: 5,
	},
	titleText: {
		paddingLeft: 3,
	},
	description: {
		marginLeft: 10,
		marginTop: 5,
	},
	reactions: {
		marginTop: 25,
		backgroundColor: "#C4C4C4",
		height: 40,
		flexDirection: "row",
		borderBottomLeftRadius: 8,
		borderBottomRightRadius: 8,
	},
	iconStyle: {
		marginTop: 7,
		marginLeft: 10,
		alignSelf: "center",
	},
	iconStyle1: {
		marginTop: 9,
		marginLeft: 10,
		height: 20,
		width: 20,
		alignSelf: "center",
	},
	reactionsText: {
		color: "#132C58",
		marginTop: 5,
		marginLeft: 30,
		alignSelf: "center",
	},
	reactionsText1: {
		color: "#132C58",
		marginTop: 5,
		marginLeft: 60,
		alignSelf: "center",
	},

	categoryPicture: {
		height: 200,
	},
	top: {
		flexDirection: "row",
	},
	leftSection: {
		width: 120,
	},
});
