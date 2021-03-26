import React, { PureComponent, useState } from "react";
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
    FlatList,
} from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { colors, SearchBar, ListItem, Avatar } from "react-native-elements";
import Dialog, {
    DialogFooter,
    DialogButton,
    DialogContent,
    DialogTitle,
} from "react-native-popup-dialog";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addMenuItem } from "../redux/actions/OrderActions";
import SavedCards from "../components/SavedCards";

import SwitchSelector from "react-native-switch-selector";
import GooglePlacesInput from "../components/PlacesAutoComplete";

interface IUser {
    id: number;
    name: string;
    email: string;
}

enum states {
    unconfirmed,
    confirmed,
    timeSelected,
    cardSelected,
}

class Order extends PureComponent {
    constructor(props: any) {
        super(props);
        this.state = {
            menuItems: [],
            loading: false,
            visible: false,
            state: states.unconfirmed,
            orderType: "Pickup",
            deliveryAddress: null,
        };
    }

    componentDidMount() {
        this.setState({ menuItems: this.props.order.menuItems });
        this.props.navigation.addListener("didFocus", this.onScreenFocus);
    }

    onScreenFocus = () => {
        // Screen was focused, our on focus logic goes here
        console.log(7675);
    };

    onChange(number: number, type: any) {
        this.setState({ quantity: number });
    }

    showPaymentMethods = async () => {
        this.setState({ visible: true });
    };

    toggleDialog = (state: any) => {
        this.setState({ visibile: state });
    };

    setTime = (event: any, dateTime: any) => {
        console.log(dateTime);
        this.setState({ state: states.timeSelected });
    };

    setDeliveryAddress = (address: any) => {
        console.log(address);
        this.setState({
            deliveryAddress: address,
        });
    };

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => (
        <ListItem
            bottomDivider
            onPress={() => {
                this.props.navigation.navigate("ItemDetail", {
                    menuItem: item,
                });
            }}
        >
            <Avatar
                rounded
                size="large"
                source={{
                    uri:
                        "https://www.cookitalia.co.uk/wp-content/uploads/2014/09/Linguine-Bolognese-focussed.png",
                }}
            />
            <ListItem.Content>
                <ListItem.Title>
                    {item.quantity} x {item.name}
                </ListItem.Title>
                <ListItem.Subtitle style={{ fontSize: 14 }}>
                    £{item.price}
                </ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    );

    render() {
        const { menuItems, loading, visible, state, orderType } = this.state;
       
        return (
            <View style={styles.container}>
                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={menuItems}
                    renderItem={this.renderItem}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate("Checkout")}
                >
                    <Text style={{ color: "#ffffff" }}>Proceed to Checkout</Text>
                </TouchableOpacity>
            </View>
            /* {state === states.confirmed ? (
                    <RNDateTimePicker
                        testID="dateTimePicker"
                        value={new Date()}
                        mode={"time"}
                        is24Hour={true}
                        display="default"
                        minimumDate={minDateTime}
                        maximumDate={maxDateTime}
                        onChange={this.setTime}
                    />
                ) : (
                    <Dialog
                        onDismiss={() => {}}
                        width={0.9}
                        visible={state === states.timeSelected}
                        rounded
                        actionsBordered
                        dialogTitle={
                            <DialogTitle
                                title="Select Payment Method"
                                style={{
                                    backgroundColor: "#F7F7F8",
                                }}
                                hasTitleBar={true}
                                align="center"
                            />
                        }
                        footer={
                            <DialogFooter>
                                <DialogButton
                                    text="CANCEL"
                                    bordered
                                    onPress={() =>
                                        this.setState({
                                            state: states.unconfirmed,
                                        })
                                    }
                                    key="button-1"
                                />
                                <DialogButton
                                    text="OK"
                                    bordered
                                    onPress={() =>
                                        this.setState({
                                            state: states.cardSelected,
                                        })
                                    }
                                    key="button-2"
                                />
                            </DialogFooter>
                        }
                    >
                        <DialogContent
                            style={{
                                backgroundColor: "#F7F7F8",
                            }}
                        >
                            <View style={styles.dialogContentContainer}>
                                <SwitchSelector
                                    initial={0}
                                    onPress={(value) =>
                                        this.setState({ orderType: value })
                                    }
                                    textColor={colors.purple} //'#7a44cf'
                                    selectedColor={colors.black}
                                    buttonColor={colors.purple}
                                    borderColor={colors.purple}
                                    hasPadding
                                    options={[
                                        {
                                            label: "Pickup",
                                            value: "Pickup",
                                        },
                                        {
                                            label: "Delivery",
                                            value: "Delivery",
                                        },
                                    ]}
                                    testID="gender-switch-selector"
                                    accessibilityLabel="gender-switch-selector"
                                />
                                <View style={{ alignItems: "center" }}>
                                    <TouchableOpacity
                                        style={{
                                            borderWidth: 1,
                                            borderColor: "#a10618",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "50%",
                                            height: 45,
                                            marginTop: 15,
                                            backgroundColor: "#a10618",
                                            borderRadius: 25,
                                        }}
                                        onPress={() =>
                                            this.setState({
                                                state: states.confirmed,
                                            })
                                        }
                                    >
                                        <Text style={{ color: "#ffffff" }}>
                                            Select {orderType} Time
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                               
                                <View style={{ margin: 10 }}>
                                    {(() => {
                                        if (orderType === "Delivery") {
                                            return (
                                                <View style={{height: 200}}>
                                                <GooglePlacesInput
                                                    // setDeliveryAddress={
                                                    //     this.setDeliveryAddress
                                                    // }
                                                ></GooglePlacesInput>
                                                </View>
                                            );
                                        } else {
                                            <Text></Text>;
                                        }
                                    })()}
                                </View>
                                {/* <SavedCards></SavedCards> */

            //            </DialogContent>
            //          </Dialog>
            //      )} */}
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
    },
    dialogContentContainer: {
        // flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
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

const mapStateToProps = (state) => {
    const { order } = state;
    return { order };
};

export default connect(mapStateToProps)(Order);
