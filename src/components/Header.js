import { StyleSheet, View, Text } from 'react-native';

export default function Header({ children }) {
    return (
        <View style={styles.header}>
            <Text style={styles.heading}>{children}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 100,
        backgroundColor: "#5db3ff",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40
    },
    heading: {
        fontSize: 30,
        color: "#800080",
        fontWeight: "bold"
    },
});