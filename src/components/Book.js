import { Text, View, StyleSheet, PermissionsAndroid } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { ACCESS_BOOK } from '@app/constants/ApiEndpoint';
import Loader from '@app/components/Loader';
import Geolocation from '@react-native-community/geolocation';
import { getDistanceBetweenLocationsInMts } from '@app/helpers/books/LocationUtils';
import { useFocusEffect } from '@react-navigation/native';

export default function Book({ navigation, route }) {
    const [book, setBook] = useState();
    const { bookId } = route.params;
    const [hasLocation, setHasLocation] = useState();
    const [userLocation, setUserLocation] = useState();
    let watchId = undefined;
    
    useEffect(() => {
        getBook();
        checkAndRequestLocationPermission((permissionGranted) => {
            setHasLocation(permissionGranted);
            if (permissionGranted) {
                trackUserLocation();
            }
        });
    }, []);

    useFocusEffect(
        useCallback(() => {    
            return () => {
                if (watchId === undefined) {
                    Geolocation.clearWatch(watchId);
                    watchId = undefined;
              }
          };
        }, [])
      );

    function trackUserLocation() {
        // Setup initial location of user
        Geolocation.getCurrentPosition((geolocation) => {
            setUserLocation(geolocation);
        });

        // Track user location
        watchId = Geolocation.watchPosition((geoLocation) => {
            setUserLocation(geoLocation);
        }, (e) => {
            console.warn(e);
        }, {
            distanceFilter: 0.01,
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
        <LiveTracking hasLocation={hasLocation} userLocation={ userLocation } bookLocation={ book? book.location : null }  />
    </>);
}

const LiveTracking = ({ hasLocation, userLocation, bookLocation }) => {
    const trackingInfo = (function () {
        switch (true) {
            case !hasLocation: return "Location can't be accessed";
            case !userLocation: return "Tracking location....";
            case !bookLocation: return "Book's Location cant be accessed";
            default: return "Only "+ getDistanceBetweenLocationsInMts(userLocation, bookLocation)+ " away";

        }
    }());
    return (
        <View style={styles.trackingContainer}>
            <Text style={styles.trackingInfo}>{trackingInfo}</Text>
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
    },
    trackingContainer: {
        alignItems: "center"
    },
    trackingInfo: {
        backgroundColor: "red",
        color: "white",
        padding: 10,
        borderRadius: 10
    }
});