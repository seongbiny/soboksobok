"""soboksobok_data URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
import soboksobok_app.views
import soboksobok_app2.views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',soboksobok_app.views.index,name='index'),
    path('insert_user',soboksobok_app.views.insertWelfare,name='insert_user'),
    path('insert_welfare',soboksobok_app2.views.insertWelfare,name='insert_welfare'),
    path('word_clustering',soboksobok_app2.views.word_clustering,name='word_clustering'),
    path('clustering', soboksobok_app2.views.clustering, name='clustering'),
    path('user_info',soboksobok_app.views.selectuser,name='user_info'),
    path('test', soboksobok_app2.views.test, name='test'),
    # path('qna/',soboksobok_app.views.qna_view,name='qna') # db 연결 확인코드
]
