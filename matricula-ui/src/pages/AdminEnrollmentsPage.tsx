import { useEffect, useState } from "react";
import {
  Container, Paper, Typography, TextField, Button, Stack,
  Table, TableHead, TableRow, TableCell, TableBody, IconButton, Alert,
  FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { type CourseItem, listCoursesApi } from "../api/courses.api";
import { type EnrollmentItem, listEnrollmentsAdminApi, createEnrollmentApi, updateEnrollmentApi, deleteEnrollmentApi } from "../api/enrollments.api";

export default function AdminEnrollmentsPage() {
  const [items, setItems] = useState<EnrollmentItem[]>([]);
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [error, setError] = useState("");

  const [editId, setEditId] = useState<number | null>(null);
  const [course_id, setCourse_id] = useState<number>(0);
  const [student_name, setStudent_name] = useState("");
  const [status, setStatus] = useState("pendiente");
  const [total, setTotal] = useState<number>(0);

  const load = async () => {
    try {
      setError("");
      const data = await listEnrollmentsAdminApi();
      setItems(data.results); // DRF paginado
    } catch {
      setError("No se pudo cargar Enrollments. ¿Login? ¿Token admin?");
    }
  };

  const loadCourses = async () => {
    try {
      const data = await listCoursesApi();
      setCourses(data.results); // DRF paginado
      if (!course_id && data.results.length > 0) setCourse_id(data.results[0].id || 0);
    } catch {
      // si falla, no bloquea la pantalla
    }
  };

  useEffect(() => { load(); loadCourses(); }, []);

  const save = async () => {
    try {
      setError("");
      if (!course_id) return setError("Seleccione una course");
      if (!student_name.trim()) return setError("title del estudiante es requerido");

      const payload = {
        course: Number(course_id),
        course_id: Number(course_id),
        student_name: student_name.trim(),
        status: status.trim(),
        total: total,
      };

      if (editId) await updateEnrollmentApi(editId, payload);
      else await createEnrollmentApi(payload as any);

      setEditId(null);
      setCourse_id(0);
      setStudent_name("");
      setStatus("pendiente");
      setTotal(0);
      await load();
    } catch {
      setError("No se pudo guardar Enrollment. ¿Token admin?");
    }
  };

  const startEdit = (v: EnrollmentItem) => {
    setEditId(v.id || null);
    setCourse_id(v.course_id);
    setStudent_name(v.student_name);
    setStatus(v.status);
    setTotal(v.total);
  };

  const remove = async (id: number) => {
    try {
      setError("");
      await deleteEnrollmentApi(id);
      await load();
    } catch {
      setError("No se pudo eliminar Enrollment. ¿Token admin?");
    }
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Admin Enrollments (Privado)</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Stack spacing={2} sx={{ mb: 2 }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>

            <FormControl sx={{ width: 260 }}>
              <InputLabel id="course-label">Course</InputLabel>
              <Select
                labelId="course-label"
                label="Course"
                value={course_id}
                onChange={(e) => setCourse_id(Number(e.target.value))}
              >
                {courses.map((m) => (
                  <MenuItem key={m.id} value={m.id}>
                    {m.title} (#{m.id})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField label="Student Name" value={student_name} onChange={(e) => setStudent_name(e.target.value)} fullWidth />
            <TextField label="Status" value={status} onChange={(e) => setStatus(e.target.value)} sx={{ width: 160 }} />
            <TextField label="Total" type="number" value={total} onChange={(e) => setTotal(e.target.value ? Number(e.target.value) : 0)} sx={{ width: 120 }} />
            <TextField label="Curso_id" type="number" value={course_id} onChange={(e) => setCourse_id(Number(e.target.value))} sx={{ width: 120 }} />

          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            
            <Button variant="contained" onClick={save}>{editId ? "Actualizar" : "Crear"}</Button>
            <Button variant="outlined" onClick={() => { setEditId(null); setStudent_name(""); setStatus("pendiente"); setTotal(0); setCourse_id(0); }}>Limpiar</Button>
            <Button variant="outlined" onClick={() => { load(); loadCourses(); }}>Refrescar</Button>
          </Stack>
        </Stack>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((v) => (
              <TableRow key={v.id}>
                <TableCell>{v.id}</TableCell>
                <TableCell>{v.course_id ?? v.course_id}</TableCell>
                <TableCell>{v.student_name}</TableCell>
                <TableCell>{v.status}</TableCell>
                <TableCell>{v.total}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => startEdit(v)}><EditIcon /></IconButton>
                  <IconButton onClick={() => remove(v.id || 0)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}