import React, { PureComponent } from "react";
import { Amplify, Auth, API } from "aws-amplify";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    FlatList,
} from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { ListItem, Avatar, Icon } from "react-native-elements";
import { SearchBar } from "react-native-elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import apiConfig from "../config/api-config";

export default class ProductList extends PureComponent {
    constructor(props: any) {
        super(props);
        this.state = {
            products: [],
            search: "",
            loading: false,
        };
    }

    componentDidMount() {
        this.setState({ products: this.props.route.params.products });
    }

    updateSearch = (search: string) => {
        this.setState({ search });
    };

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => (
        <ListItem
            bottomDivider
            onPress={() => {
                this.props.navigation.navigate("ProductDetails", {
                    product: item,
                });
            }}
        >
            <Avatar
                rounded
                size="large"
                source={{
                    uri:
                        "https://freepngimg.com/thumb/burger/6-2-burger-png-image-thumb.png",
                }}
            />
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle style={{ fontSize: 12 }}>
                    {item.manufacturer}
                </ListItem.Subtitle>
                <ListItem.Subtitle style={{ fontSize: 12 }}>
                    {item.volume}
                </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    );

    render() {
        const { products, loading } = this.state;

        return (
            <React.Fragment>
                {loading ? (
                    <ActivityIndicator
                        style={styles.loadingIconContainer}
                        size="large"
                        color="#a10618"
                    />
                ) : (
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={products}
                        renderItem={this.renderItem}
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
