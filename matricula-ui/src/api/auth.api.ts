

import { http } from "./http";
    
export async function loginApi(username: string, password: string) {
  const { data } = await http.post("/api/auth/login/", { username, password });
  
  // Guarda el token de acceso en localStorage
  localStorage.setItem("accessToken", data.access);
  localStorage.setItem("refreshToken", data.refresh);
  
  return data as { access: string; refresh: string };
}