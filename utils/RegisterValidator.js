const Ajv = require("ajv").default;
const ajv = new Ajv({ allErrors: true, $data: true });
require("ajv-errors")(ajv);

const schema = {
    type: "object",
    properties: {
        username: { type: "string", pattern: "^[a-zA-Z0-9_-]{3,16}$" },
        email: { type: "string", pattern: "^.+\@.+\..+$" },
        password: { type: "string", pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$" },
        confirmPassword: { type: "string", const: { $data: "1/password" } },

    },
    required: ["username", "email", "password", "confirmPassword"],
    errorMessage: {
        properties: {
            username: "username is not valid",
            email: "email is not valid",
            password: 'password is not valid',
            confirmPassword: "must match with password",
        },
    },
}

module.exports = ajv.compile(schema);