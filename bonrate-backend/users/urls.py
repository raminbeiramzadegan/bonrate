from django.urls import path
from .views import RegisterView, LoginView, ForgotPasswordView
from .business_profile_views import BusinessProfileView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('forgot-password/', ForgotPasswordView().as_view(), name='forgot-password'),
    path('business-profile/', BusinessProfileView.as_view(), name='business-profile'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
