import React, { useState, useEffect } from "react";
import {
	ScrollView,
	StyleSheet,
	View,
	Text,
	FlatList,
	RefreshControl,
	SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ActivityCard from "../components/ActivityCard.js";
import DailyChallenge from "../components/DailyChallengeCard";
import Welcome from "../components/Welcome";
import Categories from "../components/CategoriesCard";
import TopActivities from "../components/TopActivities";

const wait = (timeout) => {
	return new Promise((resolve) => setTimeout(resolve, timeout));
};
export default function Home({ navigation }) {
	const { user } = useSelector((state) => state.user);
	const component = () => <ActivityCard />;

	return (
		<View style={styles.mainContainer}>
			{user ? (
				<View>
					<ScrollView>
						<DailyChallenge />

						{
							//Need to be  fixed
							/*data && (
						<FlatList
							ListHeaderComponent={<DailyChallenge />}
							data={data}
							renderItem={component}
							keyExtractor={(item) => item.id.toString()}
						/>
					)*/
						}

						<ActivityCard />
					</ScrollView>
				</View>
			) : (
				<View>
					<ScrollView>
						<Welcome />
						<Text style={styles.topCategories}>Top Categories</Text>
						<View>
							<Categories />
						</View>
						<Text style={styles.topCategories}>Top Activities</Text>
						<View>
							<TopActivities />
						</View>
					</ScrollView>
				</View>
			)}
		</View>
	);
}
const styles = StyleSheet.create({
	header: {
		backgroundColor: "#132C58",
		height: 84,
		flexDirection: "row",
	},
	logo: {
		marginTop: 30,
		marginLeft: 15,
		height: 50,
		width: 50,
	},

	iconPopular: { marginRight: 20 },
	icons: {
		flexDirection: "row",
		alignSelf: "flex-end",
		marginBottom: 10,
		marginLeft: 200,
	},
	topCategories: {
		alignSelf: "center",
		padding: 5,
		color: "#928181",
		fontSize: 25,
	},

	mainContainer: {
		marginBottom: 70,
	},
});
