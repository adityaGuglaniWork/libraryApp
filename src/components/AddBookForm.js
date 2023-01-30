import { Text, View, TextInput, TouchableOpacity, Platform, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list'
import { REGEX_VALID_EMAIL, REGEX_VALUE_URL, REGEX_DIGIT_ONLY } from '@app/constants/Regex'
import { ACCESS_BOOK } from '@app/constants/ApiEndpoint'
import getPublishers from '@app/helpers/books/getPublishers'
import { API_CODE_CREATED } from '@app/constants/ResposeCodes'
import styles from '@app/assets/styles/AddBookForm.style'

export default function AddBookForm() {
    const [bookName, setBookName] = useState();
    const [authorName, setAuthorName] = useState();
    const [price, setPrice] = useState();
    const [email, setEmail] = useState();
    const [website, setWebsite] = useState();
    const [display, setDisplay] = useState(false);
    const [publisher, setPublisher] = useState();

    const [errorFields, setErrorFields] = useState({});

    function submitBook() {
        return fetch(ACCESS_BOOK, {
            method: 'POST',
            body: JSON.stringify({
                "bookName": bookName,
                "authorName": authorName,
                "price": price,
                "email": email,
                "website": website,
                "display": display,
                "publisher": publisher

            })
        })
            .then(response => {
                if (response.status == API_CODE_CREATED) {
                    alert("Book Submitted");
                    clearInputs()
                } else {
                    alert("Error submitting the Book");
                }
            })
            .catch(error => {
                alert("Error submitting the Book");
            });
    };

    function onSubmit() {
        if (validateFields()) {
            submitBook();
        }
    }

    function clearInputs() {
        setBookName("");
        setAuthorName("");
        setPrice("");
        setEmail("");
        setWebsite("");
        setDisplay(!display);
    }

    function validateFields() {
        let errorFields = {};

        if (!bookName) {
            errorFields["bookName"] = "Please enter book name";
        }

        if (!authorName) {
            errorFields["authorName"] = "Please enter author name";
        }

        if (!price) {
            errorFields["price"] = "Please enter price";
        }

        if (!email) {
            errorFields["email"] = "Please enter email";
        } else if (REGEX_VALID_EMAIL.test(email) === false) {
            errorFields["email"] = "Please enter a valid email";
        }

        if (!website) {
            errorFields["website"] = "Please enter website";
        } else if (REGEX_VALUE_URL.test(website) === false) {
            errorFields["website"] = "Please enter a valid website";
        }

        setErrorFields(errorFields);

        return Object.keys(errorFields).length == 0;
    }

    function validateAndSetPrice(e) {
        let price = e.nativeEvent.text;
        setPrice(price.replace(REGEX_DIGIT_ONLY, ''));
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.fieldsContainer}>
                <Text style={styles.inputLabel}>Book Name<RedText>*</RedText></Text>
                <TextInput value={bookName} onChange={(e) => setBookName(e.nativeEvent.text)} placeholder="Book Name" style={styles.bookFormInput} />
                <RedText>{errorFields.bookName}</RedText>

                <Text style={styles.inputLabel}>Author Name<RedText>*</RedText></Text>
                <TextInput value={authorName} onChange={(e) => setAuthorName(e.nativeEvent.text)} placeholder="Author Name" style={styles.bookFormInput} />
                <RedText>{errorFields.authorName}</RedText>

                <Text style={styles.inputLabel}>Price<RedText>*</RedText></Text>
                <TextInput value={price} onChange={(e) => validateAndSetPrice(e)} keyboardType={Platform.OS ? "number-pad" : "numeric"} placeholder="Price" style={styles.bookFormInput} />
                <RedText>{errorFields.price}</RedText>

                <Text style={styles.inputLabel}>Publishers</Text>
                <SelectList setSelected={(val) => setPublisher(val)} data={getPublishers()} />

                <View style={styles.flexRow}>
                    <View style={styles.splitContainer}>
                        <Text style={styles.inputLabel}>Email<RedText>*</RedText></Text>
                        <TextInput value={email} onChange={(e) => setEmail(e.nativeEvent.text)} placeholder="Email" style={styles.bookFormInput} />
                        <RedText>{errorFields.email}</RedText>
                    </View>
                    <View style={styles.splitContainer}>
                        <Text style={styles.inputLabel}>Website<RedText>*</RedText></Text>
                        <TextInput value={website} onChange={(e) => setWebsite(e.nativeEvent.text)} placeholder="Website" style={styles.bookFormInput} />
                        <RedText>{errorFields.website}</RedText>
                    </View>
                </View>
                <View style={styles.displayBookCheckBlock}>
                    <CheckBox style={ styles.grey } onChange={() => setDisplay(!display)} value={display} />
                    <Text style={styles.grey}>Do you want to display this Book in Library?</Text>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity onPress={onSubmit} style={styles.submitBtn}><Text style={styles.submitText}>SUBMIT</Text></TouchableOpacity>
            </View>
        </View>
    );
}

const RedText = ({ children }) => {
    return <Text style={styles.red}>{children}</Text>
}