import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import About from '../pages/About';

describe('Testing About Component', () => {
  it('verifies Pokédex information', () => {
    renderWithRouter(<About />);
    const aboutPokedexHeading = screen
      .getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(aboutPokedexHeading).toBeInTheDocument();
    const pokedexParagraphs = screen.getAllByText(/Pokémons/);
    expect(pokedexParagraphs.length).toBe(2);
    const pokedexImage = screen.getByAltText('Pokédex');
    expect(pokedexImage.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
