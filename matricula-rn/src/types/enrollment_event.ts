export type Enrollment_event = {
  id: string;
  course_id: string;       // Postgres
  category: string;   // Mongo
  level?: string;             // backend asigna fecha al crear (NO se envía desde app)
  is_active?: boolean;        // backend asigna fecha al crear (NO se envía desde app)
};