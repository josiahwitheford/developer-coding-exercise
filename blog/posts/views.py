import os
from django.http import HttpResponse, HttpResponseNotFound, JsonResponse
from django.core.files import File
from django.shortcuts import get_object_or_404, render
import markdown

from .models import Post


ASSETS_PATH = 'assets/posts/'
# Feel free to move this to a new file if you are carrying out the 'tags' calculation there


def post(request, slug):
    post = get_object_or_404(Post, slug=slug)
    return render(request, "posts/post.html", {"post": post})

def posts(request):
    # Make sure all of the posts as markdown exist in the database
    slugs_in_assets = get_slugs()
    for slug in slugs_in_assets:
        try:
            post = Post.objects.get(slug=slug)
        except Post.DoesNotExist:
            print(f'post for {slug} was not found in the database. adding it now')
            create_model_for_post_md(slug)

    print(f"Found {Post.objects.count()} posts")
    return render(request, "posts/post_list.html", {'post_list': Post.objects.all()})

def get_slugs():
    filenames = os.listdir(ASSETS_PATH)
    return [fname.split('.')[0] for fname in filenames]

def create_model_for_post_md(slug):
    # read the markdown file
    filepath = os.path.join(ASSETS_PATH, f'{slug}.md')
    with open(filepath) as f:
        start_header_line = f.readline()
        title_line = f.readline()
        author_line = f.readline()
        slug_line = f.readline()
        end_header_line = f.readline()
        content = f.read()
    
    title = extract_prop_from_line(title_line)
    author = extract_prop_from_line(author_line)
    slug = extract_prop_from_line(slug_line)
    print(f'title: {title}')
    post = Post(title=title, author=author, slug=slug, content=content)
    post.save()

def extract_prop_from_line(line):
    return line.split(':')[1].strip()

def apiPost(request, slug):
    try:
        post = Post.objects.get(slug=slug)
    except Post.DoesNotExist:
        return HttpResponseNotFound('<h1>Page not found</h1>')
    
    post_json = {
        'title': post.title,
        'author': post.author,
        'content': post.formatted_markdown(),
        'tags': post.tags
    }
    return JsonResponse(post_json, safe=False)

def apiPosts(request):
    posts = [post.slug for post in Post.objects.all()]
    return JsonResponse(posts, safe=False)
