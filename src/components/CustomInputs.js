import { Text, TextInput } from "react-native";
import { RedText } from "./AddBookForm";
import styles from '@app/assets/styles/AddBookForm.style';
import { SelectList } from 'react-native-dropdown-select-list';


const Label = ({ title, isRequired }) => {
    return (
        <>
        <Text style={styles.inputLabel}>{title}
                {(isRequired)?<RedText>*</RedText>:null}
            </Text>
        </>
    );
}

export function CustomTextInput({label, value, onChange, error, isRequired }) {
    return <>
        <Label title={label} isRequired={isRequired} />
        <TextInput placeholderTextColor="lightgrey" value={value} onChange={(e) => onChange(e.nativeEvent.text)} placeholder={label} style={styles.bookFormInput} />
        <RedText>{error}</RedText>
    </>
}

export function CustomNumberInput({label, value, onChange, error, isRequired }) {
    return <>
        <Label title={label} isRequired={isRequired} />
        <TextInput placeholderTextColor="lightgrey" value={value} onChange={(e) => onChange(e.nativeEvent.text)} keyboardType={Platform.OS ? "number-pad" : "numeric"} placeholder="Price" style={styles.bookFormInput} />
        <RedText>{error}</RedText>
    </>
}

export function CustomSelectInput({data, setSelected}) {
    return <>
        <Text style={styles.inputLabel}>Publishers</Text>
        <SelectList setSelected={setSelected} data={data} />
    </>
}