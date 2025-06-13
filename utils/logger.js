// Utilidad simple de logging con emojis
const logger = {
    info: (message) => {
        console.log(message);
    },
    error: (message) => {
        console.error(message);
    },
    warn: (message) => {
        console.warn(message);
    },
    debug: (message) => {
        if (process.env.NODE_ENV === 'development') {
            console.log('🔍 DEBUG:', message);
        }
    }
};

module.exports = logger; 