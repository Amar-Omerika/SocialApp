import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Slice
//to be done:
//remember user after login

// Actions

export const loginUser = createAsyncThunk(
	"users/login",
	async ({ email, password }, thunkAPI) => {
		try {
			const response = await fetch(
				"https://high-voltage-9884-backend.zendev.se/api/login",
				{
					method: "POST",
					mode: "cors", // no-cors, *cors, same-origin
					cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
					credentials: "same-origin", // include, *same-origin, omit
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email,
						password,
					}),
				}
			);
			let data = await response.json();

			console.log("response", data);
			if (response.status === 201) {
				await AsyncStorage.setItem("token", JSON.stringify(data.token));
				//await AsyncStorage.setItem("user", data.user);
				return data;
			} else {
				return thunkAPI.rejectWithValue(data);
			}
		} catch (e) {
			console.log("Error", e.response.data);
			thunkAPI.rejectWithValue(e.response.data);
		}
	}
);

export const registerUser = createAsyncThunk(
	"users/register",
	async (
		{ email, password, username, name, password_confirmation },
		thunkAPI
	) => {
		try {
			const response = await fetch(
				"https://high-voltage-9884-backend.zendev.se/api/register",
				{
					method: "POST",
					mode: "cors", // no-cors, *cors, same-origin
					cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
					credentials: "same-origin", // include, *same-origin, omit
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email,
						password,
						username,
						name,
						password_confirmation,
					}),
				}
			);
			let data = await response.json();
			console.log("response", data);
			if (response.status === 201) {
				AsyncStorage.setItem("token", data.token);
				return { ...data, name: name, username: username, email: email };
			} else {
				return thunkAPI.rejectWithValue(data);
			}
		} catch (e) {
			console.log("Error", e.response.data);
			thunkAPI.rejectWithValue(e.response.data);
		}
	}
);

const userSlice = createSlice({
	name: "user",
	initialState: {
		user: null,
		isFetching: false,
		isError: false,
		isSuccess: false,
		errorMessage: "",
	},
	reducers: {
		loginSuccess: (state, action) => {
			//state.user = {...action.payload};
			state.user = action.payload;
		},
		logoutSuccess: (state, action) => {
			state.user = null;
			AsyncStorage.removeItem("user");
			// localStorage.removeItem('token')
			fetch("https://high-voltage-9884-backend.zendev.se/api/logout", {
				method: "POST", // *GET, POST, PUT, DELETE, etc.
				mode: "no-cors", // no-cors, *cors, same-origin
				cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
				credentials: "same-origin", // include, *same-origin, omit
				header: {
					Authorization: `Bearer ${state.token}`,
				},
			})
				.then((response) => {
					console.log("response logout", response);
				})
				.catch((err) => {
					console.log("err", err);
				});
		},
	},
	extraReducers: {
		[loginUser.pending]: (state) => {
			state.isFetching = true;
		},
		[loginUser.fulfilled]: (state, { payload }) => {
			state.user = payload;
			state.isError = false;
			state.isFetching = false;
			(state.email = payload.email),
				(state.username = payload.username),
				AsyncStorage.setItem("user", JSON.stringify(payload));
			return state;
		},
		[loginUser.rejected]: (state, { payload }) => {
			console.log("payload", payload);
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload.message;
		},
		[registerUser.pending]: (state) => {
			state.isFetching = true;
		},
		[registerUser.fulfilled]: (state, { payload }) => {
			state.user = payload;
			state.isFetching = false;
			(state.email = payload.email),
				(state.username = payload.username),
				(state.name = payload.name),
				AsyncStorage.setItem("user", JSON.stringify(payload));
			return state;
		},
		[registerUser.rejected]: (state, { payload }) => {
			console.log("payload", payload);
			state.isFetching = false;
			state.isError = true;
			state.errorMessage = payload.message;
		},
	},
});

export default userSlice.reducer;
export const userSelector = (state) => state.user;

const { logoutSuccess, loginSuccess } = userSlice.actions;
export const login = (userObj) => async (dispatch) => {
	try {
		// const res = await api.post('/api/auth/login/', { username, password })
		dispatch(loginSuccess(userObj));
	} catch (e) {
		return console.error(e.message);
	}
};

export const logout = () => async (dispatch) => {
	try {
		// const res = await api.post('/api/auth/logout/')
		return dispatch(logoutSuccess());
	} catch (e) {
		return console.error(e.message);
	}
};
