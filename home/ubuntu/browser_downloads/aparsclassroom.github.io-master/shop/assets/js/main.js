$('.autoplay-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    items: 5,
    autoplay: true,
    autoplayTimeout: 5000,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 2
        }
    },
    navText: [
        '<i class="fas fa-chevron-left"></i>',
        '<i class="fas fa-chevron-right"></i>'
    ]
});
/*

=========================================================
* Neumorphism UI - v1.0.0
=========================================================

* Product Page: https://themesberg.com/product/ui-kits/neumorphism-ui
* Copyright 2020 Themesberg MIT LICENSE (https://www.themesberg.com/licensing#mit)

* Coded by https://themesberg.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

"use strict";
$(document).ready(function() {

    // options

    var breakpoints = {
        sm: 540,
        md: 720,
        lg: 960,
        xl: 1140
    };

    var $navbarCollapse = $('.navbar-main .collapse');

    // Collapse navigation
    $navbarCollapse.on('hide.bs.collapse', function() {
        var $this = $(this);
        $this.addClass('collapsing-out');
        $('html, body').css('overflow', 'initial');
    });

    $navbarCollapse.on('hidden.bs.collapse', function() {
        var $this = $(this);
        $this.removeClass('collapsing-out');
    });

    $navbarCollapse.on('shown.bs.collapse', function() {
        $('html, body').css('overflow', 'hidden');
    });

    $('.navbar-main .dropdown').on('hide.bs.dropdown', function() {
        var $this = $(this).find('.dropdown-menu');

        $this.addClass('close');

        setTimeout(function() {
            $this.removeClass('close');
        }, 200);

    });

    $(document).on('click', '.mega-dropdown', function(e) {
        e.stopPropagation();
    });

    $(document).on('click', '.navbar-nav > .dropdown', function(e) {
        e.stopPropagation();
    });

    $('.dropdown-submenu > .dropdown-toggle').click(function(e) {
        e.preventDefault();
        $(this).parent('.dropdown-submenu').toggleClass('show');
    });

    // Headroom - show/hide navbar on scroll
    if ($('.headroom')[0]) {
        var headroom = new Headroom(document.querySelector("#navbar-main"), {
            offset: 0,
            tolerance: {
                up: 0,
                down: 0
            },
        });
        headroom.init();
    }

    // Background images for sections
    $('[data-background]').each(function() {
        $(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
    });

    // When in viewport
    $('[data-toggle="on-screen"]')[0] && $('[data-toggle="on-screen"]').onScreen({
        container: window,
        direction: 'vertical',
        doIn: function() {
            //alert();
        },
        doOut: function() {
            // Do something to the matched elements as they get off scren
        },
        tolerance: 200,
        throttle: 50,
        toggleClass: 'on-screen',
        debug: false
    });

    // Scroll to anchor with scroll animation
    $('[data-toggle="scroll"]').on('click', function(event) {
        var hash = $(this).attr('href');
        var offset = $(this).data('offset') ? $(this).data('offset') : 0;

        // Animate scroll to the selected section
        $('html, body').stop(true, true).animate({
            scrollTop: $(hash).offset().top - offset
        }, 600);

        event.preventDefault();
    });


    //Parallax
    $('.jarallax').jarallax({
        speed: 0.2
    });

    //Smooth scroll
    var scroll = new SmoothScroll('a[href*="#"]', {
        speed: 500,
        speedAsDuration: true
    });

    // Equalize height to the max of the elements
    if ($(document).width() >= breakpoints.lg) {

        // object to keep track of id's and jQuery elements
        var equalize = {
            uniqueIds: [],
            elements: []
        };

        // identify all unique id's
        $('[data-equalize-height]').each(function() {
            var id = $(this).attr('data-equalize-height');
            if (!equalize.uniqueIds.includes(id)) {
                equalize.uniqueIds.push(id)
                equalize.elements.push({ id: id, elements: [] });
            }
        });

        // add elements in order
        $('[data-equalize-height]').each(function() {
            var $el = $(this);
            var id = $el.attr('data-equalize-height');
            equalize.elements.map(function(elements) {
                if (elements.id === id) {
                    elements.elements.push($el);
                }
            });
        });

        // equalize
        equalize.elements.map(function(elements) {
            var elements = elements.elements;
            if (elements.length) {
                var maxHeight = 0;

                // determine the larget height
                elements.map(function($element) {
                    maxHeight = maxHeight < $element.outerHeight() ? $element.outerHeight() : maxHeight;
                });

                // make all elements with the same [data-equalize-height] value
                // equal the larget height
                elements.map(function($element) {
                    $element.height(maxHeight);
                })
            }
        });
    }

    // update target element content to match number of characters
    $('[data-bind-characters-target]').each(function() {
        var $text = $($(this).attr('data-bind-characters-target'));
        var maxCharacters = parseInt($(this).attr('maxlength'));
        $text.text(maxCharacters);

        $(this).on('keyup change', function(e) {
            var string = $(this).val();
            var characters = string.length;
            var charactersRemaining = maxCharacters - characters;
            $text.text(charactersRemaining);
        })
    });


    $('.current-year').text(new Date().getFullYear());

});


function trailer() {
    $('#exampleModal').modal('toggle')
}

$('#exampleModal').on('hidden.bs.modal', function(e) {
    $('#popup-youtube-player')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
})

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'MnsUDWSltq0',
        playerVars: { 'autoplay': 0, 'playsinline': 0, 'modestbranding': 1, 'rel': 0, 'controls': 0 },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    document.getElementById('thumbnail-vid').style.display = "none";
    event.target.setVolume(100);
    event.target.playVideo();
}