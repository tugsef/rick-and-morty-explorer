import { getCharacters } from "@/apis";
import { ApiError } from "@/apis/base.api";
import { CharacterResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useCharacters = (status?: string, gender?: string, page?: number) =>
  useQuery<CharacterResponse, ApiError>({
    queryKey: ['characters', status, gender, page], // Sorgu anahtarına sayfayı ekledik
    queryFn: () => getCharacters(status, gender, page), // API çağrısını yapın
    placeholderData: {
      info: { count: 0, pages: 0, next: null, prev: null },
      results: []
    },
    staleTime: 30000, // 30 saniye boyunca veriler taze kalır
    refetchInterval: 15000, // 15 saniyede bir yeniden sorgulama yapar
  });
