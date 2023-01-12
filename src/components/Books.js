import { useState, useEffect } from 'react';
import { FlatList, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { ACCESS_BOOK } from '@app/constants/ApiEndpoint';
import Loader from '@app/components/Loader';

export default function Books({ navigation }) {
    const [books, setBooks] = useState([]);
    
    useEffect(() => {
        getBooks();
    }, [])
    
    function getBooks() {
        return fetch(ACCESS_BOOK, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                let displayBooks = responseJson.filter((book) => {
                    return book.display
                });
                setBooks(displayBooks);
            })
            .catch(error => {
                alert("Error getting the books");
            });
    };

    function viewHolder({ item }) {
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate("BOOK", {
                bookId: item.id
            }) }}>
                <View style={styles.container}>
                    <Text style={styles.field}>
                        <Text style={styles.value}>{item.bookName}</Text>
                    </Text>
                </View>
            </TouchableOpacity>)
    }

    return (
        <>
            <Text onPress={() => navigation.navigate("ADD BOOK")} style={styles.addBookCta}>
                ADD BOOK
            </Text>
            {
                (books.length === 0) ? <Loader /> :
                    <FlatList
                    ItemSeparatorComponent={<View style={styles.separator} />}
                    data={books}
                    renderItem={viewHolder}
                    style={styles.marginTop10}
                    keyExtractor={(book) => book.id} />
            }
        </>
    );
}

const styles = StyleSheet.create({
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