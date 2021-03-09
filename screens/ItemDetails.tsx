import React, { PureComponent } from "react";
import { Amplify, Auth, API } from "aws-amplify";
import Counter from "react-native-counters";
import Button from "../components/Button";
import {
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { colors, SearchBar } from "react-native-elements";

class ItemList extends PureComponent {
    constructor(props: any) {
        super(props);
        this.state = {
            item: {},
            quantity: 0,
            loading: false,
        };
    }

    componentDidMount() {
        const menuItem = this.props.route.params.menuItem;
        console.log(menuItem);
        this.setState({ item: menuItem });
        this.props.navigation.setOptions({ title: menuItem.name });
    }

    addItemToCart = (item) => {
        this.props.addToCart(item);
    }

    onChange(number: number, type: any) {
        this.setState({ quantity: number });
    }

    addToBasket = async () => {
        this.props.navigation.pop()
    };

    render() {
        const { item, loading } = this.state;

        return (
            <View style={styles.container}>
                <Image
                    style={styles.logo}
                    source={require("../assets/images/food.png")}
                />
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.counter}>
                    <Counter start={1} onChange={this.onChange.bind(this)} />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.addItemToCart(item)}
                >
                    <Text style={{ color: "#ffffff" }}>Add to Basket</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
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
    button: {
        alignItems: "center",
        backgroundColor: "#a10618",
        padding: 10,
        textTransform: "lowercase",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    addButton: {
        paddingTop: 50,
        width: 250,
    },
});
