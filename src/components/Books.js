import { useState, useEffect } from 'react';
import { FlatList, Text, StyleSheet, View } from 'react-native';
import { ACCESS_BOOK } from '@app/constants/ApiEndpoint';

export default function Books() {
    const [books, setBooks] = useState();
    
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
                console.log(error);
                alert("Error getting the books");
            });
    };

    function viewHolder({ item }) {
        return (
            <View style={styles.container}>
                <Text style={styles.field}>
                    <Text style={styles.label}>Book Name:</Text>
                    <Text style={styles.value}>{item.bookName}</Text>
                </Text>
                <Text style={styles.field}>
                    <Text style={styles.label}>Author:</Text>
                    <Text style={styles.value}>{item.authorName}</Text>
                </Text>
                <Text style={styles.field}>
                    <Text style={styles.label}>Price:</Text>
                    <Text style={styles.value}>${item.price}</Text>
                </Text>
                <Text style={styles.field}>
                    <Text style={styles.label}>Publishers:</Text>
                    <Text style={styles.value}>{item.publisher}</Text>
                </Text>
                <Text style={styles.field}>
                    <Text style={styles.label}>Website:</Text>
                    <Text style={styles.value}>{item.website}</Text>
                </Text>
                <Text style={styles.field}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{item.email}</Text>
                </Text>
            </View>)
    }

    return (
        <View style={styles.root}>
            <Text style={styles.header}>Books In Library</Text>
            {
                <FlatList
                    ItemSeparatorComponent={<View style={styles.separator} />}
                    data={books}
                    renderItem={viewHolder}
                    keyExtractor={(book) => book.id} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "auto",
        minHeight: 100,
        borderRadius: 5,
        padding: 10,
        borderColor: "grey",
        borderWidth: 1,
        marginHorizontal: 10,
        backgroundColor: "#e1e1e1"
    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
        alignSelf: "center"
    },
    root: {
        marginTop: 60
    },
    label: {
        fontWeight: "bold",
    },
    separator: {
        height: 10
    },
    field: {
        margin: 4
    }
});