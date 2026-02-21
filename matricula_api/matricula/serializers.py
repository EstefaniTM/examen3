from rest_framework import serializers
from .models import Course, Enrollment

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ["id", "title", "category", "price", "is_active"]

class EnrollmentSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source="course_id.title", read_only=True)

    class Meta:
        model = Enrollment
        fields = ["id", "course_id", "student_name", "status", "total", "created_at"]