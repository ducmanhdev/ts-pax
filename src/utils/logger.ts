const logger = {
    info(message: string) {
        console.log(`%cInfo: ${message}`, "border: 1px solid #3498db; border-radius: 4px; padding: 4px 8px");
    },
    warning(message: string) {
        console.log(`%cWarning: ${message}`, "border: 1px solid #f1c40f; border-radius: 4px; padding: 4px 8px");
    },
    error(message: string) {
        console.log(`%cError: ${message}`, "border: 1px solid #c0392b; border-radius: 4px; padding: 4px 8px");
    },
    success(message: string) {
        console.log(`%Success: ${message}`, "border: 1px solid #2ecc71; border-radius: 4px; padding: 4px 8px");
    }
}
export default logger;