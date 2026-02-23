import { http } from "./http";
import type { Paginated } from "../types/drf";
import type { Enrollments } from "../types/enrollment"; 

export async function listEnrollmentsApi(): Promise<Paginated<Enrollments> | Enrollments[]> {
  const { data } = await http.get<Paginated<Enrollments> | Enrollments[]>("/api/enrollments/");
  return data;
}