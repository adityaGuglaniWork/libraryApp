import { REGEX_VALID_EMAIL, REGEX_VALUE_URL } from "@app/constants/Regex";

export const validateEmail = (email) => {
    return REGEX_VALID_EMAIL.test(email);
}

export const validateUrl = (url) => {
    return REGEX_VALUE_URL.test(url);
}