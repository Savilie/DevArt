from rest_framework import serializers

from cases.models import Case


class CaseSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(read_only=True)
    description = serializers.CharField(read_only=True)
    video = serializers.FileField()

    def create(self, validated_data):
        return Case.objects.create(**validated_data)

    def update(self, instance, validated_data):
        for key, value in validated_data.items():
            if hasattr(instance, key):
                setattr(instance, key, value)

        instance.save()
        return instance
