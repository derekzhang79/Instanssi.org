# -*- coding: utf-8 -*-

from django.forms import ModelForm
from models import Compo, Entry

class AddEntryForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super(AddEntryForm, self).__init__(*args, **kwargs) 
        self.fields['compo'].queryset = Compo.objects.filter(active=True)
        self.fields['entryfile'].help_text = "Tuotospaketti. Katso kompon tiedoista sopivat tiedostoformaatit!";

    class Meta:
        model = Entry
        fields = ('compo','name','creator','description','entryfile','imagefile_original')