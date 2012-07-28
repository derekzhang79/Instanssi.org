# -*- coding: utf-8 -*-

from django.shortcuts import render_to_response
from django.http import Http404,HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from Instanssi.ext_blog.models import BlogEntry, BlogComment
from Instanssi.kompomaatti.models import Event
from forms import BlogEntryForm
from datetime import datetime
from Instanssi.settings import SHORT_LANGUAGE_CODE
from Instanssi.admin_base.misc.custom_render import admin_render
from Instanssi.admin_base.misc.eventsel import get_selected_event

@login_required(login_url='/control/auth/login/')
def index(request):
    # Make sure the user is staff.
    if not request.user.is_staff:
        raise Http404
    
    # Get events
    selected_event_id = get_selected_event(request)
    entries = BlogEntry.objects.filter(event_id = selected_event_id)
    
    # Render response
    return admin_render(request, "admin_blog/index.html", {
        'entries': entries,
    })

@login_required(login_url='/control/auth/login/')
def write(request):
    # Make sure the user is staff.
    if not request.user.is_staff:
        raise Http404
    
    # Check for permissions
    if not request.user.has_perm('admin_blog.add_blogentry'):
        raise Http404
    
    # Find event
    try:
        event = Event.objects.get(id=get_selected_event(request))
    except:
        event = None
    
    # Post
    form = None
    if event:
        if request.method == 'POST':
            form = BlogEntryForm(request.POST)
            if form.is_valid():
                entry = form.save(commit=False)
                entry.event = event
                entry.date = datetime.now()
                entry.user = request.user
                entry.save()
                return HttpResponseRedirect("/control/blog/")
        else:
            form = BlogEntryForm()
    
    # Render response
    return admin_render(request, "admin_blog/write.html", {
        'addform': form,
        'LANGUAGE_CODE': SHORT_LANGUAGE_CODE,
    })

@login_required(login_url='/control/auth/login/')
def edit(request, entry_id):
    # Make sure the user is staff.
    if not request.user.is_staff:
        raise Http404
    
    # Check for permissions
    if not request.user.has_perm('admin_blog.change_blogentry'):
        raise Http404
    
    # Get old entry
    try:
        entry = BlogEntry.objects.get(id=entry_id)
    except BlogEntry.DoesNotExist:
        raise Http404
    
    # Go ahead and edit
    if request.method == 'POST':
        form = BlogEntryForm(request.POST, instance=entry)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect("/control/blog/")
    else:
        form = BlogEntryForm(instance=entry)
    
    # Render response
    return admin_render(request, "admin_blog/edit.html", {
        'editform': form,
        'LANGUAGE_CODE': SHORT_LANGUAGE_CODE,
    })
    
    
@login_required(login_url='/control/auth/login/') 
def delete(request, entry_id):
    # Make sure the user is staff.
    if not request.user.is_staff:
        raise Http404
    
    # Check for permissions
    if not request.user.has_perm('admin_blog.delete_blogentry'):
        raise Http404
    
    # Delete entry
    try:
        entry = BlogEntry.objects.get(id=entry_id)
        entry.delete()
    except BlogEntry.DoesNotExist:
        pass
    
    return HttpResponseRedirect("/control/blog/")
