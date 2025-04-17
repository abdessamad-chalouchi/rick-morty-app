import { CircularProgress, Icon, Pagination, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { fetchCharacters } from '../api/rickAndMortyApi'
import CharacterCard from '../components/CharacterCard'
import SearchIcon from '@mui/icons-material/Search';

export default function Home() {
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(10)
    const [name, setName] = useState('')
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedSpecies, setSelectedSpecies] = useState('');
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
    useEffect(() => {
        setLoading(true);
        fetchCharacters({ page, name, status: selectedStatus, species: selectedSpecies, gender: selectedGender }).then((data) => {
            setMaxPage(data?.info?.pages)
            setCharacters(data?.results)
            // console.log(data)
            setLoading(false);
        })
        return () => {
            setLoading(false);
        }
    }, [selectedStatus, selectedGender, selectedSpecies, page, maxPage])
    const handleSearch = () => {
        setLoading(true);
        fetchCharacters({ page, name, status: selectedStatus, species: selectedSpecies, gender: selectedGender }).then((data) => {
            setMaxPage(data?.info?.pages)
            setCharacters(data?.results)
            console.log(data)
            setLoading(false);
        })
        return () => {
            setLoading(false);
        }
    }
    const addToFavorites = (character) => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (favorites?.includes(character)) {
            localStorage.setItem('favorites', JSON.stringify(favorites.filter(fav => fav !== character)));
        } else {
            localStorage.setItem('favorites', JSON.stringify([...favorites, character]));
        }
        setFavorites(JSON.parse(localStorage.getItem('favorites')) || []);
    }
    return (
        <div className='p-4 max-w-6xl mx-auto flex flex-col justify-between items-center min-h-[90vh] w-[100%]'>
            <div className='w-[100%]'>
                <div className='flex flex-col items-center lg:flex-row justify-between gap-4'>
                    <div className="relative flex-1 min-w-[200px] max-w-[500px]">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none"
                            value={name}
                            onBlur={handleSearch}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <SearchIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" onClick={handleSearch} />
                    </div>
                    <div className='flex flex-wrap gap-4 items-center'>
                        <div>
                            Filter By:
                        </div>
                        <select
                            className='w-[150px] p-2 border border-gray-300 rounded-md focus:outline-none'
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                            <option value="" disabled selected>Status</option>
                            <option value="">All</option>
                            <option value="alive">Alive</option>
                            <option value="dead">Dead</option>
                            <option value="unknown">unknown</option>
                        </select>
                        <select
                            className='w-[150px] p-2 border border-gray-300 rounded-md focus:outline-none'
                            aria-label='Gender'
                            value={selectedGender}
                            onChange={(e) => setSelectedGender(e.target.value)}
                        >
                            <option value="" disabled selected>Gender</option>
                            <option value="">All</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="unknown">unknown</option>
                        </select>
                        <select
                            className='w-[150px] p-2 border border-gray-300 rounded-md focus:outline-none'
                            aria-label='Species'
                            value={selectedSpecies}
                            onChange={(e) => setSelectedSpecies(e.target.value)}
                        >
                            <option value="" disabled selected>Species</option>
                            <option value="">All</option>
                            <option value="human">Human</option>
                            <option value="alien">Alien</option>
                            <option value="humanoid">Humanoid</option>
                            <option value="mythological creature">Mythological Creature</option>
                            <option value="robot">Robot</option>
                            <option value="animal">Animal</option>
                            <option value="disease">Disease</option>
                            <option value="Cronenberg">Cronenberg</option>
                        </select>
                    </div>
                </div>
            </div>
            {
                loading ? (
                    <>
                        <CircularProgress color="inherit" />
                    </>
                ) :
                    (
                        <div className="grid gap-6 mt-4 w-full justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-5">
                            {
                                characters?.length > 0 ? (
                                    characters?.map((character) =>
                                        <CharacterCard
                                            key={character.id}
                                            character={character}
                                            isFavorite={favorites?.includes(character?.id)}
                                            toggleFavorite={() => { addToFavorites(character?.id) }}
                                        />
                                    )
                                ) : (
                                    <h2 className='text-xl font-bold text-center'>
                                        No Characters Found
                                    </h2>
                                )
                            }
                        </div>
                    )
            }
            <Pagination count={maxPage} variant="outlined" color="inherit" value={page} onChange={(e, page) => setPage(page)} />
        </div>
    )
}
