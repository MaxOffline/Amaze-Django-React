import os

import django_heroku

"""Build paths inside the project like this: os.path.join(BASE_DIR, ...)"""
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


""" Defined to point to our frontend app then passed in "DIRS" in templates"""
# Developement Templates Directory
TEMP = os.path.join(BASE_DIR, "frontend/build")


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '+mph-zqf14h*@0svn#n0(oyz9nbzdv(o)12oz=+^+q53_%3rhq'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# Allowing all hosts for now
ALLOWED_HOSTS = ["*"]


# Changing templates location for production.
if DEBUG == False:
    TEMP = os.path.join(BASE_DIR)

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'backend',
    "rest_framework",
    "corsheaders",  # added to solve CORS
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # added to solve CORS
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
]

ROOT_URLCONF = 'Amaze.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # dirs here will be our root directory inside our project so we
        # we can use it in our views.
        'DIRS': [TEMP],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


WSGI_APPLICATION = 'Amaze.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


"""Used to select the folder containing the static files of the project.
The value of the STATIC_URL must match the name of the directory containing
Static in STATIC_ROOT
e.g STATIC_URL = "sss"
STATIC_ROOT = os.path.join(BASE_DIR, "/Amaze/sss")"""
STATIC_URL = '/static/'

# Location of static files in production enviroment.
STATIC_ROOT = os.path.join(BASE_DIR, "/Amaze/static")

""" "STATICFILES_DIR" is the location of which Django will grab it's files 
# then move it to the "STATIC_ROOT"  """
# Also the location of static files in developement enviroment
STATICFILES_DIRS = [os.path.join(BASE_DIR, "frontend/build/static")]

# added to solve CORS
CORS_ORIGIN_ALLOW_ALL = True
# Maybe used if having CSRF issues/
CSRF_TRUSTED_ORIGINS = ['http://127.0.0.1:8000']
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Activate Django-Heroku.
django_heroku.settings(locals())
