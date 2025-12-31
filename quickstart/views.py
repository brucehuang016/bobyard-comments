from .models import Comment 
from rest_framework import permissions, viewsets
from quickstart.serializers import CommentSerializer

class CommentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows comments to be viewed or edited.
    """

    queryset = Comment.objects.all().order_by("-date")
    serializer_class = CommentSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user.username)