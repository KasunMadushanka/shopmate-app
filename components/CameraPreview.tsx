import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ImageBackground,
} from "react-native";

export default function CameraPreview({
    photo,
    retakePicture,
    savePhoto,
}: any) {
    return (
        <View
            style={{
                backgroundColor: "transparent",
                flex: 1,
                width: "100%",
                height: "100%",
            }}
        >
            <ImageBackground
                source={{ uri: photo && photo.uri }}
                style={{
                    flex: 1,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "flex-end",
                    }}
                >
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={retakePicture}
                            style={styles.recaptureButton}
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    fontSize: 15,
                                }}
                            >
                                Recapture
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={savePhoto}
                            style={styles.searchButton}
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    fontSize: 15,
                                }}
                            >
                                Search Product
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
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
