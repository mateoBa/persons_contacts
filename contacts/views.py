from django.core.urlresolvers import reverse_lazy
from django.views.generic import FormView
from django.views.generic.base import TemplateView

from contacts.forms import AddPersonForm
from contacts.models import Person


class AddPerson(FormView):
    form_class = AddPersonForm
    template_name = 'contacts/add_person.html'
    success_url = reverse_lazy('contacts:person_list')

    def form_valid(self, form):
        form.save()
        return super(AddPerson, self).form_valid(form)


class PersonList(TemplateView):
    template_name = 'contacts/person_list.html'

    def get_context_data(self, **kwargs):
        context = super(PersonList, self).get_context_data(**kwargs)
        context['persons'] = Person.objects.all().order_by('-id')
        return context

