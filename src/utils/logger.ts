const COLORS = {
    INFO: '#17a2b8',
    WARNING: '#ffc107',
    SUCCESS: '#28a745',
    ERROR: '#dc3545',
}

type Logger = Record<string, (message: string) => void>;

const logger = Object.entries(COLORS).reduce<Logger>((result, [name, color]) => {
    const functionName = name.toLowerCase();
    result[functionName] = (message: string) => {
        console.log(
            `%c${name}`,
            `color: ${color}`,
            message
        )
    };
    return result;
}, {})
export default logger;