const crypto = require('crypto');

const generateSecret = () => {
    return crypto.randomBytes(32).toString('base64');  // Generate 256-bit base64 encoded key
};

console.log(generateSecret());
