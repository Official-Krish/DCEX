import { useCallback, useEffect, useState } from "react";

export const useDebounce = (callback: any, delay: number) => {
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    const debouncedCallback = useCallback((...args: any) => {
        // Clear any existing timeout
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Set new timeout
        const newTimeoutId = setTimeout(() => {
            callback(...args);
        }, delay);

        setTimeoutId(newTimeoutId);

        // Cleanup function
        return () => {
            if (newTimeoutId) {
                clearTimeout(newTimeoutId);
            }
        };
    }, [callback, delay, timeoutId]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    return debouncedCallback;
};
