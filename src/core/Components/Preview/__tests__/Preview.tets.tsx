import React from 'react';
import { render } from '@testing-library/react';
import { Preview } from '..';

test('renders learn react link', () => {
  const { container } = render(<Preview preview={{ WebSiteUrl: 'google.com', Loaded: true, parseHtml: () => {}, onError: () => {}}} />);
  expect(container).toBeInstanceOf(HTMLElement);
});