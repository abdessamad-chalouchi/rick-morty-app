import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Link } from 'react-router-dom';

const CharacterCard = ({ character, isFavorite, toggleFavorite }) => {
    return (
        <Link
            to={`/character/${character.id}`}
            className="bg-[#f9f9f9] rounded-xl shadow-2xl shadow-neutral-400 flex flex-col items-center text-center hover:shadow-lg transition-all w-[240px] mx-auto"
        >
            <img
                src={character.image}
                alt={character.name}
                className="w-[100%] h-[100%] object-cover mb-4 rounded-t-xl"
            />
            <h2 className="text-lg font-bold mb-1">{character.name}</h2>
            <p className="text-sm text-gray-600 mb-1">{character.species} - {character.status}</p>
            <p className="text-sm text-gray-500 mb-2 capitalize">{character.gender}</p>

            <button
                onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(character);
                }}
                className={`text-xl mb-5 transition-colors text-yellow-500 cursor-pointer`}
                title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
                {
                    isFavorite ?
                        (<StarIcon className="text-yellow-500" />) :
                        (<StarBorderIcon />)
                }
            </button>
        </Link>
    )
}

export default CharacterCard
