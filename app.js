document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const pokemonInput = document.getElementById('pokemon-input');

    searchButton.addEventListener('click', () => {
        const pokemon = pokemonInput.value.toLowerCase();
        if (pokemon) {
            fetchPokemonData(pokemon);
        } else {
            alert('Please enter a Pokémon name or ID!');
        }
    });
});

function fetchPokemonData(pokemon) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon not found. Please try again!');
            }
            return response.json();
        })
        .then(data => displayData(data))
        .catch(error => {
            document.getElementById('output').innerHTML = `<p>${error.message}</p>`;
        });
}

function displayData(data) {
    const output = document.getElementById('output');
    output.innerHTML = `
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Height:</strong> ${data.height}</p>
        <p><strong>Weight:</strong> ${data.weight}</p>
        <p><strong>Base Experience:</strong> ${data.base_experience}</p>
        <p><strong>Abilities:</strong> ${data.abilities.map(ability => ability.ability.name).join(', ')}</p>
        <img src="${data.sprites.front_default}" alt="${data.name}">
    `;
}