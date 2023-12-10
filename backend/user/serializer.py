from rest_framework import serializers
from user.models import User, Cashier, Admin


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField('get_full_name')

    def get_full_name(self, obj):
        return obj.first_name + ' ' + obj.last_name

    def create(self, validated_data):
        # call create_user on user object. Without this
        # the password will be stored in plain text.
        admin = User.objects.create_user(**validated_data)
        return admin

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name',
                  'last_name',  'user_type', 'is_active', 'full_name')
        extra_kwargs = {
            'password': {'write_only': True},
        }


class AdminSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField('get_full_name')

    def get_full_name(self, obj):
        return obj.first_name + ' ' + obj.last_name

    def create(self, validated_data):
        # call create_user on user object. Without this
        # the password will be stored in plain text.
        admin = Admin.objects.create_user(**validated_data)
        return admin

    class Meta:
        model = Admin
        fields = ('id', 'email', 'password', 'first_name',
                  'last_name', 'user_type',  'full_name')
        extra_kwargs = {
            'password': {'write_only': True},
        }


class CashierSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField('get_full_name')

    def get_full_name(self, obj):
        return obj.first_name + ' ' + obj.last_name

    def create(self, validated_data):
        # call create_user on user object. Without this
        # the password will be stored in plain text.
        manager = Cashier.objects.create_user(**validated_data)
        return manager

    class Meta:
        model = Cashier
        fields = ('id', 'email', 'password', 'first_name',
                  'last_name', 'user_type', 'username', 'is_active', 'full_name', 'agency')
        extra_kwargs = {
            'password': {'write_only': True},
        }
