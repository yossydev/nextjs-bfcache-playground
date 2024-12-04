/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { useEffect } from "react";

export async function getServerSideProps() {
	const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
	const pokemons = await response.json();

	return {
		props: {
			pokemons,
		},
	};
}

const PokemonList = (pokemon: any) => {
	useEffect(() => {
		window.addEventListener('pageshow', (event) => {
			if (event.persisted) {
				console.log('Restored from bfcache');
			} else {
				console.log('Normal load');
			}
		});
	}, []);

	return (
		<ul>
			{pokemon.pokemons.results.map((pokemon: any) => (
				<li key={pokemon.name}>
					<Link href={`/${pokemon.name}`}>{pokemon.name}</Link></li>
			))}
		</ul>
	);
};

export default PokemonList;