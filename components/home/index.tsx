"use client";
import { useState } from "react";
import { useCharacters } from "@/queries";
import HeaderTitle from "../header/header-title";
import { clsx } from "clsx";
import CharacterCard from "../card/character-card";
import CharacterSkeletonCard from "../card/character-skeleton-card";

export default function Home() {
  const [status, setStatus] = useState<string | undefined>(undefined); // Status filtresi
  const [pages, setPages] = useState<number>(1); // Sayfa numarası
  const [gender, setGender] = useState<string | undefined>(undefined); // Gender filtresi

  // URL parametrelerine göre sorgu yap
  const { data, isLoading } = useCharacters(status, gender, pages);

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

  const placeholderCharacters = Array.from({ length: 20 }, (_, index) => (
    <CharacterSkeletonCard key={index} />
  ));
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
              className="p-2 rounded-full w-32 text-center"
            >
              <option value="">All</option>
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>

          <div>
            <h3 className="text-center font-bold mb-1">Gender</h3>
            <select
              value={gender}
              onChange={handleGenderChange}
              className="p-2 rounded-full w-32 text-center"
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
      <div className="grid container mx-auto">
        <div className="grid md:grid-cols-2 gap-4 pb-10">
          {isLoading || (data?.results && data.results.length === 0)
            ? // Show placeholder characters if loading or no results
              placeholderCharacters
            : // Only map if data and data.results are defined and have items
              data?.results.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
        </div>
        <div className="w-full flex justify-center gap-6 container sm:mx-auto pb-10">
          <button
            onClick={handlePageDecrease}
            className={clsx(
              "bg-black text-white w-24 py-1 rounded-l-xl rounded-e-sm shadow-lg hover:bg-slate-600",
              pages === 1 && "opacity-50",
              data?.results.length === 0 && "opacity-0"
            )}
            disabled={pages === 1}
          >
            Prev
          </button>
          <button
            onClick={handlePageIncrease}
            className={clsx(
              "bg-black w-24 text-white py-1 rounded-e-xl rounded-s-sm shadow-lg hover:bg-slate-600",
              data?.info.pages === pages && "opacity-50",
              data?.results.length === 0 && "opacity-0"
            )}
            disabled={data?.info.pages === pages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
