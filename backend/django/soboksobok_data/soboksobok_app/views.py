from django.shortcuts import render
from .models import Qna
from .models import Welfare
import pandas as pd
import json
import os 

# Create your views here.
def index(request):
	return render(request,'index.html')

# db 연결 확인코드
# def qna_view(request):
# 	qnas=Qna.objects.all()
# 	return render(request,'qna.html',{'qnas':qnas})

def insertWelfare(request):
	print("현재 os 경로",os.getcwd())
	file_path = "D:/ssafy/[작업]특화PJT/220317/S06P22C205/backend/django/soboksobok_data/data/welfare_json.json"
	with open(file_path, "r", encoding='UTF8') as json_file:
		json_data = json.load(json_file)
		welfares=[]
		for i in json_data:
			# print("복지 하나",i,"\n")
			welfare=Welfare()
			welfare.welfare_id=i['welfare_id']
			# welfare.welfare_id=i['welfare_ori_id']
			welfare.welfare_service_name=i['welfare_service_name']
			welfare.welfare_dept_name =i['welfare_dept_name']
			welfare.welfare_target_detail=i['welfare_target_detail']
			welfare.welfare_crit=i['welfare_crit']
			welfare.welfare_service_content=i['welfare_service_content']
			welfare.welfare_howto=i['welfare_howto']
			welfare.welfare_phone=i['welfare_phone']
			welfare.welfare_site_name=i['welfare_site_name']
			welfare.welfare_site_link=i['welfare_site_link']
			welfare.welfare_area=i['welfare_area']
			welfare.welfare_gu=i['welfare_gu']
			welfare.welfare_child=i['welfare_child']
			welfare.welfare_contact=i['welfare_contact']
			# welfare_name
			# welfare_group

			welfares.append(welfare)
		Welfare.objects.bulk_create(welfares)

	return render(request,'insert_welfare.html')
