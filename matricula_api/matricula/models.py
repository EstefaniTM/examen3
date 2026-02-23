from django.db import models


class Course(models.Model):
    title = models.CharField(max_length=120)
    category = models.CharField(max_length=60)
    price = models.DecimalField(
        max_digits=10,  # total de dígitos
        decimal_places=2,  # decimales
        default=0
    )
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title
    
class Estado(models.TextChoices):
        ENROLLED = "pendiente", "Pendiente"
        COMPLETED = "completado", "Completado"
        CANCELLED = "Cancelado", "cancelado"

    
class Enrollment(models.Model):
    course_id = models.ForeignKey(Course, on_delete=models.PROTECT, related_name="Course")
    student_name = models.CharField(max_length=120)
    status = models.CharField(
        max_length=20,
        choices=Estado.choices,
        default=Estado.ENROLLED
    )
    total = models.IntegerField(
        null=True, blank=True)
    created_at = models.DateField(null=True, blank=True)
    

    def __str__(self):
        return f"{self.course_id.title} {self.student_name} ({self.total})"