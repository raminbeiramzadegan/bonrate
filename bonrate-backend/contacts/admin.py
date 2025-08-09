from django.contrib import admin
from .models import Contact

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'user', 'review_status', 'created_at']
    list_filter = ['review_status', 'created_at', 'user']
    search_fields = ['name', 'email', 'phone', 'user__email']
    readonly_fields = ['id', 'review_url', 'created_at', 'updated_at', 'last_contact']
    list_per_page = 25
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'phone', 'email', 'user')
        }),
        ('Review Details', {
            'fields': ('review_status', 'review_url')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at', 'last_contact'),
            'classes': ('collapse',)
        }),
        ('System', {
            'fields': ('id',),
            'classes': ('collapse',)
        })
    )