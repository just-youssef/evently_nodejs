const Ajv = require("ajv").default;
const ajv = new Ajv({ allErrors: true });
require("ajv-errors")(ajv);

const schema = {
    type: "object",
    properties: {
        email: { type: "string", pattern: ".+\@.+\..+" },
        password: { type: "string", minLength: 5 },
    },
    required: ["email", "password"],
    errorMessage: {
        properties: {
            email: "email is not valid",
            password: "password is too short",
        },
    },
}

module.exports = ajv.compile(schema);