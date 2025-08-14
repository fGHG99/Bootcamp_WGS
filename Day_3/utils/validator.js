import validator from 'validator';

const validatePhone = (number) => {
    return validator.isMobilePhone(number, 'id-ID');
}

const validateEmail = (email) => {
    return validator.isEmail(email);
}

export { validatePhone, validateEmail };