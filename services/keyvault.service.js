const { logger } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

const { info, error } = require('./logger.service');

const vaultName = process.env.KEY_VAULT_NAME;
const vaultURL = `https://${vaultName}.vault.azure.net`;

/**
 * @description Returns the secret based on the specified secret name and an optional secret version
 * @param {String} credential Client Credential to authenticate get secret request
 * @param {String} secretName Name of the secret for which the value needs to be extracted
 * @param {String} secretVersion OPTIONAL Secret version that needs to be retrieved
 * @returns {KeyVaultSecret} KeyVaultSecret - Secret details
 */
const getSecret = async (credential, secretName, secretVersion) => {
    try {
        // Create an instance of KeyVault Secret Client
        const client = new SecretClient(vaultURL, credential);
        if (!secretVersion) {
            // Get latest version if secrect version is not specified
            const secret = await client.getSecret(secretName);
            return secret;
        } else {
            // Get secret based on the version provided
            info('Fetching secret based on secret version...');
            const secret = await client.getSecret(secretName, {
                version: secretVersion,
            });
            return secret;
        }
    } catch (error) {
        throw new Error(`Failed to fetch secret: ${error}`);
    }
};

/**
 * @description Sets the secret in keyvault based on the specified secret name and returns secret
 * details
 * @param {String} credential Client Credential to authenticate get secret request
 * @param {*} secretName Name of the secret
 * @param {*} secretValue Secret Value
 * @returns {KeyVaultSecret} KeyVault - Secret Details
 */
const setSecret = async (credential, secretName, secretValue) => {
    try {
        // Create an instance of KeyVault Secret Client
        const client = new SecretClient(vaultURL, credential);
        const secretDetails = await client.setSecret(secretName, secretValue);
        return secretDetails;
    } catch (error) {
        throw new Error(`Failed to Set Secret... ${error}`);
    }
};

module.exports = {
    getSecret,
    setSecret,
};
