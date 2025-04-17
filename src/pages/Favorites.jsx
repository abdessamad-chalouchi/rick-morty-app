import React, { useEffect, useState } from 'react'
import { fetchCharactersByIds } from '../api/rickAndMortyApi';
import { CircularProgress } from '@mui/material';
import CharacterCard from '../components/CharacterCard';

export default function Favorites() {
    const [favoritesData, setFavoritesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        setLoading(true);
        const ids = JSON.parse(localStorage.getItem('favorites')) || [];
        if (ids?.length === 0) {
            setLoading(false);
            setFavoritesData([])
            return;
        }
        fetchCharactersByIds(ids).then((data) => {
            if (data instanceof Array) {
                setFavoritesData(data);
            } else {
                setFavoritesData([data]);
            }
            setLoading(false);
        });
    }, [update]);
    const addToFavorites = (character) => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (favorites?.includes(character)) {
            // console.log('Character already in favorites');
            localStorage.setItem('favorites', JSON.stringify(favorites.filter(fav => fav !== character)));
            setUpdate(!update);
        }
        // console.log('Character added to favorites:', JSON.parse(localStorage.getItem('favorites')));
    }


    if (loading) return (<div className="flex text-center mt-8 h-[80vh] items-center justify-center">
        <CircularProgress color="inherit" />
    </div>);
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Favorites</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    favoritesData?.length > 0 ? (
                        favoritesData?.map((character) => (
                            <CharacterCard key={character.id} character={character} isFavorite={true} toggleFavorite={() => { addToFavorites(character?.id) }} />
                        ))
                    ) : (
                        <div className="flex  mt-8 h-[80vh]">
                            <p className="text-2xl font-bold">No favorites yet</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
