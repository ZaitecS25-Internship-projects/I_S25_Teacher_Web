from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from .views import UsuarioPersonalizadoViewSet, LoginAPIView

router = DefaultRouter()
router.register(r'usuarios', UsuarioPersonalizadoViewSet, basename='usuario')

urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='login'),
    path('', include(router.urls)),
]
