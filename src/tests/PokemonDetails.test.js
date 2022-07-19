import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import PokemonDetails from '../pages/PokemonDetails';
import pokemons from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Testing Pokémon Details Component', () => {
  it('verifies if Pokémon detailed information is rendered', () => {
    renderWithRouter(<PokemonDetails
      pokemons={ pokemons }
      match={ { params: { id: JSON.stringify(pokemons[6].id) } } }
      isPokemonFavoriteById={ isPokemonFavoriteById }
      isFavorite={ false }
      onUpdateFavoritePokemons={ () => {} }
    />);
    const detailsPageTitle = screen
      .getByRole('heading', { name: `${pokemons[6].name} Details` });
    expect(detailsPageTitle).toBeInTheDocument();
    const detailsLink = screen.queryByRole('link', { name: 'More details' });
    expect(detailsLink).toBe(null);
    const summaryHeading = screen.getByRole('heading', { name: 'Summary' });
    expect(summaryHeading).toBeInTheDocument();
    const summaryContent = screen.getByText(pokemons[6].summary);
    expect(summaryContent).toBeInTheDocument();
  });

  it('verifies if Pokémon\'s maps are rendered', () => {
    renderWithRouter(<PokemonDetails
      pokemons={ pokemons }
      match={ { params: { id: JSON.stringify(pokemons[6].id) } } }
      isPokemonFavoriteById={ isPokemonFavoriteById }
      isFavorite={ false }
      onUpdateFavoritePokemons={ () => {} }
    />);
    const locationsHeading = screen
      .getByRole('heading', { name: `Game Locations of ${pokemons[6].name}` });
    expect(locationsHeading).toBeInTheDocument();
    const maps = screen.getAllByAltText(/location/);
    expect(maps.length).toBe(pokemons[6].foundAt.length);
    pokemons[6].foundAt.forEach((location) => {
      const locationName = screen.getByText(location.location);
      expect(locationName).toBeInTheDocument();
      const thisMap = maps.find((map) => map.src === location.map);
      expect(thisMap).toBeInTheDocument();
    });
    expect(maps.every((map) => map.alt === `${pokemons[6].name} location`));
  });

  it('verifies if user can fav Pokémons from detail page', () => {
    renderWithRouter(<PokemonDetails
      pokemons={ pokemons }
      match={ { params: { id: JSON.stringify(pokemons[6].id) } } }
      isPokemonFavoriteById={ isPokemonFavoriteById }
      isFavorite
      onUpdateFavoritePokemons={ () => {} }
    />);
    const favCheckbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favCheckbox).toBeInTheDocument();
    userEvent.click(favCheckbox);
    expect(favCheckbox.checked).toBe(false);
    userEvent.click(favCheckbox);
    expect(favCheckbox.checked);
  });
});
