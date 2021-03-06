"use strict";

/*
 * Screenshow Frontpage module
 * Author: Tuomas Virtanen
 */

function ScreenFrontpage(settings, jmobj, obj) {
    this.settings = settings; 
    this.jmobj = jmobj;
    this.obj = obj;
    this.info_obj = null;

    this.init = function() {
        var output = '';
        output += '<div class="front_information front_left">http://instanssi.org</div>';
        output += '<span id="front_header">Instanssi</span>';
        output += '<div class="front_information front_right">#instanssi @ IRCNet</div>';
        this.obj.html(output); 
        this.info_obj = $('.front_information');
    }
    this.post_init = function() {
        this.obj.on('enterStep', $.proxy(this.start, this));
        this.obj.on('leaveStep', $.proxy(this.stop, this));
    }
    this.update = function() {}
    
    this.start = function() {
        this.info_obj.fadeIn(1000);
    }
    
    this.stop = function() {
        this.info_obj.fadeOut(1000);
    }
}
