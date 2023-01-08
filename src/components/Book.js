import { Text, View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { ACCESS_BOOK } from '@app/constants/ApiEndpoint';
import Loader from '@app/components/Loader'

export default function Book({ navigation, route }) {
    const [book, setBook] = useState();
    const { bookId } = route.params;
    
    useEffect(() => {
        getBook();
    }, []);
    
    function getBook() {
        return fetch(ACCESS_BOOK + bookId, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                navigation.setOptions({title: responseJson.bookName.toUpperCase() + ' DETAIL'});
                setBook(responseJson);
            })
            .catch(error => {
                console.log(error);
                alert("Error getting the book");
                navigation.goBack();
            });
    };
    
    return <View style={styles.container}>
        {(book) ?
            <>
                <Text style={styles.field}>
                    <Text style={styles.label}>Book Name:</Text>
                    <Text style={styles.value}>{book.bookName}</Text>
                </Text>
                <Text style={styles.field}>
                     <Text style={styles.label}>Author:</Text>
                     <Text style={styles.value}>{book.authorName}</Text>
                  </Text>
                  <Text style={styles.field}>
                      <Text style={styles.label}>Price:</Text>
                      <Text style={styles.value}>${book.price}</Text>
                  </Text>
                  <Text style={styles.field}>
                      <Text style={styles.label}>Publishers:</Text>
                      <Text style={styles.value}>{book.publisher}</Text>
                  </Text>
                  <Text style={styles.field}>
                      <Text style={styles.label}>Website:</Text>
                      <Text style={styles.value}>{book.website}</Text>
                  </Text>
                  <Text style={styles.field}>
                      <Text style={styles.label}>Email:</Text>
                     <Text style={styles.value}>{book.email}</Text>
                 </Text>
            </>: <Loader/>}
        
    </View>
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "lightgrey",
        margin: 20,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10
    },
    field: {
        marginBottom: 20,
        fontSize: 15
    },
    label: {
        fontWeight: "bold"
    }
});