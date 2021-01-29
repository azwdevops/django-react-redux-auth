import re

from django.contrib.auth import get_user_model

from djoser.conf import settings
from djoser.compat import get_user_email
from rest_framework_simplejwt.authentication import JWTAuthentication

User = get_user_model()

# validate password


def validate_password(password):
    regex = re.compile('[@_!#$%^&*()<>?/\|}{~:]')
    if len(password) < 8:
        return "Password must be at least 8 characters", False
    elif re.search('[0-9]', password) is None:
        return "Password must contain a number", False
    elif re.search('[A-Z]', password) is None:
        return "Password must contain an uppercase letter", False
    elif regex.search(password) is None:
        return "Password must contain a special character", False
    else:
        return "", True


# validate to ensure fields (this is a list) are not empty


def fields_empty(fields):
    for field in fields:
        if field.strip() == '':
            return True
    return False

# function to send user aaccount activation email


def send_user_activation_email(request, user):
    # now to send the activation email
    context = {'user': user}
    to = [get_user_email(user)]
    if settings.SEND_ACTIVATION_EMAIL:
        settings.EMAIL.activation(request, context).send(to)
    elif settings.SEND_CONFIRMATION_EMAIL:
        settings.EMAIL.confirmation(request, context)


# verify user using django simple jwt
def verify_user(request, userId):
    # we extract the authorization token from the headers
    raw_token = request.META['HTTP_AUTHORIZATION'].split()[1]
    obj = JWTAuthentication()
    validated_token = obj.get_validated_token(raw_token)
    user = obj.get_user(validated_token)
    try:
        new_user = User.objects.get(id=userId)
        if user == new_user:
            return user
        else:
            return None
    except User.DoesNotExist:
        return None
