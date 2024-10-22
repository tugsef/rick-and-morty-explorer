import { CharacterResponse, get } from "./base.api";


// Status ve gender parametrelerini alarak API'ye sorgu gönderme
export const getCharacters = async (status?: string, gender?: string) => {
  const params: Record<string, string> = {};

  if (status) {
    params.status = status; // URL'ye 'status' ekleyin
  }
  if (gender) {
    params.gender = gender; // URL'ye 'gender' ekleyin
  }

  const response = await get<CharacterResponse>('/api/character', params);
  return response; // Karakter verilerini döndür
};

  