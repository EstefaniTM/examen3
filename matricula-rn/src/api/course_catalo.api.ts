import { http } from "./http";
import type { Course_catalo } from "../types/course_catalo";
import type { Paginated } from "../types/drf";

export type CourseCatalogCreatePayload = {
  vehiculo_id: number;
  service_type_id: string;
  notes?: string;
  cost?: number;
};

export async function listCourseCatalogsApi(): Promise<Paginated<Course_catalo> | Course_catalo[]> {
  const { data } = await http.get<Paginated<Course_catalo> | Course_catalo[]>("/api/course-catalogs/");
  return data;
}

export async function createCourseCatalogApi(payload: CourseCatalogCreatePayload): Promise<Course_catalo> {
  const { data } = await http.post<Course_catalo>("/api/course-catalogs/", payload);
  return data;
}

export async function deleteCourseCatalogApi(id: string): Promise<void> {
  await http.delete(`/api/course-catalogs/${id}/`);
}