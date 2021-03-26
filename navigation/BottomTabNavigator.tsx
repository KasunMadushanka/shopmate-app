import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import {
    BottomTabParamList,
    TabOneParamList,
    TabTwoParamList,
    TabThreeParamList,
} from "../types";

import ProductCapturing from "../screens/ProductCapturing";
import ProductList from "../screens/ProductList";
import ProductDetails from "../screens/ProductDetails";
import Settings from "../screens/Settings";
import Cart from "../screens/Cart";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="ProductCapturing"
            tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
        >
            <BottomTab.Screen
                name="Products"
                component={TabOneNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="ios-fast-food-outline" color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Cart"
                component={TabTwoNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon
                            name="cart-outline"
                            color={color}
                        />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Settings"
                component={TabThreeNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon
                            name="settings-outline"
                            color={color}
                        />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
    name: React.ComponentProps<typeof Ionicons>["name"];
    color: string;
}) {
    return <Ionicons size={25} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

const backgroundColor = "#0d98ba";

function TabOneNavigator() {
    
    return (
        <TabOneStack.Navigator>
            <TabOneStack.Screen
                name="ProductCapturing"
                component={ProductCapturing}
                options={{
                    headerTitle: "SHOPMATE",
                    headerStyle: {
                        backgroundColor: backgroundColor,
                    },
                    headerTintColor: "white",
                    headerTitleStyle: { alignSelf: "center" },
                }}
            />
            <TabOneStack.Screen
                name="ProductList"
                component={ProductList}
                options={{
                    headerTitle: "SHOPMATE",
                    headerStyle: {
                        backgroundColor: backgroundColor,
                    },
                    headerTintColor: "white",
                }}
            />
            <TabOneStack.Screen
                name="ProductDetails"
                component={ProductDetails}
                options={{
                    headerTitle: "SHOPMATE",
                    headerStyle: {
                        backgroundColor: backgroundColor,
                    },
                    headerTintColor: "white",
                }}
            />
        </TabOneStack.Navigator>
    );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
    return (
        <TabTwoStack.Navigator>
            <TabTwoStack.Screen
                name="Cart"
                component={Cart}
                options={{
                    headerTitle: "SHOPMATE",
                    headerStyle: {
                        backgroundColor: backgroundColor,
                    },
                    headerTintColor: "white",
                }}
            />
        </TabTwoStack.Navigator>
    );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
    return (
        <TabThreeStack.Navigator>
            <TabThreeStack.Screen
                name="Settings"
                component={Settings}
                options={{
                    headerTitle: "SHOPMATE",
                    headerStyle: {
                        backgroundColor: backgroundColor,
                    },
                    headerTintColor: "white",
                }}
            />
        </TabThreeStack.Navigator>
    );
}
