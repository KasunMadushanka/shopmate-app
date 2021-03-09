import React, { useState } from "react";
import { Amplify, Auth, API } from "aws-amplify";
import { withAuthenticator } from "aws-amplify-react-native";
import { StyleSheet, Text, View } from "react-native";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from "./navigation";
import { StatusBar } from "expo-status-bar";

Amplify.configure({
    Auth: {
        userPoolId: "eu-west-2_qBuCKrpPk",
        region: "eu-west-2",
        userPoolWebClientId: "tg7ekk3514eb8qbh7errkfvt5",
    },
    Analytics: {
        disabled: true,
    },
    API: {
        endpoints: [
            {
                name: "shopmate-api",
                endpoint:
                    "https://gzdaqpvpg0.execute-api.eu-west-2.amazonaws.com",
            },
        ],
    },
});

function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <Navigation colorScheme={colorScheme} />
                <StatusBar backgroundColor="#ba090f" />
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
        hiddenDefaults: ["phone_number"],
        signUpFields: [
            {
                label: "First Name",
                key: "given_name",
                required: true,
                type: "string",
            },
            {
                label: "Last Name",
                key: "family_name",
                required: true,
                type: "string",
            },
        ],
    },
});
