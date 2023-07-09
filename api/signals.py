from django.contrib.auth.signals import user_logged_in, user_logged_out, user_login_failed
from django.dispatch import receiver

@receiver(user_logged_in)
def log_user_logged_in(sender, **kwargs):
    print(f'{kwargs["user"].username} logged in.')

@receiver(user_logged_out)
def log_user_logged_out(sender, **kwargs):
    print(f'{kwargs["user"].username} logged out.')

@receiver(user_login_failed)
def log_user_login_failed(sender, credentials, **kwargs):
    print(f'Login failed for: {credentials["username"]}.')
