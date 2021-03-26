import React, { PureComponent } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, SearchBar, Avatar } from "react-native-elements";

export default class ProductDetails extends PureComponent {
    constructor(props: any) {
        super(props);
        this.state = {
            recProducts: [],
            product: {},
            quantity: 1,
            loading: false,
        };
    }

    componentDidMount() {
        if (this.props.route.params.products) {
            const product = this.props.route.params.products[0];
            const recProducts = this.props.route.params.products.splice(1);
            this.setState({ product: product, recProducts: recProducts });
        } else if (this.props.route.params.product) {
            this.setState({ product: this.props.route.params.product });
        }
        this.props.navigation.setOptions({ title: this.state.product.name });
    }

    onChange(number: number, type: any) {
        this.setState({ quantity: number });
    }

    render() {
        const { product, recProducts, loading, quantity } = this.state;

        return (
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Avatar
                        rounded
                        size="xlarge"
                        source={{
                            uri:
                                "https://freepngimg.com/thumb/burger/6-2-burger-png-image-thumb.png",
                        }}
                    />
                </View>
                <Text style={styles.itemName}>{product.name}</Text>
                <Text style={{ fontSize: 15, marginBottom: 15 }}>
                    ({product.manufacturer}) {product.volume}
                </Text>
                <Text style={styles.description}>{product.description}</Text>
                <Text style={{ fontSize: 20, marginTop: 30 }}>Ingredients</Text>
                <Text style={styles.description}>{product.ingredients}</Text>
                <Text style={{ fontSize: 20, marginTop: 30 }}>Nutrition</Text>
                <Text style={styles.description}>{product.nutrition}</Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate("ProductList", {
                                products: recProducts,
                            })
                        }
                        style={styles.recaptureButton}
                    >
                        <Text
                            style={{
                                color: "#fff",
                                fontSize: 15,
                            }}
                        >
                            Recommended Products
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.searchButton}>
                        <Text
                            style={{
                                color: "#fff",
                                fontSize: 15,
                            }}
                        >
                            Add to Basket
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        flex: 1,
    },
    logo: {
        width: 250,
        height: 250,
        justifyContent: "center",
        alignItems: "center",
    },
    itemName: {
        fontSize: 25,
        color: "black",
        fontWeight: "600",
        marginTop: -30,
    },
    description: {
        fontSize: 15,
        color: "black",
        fontWeight: "600",
        marginHorizontal: 45,
    },
    counter: {
        paddingTop: 50,
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0d98ba",
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 50,
    },
    searchButton: {
        width: "50%",
        height: 50,
        backgroundColor: "#0d98ba",
        alignItems: "center",
        justifyContent: "center",
    },
    recaptureButton: {
        width: "50%",
        height: 50,
        backgroundColor: "grey",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 0,
    },
});
