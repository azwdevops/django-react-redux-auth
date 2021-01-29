from rest_framework_simplejwt.authentication import JWTAuthentication


# overriding the JWTAuthentication class methods
class MyJWTAuthentication(JWTAuthentication):
    pass
