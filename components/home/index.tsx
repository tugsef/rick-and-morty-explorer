"use client"
import { useState, useEffect } from "react";
import { useCharacters } from "@/queries";
import Image from "next/image";

export default function Home() {
  const [status, setStatus] = useState<string | undefined>(undefined); // Status filtresi
  const [gender, setGender] = useState<string | undefined>(undefined); // Gender filtresi
  const [filteredCharacters, setFilteredCharacters] = useState<any[]>([]); // Filtrelenmiş karakterler

  // URL parametrelerine göre sorgu yap
  const { data, error, isLoading } = useCharacters(status, gender);

  // Filtreleri güncelleme
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  // Status veya gender değiştiğinde sorguyu yeniden yap ve karakterleri filtrele
  useEffect(() => {
    if (data) {
      setFilteredCharacters(data.results);
    }
  }, [data, status, gender]);

  const placeholderCharacters = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    name: "Loading...",
    status: "Loading...",
    species: "Loading...",
    image: "https://fastly.picsum.photos/id/958/200/300.jpg?hmac=oCwv3AFzS5VqZv3nvDJ3H5RzcDH2OiL2g-GGwWL5fsI"
  }));

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-6xl">The Rick and Morty API</h1>
      </div>

      <div className="flex justify-center mb-4">
        <div className="mr-4">
          <h3>Status</h3>
          <select value={status} onChange={handleStatusChange}>
            <option value="">All</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        <div className="mr-4">
          <h3>Gender</h3>
          <select value={gender} onChange={handleGenderChange}>
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
      </div>

      {/* Karakter listesi veya placeholder */}
      <div className="grid  container mx-auto">

        <div className=" bg-blue-600 grid grid-cols-3 gap-4">
          {(isLoading ? placeholderCharacters : filteredCharacters)?.map((character) => (
            <div key={character.id} className="bg-white p-4 rounded-lg shadow-md">
              <Image 
                src={character.image} 
                alt={character.name} 
                width={150} 
                height={150} 
                className="rounded-full"
              />
              <h2 className="text-xl font-bold">{character.name}</h2>
              <p>Status: {character.status}</p>
              <p>Species: {character.species}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
