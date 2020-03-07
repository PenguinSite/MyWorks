export const required = value => {
    if (value) return undefined;
    return "This field is required\n"
}

export const validateEmail = email => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) return 'Please enter a valid email';
}
export const checked = value => {
    if (!value) return 'accept the terms of use'
}
export const minLength8 = value => {
    if (value.length < 8) return 'there must be at least 8 characters\n'
}