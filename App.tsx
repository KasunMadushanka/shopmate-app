import React, { useState, useEffect, useRef } from "react";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import { StyleSheet, Platform } from "react-native";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { createStore } from "redux";

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

import OrderReducer from "./redux/reducers/OrderReducer";
import apiConfig from "./config/api-config";
import authConfig from "./config/auth-config";

Amplify.configure({
    Auth: {
        userPoolId: authConfig.userPoolId,
        region: authConfig.region,
        userPoolWebClientId: authConfig.userPoolWebClientId,
    },
    Analytics: {
        disabled: true,
    },
    API: {
        endpoints: [
            {
                name: apiConfig.name,
                endpoint: apiConfig.endpoint,
            },
        ],
    },
});

const store = createStore(OrderReducer);

function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <Provider store={store}>
                    <Navigation colorScheme={colorScheme} />
                </Provider>
                <StatusBar backgroundColor="#0d98ba" />
            </SafeAreaProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default withAuthenticator(App, {
    signUpConfig: {
        hideAllDefaults: true,
        signUpFields: [
            {
                label: "First Name",
                key: "given_name",
                required: true,
                type: "string",
                displayOrder: 1
            },
            {
                label: "Last Name",
                key: "family_name",
                required: true,
                type: "string",
                displayOrder: 2
            },
            {
                label: "Email",
                key: "username",
                required: true,
                type: "email",
                displayOrder: 3
            },
            {
                label: "Password",
                key: "password",
                required: true,
                type: "password",
                displayOrder: 4
            },
        ],
    }
});
