import { getValidUrlsFromString } from '../getValidUrlsFromSting';

test('Get valid urls from string', () => {
    const testStr = `https://translate.google.com/ https:// http:// http://www.google.com. https://www.google.com google32.com RegExr was created by asdasdasd.com`
    const correctUnswer = ['https://translate.google.com', 'http://www.google.com', 'https://www.google.com', 'google32.com', 'asdasdasd.com'];

    expect(getValidUrlsFromString(testStr)).toMatchObject(correctUnswer);
});



