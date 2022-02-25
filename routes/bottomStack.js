import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/Profile";
import Add from "../screens/Add";
import Home from "../screens/Home";
import home from "../assets/home.png";
import add from "../assets/add.png";
import profileBottomBar from "../assets/profileBottomBar.png";
import logo from "../assets/logo.png";
import popular from "../assets/popular.png";
import Leaderboard from "../screens/Leaderboard";
import { Image, TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
const BottomTab = createBottomTabNavigator();

function LogoTitle() {
	return <Image style={{ width: 50, height: 50 }} source={logo} />;
}

function bottomTabs() {
	const navigation = useNavigation();
	return (
		<BottomTab.Navigator
			screenOptions={{
				tabBarShowLabel: false,

				//header component add
				//headerShown: false,
				//need to fix bottom stack pictures on ios
				headerTitle: (props) => <LogoTitle {...props} />,

				headerStyle: {
					backgroundColor: "#132C58",
					height: 84,
				},
				tabBarStyle: {
					position: "absolute",
					bottom: 5,
					left: 20,
					right: 20,
					elevation: 0,
					borderRadius: 15,
					height: 60,
					backgroundColor: "#132C58",
				},
			}}
		>
			<BottomTab.Screen
				name="Home"
				component={Home}
				options={{
					headerRight: () => <View style={styles.icons}></View>,
					tabBarIcon: () => <Image source={home} />,
				}}
			/>
			<BottomTab.Screen
				name="Leaderboard"
				component={TempScreen}
				options={{
					headerShown: false,

					tabBarIcon: () => (
						<TouchableOpacity
							onPress={() => navigation.navigate("Leaderboard")}
						>
							<Image source={popular} />
						</TouchableOpacity>
					),
				}}
			/>
			<BottomTab.Screen
				name="FullScreen"
				component={TempScreen}
				options={{
					headerShown: false,

					tabBarIcon: () => (
						<TouchableOpacity onPress={() => navigation.navigate("Add")}>
							<Image source={add} />
						</TouchableOpacity>
					),
				}}
			/>
			<BottomTab.Screen
				name="Profile"
				component={TempScreen}
				options={{
					headerShown: false,
					tabBarIcon: () => (
						<TouchableOpacity onPress={() => navigation.navigate("Profile")}>
							<Image source={profileBottomBar} />
						</TouchableOpacity>
					),
				}}
			/>
			<BottomTab.Screen
				name="Landing"
				component={TempScreen}
				options={{
					headerShown: false,
					tabBarIcon: () => (
						<TouchableOpacity onPress={() => navigation.navigate("Profile")}>
							<Image source={profileBottomBar} />
						</TouchableOpacity>
					),
				}}
			/>
		</BottomTab.Navigator>
	);
}
const TempScreen = () => {
	return (
		<View>
			<Text></Text>
		</View>
	);
};
export default bottomTabs;
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
});
