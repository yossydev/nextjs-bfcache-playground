/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetServerSidePropsContext } from 'next';
import React from 'react';

const PokemonPage = (props: any) => {
    if (!props.pokemon) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
            <h1>{props.pokemon.name.toUpperCase()}</h1>
            <img
                src={props.pokemon.sprites.front_default}
                alt={props.pokemon.name}
                style={{ width: '200px', height: '200px' }}
            />
            <p>
                <strong>Height:</strong> {props.pokemon.height}
            </p>
            <p>
                <strong>Weight:</strong> {props.pokemon.weight}
            </p>
            <p>
                <strong>Abilities:</strong>{' '}
                {props.pokemon.abilities.map((ability: any) => ability.ability.name).join(', ')}
            </p>
        </div>
    );
};

// サーバーサイドでポケモンデータを取得

export async function getServerSideProps(context: GetServerSidePropsContext) {
    console.log('context.params', context.params);
    const id = (context.params as any).id; // URLのパラメータからポケモン名を取得

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
            throw new Error(`Pokemon not found: ${id}`);
        }
        const pokemon = await response.json();

        return {
            props: {
                pokemon, // ページコンポーネントに渡すプロパティ
            },
        };
    } catch (error) {
        console.error(error);
        return {
            notFound: true, // 404ページを表示
        };
    }
}

export default PokemonPage;