import { CharacterResponse } from "@/types";
import {  get } from "./base.api";


export const getCharacters = async (status?: string, gender?: string, page?:number) => {
  const params: Record<string, string> = {};

  if (status) {
    params.status = status; 
  }
  if (gender) {
    params.gender = gender; 
  }

  if (page) {
    params.page = page.toString(); 
  }
  const response = await get<CharacterResponse>('/api/character', params);
  return response; 
};

  