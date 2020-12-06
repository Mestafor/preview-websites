import { normilizeUrl } from '../normilizeUrl';


test('Should return valid url with invalid input', () => {
    const testStr = `www.google.com`;
    const correctUnswer = 'https://www.google.com';

    expect(normilizeUrl(testStr)).toEqual(correctUnswer);
});

test('Should return valid url with valid input', () => {
    const testStr = `http://www.google.com`;
    const correctUnswer = 'http://www.google.com';

    expect(normilizeUrl(testStr)).toEqual(correctUnswer);
});
