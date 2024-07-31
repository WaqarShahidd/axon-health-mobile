import { persistReducer, persistStore } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user.reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const rootPersistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;

export const persistor = persistStore(store);
