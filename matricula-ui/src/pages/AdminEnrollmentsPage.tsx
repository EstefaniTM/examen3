import { useEffect, useState } from "react";
import {
  Container, Paper, Typography, TextField, Button, Stack,
  Table, TableHead, TableRow, TableCell, TableBody, IconButton, Alert,
  FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Estado } from "../api/enrollments.api";

import { type Course, listCoursesApi } from "../api/courses.api";
import { type Enrollment, listEnrollmentsAdminApi, createEnrollmentApi, updateEnrollmentApi, deleteEnrollmentApi } from "../api/enrollments.api";


export default function AdminEnrollmentsPage() {
  const [items, setItems] = useState<Enrollment[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState("");

  const [editId, setEditId] = useState<number | null>(null);
  const [course, setCourse] = useState<number>(0);
  const [student_name, setStudent_name] = useState("");
  const [status, setStatus] = useState<Estado>(Estado.ENROLLED);
  const [total, setTotal] = useState<number>(0);
  const [created_at, setCreated_at] = useState("");

  const load = async () => {
    try {
      setError("");
      const data = await listEnrollmentsAdminApi();
      setItems(data.results); // DRF paginado
    } catch {
      setError("No se pudo cargar vehículos. ¿Login? ¿Token admin?");
    }
  };

  const loadCourses = async () => {
    try {
      const data = await listCoursesApi();
      setCourses(data.results); // DRF paginado
      if (!course && data.results.length > 0) setCourse(data.results[0].id);
    } catch {
      // si falla, no bloquea la pantalla
    }
  };

  useEffect(() => { load(); loadCourses(); }, []);

  const save = async () => {
    try {
      setError("");
      if (!course) return setError("Seleccione una course");
      if (!student_name.trim() || !status.trim()) return setError("Student_name y status son requeridos");

      const payload: Partial<Enrollment> = {
        course_id: Number(course),
        student_name: student_name.trim(),
        status: status as Estado | undefined,
        total: Number(total),
        created_at: created_at
      };

      if (editId) await updateEnrollmentApi(editId, payload);
      else await createEnrollmentApi(payload as any);

      setEditId(null);
      setStudent_name("");
      setStatus(Estado.ENROLLED);
      setTotal(0);
      setCreated_at("");
      await load();
    } catch {
      setError("No se pudo guardar Estudiante. ¿Token admin?");
    }
  };

  const startEdit = (v: Enrollment) => {
    setEditId(v.id);
    setCourse(v.course_id);
    setStudent_name(v.student_name);
    setStatus(v.status);
    setTotal(v.total);
    setCreated_at(v.created_at || "");
  };

  const remove = async (id: number) => {
    try {
      setError("");
      await deleteEnrollmentApi(id);
      await load();
    } catch {
      setError("No se pudo eliminar vehículo. ¿Token admin?");
    }
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Admin Vehículos (Privado)</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Stack spacing={2} sx={{ mb: 2 }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>

            <FormControl sx={{ width: 260 }}>
              <InputLabel id="course-label">Course</InputLabel>
              <Select
                labelId="course-label"
                label="Course"
                value={course}
                onChange={(e) => setCourse(Number(e.target.value))}
              >
                {courses.map((m:Course) => (
                  <MenuItem key={m.id} value={m.id}>
                    {m.title} (#{m.id})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField label="Student_name" value={student_name} onChange={(e) => setStudent_name(e.target.value)} fullWidth />
            <TextField label="Status" type="number" value={status} onChange={(e) => setStatus(e.target.value as Estado)} />
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField label="Total" value={total} onChange={(e) => setTotal(Number(e.target.value))} sx={{ width: 220 }} />
            <TextField label="Created_at" value={created_at} onChange={(e) => setCreated_at(e.target.value)} sx={{ width: 220 }} />

            <Button variant="contained" onClick={save}>{editId ? "Actualizar" : "Crear"}</Button>
            <Button variant="outlined" onClick={() => { setEditId(null); setStudent_name(""); setCreated_at(""); setStudent_name(""); }}>Limpiar</Button>
            <Button variant="outlined" onClick={() => { load(); loadCourses(); }}>Refrescar</Button>
          </Stack>
        </Stack>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Student_name</TableCell>
              <TableCell>status</TableCell>
              <TableCell>total</TableCell>
              <TableCell>created_at</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((v) => (
              <TableRow key={v.id}>
                <TableCell>{v.id}</TableCell>
                <TableCell>{v.course_id.title ?? "-"}</TableCell>
                <TableCell>{v.student_name}</TableCell>
                <TableCell>{v.status}</TableCell>
                <TableCell>{v.total}</TableCell>
                <TableCell>{v.created_at}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => startEdit(v)}><EditIcon /></IconButton>
                  <IconButton onClick={() => remove(v.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}