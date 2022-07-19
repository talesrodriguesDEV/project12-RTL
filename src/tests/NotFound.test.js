import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Testing Not Found Component', () => {
  it('verifies Not Found component renderization', () => {
    renderWithRouter(<NotFound />);
    const notFoundHeading = screen
      .getByRole('heading', { name: 'Page requested not found Crying emoji', level: 2 });
    expect(notFoundHeading).toBeInTheDocument();
    const pikachuImage = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(pikachuImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
