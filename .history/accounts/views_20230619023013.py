from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages, auth

def register(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        password2 = request.POST['password2']
        email = request.POST['email']

        if password == password2:
            if User.objects.filter(username=username).exists():
                messages.error(request, 'This username is taken')
                return redirect('register')
            else:
                if User.objects.filter(email==email).exists():
                    messages.error(request, 'This email is being used')
                    return redirect('register')
                else:
                    user = User.objects.create_user(username=username, password=password, email=email)
                    user.save()
                    messages.success(request, 'Successfully registered and can log in')
                    return redirect('login')
        else:
            messages.error(request, 'Passwords do not match')
            return redirect('register')
    else:
        return render(request, 'accounts/register.html')
    
    def login(request):
        if request.method == 'POST':
            username = request.POST['username']
            password = request.POST['password']
            user = auth.authenticate(username=username, password=password)

            if user is not None:
                auth.login(request, user)
                messages.success(request, 'You are not logged in')
                return redirect('dashboard')
            else: 
                messages.error(request, 'Invalid credentials')
                return redirect('login')
        else: 
            return render(request, 'accounts/login.html')