import React, { PureComponent } from "react";
import { Amplify, Auth, API } from "aws-amplify";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Image,
} from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { SearchBar } from "react-native-elements";

export default class CategoryList extends PureComponent {
    constructor(props: any) {
        super(props);
        this.state = {
            categories: [],
            search: "",
            loading: true,
        };
    }

    componentDidMount() {
        this.fetchCategories();
    }

    updateSearch = (search: string) => {
        this.setState({ search });
    };

    fetchCategories = async () => {
        this.setState({ loading: true });
        const currentSession = await Auth.currentSession();

        const apiName = "rehmats-api"; // replace this with your api name.
        const path = "/staging/menu-items"; //replace this with the path you have configured on your API
        const myInit = {
            body: {},
            headers: {
                Authorization:
                    "Bearer " + currentSession.getIdToken().getJwtToken(),
            },
        };

        API.get(apiName, path, myInit)
            .then((response) => {
                const categories = JSON.parse(response.body);
                this.setState({ categories: categories, loading: false });
            })
            .catch((error) => {
                console.log(error.response);
            });
    };

    render() {
        const { categories, search, loading } = this.state;

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
                        data={categories}
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
                                    this.props.navigation.navigate("ItemList", {
                                        menuCategory: item,
                                    })
                                }
                            >
                                <Image
                                    style={styles.image}
                                    source={require("../assets/images/food.png")}
                                />
                                <View style={styles.nameWrapper}>
                                    <Text style={styles.itemName}>
                                        {item.name}
                                    </Text>
                                </View>
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
    nameWrapper: {
        backgroundColor: "#a10618",
        borderRadius: 10,
        height: 20,
    },
    itemCode: {
        fontWeight: "600",
        fontSize: 12,
        // color: "#fff",
    },
    loadingIconContainer: {
        flex: 1,
        justifyContent: "center",
    },
    image: {
        width: 125,
        height: 30,
        flex: 1,
        justifyContent: "center",
    },
});
