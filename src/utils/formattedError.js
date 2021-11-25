const formattedError = (errorMessage = 'Something has gone wrong') => {
    return {
        error: errorMessage,
        status: 'error',
    };
};

module.exports = formattedError;