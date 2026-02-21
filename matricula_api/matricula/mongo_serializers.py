from rest_framework import serializers

class Level:
        BEGINNER = "beginer"
        INTERMEDIATE = "intermediante"
        ADVANCED = "advanced"

        CHOICES = [
            (BEGINNER, "beginer"),
            (INTERMEDIATE, "intermediante"),
            (ADVANCED, "advanced"),
        ]

class Event:
        CREATED = "creado"
        COMPLETED = "completado"
        CANCELLED = "cancelado"

        CHOICES = [
            (CREATED, "creado"),
            (COMPLETED, "completado"),
            (CANCELLED, "cancelado"),
        ]
        
class Source:
        WEB = "web"
        MOBILE = "mobile"
        SYSTEM = "system"

        CHOICES = [
            (WEB, "web"),
            (MOBILE, "mobile"),
            (SYSTEM, "system"),
        ]


class Course_catalogSerializer(serializers.Serializer):
    course_title = serializers.CharField(max_length=120)
    category = serializers.CharField(max_length=120)
    level = serializers.ChoiceField(
        choices=Level.CHOICES,
        default=Level.BEGINNER
    )
    is_active = serializers.BooleanField(default=True)

class VehicleServiceSerializer(serializers.Serializer):
    enrollment_id = serializers.CharField(max_length=120)        # ID de Vehiculo (Postgres)
    event_type = serializers.ChoiceField(
        choices=Event.CHOICES,
        default=Event.CREATED
    )
    source = serializers.ChoiceField(
        choices=Source.CHOICES,
        default=Source.WEB)