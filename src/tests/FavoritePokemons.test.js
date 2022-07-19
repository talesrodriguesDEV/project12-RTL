import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';
import pokemons from '../data';

describe('Testing FavoritePokémons Component', () => {
  it('verifies when there are no favorite pokémons', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    const noFavsMessage = screen.getByText('No favorite pokemon found');
    expect(noFavsMessage).toBeInTheDocument();
  });

  it('verifies if all favorite pokémons are rendered', () => {
    const favPokemons = [pokemons[0], pokemons[7]];
    renderWithRouter(<FavoritePokemons pokemons={ favPokemons } />);
    const moreDetailsLink = screen.getAllByRole('link', { name: 'More details' });
    expect(moreDetailsLink.length).toBe(2);
  });
});
