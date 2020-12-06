export function getValidUrlsFromString(str: string): string[] {
    // get only urls from string
    const regrexp = /((https?:\/\/)?(www)?(\.)?)?(\w+)(\.)(\S+\b)/gi;
    let arr = str.match(regrexp) || [] as string[];
    if(arr && arr.length > 0) {
        arr = Array.from(new Set(arr));
    }
    return arr;
};
