import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    flexRow: {
        flexDirection: "row"
    },
    fieldsContainer: {
        flex: 1,
        margin: 10
    },
    splitContainer: {
        flexDirection: "column",
        flex: 1,
        padding: 2
    },
    red: {
        color: "red"
    },
    bookFormInput: {
        paddingStart: 8,
        marginVertical: 5,
        borderRadius: 12,
        borderColor: "black",
        borderWidth: 1,
        borderColor: "grey",
        color: "grey"
    },
    submitBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgreen',
    },
    submitText: {
        fontWeight: "bold",
        fontSize: 20
    },
    inputLabel: {
        marginVertical: 5,
        fontWeight: "bold",
        color: "grey",
    },
    footer: {
        height: 70,
        backgroundColor: "black"
    },
    displayBookCheckBlock: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10
    },
    grey: {
        color: "grey",
    }
});