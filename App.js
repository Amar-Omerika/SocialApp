import React, { useEffect } from "react";
import AppStack from "./routes/rootStack";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "./store/store";

export default function App() {
	return (
		<Provider store={store}>
			<AppStack />
		</Provider>
	);
}
