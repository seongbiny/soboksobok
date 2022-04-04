from django.shortcuts import render
from .models import *
import pandas as pd
import json
import os 
import re
from konlpy.tag import Okt
from sklearn.feature_extraction.text import TfidfVectorizer
from soyclustering import SphericalKMeans
from pandas import Series,DataFrame
import numpy as np
from scipy.sparse import csr_matrix
from sklearn.metrics.pairwise import cosine_similarity
from rest_framework.response import Response
from rest_framework.decorators import api_view
from konlpy import utils
from sklearn.cluster import DBSCAN

# Create your views here.

file_path=os.getcwd()+"/data/"

# 복지 데이터 저장
@api_view(['GET'])
def insertWelfare(request):
	file_name="220404 행안부 공공서비스_openapi.json"
	# file_path = os.getcwd()+"/data/"+"220324 전체데이터 번호재정의와 정렬_json변환용.json"
	
	with open(file_path+file_name, "r", encoding='UTF8') as json_file:
		json_data = json.load(json_file)
		welfares=[]
		for i in json_data:
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
			welfare.welfare_child=i['welfare_child']
			welfare.welfare_contact=i['welfare_contact']
			welfare.welfare_service_type=i['welfare_service_type']
			welfare.welfare_service_purpose=i['welfare_service_purpose']
			welfare.welfare_date=i['welfare_date']
			welfare.welfare_view=i['welfare_view']
			welfare.welfare_female=i['welfare_female']
			welfare.welfare_male=i['welfare_male']
			# welfare_name
			# welfare_group
			welfares.append(welfare)
		Welfare.objects.bulk_create(welfares)
		print("복지 데이터 완료")
	
	# 생애주기 데이터
	file_name="age.csv"
	csv_life = pd.read_csv(file_path+file_name, encoding='cp949')
	
	lifes = []
	
	for i in range(len(csv_life)):
		row = csv_life.iloc[i]
		
		life = Life()
		life.age_id = row['age_id']
		life.age_name = row['age_name']
		
		lifes.append(life)
	
	Life.objects.bulk_create(lifes)
	
	
	# 가구특성 데이터
	file_name="family.csv"
	csv_family = pd.read_csv(file_path+file_name, encoding='cp949')
	
	families = []
	
	for i in range(len(csv_family)):
		row = csv_family.iloc[i]
		
		family = Family()
		family.family_id = row['family_id']
		family.family_name = row['family_name']
		
		families.append(family)
	
	Family.objects.bulk_create(families)

	
	# 대상특성 데이터
	file_name="target.csv"
	csv_target = pd.read_csv(file_path+file_name, encoding='cp949')
	
	targets = []
	
	for i in range(len(csv_target)):
		row = csv_target.iloc[i]
		
		target = Target()
		target.target_id = row['target_id']
		target.target_name = row['target_name']
		
		targets.append(target)
	
	Target.objects.bulk_create(targets)

	print("기본 데이터  완료")

	# 복지-생애주기 데이터
	file_name="220404 행안부 welfarelife.csv"
	csv_welfarelife = pd.read_csv(file_path+file_name, encoding='cp949')
	
	welfare_lifes = []
	
	for i in range(len(csv_welfarelife)):
		row = csv_welfarelife.iloc[i]
		print("row",row)
		welfare_life = Welfarelife()

		life_id = row['welfarelife_life_id']
		if life_id == 0:
			life_id = 1
		life = Life.objects.filter(age_id=life_id)
		# print("id : ",row['welfare_id'])
		welfare_life.welfare_id = row['癤퓑elfare_id']
		welfare_life.life_id = life_id
		
		welfare_lifes.append(welfare_life)
	
	Welfarelife.objects.bulk_create(welfare_lifes)
	
	# 복지-가구특성 데이터
	file_name="220404 행안부 welfarefamily.csv"
	csv_welfarefamily = pd.read_csv(file_path+file_name, encoding='cp949')
	welfare_families = []
	
	for i in range(len(csv_welfarefamily)):
		row = csv_welfarefamily.iloc[i]
		
		welfare_family = Welfarefamily()

		welfare_family.welfare_id = row['癤퓑elfare_id']
		welfare_family.family_id = row['welfarefamily_family_id']
		
		welfare_families.append(welfare_family)
	
	Welfarefamily.objects.bulk_create(welfare_families)
	
	# 복지-대상특성 데이터
	file_name="220404 행안부 welfaretarget.csv"
	csv_welfaretarget = pd.read_csv(file_path+file_name, encoding='cp949')
	
	welfare_targets = []
	
	for i in range(len(csv_welfaretarget)):
		row = csv_welfaretarget.iloc[i]
		
		welfare_target = Welfaretarget()
		welfare_target.welfare_id = row['癤퓑elfare_id']
		welfare_target.target_id = row['welfaretarget_target_id']
		welfare_targets.append(welfare_target)
	
	Welfaretarget.objects.bulk_create(welfare_targets)
	
	return Response("success")


# 복지 단어 늘여놓기
def welfare_word_detail():
	
	total = []

	welfare = Welfare.objects.all()
	family = Welfarefamily.objects.all()
	life = Welfarelife.objects.all()
	target = Welfaretarget.objects.all()

	family_idx=0
	target_idx=0
	age_idx=0

	for j in range(len(welfare)):
		age09="@"
		age1019="@"
		age2029="@"
		age3039="@"
		age60="@"
		student="@"
		inoccupation="@"
		startup="@"
		farmerfisherman="@"
		smallcompony="@"
		job_defalut="@"
		child_ok="@"
		child_empty="@"
		female='@'
		male='@'
		not_have_house="@"
		pregnant="@"
		alone="@"
		other_culture="@"
		many_child="@"
		national_merit="@"
		disabled="@"
		new="@"
		single_parent="@"
		many_family="@"
		alone_old_man="@"
		vulnerable="@"
		none_of_them="@"
		
		# 초기 값 설정
		w=welfare[j] #복지 혜택 하나
		# temp 시작
		w_id=w.welfare_id
		ori_id = w.welfare_ori_id
		# tmp=cur.iloc[:,2:]
		# row=tmp.iloc[j]
		# len_row=row.count() # column 개수 세기

		if w.welfare_child == 1:
			child_ok = "자녀있음"
		elif w.welfare_child == 2:
			child_empty = "자녀없음/상관없음"
		# 자녀유무 끝
		# temp 데이터 끝

		if w.welfare_female == 1:
			female = "여성"
		if w.welfare_male == 1:
			male = "남성"
		# 자녀유무 끝
		# temp 데이터 끝

		f = family.filter(welfare_id=w_id)

		for nf in f:
			nfi = nf.family_id
			if nfi == 0:
				not_have_house = "무주택자"
			elif nfi == 1:
				pregnant = "임산부"
			elif nfi == 2:
				alone = "1인가구"
			elif nfi == 3:
				other_culture = "다문화/탈북민"
			elif nfi == 4:
				many_child = "다자녀"
			elif nfi == 5:
				national_merit = "보훈대상자/국가유공자"
			elif nfi == 6:
				disabled = "장애인"
			elif nfi == 7:
				new = "신규전입"
			elif nfi == 8:
				single_parent = "한부모/조손"
			elif nfi == 9:
				many_family = "확대가족"
			elif nfi == 10:
				alone_old_man = "요양환자/치매환자"
			elif nfi == 11:
				vulnerable = "취약계층"
			elif nfi == 12:
				none_of_them = "해당없음"
		# 가구 끝 

		t = target.filter(welfare_id=w_id)

		for nt in t:
			nti = nt.target_id
			if nti == 0:
				student = "학생"
			elif nti == 1:
				inoccupation = "무직"
			elif nti == 2:
				startup = "창업"
			elif nti == 3:
				farmerfisherman = "농어업인"
			elif nti == 4:
				smallcompony = "중소기업"
			elif nti == 5:
				job_defalut = "일반"
		# 대상 끝

		l = life.filter(welfare_id=w_id)

		for nl in l:
			nli = nl.life_id
			if nli == 1:
				age09 = "아동"
			elif nli == 2:
				age1019 = "청소년"
			elif nli == 3:
				age2029 = "청년"
			elif nli == 4:
				age3039 = "중장년"
			elif nli == 5:
				age60 = "노년"
			elif nli == 6:
				age09 = "아동"
				age1019 = "청소년"
				age2029 = "청년"
				age3039 = "중장년"
				age60 = "노년"
		# 나이 끝
		# 데이터 받기 완료        
		d=pd.DataFrame({
			'아이디':[w_id],
			'ori_아이디':[ori_id],
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
			'여성':[female],
			'남성':[male],
			'무주택자':[not_have_house],
			'임산부':[pregnant],
			'1인가구':[alone],
			'다문화/탈북민':[other_culture],
			'다자녀':[many_child],
			'보훈대상자/국가유공자':[national_merit],
			'장애인':[disabled],
			'신규전입':[new],
			'한부모/조손':[single_parent],
			'확대가족':[many_family],
			'요양환자/치매환자':[alone_old_man],
			'취약계층':[vulnerable],
			'해당없음':[none_of_them],
			})
		total.append(d)

	result=pd.concat(total)
	result_name="welfare_word_result.csv"
	result.to_csv(os.getcwd()+"/data/"+result_name,index=False,encoding='utf-8-sig')
	return result_name
	

# 복지 특성유무 늘여놓기
def welfare_detail():
	
	total = []

	welfare = Welfare.objects.all()
	family = Welfarefamily.objects.all()
	life = Welfarelife.objects.all()
	# purpose = Welfarepurpose.objects.all()
	target = Welfaretarget.objects.all()

	family_idx=0
	target_idx=0
	age_idx=0
	# purpose_idx=0

	for j in range(len(welfare)):
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
		female=0 #추가
		male=0 #추가
		not_have_house=0
		pregnant=0
		alone=0 #추가
		other_culture=0
		many_child=0
		national_merit=0
		disabled=0
		new=0 #추가
		single_parent=0
		many_family=0 #추가
		alone_old_man=0
		vulnerable=0
		none_of_them=0 #가구 특성
		# purpose_none_of_them=0
		# safe=0
		# culture=0
		# education=0
		# protect=0
		# for_job=0
		# for_house=0
		# normal_life=0
		# physical_health=0
		# mental_health=0
		
		# 초기 값 설정
		w=welfare[j] #복지 혜택 하나
		# temp 시작
		w_id=w.welfare_id
		ori_id = w.welfare_ori_id
		# tmp=cur.iloc[:,2:]
		# row=tmp.iloc[j]
		# len_row=row.count() # column 개수 세기
		# if w.welfare_area == '1':
		# 	gwangju = 1
		# 	if w.welfare_gu == '0':
		# 		gwangju_gu = 1
		# 	elif w.welfare_gu == '1':
		# 		gwangju_gwangsan = 1
		# 	elif w.welfare_gu == '2':
		# 		gwangju_nam = 1
		# 	elif w.welfare_gu == '3':
		# 		gwangju_dong = 1
		# 	elif w.welfare_gu == '4':
		# 		gwangju_buk = 1
		# 	elif w.welfare_gu == '5':
		# 		gwangju_seo = 1
		# 지역,구 끝

		if w.welfare_female == 1:
			female = 1
		if w.welfare_male == 1:
			male = 1
		# 성별

		if w.welfare_child == 1:
			child_ok = 1
		elif w.welfare_child == 2:
			child_empty = 1
		# 자녀유무 끝
		# temp 데이터 끝

		f = family.filter(welfare_id=w_id)

		for nf in f:
			nfi = nf.family_id
			if nfi == 0:
				not_have_house = 1
			elif nfi == 1:
				pregnant = 1
			elif nfi == 2:
				alone = 1
			elif nfi == 3:
				other_culture = 1
			elif nfi == 4:
				many_child = 1
			elif nfi == 5:
				national_merit = 1
			elif nfi == 6:
				disabled = 1
			elif nfi == 7:
				new = 1
			elif nfi == 8:
				single_parent = 1
			elif nfi == 9:
				many_family = 1
			elif nfi == 10:
				alone_old_man = 1
			elif nfi == 11:
				vulnerable = 1
			elif nfi == 12:
				none_of_them = 1
		# 가구 끝 

		t = target.filter(welfare_id=w_id)

		for nt in t:
			nti = nt.target_id
			if nti == 0:
				student = 1
			elif nti == 1:
				inoccupation = 1
			elif nti == 2:
				startup = 1
			elif nti == 3:
				farmerfisherman = 1
			elif nti == 4:
				smallcompony = 1
			elif nti == 5:
				job_defalut = 1
		# 대상 끝

		l = life.filter(welfare_id=w_id)

		for nl in l:
			nli = nl.life_id
			if nli == 1:
				age09 = 1
			elif nli == 2:
				age1019 = 1
			elif nli == 3:
				age2029 = 1
			elif nli == 4:
				age3039 = 1
			elif nli == 5:
				age60 = 1
			elif nli == 6:
				age09 = age1019 = age2029 = age3039 = age60 = 1
		# 나이 끝

		# p = purpose.filter(welfare_id=w_id)

		# for np in p:
		# 	npi = np.purpose_id
		# 	if npi == 0:
		# 		for_job = 1
		# 	elif npi == 1:
		# 		for_house = 1
		# 	elif npi == 2:
		# 		normal_life = 1
		# 	elif npi == 3:
		# 		physical_health = 1
		# 	elif npi == 4:
		# 		mental_health = 1
		# 	elif npi == 5:
		# 		protect = 1
		# 	elif npi == 6:
		# 		education = 1
		# 	elif npi == 7:
		# 		culture = 1
		# 	elif npi == 8:
		# 		safe = 1
		# 	elif npi == 9:
		# 		purpose_none_of_them = 1
		# 	# 사업목적 끝
		
		# 데이터 받기 완료        
		d=pd.DataFrame({
			'아이디':[w_id],
			'ori_아이디':[ori_id],
			# '전국':[area],
			# '광주':[gwangju],
			# '전국구':[area_gu],
			# '광주구':[gwangju_gu],
			# '광주 광산구':[gwangju_gwangsan],
			# '광주 남구':[gwangju_nam],
			# '광주 동구':[gwangju_dong],
			# '광주 북구':[gwangju_buk],
			# '광주 서구':[gwangju_seo],
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
			'여성':[female],
			'남성':[male],
			'무주택자':[not_have_house],
			'임산부':[pregnant],
			'1인가구':[alone],
			'다문화/탈북민':[other_culture],
			'다자녀':[many_child],
			'보훈대상자/국가유공자':[national_merit],
			'장애인':[disabled],
			'신규전입':[new],
			'한부모/조손':[single_parent],
			'확대가족':[many_family],
			'요양환자/치매환자':[alone_old_man],
			'취약계층':[vulnerable],
			'해당없음':[none_of_them],
			# '일자리':[for_job],
			# '주거':[for_house],
			# '일상생활':[normal_life],
			# '신체건강 및 보건의료':[physical_health],
			# '정신건강 및 심리정서':[mental_health],
			# '사업목적해당없음':[purpose_none_of_them],
			# '안전 및 권익보장':[safe],
			# '문화 및 여가':[culture],
			# '보육 및 교육':[education],
			# '보호 및 돌봄/요양':[protect],
			})
		total.append(d)

	result=pd.concat(total)
	result.to_csv(os.getcwd()+"/data/"+"complete.csv",index=False,encoding='utf-8-sig')
	return result


@api_view(['GET'])
# 복지 특성유무기반 Spherical K-means 클러스터링
def clustering(request):
	# total = pd.read_csv(os.getcwd()+"/data/"+"complete.csv", encoding = 'utf-8')

	total = welfare_detail()

	temp = total.iloc[:, 2:]

	result=csr_matrix(temp, shape=None, dtype=None, copy=False)

	kmeans = SphericalKMeans(n_clusters = 20)
	labels = kmeans.fit_predict(result)

	word = total
	word['clustering'] = labels[:]
	# idx=total.iloc[:,:1]
	# word = pd.concat([idx,word],axis=1)

	word.to_csv(os.getcwd()+"/data/"+"welfare+clustering.csv", encoding = 'utf-8-sig')
	
	welfares = Welfare.objects.all()

	for i in range(len(word)):
		welfare = welfares.filter(welfare_id=word.iloc[i]['아이디'])
		welfare.update(welfare_group=word.iloc[i]['clustering'])

	return Response('clustering done')

# 복지 특성유무기반 DBSCAN 클러스터링 
@api_view(['GET'])
def dbscan(request):
	# total = pd.read_csv(os.getcwd()+"/data/"+"complete.csv", encoding = 'utf-8')
	total = welfare_detail()

	temp = total.iloc[:, 2:]

	model = DBSCAN(min_samples=6)
	labels = model.fit_predict(temp)

	# result=csr_matrix(temp, shape=None, dtype=None, copy=False)

	# kmeans = SphericalKMeans(n_clusters = 20)
	# labels = kmeans.fit_predict(result)

	word = total
	word['clustering'] = labels[:]
	# idx=total.iloc[:,:1]
	# word = pd.concat([idx,word],axis=1)

	word.to_csv(os.getcwd()+"/data/"+"welfare+DBSCAN.csv", encoding = 'utf-8-sig')
	
	welfares = Welfare.objects.all()

	for i in range(len(word)):
		welfare = welfares.filter(welfare_id=word.iloc[i]['아이디'])
		welfare.update(welfare_group=word.iloc[i]['clustering'])

	return Response('DBSCAN done')

# 복지 특성유무 벡터화 
def wel_wel_0101_vector():

	total = welfare_detail()

	total = total.iloc[:, 2:]

	vector = csr_matrix(total, shape=None, dtype=None, copy=False)

	return vector


# 복지 단어 나누기 && 불용어 처리 
def welfare_word_split():

	result_name = welfare_word_detail()
	total=pd.read_csv(os.getcwd()+"/data/"+result_name)
	data = pd.read_csv(os.getcwd()+"/data/"+"220404 행안부 공공서비스_openapi.csv")

	print("total",total)
	print("welfare_word_split ::",data.head())

	total_split = total.iloc[:, 2:]
	data_split = data.iloc[:, :16]

	print("total_split::",len(total_split))
	print("data_split::",len(data_split))

	# print("total_split::",total_split.head())
	# print("data_split::",data_split.head())

	# result= data_split.append(total_split)
	result = pd.concat([data_split, total_split],axis=1)

	name_list=['아동','청소년','청년','중장년','노년','학생','무직','창업','농어업인'
	,'중소기업','일반','자녀여부 있음','자녀여부 없음','여성','남성','무주택자','임산부','1인가구','다문화/탈북민','다자녀','보훈대상자/국가유공자','장애인','신규전입','한부모/조손','확대가족',
	'요양환자/치매환자','취약계층','해당없음']

	text=result['welfare_service_name'] + ' ' + result['welfare_target_detail']+' '+ result['welfare_crit']+' '+result['welfare_service_content']+' '+result['welfare_service_purpose']
	print(text)

	for i in range(len(name_list)):
		text+=' '+result[name_list[i]]

	for i in range(len(text)):
		text[i] = re.sub('[-=+,#/\?:^$.@*\"※~&%ㆍ!』\\‘|\(\)\[\]\<\>`\'…》\n]', '', str(text[i]))
		text[i] = re.sub('[0-9]', '', str(text[i]))
		text[i] = re.sub('[;▶[]《『』]', '', str(text[i]))
		text[i] = re.sub(r"\s+", "", str(text[i])) # 스페이스 제거
		
	okt = Okt()
	sentences_tag = []

	for i in range(0, len(text)):

		morph = okt.pos(text[i])
		sentences_tag.append(morph)

	word_list = []

	for sentence1 in sentences_tag:
		l1=[]
		for word, tag in sentence1:
			
			if tag in ['Noun']:
				l1.append(word)
		word_list.append(l1)
		
	with open(os.getcwd()+"/data/"+"복지 단어 데이터.txt", 'w') as f:
		for i in range(len(word_list)):
			for line in word_list[i]:
				f.write(line)
				f.write(' ')
			f.write('\n')

	with open(os.getcwd()+"/data/"+"복지 단어 데이터.txt", 'r') as f:
		list_file = f.readlines()
	list_file = [line.rstrip('\n') for line in list_file]
	
	stopwords = []

	file = open(os.getcwd()+"/data/"+"불용어.txt", 'r', encoding = 'UTF8')

	while (1):
		line = file.readline()
		try:
			escape = line.index('\n')
		except:
			escape = len(line)
		
		if line:
			stopwords.append(line[0:escape])
		else:
			break
		
	file.close()
	return list_file

# 복지 단어 tf-dif 벡터화 
def wel_wel_word_cosine():
	list_file=welfare_word_split()
	print("wel_wel_word_cosine")
	corpus_welfare = list_file
	tfidfv_welfare = TfidfVectorizer(min_df = 5, max_features = 150, ngram_range=(1, 3)).fit(list_file)

	welfare=tfidfv_welfare.transform(corpus_welfare).toarray()

	genre_sim = cosine_similarity(welfare, welfare)

	num_welfare = len(welfare)
	genre_sim[range(num_welfare), range(num_welfare)] = 0

	return genre_sim
	

# 복지-복지 유사도 계산 및 db 저장
@api_view(['GET'])
def wel_wel_cosine(request):
	sim_word = wel_wel_word_cosine()
	vector_0101 = wel_wel_0101_vector()
	print("sim_word :: ",len(sim_word))
	
	sim_0101 = cosine_similarity(vector_0101, vector_0101)
	
	print("verctor 0101 ::",vector_0101.shape)

	sim_0101[range(len(sim_0101)), range(len(sim_0101))] = 0

	sim = (sim_0101 + sim_word) / 2
	
	top_10 = []

	for i in range(len(sim)):
		max_10 = sorted(sim[i], reverse=True)[:10]
		for j in range(10):
			z = 0
			now = np.where(sim[i]==max_10[j])[0][z]
			if j != 0:
				while now in max_10:
					z += 1
					now = np.where(sim[i]==max_10[j])[0][z]
			max_10[j] = now
		top_10.append(max_10)
	
	print(top_10[:10])

	# top_10.to_csv(os.getcwd()+"/data/"+"top_10_similar_welfare_id.csv", encoding = 'utf-8-sig')

	# with open(os.getcwd()+"/data/"+"top_10_similar_welfare_id.txt", 'w') as f:
	# 	for i in range(len(top_10)):
	# 		f.write(str(i+1))
	# 		f.write(' :: ')
	# 		f.write(str(top_10[i]))
	# 		f.write('\n')

	welfares = Welfare.objects.all()

	for i in range(len(top_10)):
		welfare = welfares.filter(welfare_id=i+1)
		welfare.update(welfare_similar_welfare=top_10[i])
	
	return Response('wel_wel_cosine done')




##############################

# def ptest(request):
# 	welfares = Welfare.objects.all() 
# 	for i in range(len(welfares)):

# 		families = Welfarefamily.objects.filter(welfare=welfares[i])

# 		for family in families:
# 			print(family.family_id)



# # 복지 단어기반 클러스터링
# def pword_clustering(request):
# 	total = welfare_word_detail()

# 	# total = pd.read_csv(os.getcwd()+"/data/"+"wordcomplete.csv", encoding = 'UTF8')
	
# 	data = pd.read_csv(os.getcwd()+"/data/"+"행안부data.csv")

# 	total_split = total.iloc[2:]
# 	data_split = data.iloc[:, :12]
# 	result = pd.concat([data_split, total_split],axis=1)

# 	name_list=['전국','광주','전국구','광주구','광주 광산구','광주 남구','광주 동구','광주 북구','광주 서구','아동','청소년','청년','중장년','노년','학생','무직','창업','농어업인'
# 	,'중소기업','일반','자녀여부 있음','자녀여부 없음','무주택자','임산부','미취학','다문화/탈북민','다자녀','보훈대상자/국가유공자','장애인','저소득','한부모/조손','신용불량자',
# 	'독거노인','취약계층','해당없음','일자리','주거','일상생활','신체건강 및 보건의료','정신건강 및 심리정서','사업목적해당없음','안전 및 권익보장','문화 및 여가','보육 및 교육','보호 및 돌봄/요양']

# 	text=result['welfare_service_name'] + ' ' + result['welfare_target_detail']+' '+ result['welfare_crit']+' '+result['welfare_service_content']

# 	for i in range(len(name_list)):
# 		text+=' '+result[name_list[i]]

# 	for i in range(len(text)):
# 		text[i] = re.sub('[-=+,#/\?:^$.@*\"※~&%ㆍ!』\\‘|\(\)\[\]\<\>`\'…》\n]', '', str(text[i]))
# 		text[i] = re.sub('[0-9]', '', str(text[i]))
# 		text[i] = re.sub('[;▶[]《『』]', '', str(text[i]))
# 		text[i] = re.sub(r"\s+", "", str(text[i])) # 스페이스 제거
		
# 	okt = Okt()
# 	sentences_tag = []

# 	for i in range(0, len(text)):

# 		morph = okt.pos(text[i])
# 		sentences_tag.append(morph)

# 	word_list = []

# 	for sentence1 in sentences_tag:
# 		l1=[]
# 		for word, tag in sentence1:
			
# 			if tag in ['Noun']:
# 				l1.append(word)
# 		word_list.append(l1)
		
# 	with open(os.getcwd()+"/data/"+"복지 단어 데이터.txt", 'w') as f:
# 		for i in range(len(word_list)):
# 			for line in word_list[i]:
# 				f.write(line)
# 				f.write(' ')
# 			f.write('\n')

# 	with open(os.getcwd()+"/data/"+"복지 단어 데이터.txt", 'r') as f:
# 		list_file = f.readlines()
# 	list_file = [line.rstrip('\n') for line in list_file]
	
# 	stopwords = []

# 	file = open(os.getcwd()+"/data/"+"불용어.txt", 'r', encoding = 'UTF8')

# 	while (1):
# 		line = file.readline()
# 		try:
# 			escape = line.index('\n')
# 		except:
# 			escape = len(line)
		
# 		if line:
# 			stopwords.append(line[0:escape])
# 		else:
# 			break
		
# 	file.close()

# 	# for i in range(0, len(stopwords)+1):
# 	# 	for j in range(0, len(list_file)):
# 	# 		if i==len(stopwords) : 
# 	# 			list_file[j] = re.sub('은지원 대상', '', list_file[j])
# 	# 		else : 
# 	# 			list_file[j] = re.sub(stopwords[i], '', list_file[j])
	
# 	corpus = list_file
# 	tfidfv = TfidfVectorizer(min_df = 5, max_features = 150, ngram_range=(1, 3)).fit(corpus) 
	
# 	X = tfidfv.fit_transform(corpus) # 2차원 
# 	idx_to_vocab = tfidfv.vocabulary_.keys()

# 	kmeans = SphericalKMeans(n_clusters = 20)
# 	labels = kmeans.fit_predict(X)

# 	word = total.iloc[:, 2:]
# 	word['clustering'] = labels[:]

# 	idx=total.iloc[:,:1]
	
# 	word = pd.concat([idx,word],axis=1)

# 	word.to_csv(os.getcwd()+"/data/"+"1 wordcomplete + 라벨링 + id.csv", encoding = 'utf-8-sig')
	
# 	welfares = Welfare.objects.all()

# 	# for i in range(len(word)):
# 	# 	welfare = welfares.filter(welfare_id=word.iloc[i]['아이디'])
# 	# 	welfare.update(welfare_group=word.iloc[i]['clustering'])

# 	return


# # 복지 특성유무기반 클러스터링
# def pclustering():
# 	# total = pd.read_csv(os.getcwd()+"/data/"+"complete.csv", encoding = 'utf-8')

# 	total = welfare_detail()

# 	temp = total.iloc[:, 2:]

# 	result=csr_matrix(temp, shape=None, dtype=None, copy=False)

# 	kmeans = SphericalKMeans(n_clusters = 20)
# 	labels = kmeans.fit_predict(result)

# 	word = total
# 	word['clustering'] = labels[:]
# 	# idx=total.iloc[:,:1]
# 	# word = pd.concat([idx,word],axis=1)

# 	word.to_csv(os.getcwd()+"/data/"+"220330 complete + 라벨링 + id.csv", encoding = 'utf-8-sig')
	
# 	welfares = Welfare.objects.all()

# 	for i in range(len(word)):
# 		welfare = welfares.filter(welfare_id=word.iloc[i]['아이디'])
# 		welfare.update(welfare_group=word.iloc[i]['clustering'])

# 	return




# # 복지 특성유무 벡터화 
# def pwel_wel_0101_vector():

# 	total = welfare_detail()

# 	total = total.iloc[:, 2:]

# 	vector = csr_matrix(total, shape=None, dtype=None, copy=False)

# 	return vector


# # 복지 단어 tf-dif 벡터화 
# def pwel_wel_word_cosine():

# 	with open(os.getcwd()+"/data/"+"복지 단어 데이터.txt", 'r') as f:
# 		list_file = f.readlines()
# 	list_file = [line.rstrip('\n') for line in list_file]
	
# 	stopwords = []

# 	file = open(os.getcwd()+"/data/"+"불용어.txt", 'r', encoding = 'UTF8')

# 	while (1):
# 		line = file.readline()
# 		try:
# 			escape = line.index('\n')
# 		except:
# 			escape = len(line)
		
# 		if line:
# 			stopwords.append(line[0:escape])
# 		else:
# 			break
		
# 	file.close()

# 	for i in range(0, len(stopwords)+1):
# 		for j in range(0, len(list_file)):
# 			if i==len(stopwords) : 
# 				list_file[j] = re.sub('은지원 대상', '', list_file[j])
# 			else : 
# 				list_file[j] = re.sub(stopwords[i], '', list_file[j])

# 	corpus_welfare = list_file
# 	tfidfv_welfare = TfidfVectorizer(min_df = 5, max_features = 150, ngram_range=(1, 3)).fit(list_file)

# 	welfare=tfidfv_welfare.transform(corpus_welfare).toarray()

# 	genre_sim = cosine_similarity(welfare, welfare)

# 	num_welfare = len(welfare)
# 	genre_sim[range(num_welfare), range(num_welfare)] = 0

# 	return genre_sim
	

# # 복지-복지 유사도 계산 및 db 저장
# def pwel_wel_cosine():
# 	sim_word = wel_wel_word_cosine()
# 	vector_0101 = wel_wel_0101_vector()
	
# 	sim_0101 = cosine_similarity(vector_0101, vector_0101)

# 	sim_0101[range(len(sim_0101)), range(len(sim_0101))] = 0

# 	sim = (sim_0101 + sim_word) / 2
	
# 	top_10 = []

# 	for i in range(len(sim)):
# 		max_10 = sorted(sim[i], reverse=True)[:10]
# 		for j in range(10):
# 			z = 0
# 			now = np.where(sim[i]==max_10[j])[0][z]
# 			if j != 0:
# 				while now in max_10:
# 					z += 1
# 					now = np.where(sim[i]==max_10[j])[0][z]
# 			max_10[j] = now
# 		top_10.append(max_10)
	
# 	# print(top_10)

# 	# top_10.to_csv(os.getcwd()+"/data/"+"top_10_similar_welfare_id.csv", encoding = 'utf-8-sig')

# 	with open(os.getcwd()+"/data/"+"top_10_similar_welfare_id.txt", 'w') as f:
# 		for i in range(len(top_10)):
# 			f.write(str(i+1))
# 			f.write(' :: ')
# 			f.write(str(top_10[i]))
# 			f.write('\n')

# 	# db에 문자열로 저장

# 	welfares = Welfare.objects.all()

# 	for i in range(len(top_10)):
# 		welfare = welfares.filter(welfare_id=i+1)
# 		welfare.update(welfare_similar_welfare=top_10[i])
	
# 	return
