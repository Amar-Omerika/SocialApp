import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import {
	ImageBackground,
	ScrollView,
	Image,
	StyleSheet,
	Text,
	View,
} from "react-native";
import activities from "../assets/activities.png";
import comments from "../assets/comment.png";
import likes from "../assets/likes.png";
import { useDispatch, useSelector } from "react-redux";

export default function Profilestatistics() {
	const { user } = useSelector((state) => state.user);
	return (
		<View style={styles.mainContainer}>
			<View style={{ flexDirection: "row", margin: 10 }}>
				<Text style={{ marginLeft: 10 }}>Activities</Text>
				<View>
					<Text style={{ marginLeft: 40 }}>Comments</Text>
				</View>
				<View>
					<Text style={{ marginLeft: 50 }}>Likes</Text>
				</View>
			</View>
			<View style={{ flexDirection: "row" }}>
				<Image style={{ marginLeft: 15 }} source={activities} />
				<Text style={{ marginLeft: 8, fontSize: 20 }}>
					{user.user.activities_count ? user.user.activities_count : "0"}
				</Text>
				<Image
					style={{ width: 25, height: 25, marginLeft: 40, marginTop: 6 }}
					source={comments}
				/>
				<Text style={{ marginLeft: 8, fontSize: 20 }}>
					{user.user.comments_count ? user.user.comments_count : "0"}
				</Text>
				<Image source={likes} style={{ marginLeft: 30 }} />
				<Text style={{ marginLeft: 8, fontSize: 20 }}>
					{user.user.likes_count ? user.user.likes_count : "0"}
				</Text>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	mainContainer: {
		width: 300,
		height: 120,
		backgroundColor: "white",
		alignSelf: "center",
		borderRadius: 8,
	},
});
