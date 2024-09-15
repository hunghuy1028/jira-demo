function get<T>(key: string) : T {
    return JSON.parse(localStorage.getItem(key)) as T;
}

function set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
}

function remove(key: string) {
    localStorage.removeItem(key);
}

const LS = {
    get: get,
    set: set,
    remove: remove,
}

export {LS};