import { getCharacters } from "@/apis";
import { ApiError, CharacterResponse } from "@/apis/base.api";
import { useQuery } from "@tanstack/react-query";


export const useCharacters = (status?: string, gender?: string) =>
  useQuery<CharacterResponse, ApiError>({
    queryKey: ['characters', status, gender], // Sorgu anahtarını güncelleyin
    queryFn: () => getCharacters(status, gender), // API çağrısını yapın
    placeholderData: {
      info: { count: 0, pages: 0, next: null, prev: null },
      results: []
    },
    refetchInterval: 15000,
  });
