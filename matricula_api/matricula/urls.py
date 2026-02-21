from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, EnrollmentViewSet
from .course_catalo_views import course_catalog_list_create, course_catalog_detail
from .enrollment_event_views import enrollment_event_list_create, enrollment_event_detail

router = DefaultRouter()
router.register(r"courses", CourseViewSet, basename="courses")
router.register(r"enrollments", EnrollmentViewSet, basename="enrollments")

urlpatterns = [
    # Mongo
    path("course-catalog/", course_catalog_list_create),
    path("course-catalog//", course_catalog_detail),
    path("enrollment-event/", enrollment_event_list_create),
    path("enrollment-event//", enrollment_event_detail),
]

urlpatterns += router.urls