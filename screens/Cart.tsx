import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";

export default class Cart extends PureComponent {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    render() {
        return <View style={styles.container}></View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    dialogContentContainer: {
        height: 300,
        padding: 15,
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#a10618",
        width: 75,
        borderWidth: 1,
        borderRadius: 5,
        height: 50,
    },
    logo: {
        width: 250,
        height: 250,
        marginTop: 50,
    },
    itemName: {
        fontSize: 25,
        color: "black",
        fontWeight: "600",
    },
    description: {
        fontSize: 15,
        color: "black",
        fontWeight: "600",
        marginHorizontal: 45,
    },
    nameWrapper: {
        backgroundColor: "#a10618",
        borderRadius: 10,
        height: 20,
    },
    counter: {
        paddingTop: 50,
    },
    addButton: {
        paddingTop: 50,
        width: 250,
    },
});

