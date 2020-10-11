from django.urls import path
from . import views


urlpatterns = [
    path('api/posts/', views.apiPosts, name='api_posts'),
    path('api/posts/<slug:slug>/', views.apiPost, name='api_post'),
    path('', views.posts, name='posts'),
    path('<slug:slug>/', views.post, name='post'),
]
