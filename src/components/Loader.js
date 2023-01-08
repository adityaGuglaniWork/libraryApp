import { StyleSheet, Text } from 'react-native'

export default function Loader() {
    return <Text style={styles.loading}>Loading...</Text>;
}

const styles = StyleSheet.create({
    loading: {
        alignSelf: "center",
        fontSize: 15,
        color: "grey"
    }
});