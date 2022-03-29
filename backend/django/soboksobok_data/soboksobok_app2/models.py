from django.db import models

# Create your models here.

class Family(models.Model):
    family_id = models.BigIntegerField(primary_key=True)
    family_name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'family'


class Life(models.Model):
    age_id = models.BigIntegerField(primary_key=True)
    age_name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'life'


class Purpose(models.Model):
    purpose_id = models.BigIntegerField(primary_key=True)
    purpose_name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'purpose'


class Target(models.Model):
    target_id = models.BigIntegerField(primary_key=True)
    target_name = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'target'


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