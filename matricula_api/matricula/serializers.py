from rest_framework import serializers
from .models import Course, Enrollment

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ["id", "title", "category", "price", "is_active"]

class EnrollmentSerializer(serializers.ModelSerializer):
    course_id = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())

    class Meta:
        model = Enrollment
        fields = ["id", "course_id", "student_name", "status", "total", "created_at"]