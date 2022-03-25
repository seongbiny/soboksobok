from django.shortcuts import render
from .models import Qna

# Create your views here.
def index(request):
	return render(request,'index.html')

# db 연결 확인코드
# def qna_view(request):
# 	qnas=Qna.objects.all()
# 	return render(request,'qna.html',{'qnas':qnas})

