import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function TopActivities({ props }) {
	const [data, setData] = useState([]);
	const getData = async () => {
		const res = await fetch(
			"https://high-voltage-9884-backend.zendev.se/api/user-activities",
			{
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
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
		<View>
			<View>
				{data
					? data.map(function (data, index) {
							if (index < 4) {
								return (
									<View style={styles.activityContainer} key={data.id}>
										<Image
											style={styles.imageStyle}
											source={{
												uri: data.photo,
											}}
										/>
										<View>
											<Text style={styles.titleAlign}>
												{data.activity_name}
											</Text>
											<View style={styles.bottomSection}>
												<Text style={styles.bottomText}>
													{data.likes ? data.likes : "0"} Reactions
												</Text>
												<Text style={styles.bottomText}>
													{data.comments.comment ? data.comments.comment : "0 "}
													Comments
												</Text>
											</View>
										</View>
									</View>
								);
							} else {
								return null;
							}
					  })
					: ""}
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	activityContainer: {
		backgroundColor: "white",
		width: 333,
		height: 153,
		margin: "auto",
		marginTop: 10,
		borderRadius: 8,
		flexDirection: "row",
		alignSelf: "center",
	},
	imageStyle: {
		width: 100,
		height: 120,
		margin: 12,
		borderRadius: 10,
	},
	titleAlign: {
		marginLeft: 20,
		marginTop: 30,
		fontSize: 15,
	},
	bottomSection: {
		backgroundColor: "#C4C4C4",
		width: 200,
		height: 27,
		marginLeft: 0,
		marginTop: 60,
		borderRadius: 8,
		flexDirection: "row",
	},
	bottomText: {
		color: "#132C58",
		fontWeight: "700",
		margin: 5,
	},
});
