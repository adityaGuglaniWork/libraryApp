import { Text, View, TouchableHighlight, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useState } from 'react';
import { REGEX_VALID_EMAIL, REGEX_VALUE_URL, REGEX_DIGIT_ONLY } from '@app/constants/Regex'
import { ACCESS_BOOK } from '@app/constants/ApiEndpoint'
import getPublishers from '@app/helpers/books/getPublishers'
import { API_CODE_CREATED } from '@app/constants/ResposeCodes'
import styles from '@app/assets/styles/AddBookForm.style'
import { CustomNumberInput, CustomSelectInput, CustomTextInput } from './CustomInputs';

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

    function validateAndSetPrice(price) {
        setPrice(price.replace(REGEX_DIGIT_ONLY, ''));
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.fieldsContainer}>

                <CustomTextInput label="Book Name" isRequired={true} value={bookName} error={errorFields.bookName} onChange={(value) => { setBookName(value) }} />
                <CustomTextInput label="Author Name" isRequired={true} value={ authorName } error={errorFields.authorName} onChange={(value) => { setAuthorName(value) }} />
                <CustomNumberInput label="Price" isRequired={true} value={price} error={errorFields.price} onChange={(price) => { validateAndSetPrice(price) }} />
                <CustomSelectInput label="Publishers" setSelected={(val) => setPublisher(val)} data={getPublishers()} />

                <View style={styles.flexRow}>
                    <View style={styles.splitContainer}>
                        <CustomTextInput isRequired={true} label="Email" value={ email } error={errorFields.email} onChange={(value) => { setEmail(value) }} />
                    </View>
                    <View style={styles.splitContainer}>
                        <CustomTextInput isRequired={true} label="Website" value={ website } error={errorFields.website} onChange={(value) => { setWebsite(value) }} />
                    </View>
                </View>
                <View style={styles.displayBookCheckBlock}>
                    <CheckBox style={ styles.grey } onChange={() => setDisplay(!display)} value={display} />
                    <Text style={styles.grey}>Do you want to display this Book in Library?</Text>
                </View> 
            </ScrollView>
            <View style={styles.footer}>
                <TouchableHighlight onPress={onSubmit} style={styles.submitBtn}><Text style={styles.submitText}>SUBMIT</Text></TouchableHighlight>
            </View>
        </View>
    );
}

export const RedText = ({ children }) => {
    return <Text style={styles.red}>{children}</Text>
}