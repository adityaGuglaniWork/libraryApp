import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        paddingLeft: 10,
        backgroundColor: "lightgrey",
        margin: 20,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10
    },
    field: {
        padding: 10,
        fontSize: 15,
        flexDirection: "row"
    },
    label: {
        fontWeight: "bold",
        color: "grey"
    },
    value: {
        color: "grey"
    },
    trackingContainer: {
        alignItems: "center"
    },
    trackingInfo: {
        backgroundColor: "red",
        color: "white",
        padding: 10,
        borderRadius: 10
    }
});