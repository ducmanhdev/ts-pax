const logger = {
    info(message: string) {
        console.log(
            '%cInfo',
            'background: #3498db; color: white; padding: 4px 8px; text-transform: uppercase; font-weight: bold',
            message
        );
    },
    warning(message: string) {
        console.log(
            '%cWarning',
            'background: #f1c40f; color: white; padding: 4px 8px; text-transform: uppercase; font-weight: bold',
            message
        );
    },
    error(message: string) {
        console.log(
            '%cError',
            'background: red; color: white; padding: 4px 8px; text-transform: uppercase; font-weight: bold',
            message
        );
    },
    success(message: string) {
        console.log(
            '%cSuccess',
            'background: #2ecc71; color: white; padding: 4px 8px; text-transform: uppercase; font-weight: bold',
            message
        );
    }
}
export default logger;