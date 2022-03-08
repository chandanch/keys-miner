const {
    DefaultAzureCredential,
    EnvironmentCredential,
    ClientSecretCredential,
} = require('@azure/identity');

const logger = require('./logger.service');

// get the client id & client secret from env variables
const {
    AZURE_TENANT_ID,
    AZURE_CLIENT_ID,
    AZURE_CLIENT_SECRET,
    KEY_VAULT_NAME,
} = process.env;

/**
 * @description Obtains Credential with Service Principal's Client ID, Client Secret.
 * @returns ClientCredential
 */
const getCredentialWithClientSecret = () => {
    logger.info('Fetching Credentials with Client Secret....');
    const credential = new ClientSecretCredential(
        AZURE_TENANT_ID,
        AZURE_CLIENT_ID,
        AZURE_CLIENT_SECRET
    );

    return credential;
};

/**
 * @description Obtains Credential using Client ID & Secret specified in Environment Variables
 * @returns ClientCredential
 */
const getCredentialWithEnvironmentVariables = () => {
    logger.info('Fetching Credentials using Environment Variables....');
    const credential = new EnvironmentCredential();
    return credential;
};

/**
 * @description Obtains Credential from azure cli  if user is logged_in to azure, else return error
 * @returns ClientCredential
 */
const getCredentialWithDefaultCredential = () => {
    logger.info('Fetching Credentials using Environment Variables....');
    const credential = new DefaultAzureCredential();
    return credential;
};

module.exports = {
    getCredentialWithClientSecret,
    getCredentialWithEnvironmentVariables,
    getCredentialWithDefaultCredential,
};
