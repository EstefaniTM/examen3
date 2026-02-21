import { http } from "./http";
import { type Course } from "./courses.api";    
export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export enum Estado {
  ENROLLED = "pendiente",
  COMPLETED = "conpletado",
  CANCELLED = "Cancelado",
}

export type Enrollment = {
  id: number;
  course_id: Course;
  student_name: string;
  status: Estado; 
  total: number;
  created_at: string | null

};

export async function listEnrollmentsPublicApi() {
  const { data } = await http.get<Paginated<Enrollment>>("/api/enrollments/");
  return data; // { ... , results: [] }
}

export async function listEnrollmentsAdminApi() {
  const { data } = await http.get<Paginated<Enrollment>>("/api/enrollments/");
  return data;
}

export async function createEnrollmentApi(payload: Omit<Enrollment, "id">) {
  const { data } = await http.post<Enrollment>("/api/enrollments/", payload);
  return data;
}

export async function updateEnrollmentApi(id: number, payload: Partial<Enrollment>) {
  const { data } = await http.put<Enrollment>(`/api/enrollments/${id}/`, payload);
  return data;
}

export async function deleteEnrollmentApi(id: number) {
  await http.delete(`/api/enrollments/${id}/`);
}