import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

function useRequest({ url, method, body }: { url: string; method: string; body: unknown }) {
    const [resp, setResp] = useState(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);

    const fetch = () => {
        const config: AxiosRequestConfig = { method, url, data: body };
        axios(config)
            .then((response) => {
                setResp(response.data);
                setLoading(false);
                setError(null);
            })
            .catch((e) => {
                setError(e);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetch();
    }, []);

    return {response: resp, loading, error }
}

export default useRequest;
