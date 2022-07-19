import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import Pokedex from '../pages/Pokedex';
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

describe('Testing Pokédex Component', () => {
  it('verifies Pokédex heading', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const pokedexHeading = screen
      .getByRole('heading', { name: 'Encountered pokémons', level: 2 });
    expect(pokedexHeading).toBeInTheDocument();
  });

  it('verifies next Pokémon button and reset filter button', async () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });
    const fireButton = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(fireButton);
    await waitFor(() => expect(nextButton.disabled));
    const allButton = screen.getByRole('button', { name: 'All' });
    userEvent.click(allButton);
    await waitFor(() => expect(!nextButton.disabled));
    pokemons.forEach(async (pokemon, index) => {
      let nextPokemon;
      if (index === pokemons.length - 1) {
        nextPokemon = screen.queryByText('Pikachu');
      } else {
        nextPokemon = screen.queryByText(pokemons[index + 1].name);
      }
      const currentPokemon = screen.getByText(pokemon.name);
      userEvent.click(nextButton);
      await waitForElementToBeRemoved(() => currentPokemon);
      expect(nextPokemon).toBeInTheDocument();
    });
  });

  it('verifies if only one Pokémon is rendered at once', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    pokemons.forEach(() => {
      const pokemonCount = screen.getAllByText(/Average/);
      expect(pokemonCount.length).toBe(1);
    });
  });

  it('verifies filter buttons', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const pokemonTypes = [
      'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon',
    ];
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const totalButtons = 7;
    expect(filterButtons.length).toBe(totalButtons);
    pokemonTypes.forEach(async (type) => {
      const allButton = screen.getByRole('button', { name: 'All' });
      expect(allButton).toBeVisible();
      const filterButton = screen.getByRole('button', { name: type });
      expect(filterButton).toBeInTheDocument();
      userEvent.click(filterButton);
      const selectedType = await screen.findByText(type);
      expect(selectedType).toBeInTheDocument();
    });
  });
});
