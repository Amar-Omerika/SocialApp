import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BottomNavigator from "./bottomStack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Forgot from "../screens/Forgot";
import Resetpassword from "../screens/Resetpassword";
import Add from "../screens/Add";
import EditProfile from "../screens/EditProfile";
import Leaderboard from "../screens/Leaderboard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../store/user";
import { useDispatch } from "react-redux";
import Profile from "../screens/Profile";
const Stack = createStackNavigator();
function rootStack() {
	const dispatch = useDispatch();
	const retrieveData = async () => {
		const value = await AsyncStorage.getItem("user");
		if (value) {
			dispatch(login(JSON.parse(value)));
		}
	};

	useEffect(() => {
		let mounted = true;
		if (mounted) retrieveData();
		return () => (mounted = false);
	}, []);
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="BottomNavigator" component={BottomNavigator} />
				<Stack.Screen name="Forgot" component={Forgot} />
				<Stack.Screen name="Register" component={Register} />
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Add" component={Add} />
				<Stack.Screen name="Profile" component={Profile} />
				<Stack.Screen name="EditProfile" component={EditProfile} />
				<Stack.Screen name="Resetpassword" component={Resetpassword} />
				<Stack.Screen name="Leaderboard" component={Leaderboard} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
export default rootStack;
