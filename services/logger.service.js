const logInfo = (message) => console.info(message);

const logError = (message) => console.error(message);

const logWarning = (message) => console.warn(message);

const logMessage = (message) => console.log(message);

module.exports = {
    info: logInfo,
    error: logError,
    warn: logWarning,
    log: logMessage,
};
