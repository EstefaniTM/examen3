import { http } from "./http";
    
export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type Course = {
    id: number;
    title: string;
    category: string;
    price: string;
    is_active: boolean
  };

export async function listCoursesApi() {
  const { data } = await http.get<Paginated<Course>>("/api/courses/");
  return data; // { count, next, previous, results }
}

export async function createCourseApi(nombre: string) {
  const { data } = await http.post<Course>("/api/courses/", { nombre });
  return data;
}

export async function updateCourseApi(id: number, nombre: string) {
  const { data } = await http.put<Course>(`/api/courses/${id}/`, { nombre });
  return data;
}

export async function deleteCourseApi(id: number) {
  await http.delete(`/api/courses/${id}/`);
}