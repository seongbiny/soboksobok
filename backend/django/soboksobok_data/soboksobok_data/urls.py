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
    path('database/all/', soboksobok_app2.views.insertWelfare),
    path('dbscan/',soboksobok_app2.views.dbscan),
    path('welfare/cosine/',soboksobok_app2.views.wel_wel_cosine),
    path('insertusergroup/dbscan/<int:user_seq>', soboksobok_app.views.insertusergroupAPI_DBSCAN),
    # path('insertusergroup/<int:user_seq>', soboksobok_app.views.insertusergroupAPI),
    # path('clustering/',soboksobok_app2.views.clustering),
    # 위에까지 rest api 
    path('insert_user',soboksobok_app.views.insertWelfare,name='insert_user'),
    # path('user_info',soboksobok_app.views.selectuser,name='user_info'),
    # path('test', soboksobok_app2.views.test, name='test'),
    # path('qna/',soboksobok_app.views.qna_view,name='qna') # db 연결 확인코드
]
