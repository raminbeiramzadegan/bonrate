from django.contrib import admin
from .models import  *
# Register your models here.


class AdminUser(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'business_name', 'phone', 'is_active')
    search_fields = ('email', 'first_name', 'last_name', 'business_name', 'phone')
    list_filter = ('is_active',)

admin.site.register(User, AdminUser)