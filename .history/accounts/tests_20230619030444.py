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
            'username': 'doraemon',
            'email': 'winniehuynh8127@gmail.com',
            'password': 'Hellow',
            'password2': 'testpassword123'
        })

        self.assertEqual(response.status_code, 302)
        self.assertEqual(self.User.objects.count(), 1)
        self.assertEqual(self.User.objects.first().email, 'testuser@example.com')

    def test_login_POST_logs_in_user(self):
        self.test_registration_POST_creates_new_user()
        response = self.client.post(self.login_url, {
            'username': 'testuser',
            'password': 'testpassword123'
        })

        user = self.User.objects.get(username='testuser')
        self.assertEqual(int(self.client.session['_auth_user_id']), user.pk)

