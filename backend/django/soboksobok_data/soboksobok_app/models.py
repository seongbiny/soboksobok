from django.db import models

# Create your models here.

class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Comment(models.Model):
    comment_id = models.BigIntegerField(primary_key=True)
    comment_content = models.TextField()
    comment_created_at = models.DateTimeField(blank=True, null=True)
    comment_updated_at = models.DateTimeField(blank=True, null=True)
    comment_qna = models.ForeignKey('Qna', models.DO_NOTHING, blank=True, null=True)
    comment_user = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'comment'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Family(models.Model):
    family_id = models.BigIntegerField(primary_key=True)
    family_name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'family'


class FamilyWelfarefamily(models.Model):
    family_family = models.ForeignKey(Family, models.DO_NOTHING)
    welfarefamily = models.OneToOneField('Welfarefamily', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'family_welfarefamily'


class HibernateSequence(models.Model):
    next_val = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'hibernate_sequence'


class Keyword(models.Model):
    keyword_id = models.BigAutoField(primary_key=True)
    keyword_cnt = models.BigIntegerField(blank=True, null=True)
    keyword_name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'keyword'


class Life(models.Model):
    age_id = models.BigIntegerField(primary_key=True)
    age_name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'life'


class LifeWelfarelife(models.Model):
    life_age = models.ForeignKey(Life, models.DO_NOTHING)
    welfarelife = models.OneToOneField('Welfarelife', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'life_welfarelife'


class Likewelfare(models.Model):
    id = models.BigAutoField(primary_key=True)
    user_seq = models.ForeignKey('User', models.DO_NOTHING, db_column='user_seq', blank=True, null=True)
    welfare = models.ForeignKey('Welfare', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'likewelfare'


class Purpose(models.Model):
    purpose_id = models.BigIntegerField(primary_key=True)
    purpose_name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'purpose'


class PurposeWelfarepurpose(models.Model):
    purpose_purpose = models.ForeignKey(Purpose, models.DO_NOTHING)
    welfarepurpose = models.OneToOneField('Welfarepurpose', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'purpose_welfarepurpose'


class Qna(models.Model):
    qna_id = models.BigIntegerField(primary_key=True)
    qna_content = models.TextField()
    qna_created_at = models.DateTimeField(blank=True, null=True)
    qna_title = models.CharField(max_length=100, blank=True, null=True)
    qna_updated_at = models.DateTimeField(blank=True, null=True)
    qna_user = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'qna'


class Selectfamily(models.Model):
    id = models.BigAutoField(primary_key=True)
    family = models.ForeignKey(Family, models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'selectfamily'


class Selecttarget(models.Model):
    id = models.BigAutoField(primary_key=True)
    target = models.ForeignKey('Target', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey('User', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'selecttarget'


class Target(models.Model):
    target_id = models.BigIntegerField(primary_key=True)
    target_name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'target'


class TargetWelfaretarget(models.Model):
    target_target = models.ForeignKey(Target, models.DO_NOTHING)
    welfaretarget = models.OneToOneField('Welfaretarget', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'target_welfaretarget'


class Used(models.Model):
    id = models.BigAutoField(primary_key=True)
    user_seq = models.ForeignKey('User', models.DO_NOTHING, db_column='user_seq', blank=True, null=True)
    welfare = models.ForeignKey('Welfare', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'used'


class User(models.Model):
    user_seq = models.BigAutoField(primary_key=True)
    age = models.CharField(max_length=255, blank=True, null=True)
    birth = models.CharField(max_length=255, blank=True, null=True)
    child = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField()
    email = models.CharField(unique=True, max_length=512)
    email_verified_yn = models.CharField(max_length=1)
    gender = models.CharField(max_length=255, blank=True, null=True)
    modified_at = models.DateTimeField()
    password = models.CharField(max_length=128)
    profile_image_url = models.CharField(max_length=512)
    provider_type = models.CharField(max_length=20)
    role_type = models.CharField(max_length=20)
    user_id = models.CharField(unique=True, max_length=64)
    username = models.CharField(max_length=100)
    user_group = models.IntegerField(blank=True, null=True)
    area = models.CharField(max_length=255, blank=True, null=True)
    gu = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user'


class UserRefreshToken(models.Model):
    refresh_token_seq = models.BigAutoField(primary_key=True)
    refresh_token = models.CharField(max_length=256)
    user_id = models.CharField(unique=True, max_length=64)

    class Meta:
        managed = False
        db_table = 'user_refresh_token'


class Welfare(models.Model):
    welfare_id = models.BigIntegerField(primary_key=True)
    welfare_area = models.CharField(max_length=2)
    welfare_child = models.IntegerField(blank=True, null=True)
    welfare_contact = models.CharField(max_length=255, blank=True, null=True)
    welfare_crit = models.CharField(max_length=255, blank=True, null=True)
    welfare_dept_name = models.CharField(max_length=255, blank=True, null=True)
    welfare_gu = models.CharField(max_length=2)
    welfare_howto = models.CharField(max_length=255, blank=True, null=True)
    welfare_phone = models.CharField(max_length=255, blank=True, null=True)
    welfare_service_content = models.CharField(max_length=255, blank=True, null=True)
    welfare_service_name = models.CharField(max_length=255, blank=True, null=True)
    welfare_site_link = models.CharField(max_length=255, blank=True, null=True)
    welfare_site_name = models.CharField(max_length=255, blank=True, null=True)
    welfare_target_detail = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'welfare'


class Welfarefamily(models.Model):
    id = models.BigAutoField(primary_key=True)
    family = models.ForeignKey(Family, models.DO_NOTHING, blank=True, null=True)
    welfare = models.ForeignKey(Welfare, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'welfarefamily'


class Welfarelife(models.Model):
    id = models.BigAutoField(primary_key=True)
    life = models.ForeignKey(Life, models.DO_NOTHING, blank=True, null=True)
    welfare = models.ForeignKey(Welfare, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'welfarelife'


class Welfarepurpose(models.Model):
    id = models.BigAutoField(primary_key=True)
    purpose = models.ForeignKey(Purpose, models.DO_NOTHING, blank=True, null=True)
    welfare = models.ForeignKey(Welfare, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'welfarepurpose'


class Welfaretarget(models.Model):
    id = models.BigAutoField(primary_key=True)
    target = models.ForeignKey(Target, models.DO_NOTHING, blank=True, null=True)
    welfare = models.ForeignKey(Welfare, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'welfaretarget'