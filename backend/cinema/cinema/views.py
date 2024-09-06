from django.http import JsonResponse
from django.core.cache import cache
from django.conf import settings
import os
from .scripts.Index import IndexSearch  

def search_movies(request):
    search_instance = cache.get('search_instance')
    
    if not search_instance:
        # Construct absolute paths using settings.BASE_DIR
        index_path = os.path.join(settings.BASE_DIR, 'cinema', 'index', 'faiss_index.bin')
        docstore_path = os.path.join(settings.BASE_DIR, 'cinema', 'index', 'docstore.pkl')
        docstore_id_path = os.path.join(settings.BASE_DIR, 'cinema', 'index', 'index_to_docstore_id.pkl')

        search_instance = IndexSearch(index_path, docstore_path, docstore_id_path)
        cache.set('search_instance', search_instance, timeout=None)  

    query = request.GET.get('query', '')
    genre_filter = request.GET.get('genre', None)
    min_vote_average = float(request.GET.get('min_vote_average', '0'))
    after_year = int(request.GET.get('after_year', '0')) if request.GET.get('after_year') else None
    before_year = int(request.GET.get('before_year', '0')) if request.GET.get('before_year') else None
    k = int(request.GET.get('k', '6'))

    # Perform the search
    results = search_instance.search(
        query, k=k, genre_filter=genre_filter, min_vote_average=min_vote_average,
        after_year=after_year, before_year=before_year
    )
    
    return JsonResponse({'results': results})


