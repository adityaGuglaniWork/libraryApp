import { Text, View, StyleSheet, PermissionsAndroid } from 'react-native';
import { useState, useEffect } from 'react';
import { ACCESS_BOOK } from '@app/constants/ApiEndpoint';
import Loader from '@app/components/Loader';
import Geolocation from '@react-native-community/geolocation';
import { getDistanceBetweenLocationsInMts } from '@app/helpers/books/LocationUtils';

export default function Book({ navigation, route }) {
    const [book, setBook] = useState();
    const { bookId } = route.params;
    const [hasLocation, setHasLocation] = useState();
    const [userLocation, setUserLocation] = useState();
    
    useEffect(() => {
        getBook();
        checkAndRequestLocationPermission((permissionGranted) => {
            setHasLocation(permissionGranted);
            if (permissionGranted) {
                trackUserLocation();
            }
        });
    }, []);

    function trackUserLocation() {
        Geolocation.watchPosition((geoLocation) => {
            console.log(geoLocation);
            setUserLocation(geoLocation);
        }, (e) => {
            console.warn(e);
        }, {
            distanceFilter: 1,
            enableHighAccuracy: true,
            interval: 1
        });
    }
    
    function getBook() {
        return fetch(ACCESS_BOOK + bookId, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((responseJson) => {
                navigation.setOptions({ title: responseJson.bookName.toUpperCase() + ' DETAIL' });
                setBook(responseJson);
            })
            .catch(error => {
                console.warn(error);
                navigation.goBack();
            });
    };

    const InfoRow = ({ field, value }) => {
        return (
            <Text style={styles.field}>
                <Text style={styles.label}>{field}:  </Text>
                <Text style={styles.value}>{value}</Text>
            </Text>
        );
    }
    
    return (<>
        <View style={styles.container}>
            {(book) ?
                <>
                    <InfoRow field="Book Name" value={book.bookName} />
                    <InfoRow field="Author" value={book.authorName} />
                    <InfoRow field="Price" value={"$" + book.price} />
                    <InfoRow field="Publishers" value={book.publisher} />
                    <InfoRow field="Website" value={book.website} />
                    <InfoRow field="Email" value={book.email} />
                </> : <Loader />}
        </View>
        {(hasLocation && book && userLocation) ? <LiveTracking userLocation={ userLocation } bookLocation={ book? book.location : null }  /> : null}
    </>);
}

const LiveTracking = ({ userLocation, bookLocation }) => {
    return (
        <View style={{ alignItems: "center" }}>
            <Text style={{ backgroundColor: "grey", padding: 10, borderRadius: 10 }}>Only {getDistanceBetweenLocationsInMts(userLocation, bookLocation)} away</Text>
        </View>
    );
}

async function checkAndRequestLocationPermission(updatePermissionStatus) {
    try {
        const isGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (isGranted === 'granted') {
            updatePermissionStatus(true);
        } else {
            const newPermissionResponse = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            updatePermissionStatus(newPermissionResponse === 'granted');
      }
    } catch (err) {
        updatePermissionStatus(false);
        console.warn(err);
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        backgroundColor: "lightgrey",
        margin: 20,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 10
    },
    field: {
        padding: 10,
        fontSize: 15,
        flexDirection: "row"
    },
    label: {
        fontWeight: "bold",
        color: "grey"
    },
    value: {
        color: "grey"
    }
});