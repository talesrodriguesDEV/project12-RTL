import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import App from '../App';

describe('Testing Pokémon Component', () => {
  it('verifies if the Pokémon card renders', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[4] } isFavorite />);
    expect(screen.getByText(pokemons[4].name)).toBeInTheDocument();
    expect(screen.getByText(pokemons[4].type)).toBeInTheDocument();
    const weightInfo = screen
      .getByText(`Average weight: ${pokemons[4].averageWeight.value} ${pokemons[4]
        .averageWeight.measurementUnit}`);
    expect(weightInfo).toBeInTheDocument();
    const pokemonImage = screen.getByAltText(`${pokemons[4].name} sprite`);
    expect(pokemonImage.src).toBe(pokemons[4].image);
  });

  it('verifies if "More Details" link goes to Pokémon Details page', async () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'More details' }));
    const detailsPageTitle = await screen.findByRole('heading', {
      name: /Details/, level: 2 });
    expect(detailsPageTitle).toBeInTheDocument();
  });

  it('verifies "More Details" link', async () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[4] }
      isFavorite={ false }
    />);
    const detailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detailsLink);
    expect(history.location.pathname).toBe(`/pokemons/${pokemons[4].id}`);
  });

  it('verifies favorite Pokémons star icon', async () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[4] }
      isFavorite
    />);
    const star = screen.getByAltText(`${pokemons[4].name} is marked as favorite`);
    expect(star.src).toBe('http://localhost/star-icon.svg');
  });
});
