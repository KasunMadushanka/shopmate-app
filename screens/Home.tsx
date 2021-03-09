import React, { PureComponent, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { Auth } from "aws-amplify";
import { Camera } from "expo-camera";
import CameraPreview from "../components/CameraPreview";

let camera: Camera;

export default class Home extends PureComponent {
    constructor(props: any) {
        super(props);
        this.state = {
            user: {},
            startCamera: false,
            previewVisible: false,
            capturedImage: null,
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
        console.log(status);
        if (status === "granted") {
            this.setState({ startCamera: true });
        } else {
            alert("Access denied");
        }
    };

    takePicture = async () => {
        const photo: any = await camera.takePictureAsync();
        console.log(photo);
        this.setState({ previewVisible: true });
        //setStartCamera(false)
        this.setState({ capturedImage: photo });
    };

    savePhoto = () => {
        console.log(this.state.capturedImage)
    };

    retakePicture = () => {
        this.setState({ capturedImage: null });
        this.setState({ previewVisible: false });
        this.startCamera();
    };

    render() {
        const { user, startCamera, previewVisible, capturedImage } = this.state;

        return (
            <View style={styles.container}>
                {startCamera ? (
                    <View
                        style={{
                            flex: 1,
                            width: "100%",
                        }}
                    >
                        {previewVisible && capturedImage ? (
                            <CameraPreview
                                photo={capturedImage}
                                savePhoto={this.savePhoto}
                                retakePicture={this.retakePicture}
                            />
                        ) : (
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
                                                    borderRadius: 50,
                                                    backgroundColor: "#fff",
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </Camera>
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
                                width: 130,
                                // borderRadius: 4,
                                backgroundColor: "#14274e",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                height: 40,
                            }}
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                }}
                            >
                                Open Camera
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
});
