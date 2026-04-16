const rules = {
    required: {
        required: "This field is required",
    },
    email: {
        pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email address",
        },
    },
    min: {
        minLength: {
            value: 2,
            message: "Minimum 2 symbols required",
        },
    },
}

export default rules;