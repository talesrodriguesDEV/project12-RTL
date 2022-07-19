import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';

describe('Testing App Component', () => {
  it('verifies nav links', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Favorite Pokémons' })).toBeInTheDocument();
  });

  it('verifies Home link', async () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'Home' }));
    const nextPokemonButton = await screen
      .findByRole('button', { name: 'Próximo pokémon' });
    expect(nextPokemonButton).toBeInTheDocument();
  });

  it('verifies About link', async () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'About' }));
    const aboutPokedexHeading = await screen
      .findByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(aboutPokedexHeading).toBeInTheDocument();
  });

  it('verifies Favorite Pokémons link', async () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
    const favoritePokemonsHeading = await screen
      .findByRole('heading', { name: 'Favorite pokémons', level: 2 });
    expect(favoritePokemonsHeading).toBeInTheDocument();
  });

  it('verifies if an unknown URL renders the Not Found page', () => {
    const { history } = renderWithRouter(<App />);
    history.push('aoba');
    const pikachuImage = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(pikachuImage).toBeInTheDocument();
  });
});
