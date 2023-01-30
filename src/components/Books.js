import { useState, useEffect } from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import { ACCESS_BOOK } from '@app/constants/ApiEndpoint';
import Loader from '@app/components/Loader';
import styles from '@app/assets/styles/Books.style';

export default function Books({ navigation }) {
    const [books, setBooks] = useState([]);
    
    useEffect(() => {
        getBooks();
    }, [])
    
    function getBooks() {
        return fetch(ACCESS_BOOK, {
            method: 'GET'
        })
            .then((response) => { console.log(response); return response.json() })
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
                (books.length) ? <FlatList
                ItemSeparatorComponent={<View style={styles.separator} />}
                data={books}
                renderItem={viewHolder}
                style={styles.marginTop10}
                keyExtractor={(book) => book.id} />
                 : <Loader />   
            }
        </>
    );
}