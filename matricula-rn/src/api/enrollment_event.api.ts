import { http } from "./http";
import type { Enrollment_event } from "../types/enrollment_event";
import type { Paginated } from "../types/drf";

export type VehicleServiceCreatePayload = {
  vehiculo_id: number;
  service_type_id: string;
  notes?: string;
  cost?: number;
};

export async function listVehicleServicesApi(): Promise<Paginated<Enrollment_event> | Enrollment_event[]> {
  const { data } = await http.get<Paginated<Enrollment_event> | Enrollment_event[]>("/api/vehicle-services/");
  return data;
}

export async function createVehicleServiceApi(payload: VehicleServiceCreatePayload): Promise<Enrollment_event> {
  const { data } = await http.post<Enrollment_event>("/api/vehicle-services/", payload);
  return data;
}

export async function deleteVehicleServiceApi(id: string): Promise<void> {
  await http.delete(`/api/vehicle-services/${id}/`);
}