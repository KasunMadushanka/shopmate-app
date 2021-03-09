import React, { PureComponent } from "react";
import { Amplify, Auth, API } from "aws-amplify";
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
import { SearchBar } from "react-native-elements";

export default class ItemList extends PureComponent {
    constructor(props: any) {
        super(props);
        this.state = {
            items: [],
            search: "",
            loading: false,
        };
    }

    componentDidMount() {
        const menucategory = this.props.route.params.menuCategory;
        this.setState({ items: menucategory.menuItems });
        this.props.navigation.setOptions({ title: menucategory.name });
    }

    fetchCategories = async () => {};

    updateSearch = (search: string) => {
        this.setState({ search });
    };

    render() {
        const { items, search, loading } = this.state;

        return (
            <React.Fragment>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={search}
                    round={true}
                    lightTheme={true}
                />
                {loading ? (
                    <ActivityIndicator
                        style={styles.loadingIconContainer}
                        size="large"
                        color="#a10618"
                    />
                ) : (
                    <FlatGrid
                        itemDimension={150}
                        data={items}
                        style={styles.gridView}
                        // staticDimension={300}
                        spacing={12}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    styles.itemContainer,
                                    { backgroundColor: "#ffffff" },
                                ]}
                                onPress={() =>
                                    this.props.navigation.navigate("ItemDetails", {
                                        menuItem: item,
                                    })
                                }
                            >
                                <Image
                                    style={styles.image}
                                    source={require("../assets/images/food.png")}
                                />
                                <View
                                    style={{
                                        backgroundColor: "#a10618",
                                        borderRadius: 10,
                                        height: 20,
                                    }}
                                >
                                    <Text style={styles.itemName}>
                                        {item.name}
                                    </Text>
                                </View>
                                <Text style={styles.itemPrice}>
                                    £{item.price}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    gridView: {
        marginTop: 10,
        flex: 1,
    },
    itemContainer: {
        justifyContent: "flex-end",
        borderRadius: 5,
        padding: 10,
        height: 150,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    itemName: {
        fontSize: 14,
        color: "#fff",
        fontWeight: "600",
        marginLeft: 8,
    },
    itemPrice: {
        fontWeight: "600",
        fontSize: 12,
        // color: "#fff",
    },
    loadingIconContainer: {
        flex: 1,
        justifyContent: "center",
    },
    image: {
        width: 100,
        height: 30,
        flex: 1,
        justifyContent: "center",
    },
});
