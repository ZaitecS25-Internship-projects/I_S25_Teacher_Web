from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate

from .models import UsuarioPersonalizado
from .serializers import UsuarioPersonalizadoSerializer, LoginSerializer


class UsuarioPersonalizadoViewSet(viewsets.ModelViewSet):
    """
    ViewSet que gestiona las operaciones CRUD del modelo UsuarioPersonalizado.
    Esto incluye:
      - GET /api/usuarios/        → listar usuarios
      - POST /api/usuarios/       → crear un nuevo usuario
      - GET /api/usuarios/{id}/   → ver un usuario específico
      - PUT /api/usuarios/{id}/   → actualizar usuario
      - DELETE /api/usuarios/{id}/→ eliminar usuario
    """
    queryset = UsuarioPersonalizado.objects.all()
    serializer_class = UsuarioPersonalizadoSerializer


class LoginAPIView(APIView):
    """
    GET  → 405 Method Not Allowed
    POST → 400/401/200 según validación
    """
    # 1) Permitimos llamadas anónimas
    permission_classes     = [AllowAny]
    # 2) Desactivamos SessionAuthentication y BasicAuthentication aquí
    authentication_classes = []

    def get(self, request):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = authenticate(
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password']
        )
        if not user:
            raise AuthenticationFailed('Credenciales inválidas.')
        if not user.is_active:
            raise AuthenticationFailed('Cuenta de usuario inactiva.')

        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_200_OK)