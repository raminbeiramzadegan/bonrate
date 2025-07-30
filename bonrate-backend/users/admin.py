from django.contrib import admin
from .models import  User
# Register your models here.


class AdminUser(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'business_name', 'phone', 'is_active', 'date_joined')
    search_fields = ('email', 'first_name', 'last_name', 'business_name', 'phone')
    list_filter = ('is_active', 'date_joined')
    ordering = ('-date_joined',)

admin.site.register(User, AdminUser)
