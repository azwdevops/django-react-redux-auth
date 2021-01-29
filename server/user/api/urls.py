from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView)

from user.api import views

urlpatterns = [
    # djoser urls
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # api urls
    path('signup/', views.register_user,
         name='register_user'),  # register new user
    path('login/', TokenObtainPairView.as_view(),
         name='token_obtain_pair'),  # user login
    path('resend-account-activation-link/', views.resend_user_activation_email,
         name='resend_user_activation_email'),  # resend user activation email
    path('change-user-password/<userId>/', views.change_user_password,
         name='change_user_password'),  # change user password

    # patch urls
    path('update-user-details/<userId>/', views.update_user_details,
         name='update_user_details'),  # update user details

    # get urls
    path('get-user-data/', views.get_user_data,
         name='get_user_data'),  # get user data
]
