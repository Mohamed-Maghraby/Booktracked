import { useState, useEffect } from 'react';

const fetchServer = (url, bodyData = {}, customOptions = null, method = 'POST') => {
    const defaultOptions = {
        method: method,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: bodyData }),
    };

    const options = customOptions || defaultOptions;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url, { ...options, signal });
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, [url, options]);

    return { data, loading, error };
};

module.exports = fetchServer
