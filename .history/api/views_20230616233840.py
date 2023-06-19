from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth import get_user_model, authenticate, login
from .serializers import UserSerializer
from .api_utils import get_recipes


User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            # use 'create_user' instead of 'create' to handle password hashing 
            user = User.objects.create_user( 
                username=serializer.validated_data['username'],
                email=serializer.validated_data['email'],
                password=serializer.validated_data['password'],
            )
            return Response({'message': 'User registered successfully'})
        else:
            return Response(serializer.errors, status=400)
    
    @csrf_exempt
def login_user(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data['username']
        password = data['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Logged in successfully'})
        else:
            return JsonResponse({'error': 'Invalid username or password'})
    else:
        return JsonResponse({'error': 'Invalid request method'})


class RecipeViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['get'])
    def search(self, request):
        ingredients = request.query_params.get('ingredients', '')
        recipes = get_recipes(ingredients)
        return Response(recipes)
