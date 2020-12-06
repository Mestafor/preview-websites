import React from 'react';
import { render } from '@testing-library/react';
import { SearchPreview } from '..';

test('renders learn react link', () => {
  const { container } = render(<SearchPreview />);
  expect(container).toBeInstanceOf(HTMLElement);
});