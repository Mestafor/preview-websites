import React from 'react';
import { render } from '@testing-library/react';
import {PreviewList} from '..';

test('renders learn react link', () => {
  const {container} = render(<PreviewList />);
  expect(container).toBeInstanceOf(HTMLElement);
});