require('dotenv').config();
const bunyan = require('bunyan');

const logger = require('./services/logger.service');
const {
    getCredentialWithClientSecret,
    getCredentialWithEnvironmentVariables,
    getCredentialWithDefaultCredential,
} = require('./services/identity.service');
const { getSecret, setSecret } = require('./services/keyvault.service');

// Get Identity from Azure AD using ClientSecret approach
// Using Client Secret approach
// const credential = getCredentialWithClientSecret();

// Using Environment Variables Approach
// const credential = getCredentialWithEnvironmentVariables();

// Using Default Credential Approach
const credential = getCredentialWithDefaultCredential();

const getLatestSecret = async () => {
    logger.info('Fetching Secret & Details...');
    try {
        const secret = await getSecret(credential, 'DBNAME');
        logger.info(
            `Secret Name: ${secret.name} Secret Value: ${secret.value}`
        );
        logger.info(`Complete Secret Details.......`);
        logger.info(secret);
    } catch (error) {
        logger.error(error);
    }
};

const getSecretByVersion = async () => {
    logger.info('Fetching Secret & Details By Version...');
    try {
        const secret = await getSecret(
            credential,
            'DBNAME',
            process.env.SECRET_VERSION
        );
        logger.info(
            `Secret Name: ${secret.name} Secret Value: ${secret.value}`
        );
        logger.info(`Complete Secret Details.......`);
        logger.info(secret);
    } catch (error) {
        logger.error(error);
    }
};

const setSecretNameValue = async () => {
    logger.info('Creating Secret...');
    try {
        const secretDetails = await setSecret(
            credential,
            'DBREGION',
            'EAST-US'
        );
        logger.info('Secret Details:');
        logger.info(secretDetails);
    } catch (error) {
        logger.error(error);
    }
};

getLatestSecret();
// getSecretByVersion();
// setSecretNameValue();
