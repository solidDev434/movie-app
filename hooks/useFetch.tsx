import { useEffect, useState } from "react";

function useFetch<T>(fetchFunction: () => Promise<T>, autoFetch: boolean = true) {
    const [data, setData] = useState<T | []>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await fetchFunction();
            setData(result);
        } catch (err) {
            //  @ts-ignore
            setError(err instanceof Error ? err : new Error("An error occured"));
        } finally {
            setLoading(false);
        }
    }
    
    const reset = () => {
        setData([]);
        setLoading(false);
        setError(null);
    }

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, [autoFetch]);

    return {
        data,
        loading,
        error,
        refetch: fetchData,
        reset
    }
}

export default useFetch;