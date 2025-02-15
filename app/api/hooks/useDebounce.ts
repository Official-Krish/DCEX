import { useCallback, useEffect, useRef } from "react";

export const useDebounce = (callback: (...args: string[]) => Promise<void>, delay: number) => {
    const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

    const debouncedCallback = useCallback(
        (...args: string[]) => {
            // Clear any existing timeout
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }

            // Set new timeout
            timeoutIdRef.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay]
    );

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }
        };
    }, []);

    return debouncedCallback;
};