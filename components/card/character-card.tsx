import { Character } from "@/types";
import clsx from "clsx";
import React from "react";

function CharacterCard({ character }: { character: Character }) {
  return (
    <div className="flex flex-col items-center justify-start max-w-[360px] mx-auto bg-white border border-gray-200 rounded-lg shadow sm:flex-row sm:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src={character.image}
        alt={character.name}
      />
      <div className="flex flex-col justify-start sm:justify-between p-4 leading-normal">
        <div className="mr-0">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {character.name}
          </h5>

          <div className="flex items-center">
          <div
            className={clsx(
              "h-4 w-4 rounded-full",
              character.status === "Dead" ? "bg-red-700" : "bg-lime-600"
            )}
          />
          <p className="inline-block ml-2 text-sm text-gray-600">{character.status}-{character.species} </p>
          </div>

          <div className="mt-1  flex flex-col">
            <span className="text-gray-900 font-bold">Last known location:</span>
            <span className="inline-block">{character.location.name}</span>

          </div>

          <div className="mt-1  flex flex-col">
            <span className="text-gray-900 font-bold">Last known location:</span>
            <span className="inline-block">{character.location.name}</span>

          </div>
         
        </div>

      
      </div>
    </div>
  );
}

export default CharacterCard;
