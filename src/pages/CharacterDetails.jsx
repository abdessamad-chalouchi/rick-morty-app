import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCharacter } from '../api/rickAndMortyApi';
import { CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function CharacterDetails() {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [showAllEpisodes, setShowAllEpisodes] = useState(false);

    useEffect(() => {
        fetchCharacter(id).then((data) => {
            setCharacter(data);
        });
    }, [id]);

    if (!character) return (<div className="flex text-center mt-8 h-[80vh] items-center justify-center">
        <CircularProgress color="inherit" />
    </div>);

    const formattedDate = new Date(character.created).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const displayedEpisodes = showAllEpisodes
        ? character.episode
        : character.episode.slice(0, 5);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Link to="/" className="text-blue-500 hover:underline mb-4 flex items-center gap-2">
                <ArrowBackIcon fontSize='small' /> Back to Characters
            </Link>

            <div className="bg-white shadow-2xl shadow-neutral-400 rounded-xl flex flex-col md:flex-row p-6 gap-6">
                <img
                    src={character.image}
                    alt={character.name}
                    className="w-48 h-48 rounded-xl object-cover mx-auto md:mx-0"
                />
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-bold mb-2">{character.name}</h2>
                    <p className="text-gray-600 text-lg mb-1 capitalize">
                        {character.status} • {character.species}
                    </p>
                    <p className="text-gray-500 mb-1 capitalize">Gender: {character.gender}</p>
                    <p className="text-gray-500 mb-1">Origin: {character.origin?.name}</p>
                    <p className="text-gray-500 mb-1">Location: {character.location?.name}</p>
                    <p className="text-gray-400 text-sm mt-2">Created on: {formattedDate}</p>
                    <div className="mt-4">
                        <h3 className="font-semibold mb-2">Episodes:</h3>
                        <div className="flex flex-wrap gap-2">
                            {displayedEpisodes.map((ep, idx) => (
                                <div
                                    href={ep}
                                    target="_blank"
                                    rel="noreferrer"
                                    key={ep}
                                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-all cursor-pointer"
                                >
                                    Episode {idx + 1}
                                </div>
                            ))}

                            {character.episode.length > 5 && (
                                <button
                                    onClick={() => setShowAllEpisodes(!showAllEpisodes)}
                                    className="text-sm text-blue-500 underline hover:text-blue-700 cursor-pointer"
                                >
                                    {showAllEpisodes
                                        ? 'Show less'
                                        : `+${character.episode.length - 5} more`}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
