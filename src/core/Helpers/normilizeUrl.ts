export function normilizeUrl(url: string): string {
    var urlRegex = new RegExp(/^(https?:\/\/(www)?(\.)?)/g);
    if(!urlRegex.test(url)) {
        url = 'https://' + url;
    }

    return url;
}