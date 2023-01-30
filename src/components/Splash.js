import { View, Animated } from "react-native";
import React, { useRef, useEffect } from 'react';
import styles from '@app/assets/styles/Splash.style';

export default function Splash({navigation}) {
    const scaleXY = useRef(new Animated.Value(100)).current;
    const opacity = useRef(new Animated.Value(1)).current;

    function onAnimationComplete() {
        navigation.navigate("BOOKS");
    }

    useEffect(() => {
        Animated.parallel([
            Animated.timing(
                scaleXY,
                {
                    toValue: 5000,
                    duration: 2000,
                    delay: 500,
                    useNativeDriver: false
                }
            ),
            Animated.timing(
                opacity,
                {
                    toValue: 0,
                    duration: 700,
                    delay: 700, 
                    useNativeDriver: false
                }
            )
        ]).start(onAnimationComplete);
    }, [scaleXY]);

    return <>
        <View style={styles.container}>
            <Animated.Image
                style={{height: scaleXY, width: scaleXY, opacity: opacity}}
                source={require('@app/assets/images/ic_splash.png')}
      />
        </View>
    </>
};