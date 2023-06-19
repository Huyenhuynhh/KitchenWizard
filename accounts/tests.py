from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import get_user_model

class AccountsTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.register_url = reverse('register')
        self.login_url = reverse('login')
        self.User = get_user_model()

    def test_registration_POST_creates_new_user(self):
        response = self.client.post(self.register_url, {
            'username': 'myusername',
            'email': 'myemail@example.com',
            'password': 'mypassword',
            'password2': 'mypassword'
        })

        self.assertEqual(response.status_code, 302)
        self.assertEqual(self.User.objects.count(), 1)
        self.assertEqual(self.User.objects.first().email, 'myemail@example.com')

    def test_login_POST_logs_in_user(self):
        self.test_registration_POST_creates_new_user()
        response = self.client.post(self.login_url, {
            'username': 'myusername',
            'password': 'mypassword'
        })

        user = self.User.objects.get(username='myusername')
        self.assertEqual(int(self.client.session['_auth_user_id']), user.pk)
