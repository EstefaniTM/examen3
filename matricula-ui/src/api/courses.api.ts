import { http } from "./http";
    
export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type CourseItem = {
  id?: number;
  title: string;
  category: string;
  price?: number;
  is_active: boolean;
};

export async function listCoursesApi() {
  const { data } = await http.get<Paginated<CourseItem>>("/api/courses/");
  return data; // { count, next, previous, results }
}

export async function createCourseApi(payload: Omit<CourseItem, "id">) {
  const { data } = await http.post<CourseItem>("/api/courses/", payload);
  return data;
}

export async function updateCourseApi(id: number, payload: Partial<CourseItem>) {
  const { data } = await http.put<CourseItem>(`/api/courses/${id}/`, payload);
  return data;
}

export async function deleteCourseApi(id: number) {
  await http.delete(`/api/courses/${id}/`);
}