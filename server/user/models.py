import uuid
from PIL import Image

from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.contrib.postgres.fields import CIEmailField, CICharField
from django.db.models import Model, DateField, DateTimeField, BooleanField, UUIDField, ImageField, TextField


class MyAccountManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have a username')

        user = self.model(email=self.normalize_email(
            email), username=username,)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(email=self.normalize_email(
            email), password=password, username=username)
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    id = UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = CIEmailField(verbose_name="email",
                         max_length=100, unique=True)
    username = CICharField(max_length=50, unique=True)
    first_name = CICharField(max_length=100)
    last_name = CICharField(max_length=100)
    bio = TextField(blank=True, null=True)
    date_joined = DateTimeField(
        verbose_name='date joined', auto_now_add=True)
    last_login = DateTimeField(verbose_name='last login', auto_now=True)
    is_admin = BooleanField(default=False)
    is_active = BooleanField(default=False)
    is_staff = BooleanField(default=False)
    is_superuser = BooleanField(default=False)
    photo = ImageField(
        upload_to='user_images', default='user_images/avatar.png')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = MyAccountManager()

    def __str__(self):
        return self.email

    # for permissions, to keep it simple, all admins have all permissions
    def has_perm(self, perm, obj=None):
        return self.is_admin

    # does this user has permission to view app, always yes for simplicity
    def has_module_perms(self, app_label):
        return True

    def save(self, *args, **kwargs):
        super(User, self).save(*args, **kwargs)
        # change image dimensions before saving to ensure consistent displays
        if self.photo:
            image = Image.open(self.photo)
            size = (1024, 683)
            image = image.resize(size, Image.ANTIALIAS)
            image.save(self.photo.path)
