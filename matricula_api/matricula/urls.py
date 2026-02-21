from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, EnrollmentViewSet

router = DefaultRouter()
router.register(r"courses", CourseViewSet, basename="courses")
router.register(r"enrollments", EnrollmentViewSet, basename="enrollments")

urlpatterns = []
urlpatterns += router.urls