/**
 * Utility to call GET endpoints
 * @param {String} url - Indicates the URl that we want to call
 * @return {Promise<Response>}
 * @constructor
 */
export function APIFetch(url) {
    return fetch(url, {
        headers: { Accept: 'application/json', },
        method: 'get',
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        })
        .catch(error => error);
}