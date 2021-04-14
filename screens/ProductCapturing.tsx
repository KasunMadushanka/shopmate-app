import React, { PureComponent, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { Auth, API } from "aws-amplify";
import { Camera } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import CameraPreview from "../components/CameraPreview";
import Toast from "react-native-simple-toast";

let camera: Camera;

export default class ProductCapturing extends PureComponent {
    constructor(props: any) {
        super(props);
        this.state = {
            user: {},
            startCamera: false,
            previewVisible: false,
            capturedImage: null,
            loading: false,
        };
    }

    componentDidMount() {
        this.showWelcomeMessage();
    }

    showWelcomeMessage = async () => {
        const userInfo = await Auth.currentUserInfo();
        this.setState({ user: userInfo.attributes });
    };

    signOut = async (): Promise<void> => {
        try {
            await Auth.signOut({ global: true });
        } catch (error) {
            console.log("error signing out: ", error);
        }
    };

    startCamera = async () => {
        const { status } = await Camera.requestPermissionsAsync();

        if (status === "granted") {
            this.setState({ startCamera: true });
        } else {
            alert("Access denied");
        }
    };

    takePicture = async () => {
        const photo: any = await camera.takePictureAsync({
            base64: true,
            quality: 1,
        });

        this.setState({ previewVisible: true });
        this.setState({ capturedImage: photo });
    };

    savePhoto = async () => {
        this.setState({ loading: true });
        const photo = this.state.capturedImage;

        const resizedPhoto = await ImageManipulator.manipulateAsync(
            photo.uri,
            [{ resize: { width: 200, height: 200 } }],
            { compress: 0.7, format: "jpeg", base64: true }
        );
        const currentSession = await Auth.currentSession();

        const apiName = "shopmate-api";
        const path = "/staging/product-images";
        const myInit = {
            body: {
                image: JSON.stringify(resizedPhoto.base64),
            },
            headers: {
                Authorization:
                    "Bearer " + currentSession.getIdToken().getJwtToken(),
                "Content-Type": "multipart/form-data",
            },
        };

        API.post(apiName, path, myInit)
            .then((response: any) => {
                setTimeout(() => {
                    console.log(response)
                    if (response.errorMessage) {
                        Toast.showWithGravity(
                            "Failed to retrieve Products",
                            Toast.LONG,
                            Toast.BOTTOM
                        );
                    } else {
                        this.props.navigation.navigate("ProductDetails", {
                            products: response,
                        });
                    }
                    this.setState({ loading: false });
                }, 3000);
            })
            .catch((error: any) => {
                console.log(error.response);
            });
    };

    retakePicture = () => {
        this.setState({ capturedImage: null });
        this.setState({ previewVisible: false });
        this.startCamera();
    };

    render() {
        const {
            user,
            startCamera,
            previewVisible,
            capturedImage,
            loading,
        } = this.state;

        return (
            <View style={styles.container}>
                {startCamera ? (
                    <View
                        style={{
                            flex: 1,
                            width: "100%",
                        }}
                    >
                        {previewVisible && capturedImage && !loading ? (
                            <CameraPreview
                                photo={capturedImage}
                                savePhoto={this.savePhoto}
                                retakePicture={this.retakePicture}
                            />
                        ) : !loading ? (
                            <Camera
                                style={{ flex: 1 }}
                                ref={(r) => {
                                    camera = r;
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        width: "100%",
                                        backgroundColor: "transparent",
                                        flexDirection: "row",
                                    }}
                                >
                                    <View
                                        style={{
                                            position: "absolute",
                                            bottom: 0,
                                            flexDirection: "row",
                                            flex: 1,
                                            width: "100%",
                                            padding: 20,
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <View
                                            style={{
                                                alignSelf: "center",
                                                flex: 1,
                                                alignItems: "center",
                                            }}
                                        >
                                            <TouchableOpacity
                                                onPress={() =>
                                                    this.takePicture()
                                                }
                                                style={{
                                                    width: 70,
                                                    height: 70,
                                                    bottom: 0,
                                                    borderColor: "white",
                                                    borderWidth: 1,
                                                    borderRadius: 50,
                                                    backgroundColor: "#0d98ba",
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </Camera>
                        ) : (
                            <View style={styles.loadingIconContainer}>
                                <ActivityIndicator
                                    size="large"
                                    color="#0d98ba"
                                />
                                <Text style={{fontSize: 16}}>Retrieving Product Information...</Text>
                            </View>
                        )}
                    </View>
                ) : (
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "#fff",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => this.startCamera()}
                            style={{
                                width: 160,
                                // borderRadius: 4,
                                backgroundColor: "#0d98ba",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                height: 55,
                                borderRadius: 30,
                                borderWidth: 1,
                                borderColor: "#0d98ba",
                            }}
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    fontSize: 17,
                                }}
                            >
                                Capture Product
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    loadingIconContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
});
