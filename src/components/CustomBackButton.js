import { BackHandler, Platform, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import RNExitApp from 'react-native-exit-app';
import Toast from 'react-native-root-toast';
import { TouchableOpacity } from 'react-native';
import styles from '@app/assets/styles/CustomBackButton.style';

const DOUBLE_PRESS_DELAY = 300;

export default function CustomBackPress() {
    const route = useRoute();
    const navigation = useNavigation();
    
    lastTap = null;
    
    function handleBackPress() {
        const now = Date.now();
        const isDoublePress = lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY;
        const isScreeDefault = route.name === "BOOKS";

        if (isScreeDefault) {
            if (isDoublePress) {
                switch(Platform.OS) {
                    case "ios":
                        RNExitApp.exitApp()
                        break;
                    case "android":
                        BackHandler.exitApp();
                        break;
                }
            } else {
                Toast.show('Press twice to exit', {
                    duration: Toast.durations.SHORT
                });
            }
            lastTap = now;
        } else {
            navigation.goBack();
        }
    }

    return (
        <TouchableOpacity onPress={ handleBackPress }>
            <Text style={ styles.back }>BACK</Text>
        </TouchableOpacity>
    );
}