# -*- coding: utf-8 -*-

from common.http import Http403
from django.shortcuts import get_object_or_404
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from Instanssi.kompomaatti.misc.custom_render import custom_render
from Instanssi.kompomaatti.misc.auth_decorator import user_access_required
from Instanssi.kompomaatti.forms import *
from Instanssi.kompomaatti.models import *
from Instanssi.kompomaatti.misc.time_formatting import *
from django.contrib.auth import logout
from datetime import datetime
    
def index(request, event_id):
    return custom_render(request, 'kompomaatti/index.html', {
        'sel_event_id': int(event_id),
    })
    
def compos(request, event_id):
    # Get compos, format times
    compos = []
    for compo in Compo.objects.filter(active=True, event_id=int(event_id)):
        compos.append(compo_times_formatter(compo))
    
    # Dump the template
    return custom_render(request, 'kompomaatti/compos.html', {
        'sel_event_id': int(event_id),
        'compos': compos,
    })
    
def compo_details(request, event_id, compo_id):
    # Get compo
    compo = compo_times_formatter(get_object_or_404(Compo, pk=int(compo_id), active=True, event_id=int(event_id)))
    
    # Check if user can participate (deadline not caught yet)
    can_participate = False
    if datetime.now() < compo.adding_end:
        can_participate = True
    
    # Check if user can still edit entries (deadline not caught yet)
    can_edit = False
    if datetime.now() < compo.editing_end:
        can_edit = True
    
    # Handle entry adding
    if request.method == 'POST' and can_participate:
        entryform = EntryForm(request.POST, request.FILES, compo=compo)
        if entryform.is_valid():
            entry = entryform.save(commit=False)
            entry.user = request.user
            entry.compo = compo
            entry.save()
            return HttpResponseRedirect(reverse('kompomaatti-compo', args=(event_id, compo_id,)))
    else:
        entryform = EntryForm(compo=compo)
    
    # Get entries
    entries = Entry.objects.filter(compo=compo, user=request.user)
    
    # Dump template
    return custom_render(request, 'kompomaatti/compo_details.html', {
        'sel_event_id': int(event_id),
        'compo': compo,
        'entryform': entryform,
        'can_participate': can_participate,
        'can_edit': can_edit,
        'entries': entries,
    })
    
@user_access_required
def compoentry_edit(request, event_id, compo_id, entry_id):
    pass

@user_access_required
def compoentry_delete(request, event_id, compo_id, entry_id):
    pass
    
@user_access_required
def competition_signup_toggle(request, event_id, competition_id):
    pass
    
def competitions(request, event_id):
    # Get competitions
    competitions = []
    for competition in Competition.objects.filter(active=True, event_id=int(event_id)):
        competitions.append(competition_times_formatter(competition))
    
    # Dump the template
    return custom_render(request, 'kompomaatti/competitions.html', {
        'sel_event_id': int(event_id),
        'competitions': competitions,
    })
    
def competition_details(request, event_id, competition_id):
    # Get competition
    competition = competition_times_formatter(get_object_or_404(Competition, pk=int(competition_id), active=True, event_id=int(event_id)))
    
    # All done, dump template
    return custom_render(request, 'kompomaatti/competition_details.html', {
        'sel_event_id': int(event_id),
        'competition': competition,
    })

def login(request, event_id):
    return custom_render(request, 'kompomaatti/login.html', {
        'sel_event_id': int(event_id),
    })

@user_access_required
def profile(request, event_id):
    # Get event
    event = get_object_or_404(Event, pk=int(event_id))
        
    # Check if user has the right to vote
    reserved_code = None
    can_vote = False
    try:
        votecode = VoteCode.objects.get(event=event, associated_to=request.user)
        reserved_code = votecode.key
        can_vote = True
    except VoteCode.DoesNotExist:
        pass
        
    # Check if request for vote code has been made
    request_made = False
    try:
        vcreq = VoteCodeRequest.objects.get(event=event, user=request.user)
        request_made = True
    except VoteCodeRequest.DoesNotExist:
        pass
        
    # Profile form
    if request.method == 'POST' and 'submit-profile' in request.POST:
        profileform = ProfileForm(request.POST, instance=request.user, user=request.user)
        if profileform.is_valid():
            profileform.save()
            return HttpResponseRedirect(reverse('kompomaatti-profile', args=(event_id,)))
    else:
        profileform = ProfileForm(instance=request.user, user=request.user)
    
    # Votecode Association form
    if request.method == 'POST' and 'submit-vcassoc' in request.POST:
        votecodeassocform = VoteCodeAssocForm(request.POST, event=event, user=request.user)
        if votecodeassocform.is_valid():
            votecodeassocform.save()
            return HttpResponseRedirect(reverse('kompomaatti-profile', args=(event_id,)))
    else:
        votecodeassocform = VoteCodeAssocForm(event=event, user=request.user)
    
    # Votecode Request form
    if request.method == 'POST' and 'submit-vcreq' in request.POST:
        votecoderequestform = VoteCodeRequestForm(request.POST)
        if votecoderequestform.is_valid():
            vcr = votecoderequestform.save(commit=False)
            vcr.user = request.user
            vcr.event = event
            vcr.save()
            return HttpResponseRedirect(reverse('kompomaatti-profile', args=(event_id,)))
    else:
        votecoderequestform = VoteCodeRequestForm()
    
    # Render
    return custom_render(request, 'kompomaatti/profile.html', {
        'sel_event_id': int(event_id),
        'profileform': profileform,
        'votecodeassocform': votecodeassocform,
        'votecoderequestform': votecoderequestform,
        'reserved_code': reserved_code,
        'can_vote': can_vote,
        'request_made': request_made,
    })
    
@user_access_required
def do_logout(request, event_id):
    logout(request)
    return HttpResponseRedirect(reverse('kompomaatti-index', args=(event_id,)))

