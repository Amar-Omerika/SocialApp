import React, { useState, useEffect } from "react";
import { ScrollView, Image, StyleSheet, Text, View, _Text } from "react-native";

export default function Categories({ title }) {
	const [data, setData] = useState([]);
	const getData = async () => {
		const res = await fetch(
			"https://high-voltage-9884-backend.zendev.se/api/categories",
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
							if (index < 2) {
								return (
									<View style={styles.mainContainer} key={data.id}>
										<View style={styles.container}>
											<Text style={styles.title}>{data.name}</Text>
											<View style={styles.ct}>
												<Image
													style={{
														width: 83,
														height: 63,
														alignSelf: "flex-end",
														borderRadius: 100,
														marginRight: 10,
													}}
													source={{
														uri: data.icon,
													}}
												/>
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
	mainContainer: {
		alignSelf: "center",
		flexDirection: "row",
	},
	container: {
		width: 300,
		height: 164,
		backgroundColor: "#5571A3",
		borderRadius: 10,
		flexDirection: "column",
		margin: 10,
	},
	title: {
		padding: 10,
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
	},
	ct: {
		marginTop: 40,
	},
});
