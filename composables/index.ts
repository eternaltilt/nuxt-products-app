export function useDebounce(fn: (value: string) => void, delay: number) {
    const timeout = ref<number>();

    const debouncedFn = (value: string): void => {
        clearTimeout(timeout.value);
        timeout.value = setTimeout(() => fn(value), delay);
    };

    onUnmounted(() => {
        clearTimeout(timeout.value);
    });

    return debouncedFn;
}
