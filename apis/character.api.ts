import { CharacterResponse } from "@/types";
import {  get } from "./base.api";


export const getCharacters = async (status?: string, gender?: string) => {
  const params: Record<string, string> = {};

  if (status) {
    params.status = status; 
  }
  if (gender) {
    params.gender = gender; 
  }

  const response = await get<CharacterResponse>('/api/character', params);
  return response; 
};

  