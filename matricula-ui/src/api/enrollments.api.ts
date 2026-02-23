import { http } from "./http";
    
export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type EnrollmentItem = {
  id?: number;
  course_id: number;
  student_name: string;
  status: string;
  total: number;
  created_at?: string;
};

export async function listEnrollmentsPublicApi() {
  const { data } = await http.get<Paginated<EnrollmentItem>>("/api/enrollments/");
  return data; // { ... , results: [] }
}

export async function listEnrollmentsAdminApi() {
  const { data } = await http.get<Paginated<EnrollmentItem>>("/api/enrollments/");
  return data;
}

export async function createEnrollmentApi(payload: Omit<EnrollmentItem, "id">) {
  const { data } = await http.post<EnrollmentItem>("/api/enrollments/", payload);
  return data;
}

export async function updateEnrollmentApi(id: number, payload: Partial<EnrollmentItem>) {
  const { data } = await http.put<EnrollmentItem>(`/api/enrollments/${id}/`, payload);
  return data;
}

export async function deleteEnrollmentApi(id: number) {
  await http.delete(`/api/enrollments/${id}/`);
}