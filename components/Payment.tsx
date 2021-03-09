import React, { PureComponent } from "react";
import { Amplify, Auth, API } from "aws-amplify";
import { View, Text, StyleSheet, Alert } from "react-native";
import { PaymentsStripe as Stripe } from "expo-payments-stripe";
import Button from "./Button";

export default class Payment extends PureComponent {
    static title = "Card Form";
    apiKey = "03lSbVM67F6IQhYV9cEt76iF731ahrub6gr1NPkQ";

    state = {
        loading: false,
        token: null,
    };

    componentDidMount() {
        Stripe.setOptionsAsync({
            publishableKey:
                "pk_test_51IEtNLEAGDRKyi4hwdsEEdfRsMv7HiI2GAv8A521nkWhLRKsDGnSZh40jOKG2RMQjfbZt3GO9gY95TtAje44Ntwf00vFUf7rvS",
            androidPayMode: "test", // [optional] used to set wallet environment (AndroidPay)
        });
    }

    handleCardPayPress = async () => {
        try {
            this.setState({ loading: true, token: null });
            const options = {
                requiredBillingAddressFields: "full",
                prefilledInformation: {
                    billingAddress: {
                        name: "Test Name",
                        line1: "Test Line 1",
                        line2: "4",
                        city: "Test City",
                        state: "Test State",
                        country: "Test Country",
                        postalCode: "31217",
                    },
                },
            };

            const token = await Stripe.paymentRequestWithCardFormAsync(options);
            this.setState({ loading: false, token });
        } catch (error) {
            this.setState({ loading: false });
        }
    };

    makePayment = async () => {
        this.setState({ loading: true });
        const currentSession = await Auth.currentSession();

        const apiName = "rehmats-api"; // replace this with your api name.
        const path = "/staging/payment"; //replace this with the path you have configured on your API
        const myInit = {
            body: {
                total: 1000,
                token: this.state.token?.tokenId,
            },
            headers: {
                Authorization: 'Bearer ' + currentSession.getIdToken().getJwtToken()
            }

        };


        API.post(apiName, path, myInit)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error.response);
            });
    };

    signOut () {
        Auth.signOut().then((res) => console.log(res)).catch(err => console.log(err));
    }

    render() {
        const { loading, token } = this.state;

        return (
            <View style={styles.container}>
                 <Button
                    text="Sign Out"
                    loading={loading}
                    onPress={this.signOut}
                    //   {...testID('cardFormButton')}
                />
                <Button
                    text="Enter you card and pay"
                    loading={loading}
                    onPress={this.handleCardPayPress}
                    //   {...testID('cardFormButton')}
                />
                <View style={styles.token}>
                    {token && (
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 5,
                            }}
                        >
                            <Text style={styles.instruction}>
                                Token: {token.tokenId}
                            </Text>
                            <Button
                                text="Make Payment"
                                loading={loading}
                                onPress={this.makePayment}
                            />
                        </View>
                    )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    instruction: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
        padding: 5,
    },
    token: {},
});
