function handleResponse(response){
    const { status, statusText } = response;
    return response.json()
        .then(value => {
            const ok = status < 400;
            return { ok, value, status, statusText, loading: false };
        }).catch(error => {
            console.error(error);
            return {
                status,
                statusText,
                error,
                ok: false,
                loading: false,
            }
        });
}


function handleNoResponse(error) {
    console.error(error);
    return {
        ok: false,
        loading: false,
        error: error,
        statusText: '' + error,
    }
}


export function sendRequest(url, options) {
    const { headers = {}, ...otherOptions } = options || {};
    const optionsToFetch = {
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json',
            ...headers,
        },
        ...otherOptions,
    };

    return fetch(url, optionsToFetch)
        .then(handleResponse, handleNoResponse);
}

