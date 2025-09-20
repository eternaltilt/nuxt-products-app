export function useDebounce(
    fn: (value: string) => void,
    delay: number
): (value: string) => void {
    let timeout: number | undefined;

    return (value: string): void => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn(value), delay);
    };
}
