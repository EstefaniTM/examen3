import { useEffect, useState } from "react";
import {
  Container, Paper, Typography, TextField, Button, Stack,
  Table, TableHead, TableRow, TableCell, TableBody, IconButton, Alert
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FormControlLabel, Checkbox } from "@mui/material";

import { type CourseItem, listCoursesApi, createCourseApi, updateCourseApi, deleteCourseApi } from "../api/courses.api";

export default function AdminCoursesPage() {
  const [items, setItems] = useState<CourseItem[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [editId, setEditId] = useState<number | null>(null);
  const [is_active, setIsActive] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setError("");
      const data = await listCoursesApi();
      setItems(data.results); // DRF paginado
    } catch {
      setError("No se pudo cargar courses. ¿Login? ¿Token admin?");
    }
  };

  useEffect(() => { load(); }, []);

  const save = async () => {

    const payload = {
        title: title.trim(),
        category: category.trim(),
        price: price || undefined,
        is_active: is_active
      };
    try {
      setError("");
      if (!title.trim()) return setError("title requerido");
      if (!category.trim()) return setError("category requerido");

      if (editId) await updateCourseApi(editId, payload);
      else await createCourseApi(payload);

      setCategory("");
      setEditId(null);
      await load();
    } catch {
      setError("No se pudo guardar course. ¿Token admin?");
    }
  };

  const startEdit = (m: CourseItem) => {
    setEditId(m.id || null);
    setTitle(m.title);
    setCategory(m.category);
    setPrice(m.price || "");
    setIsActive(m.is_active);
  };

  const remove = async (id: number) => {
    try {
      setError("");
      await deleteCourseApi(id);
      await load();
    } catch {
      setError("No se pudo eliminar course. ¿Vehículos asociados? ¿Token admin?");
    }
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Admin courses (Privado)</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 2 }}>
          <TextField label="Title course" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
          <TextField label="Price course" type="number" value={price} onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")} fullWidth />
          <TextField label="Category course" value={category} onChange={(e) => setCategory(e.target.value)} fullWidth />
          <FormControlLabel
        control={
          <Checkbox checked={is_active} onChange={(e) => setIsActive(e.target.checked)} />
        }
        label="Is Active"
      />   
          <Button variant="contained" onClick={save}>{editId ? "Actualizar" : "Crear"}</Button>
          <Button variant="outlined" onClick={() => { setCategory(""); setEditId(null); }}>Limpiar</Button>
          <Button variant="outlined" onClick={load}>Refrescar</Button>
        </Stack>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Is Active</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((m) => (
              <TableRow key={m.id}>
                <TableCell>{m.id}</TableCell>
                <TableCell>{m.category}</TableCell>
                <TableCell>{m.price}</TableCell>
                <TableCell>{m.is_active}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => startEdit(m)}><EditIcon /></IconButton>
                  <IconButton onClick={() => remove(m.id || 0)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}