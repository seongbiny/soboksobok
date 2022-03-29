from django.shortcuts import render
from .models import *
import pandas as pd
import json
import os 

# Create your views here.

def insertWelfare(request):
	print("현재 os 경로",os.getcwd())
	
	file_path = "C:/Users/SSAFY/Desktop/pjt/pjt_2/S06P22C205/backend/django/soboksobok_data/data/welfare_json.json"
	with open(file_path, "r", encoding='UTF8') as json_file:
		json_data = json.load(json_file)
		welfares=[]
		for i in json_data:
			# print("복지 하나",i,"\n")
			welfare=Welfare()
			welfare.welfare_id=i['welfare_id']
			welfare.welfare_ori_id=i['welfare_ori_id']
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


	# 생애주기 데이터
	csv_life = pd.read_csv('C:/Users/SSAFY/Desktop/pjt/pjt_2/S06P22C205/backend/django/soboksobok_data/data/age.csv', encoding='cp949')
	
	lifes = []
	
	for i in range(len(csv_life)):
		row = csv_life.iloc[i]
		
		life = Life()
		life.age_id = row['age_id']
		life.age_name = row['age_name']
		
		lifes.append(life)
	
	Life.objects.bulk_create(lifes)
	
	# 가구특성 데이터
	csv_family = pd.read_csv('C:/Users/SSAFY/Desktop/pjt/pjt_2/S06P22C205/backend/django/soboksobok_data/data/family.csv', encoding='cp949')
	
	families = []
	
	for i in range(len(csv_family)):
		row = csv_family.iloc[i]
		
		family = Family()
		family.family_id = row['family_id']
		family.family_name = row['family_name']
		
		families.append(family)
	
	Family.objects.bulk_create(families)

	# 대상특성 데이터
	csv_target = pd.read_csv('C:/Users/SSAFY/Desktop/pjt/pjt_2/S06P22C205/backend/django/soboksobok_data/data/target.csv', encoding='cp949')
	
	targets = []
	
	for i in range(len(csv_target)):
		row = csv_target.iloc[i]
		
		target = Target()
		target.target_id = row['target_id']
		target.target_name = row['target_name']
		
		targets.append(target)
	
	Target.objects.bulk_create(targets)

	# 사업목적 데이터
	csv_purpose = pd.read_csv('C:/Users/SSAFY/Desktop/pjt/pjt_2/S06P22C205/backend/django/soboksobok_data/data/purpose.csv', encoding='cp949')
	
	purposes = []
	
	for i in range(len(csv_purpose)):
		row = csv_purpose.iloc[i]
		
		purpose = Purpose()
		purpose.purpose_id = row['purpose_id']
		purpose.purpose_name = row['purpose_name']
		
		purposes.append(purpose)
	
	Purpose.objects.bulk_create(purposes)


	# 복지-생애주기 데이터
	csv_welfarelife = pd.read_csv('C:/Users/SSAFY/Desktop/pjt/pjt_2/S06P22C205/backend/django/soboksobok_data/data/220324 welfarelife 정렬.csv', encoding='cp949')
	
	welfare_lifes = []
	
	for i in range(len(csv_welfarelife)):
		row = csv_welfarelife.iloc[i]
		
		welfare_life = Welfarelife()
		welfare_life.welfare_id = row['welfare_id']
		welfare_life.life_id = row['life_id']
		
		welfare_lifes.append(welfare_life)
	
	Welfarelife.objects.bulk_create(welfare_lifes)
	
	# 복지-가구특성 데이터
	csv_welfarefamily = pd.read_csv('C:/Users/SSAFY/Desktop/pjt/pjt_2/S06P22C205/backend/django/soboksobok_data/data/220324 welfarefamily 정렬.csv', encoding='cp949')
	
	welfare_families = []
	
	for i in range(len(csv_welfarefamily)):
		row = csv_welfarefamily.iloc[i]
		
		welfare_family = Welfarefamily()
		welfare_family.welfare_id = row['welfare_id']
		welfare_family.family_id = row['family_id']
		
		welfare_families.append(welfare_family)
	
	Welfarefamily.objects.bulk_create(welfare_families)
	
	# 복지-대상특성 데이터
	csv_welfarepurpose = pd.read_csv('C:/Users/SSAFY/Desktop/pjt/pjt_2/S06P22C205/backend/django/soboksobok_data/data/220324 welfaretarget 정렬.csv', encoding='cp949')
	
	welfare_purposes = []
	
	for i in range(len(csv_welfarepurpose)):
		row = csv_welfarepurpose.iloc[i]
		
		welfare_purpose = Welfarepurpose()
		welfare_purpose.welfare_id = row['welfare_id']
		welfare_purpose.purpose_id = row['purpose_id']
		
		welfare_purposes.append(welfare_purposes)
	
	Welfarepurpose.objects.bulk_create(welfare_purposes)
	
	# 복지-사업목적 데이터
	csv_welfarepurpose = pd.read_csv('C:/Users/SSAFY/Desktop/pjt/pjt_2/S06P22C205/backend/django/soboksobok_data/data/220324 welfarelife 정렬.csv', encoding='cp949')
	
	welfare_purposes = []
	
	for i in range(len(csv_welfarepurpose)):
		row = csv_welfarepurpose.iloc[i]
		
		welfare_purpose = Welfarepurpose()
		welfare_purpose.welfare_id = row['welfare_id']
		welfare_purpose.purpose_id = row['purpose_id']
		
		welfare_purposes.append(welfare_purpose)
	
	Welfarepurpose.objects.bulk_create(welfare_purposes)


	# return render(request,'insert_welfare.html')