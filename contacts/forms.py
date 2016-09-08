from django.contrib.admin.widgets import AdminDateWidget
from django.forms import ModelForm, DateInput, DateField, DateTimeField
from django.forms.extras import SelectDateWidget

from contacts.models import Person
BIRTH_YEAR_CHOICES = [i for i in range(1980, 2016)]


class AddPersonForm(ModelForm):
    class Meta:
        model = Person
        fields = ['first_name', 'last_name', 'address', 'birth_date']
        widgets = {
            'birth_date': SelectDateWidget(years=BIRTH_YEAR_CHOICES),
        }
