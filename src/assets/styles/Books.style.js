import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        height: "auto",
        borderRadius: 5,
        padding: 10,
        borderColor: "grey",
        borderWidth: 1,
        marginHorizontal: 10,
        backgroundColor: "#e1e1e1"
    },
    label: {
        fontWeight: "bold",
    },
    separator: {
        height: 10
    },
    field: {
        margin: 4
    },
    marginTop10: {
        marginTop: 10
    },
    addBookCta: {
        alignSelf: "flex-end",
        marginEnd: 30,
        marginTop: 20,
        fontWeight: "bold",
        color: "#800080"
    },
    value: {
        color: "grey"
    }
});