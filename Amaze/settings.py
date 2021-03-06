import os
import django_heroku
from Amaze import credentials



"""Build paths inside the project like this: os.path.join(BASE_DIR, ...)"""
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


""" Defined to point to our frontend app then passed in "DIRS" in templates"""
# Developement Templates Directory
TEMP = os.path.join(BASE_DIR, "frontend/build")


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/



# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# Allowing all hosts for now
ALLOWED_HOSTS = [
    "127.0.0.1",
    "http://amaze-me.herokuapp.com",
    "amaze-meherokuapp.com",
    "https://www.kinzy.co",
    "http://www.kinzy.co"
    ]


# Production settings.
if not DEBUG:
    TEMP = os.path.join(BASE_DIR)
    DATABASE_URL = os.environ['DATABASE_URL']

# Developement settings
else:
    # POSTGRES DB settings and credentials
    credentials.DATABASES
    DATABASE_URL = os.environ['DATABASE_URL'] = credentials.HEROKU_DB_URL

# For heroku DB link
import psycopg2
conn = psycopg2.connect(DATABASE_URL, sslmode='require')

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '+mph-zqf14h*@0svn#n0(oyz9nbzdv(o)12oz=+^+q53_%3rhq'

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

# Added to redirect from HTTP to HTTPS
# SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
# SECURE_SSL_REDIRECT = True

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

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#     }
# }




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



# STATIC_URL is the name of the directory where it will look for static files
# So it will go thought your app and look for a directory called static and read all the files from.
# We could possibly name is anything else but then we need to make sure that
# The value of the STATIC_URL must match the name of the directory containing the static files.
STATIC_URL = '/static/'

# Location of static files in production enviroment.
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles/")

""" "STATICFILES_DIR" is the location of which Django will grab it's files 
# then move it to the "STATIC_ROOT"  """
# Also the location of static files in developement enviroment
STATICFILES_DIRS = [os.path.join(BASE_DIR, "frontend/build/static")]

# added to solve CORS
# Maybe used if having CSRF issues/
# STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.ManifestStaticFilesStorage'
CSRF_TRUSTED_ORIGINS=['http://amaze-me.herokuapp.com','https://amaze-me.herokuapp.com', "http://127.0.0.1:8000"]
CORS_ORIGIN_WHITELIST =['http://amaze-me.herokuapp.com', 'https://amaze-me.herokuapp.com',"http://127.0.0.1:8000"]
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_ALLOW_ALL = True

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': os.getenv('DJANGO_LOG_LEVEL', 'DEBUG'),
        },
    },
}

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtpout.secureserver.net'
EMAIL_HOST_USER = credentials.EMAIL
EMAIL_HOST_PASSWORD = credentials.PASSWORD
EMAIL_PORT = 587
ACCOUNT_EMAIL_VERIFICATION = 'none'

# Activate Django-Heroku.
django_heroku.settings(locals(),logging=False)

# to link with heroku DB
import dj_database_url
DATABASES['default'] = dj_database_url.config(conn_max_age=600)

