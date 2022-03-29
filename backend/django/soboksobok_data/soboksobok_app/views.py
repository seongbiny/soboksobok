from django.shortcuts import render
from .models import Qna
from .models import Welfare
from .models import User
from .models import Selectfamily
from .models import Selecttarget
import pandas as pd
import json
import os 
from pandas import Series,DataFrame
import numpy as np
from scipy.sparse import csr_matrix
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

# Create your views here.
def index(request):
	return render(request,'index.html')

# db 연결 확인코드
# def qna_view(request):
# 	qnas=Qna.objects.all()
# 	return render(request,'qna.html',{'qnas':qnas})

def insertWelfare(request):
	print("현재 os 경로",os.getcwd())
	file_path = os.getcwd()+"/data/welfare_json.json"
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

	return render(request,'insert_welfare.html')


def selectuser(request):
	user_seq=1; #유저 아이디 받아오기
	user=User.objects.filter(user_seq=user_seq);
	# print("user확인 :: ",user.values())
	#QuerySet()은 리스트이고, 객체는 dictionary 이므로 <variable name>[index]['key'] 의 형식으로 value값에 접근이 가능하다
	# print("user이름 :: ",user.values()[0]['username'])
	selectfamily=Selectfamily.objects.filter(user_seq=user_seq);
	selecttarget=Selecttarget.objects.filter(user_seq=user_seq);
	# print("selectfamily :: ",selectfamily.values())
	# print("selecttarget :: ",selecttarget.values())

	result=arrange(user,selectfamily,selecttarget)
	user_vector=user_vectorization(result)
	print(user_vector)
	user_group_mapping(user_vector,user_seq)

	return render(request,'user_info.html')


def arrange(user,selectfamily,selecttarget):
	total = []
	arr=[user.values()[0],selectfamily.values(),selecttarget.values()]

	cur=arr[0]
	family_idx=0
	target_idx=0
	area=1
	gwangju=0
	area_gu=1
	gwangju_gu=0
	gwangju_gwangsan=0
	gwangju_nam=0
	gwangju_dong=0
	gwangju_buk=0
	gwangju_seo=0
	age09=0
	age1019=0
	age2029=0
	age3039=0
	age60=0
	student=0
	inoccupation=0
	startup=0
	farmerfisherman=0
	smallcompony=0
	job_defalut=0
	child_ok=0
	child_empty=0
	not_have_house=0
	pregnant=0
	nonstudent=0
	other_culture=0
	many_child=0
	national_merit=0
	disabled=0
	low_income=0
	single_parent=0
	bad_credit=0
	alone_old_man=0
	vulnerable=0
	none_of_them=0  # 초기 값 설정
	
	# row=cur.iloc[j] #유저 한명
	id=int(cur['user_seq']) #유저 아이디
	print("user id :: ",id)
	row=cur['age']
	if row==1:
		age09=1
	elif row==2:
		age1019=1
	elif row==3:
		age2029=1
	elif row==4:
		age3039=1
	elif row==5:
		age60=1
	elif row==6:
		age09=1
		age1019=1
		age2029=1
		age3039=1
		age60=1
	# 연령대 끝
	row=cur['child']
	if row==1:
		child_ok=1
	elif row==2:
		child_empty=1
	# 자녀유무 끝
	row=cur['region']
	# row=cur['user_area']
	# if row==1:
	# 	gwangju=1
	# row=cur['user_gu']
	# if row==0:
	# 	if gwangju==1:
	# 		gwangju_gu=1
	# elif row==1:
	# 	gwangju_gwangsan=1
	# elif row==2:
	# 	gwangju_nam=1
	# elif row==3:
	# 	gwangju_dong=1
	# elif row==4:
	# 	gwangju_buk=1
	# elif row==5:
	# 	gwangju_seo=1
	# 지역,구 끝
	# user 데이터 끝 
	for l in range(1,len(arr)):
		welfare_data=arr[l] # selectfamily, selecttarget 데이터
		total_idx=len(welfare_data)
		print("total_idx",total_idx)
		if(l==1): #selectfamily
			while(family_idx<total_idx):
				row=welfare_data[family_idx]
				if(row['user_seq_id']!=id):
					break
				row=row['family_id']
				if(row==0):
					not_have_house=1
				elif(row==1):
					pregnant=1
				elif(row==2):
					nonstudent=1
				elif(row==3):
					other_culture=1
				elif(row==4):
					many_child=1
				elif(row==5):
					national_merit=1
				elif(row==6):
					disabled=1
				elif(row==7):
					low_income=1
				elif(row==8):
					single_parent=1
				elif(row==9):
					bad_credit=1
				elif(row==10):
					alone_old_man=1
				elif(row==11):
					vulnerable=1
				elif(row==12):
					none_of_them=1
				family_idx+=1
			# 가구 끝 
		if(l==2): #selecttarget
			while(target_idx<total_idx):
				row=welfare_data[target_idx]
				if(row['user_seq_id']!=id):
					break
				row=row['target_id']
				if(row==0):
					student=1
				elif(row==1):
					inoccupation=1
				elif(row==2):
					startup=1
				elif(row==3):
					farmerfisherman=1
				elif(row==4):
					smallcompony=1
				elif(row==5):
					job_defalut=1
				target_idx+=1
			# 대상 끝
	# 데이터 받기 완료        
	d=pd.DataFrame({
		# '아이디':[id],
		'전국':[area],
		'광주':[gwangju],
		'전국구':[area_gu],
		'광주구':[gwangju_gu],
		'광주 광산구':[gwangju_gwangsan],
		'광주 남구':[gwangju_nam],
		'광주 동구':[gwangju_dong],
		'광주 북구':[gwangju_buk],
		'광주 서구':[gwangju_seo],
		'아동':[age09],
		'청소년':[age1019],
		'청년':[age2029],
		'중장년':[age3039],
		'노년':[age60],
		'학생':[student],
		'무직':[inoccupation],
		'창업':[startup],
		'농어업인':[farmerfisherman],
		'중소기업':[smallcompony],
		'일반':[job_defalut],
		'자녀여부 있음':[child_ok],
		'자녀여부 없음':[child_empty],
		'무주택자':[not_have_house],
		'임산부':[pregnant],
		'미취학':[nonstudent],
		'다문화/탈북민':[other_culture],
		'다자녀':[many_child],
		'보훈대상자/국가유공자':[national_merit],
		'장애인':[disabled],
		'저소득':[low_income],
		'한부모/조손':[single_parent],
		'신용불량자':[bad_credit],
		'독거노인':[alone_old_man],
		'취약계층':[vulnerable],
		'해당없음':[none_of_them]
		})
	total.append(d)
	result=pd.concat(total)
	# file_name= 'user_arrange.csv'
	# file_path=os.getcwd()+"/data/"
	# result.to_csv(file_path+file_name,index=False,encoding='utf-8-sig')
	# print(file_name,'완료')
	return result

		
def user_vectorization(result):
	user_vector=csr_matrix(result, shape=None, dtype=None, copy=False)
	return user_vector

def user_group_mapping(user_vector,user_seq):
	file_path = os.getcwd()+"/data/"
	full_welfare = pd.read_csv(file_path+'welfare_clustering.csv')
	
	welfare_mean=[]
	# n번째 그룹만 뽑기
	# 20은 k의 개수 
	for n in range(20):
		welfare= full_welfare.loc[(full_welfare.clustering==n)]
		welfare=welfare.iloc[:,2:37] #필요한 특성만 뽑기
		# arr_select_welfare=[]
		# for i in range(len(tmp3)):
		#   row=tmp3.iloc[i] # 복지 혜택 한개
		#   ori_id=row[1] # welfare_id
		#   arr_select_welfare.append(ori_id)
		welfare_vector=csr_matrix(welfare, shape=None, dtype=None, copy=False) # 벡터화 
		genre_sim = cosine_similarity(user_vector, welfare_vector)
		df1 = pd.DataFrame(data=genre_sim)
		df1['mean'] = df1.mean(axis=1)
		# print(n,"번째 그룹 평균 : ",df1['mean'][0])
		welfare_mean.append(df1['mean'][0])
	print(welfare_mean)
	print("가장 평균이 높은 그룹 : ", welfare_mean.index(max(welfare_mean)))
	max_group=welfare_mean.index(max(welfare_mean))
	user=User.objects.filter(user_seq=user_seq)
	user.update(user_group=max_group)
