
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, RecipeViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'recipes', RecipeViewSet, basename='recipes')

urlpatterns = [
    path('', include(router.urls)),
]