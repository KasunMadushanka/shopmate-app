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
    TabFourParamList,
    TabFiveParamList,
} from "../types";

import Home from "../screens/Home";
import CategoryList from "../screens/CategoryList";
import ItemList from "../screens/ItemList";
import ItemDetails from "../screens/ItemDetails";
import MyAccount from "../screens/MyAccount";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
        >
            <BottomTab.Screen
                name="Home"
                component={TabOneNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="ios-home-outline" color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Order"
                component={TabTwoNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon
                            name="ios-fast-food-outline"
                            color={color}
                        />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Notifications"
                component={TabThreeNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon
                            name="notifications-outline"
                            color={color}
                        />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Recents"
                component={TabFourNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="timer-outline" color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="My Account"
                component={TabFiveNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon
                            name="person-outline"
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

function TabOneNavigator() {
    return (
        <TabOneStack.Navigator>
            <TabOneStack.Screen
                name="Home"
                component={Home}
                options={{ headerTitle: "SHOPMATE",   headerStyle: {
                    backgroundColor: '#a10618'
                 },  headerTintColor: 'white' }}
            />
        </TabOneStack.Navigator>
    );
}


const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
    return (
        <TabTwoStack.Navigator>
            <TabTwoStack.Screen
                name="CategoryList"
                component={CategoryList}
                options={{ headerTitle: "Explore our Menu",   headerStyle: {
                    backgroundColor: '#a10618'
                 },  headerTintColor: 'white' }}
            />
            <TabTwoStack.Screen
                name="ItemList"
                component={ItemList}
                options={{headerStyle: {
                    backgroundColor: '#a10618'
                 },  headerTintColor: 'white' }}
            />
             <TabTwoStack.Screen
                name="ItemDetails"
                component={ItemDetails}
                options={{headerStyle: {
                    backgroundColor: '#a10618'
                 },  headerTintColor: 'white' }}
            />
        </TabTwoStack.Navigator>
    );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
    return (
        <TabThreeStack.Navigator>
            <TabThreeStack.Screen
                name="CategoryList"
                component={CategoryList}
                options={{ headerTitle: "Explore our Menu" }}
            />
        </TabThreeStack.Navigator>
    );
}

const TabFourStack = createStackNavigator<TabFourParamList>();

function TabFourNavigator() {
    return (
        <TabFourStack.Navigator>
            <TabFourStack.Screen
                name="CategoryList"
                component={CategoryList}
                options={{ headerTitle: "Explore our Menu" }}
            />
        </TabFourStack.Navigator>
    );
}

const TabFiveStack = createStackNavigator<TabFiveParamList>();

function TabFiveNavigator() {
    return (
        <TabFiveStack.Navigator>
            <TabFiveStack.Screen
                name="MyAccount"
                component={MyAccount}
                options={{ headerTitle: "Explore our Menu" }}
            />
        </TabFiveStack.Navigator>
    );
}

