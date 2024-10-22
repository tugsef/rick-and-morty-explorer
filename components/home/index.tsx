"use client";
import { useState, useEffect } from "react";
import { useCharacters } from "@/queries";
import CharacterCard from "../card/character-card";
import HeaderTitle from "../header/header-title";
import { clsx } from "clsx";

export default function Home() {
  const [status, setStatus] = useState<string | undefined>(undefined); // Status filtresi
  const [pages, setPages] = useState<number>(1); // Sayfa numarası
  const [gender, setGender] = useState<string | undefined>(undefined); // Gender filtresi
  const [filteredCharacters, setFilteredCharacters] = useState<any[]>([]); // Filtrelenmiş karakterler

  // URL parametrelerine göre sorgu yap
  const { data, error, isLoading } = useCharacters(status, gender, pages);

  // Filtreleri güncelleme
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setPages(1);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
    setPages(1);
  };

  const handlePageIncrease = () => {
    setPages((prevPage) => prevPage + 1);
  };

  const handlePageDecrease = () => {
    setPages((prevPage) => Math.max(prevPage - 1, 1)); // Sayfanın 1'den küçük olmamasını sağla
  };

  // Status, gender veya sayfa numarası değiştiğinde sorguyu yeniden yap ve karakterleri filtrele
  useEffect(() => {
    if (data) {
      setFilteredCharacters(data.results);
    }
  }, [data, status, gender, pages]);

  // Yükleme sırasında gösterilecek yer tutucu veriler
  const placeholderCharacters = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    name: "Loading...",
    status: "Loading...",
    species: "Loading...",
    image:
      "https://fastly.picsum.photos/id/958/200/300.jpg?hmac=oCwv3AFzS5VqZv3nvDJ3H5RzcDH2OiL2g-GGwWL5fsI",
  }));

  return (
    <div>
      <HeaderTitle />
      <div className="mb-10">
        <div className="flex justify-center mb-4">
          <div className="mr-4">
            <h3 className="text-center font-bold mb-1">Status</h3>
            <select
              value={status}
              onChange={handleStatusChange}
              className="p-2 rounded-full"
            >
              <option value="">All</option>
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>

          <div className="mr-4">
            <h3 className="text-center font-bold mb-1">Gender</h3>
            <select
              value={gender}
              onChange={handleGenderChange}
              className="p-2 rounded-full"
            >
              <option value="">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="genderless">Genderless</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
        </div>
      </div>

      {/* Karakter listesi veya placeholder */}
      <div className="grid  container mx-auto  ">
        <div className="grid md:grid-cols-2 gap-4 pb-10">
          {(isLoading ? placeholderCharacters : filteredCharacters)?.map(
            (character) => (
              <CharacterCard key={character.id} character={character} />
            )
          )}
        </div>
        <div className="w-full flex justify-between container mx-3 sm:mx-auto pb-10">
          <button
            onClick={handlePageDecrease}
            className={clsx(
              "bg-black text-white px-4 py-1 rounded-l-xl rounded-e-sm shadow-lg hover:bg-slate-600",
              pages === 1 && "opacity-0",
              data?.results.length === 0 && "opacity-0"
            )}
          >
            Prev
          </button>{" "}
          <button
            onClick={handlePageIncrease}
            className={clsx(
              "bg-black  text-white px-5 py-1 rounded-e-xl rounded-s-sm shadow-lg hover:bg-slate-600",
              data?.info.pages === pages && "opacity-0",
              data?.results.length === 0 && "opacity-0"
            )}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
