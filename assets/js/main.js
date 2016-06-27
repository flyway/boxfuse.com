$(document).ready(function() {
    $("a[href^=http]").each(function(){
        if(this.href.indexOf(location.hostname) == -1) {
            $(this).attr({
                target: "_blank",
                title: "Opens in a new window"
            });
        }
    });
    $(function () {
        $(window).scroll(function () {
            // global scroll to top button
            if ($(this).scrollTop() > 300) {
                $('.scrolltop').fadeIn();
            } else {
                $('.scrolltop').fadeOut();
            }
        });

        // scroll nav
        $('.scroller').click(function () {
            var section = $($(this).data("section"));
            var top = section.offset().top - 82;
            $("html, body").animate({ scrollTop: top }, 700);
            return false;
        });


        $('.contact-form').submit(function (e) {
            $('#contact-confirm').modal('show');
        });

    });

    (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-8034033-8', 'boxfuse.com');
    ga('set', 'forceSSL', true);
    ga('set', 'anonymizeIp', true);
    ga('send', 'pageview');

    if (navigator.platform.indexOf('Win') == -1) {
        // Not windows
        // Fix line continuation marks
        $("pre.console").html(function () {
            return $(this).html().replace(/\^\n/g, "\\\n");
        });
        // And prompt char
        $("pre.console span.os").html(function () {
            return $(this).html().replace("del", "rm");
        });
        // And prompt char
        $("pre.console>span").html(function () {
            return $(this).html().replace("&gt;", "$");
        });
    }

    $(function () {
        prettyPrint();
    });

    $("h2[id]").hover(function(){
        $(this).addClass('anchor').bind("click", function() {
            window.location.hash = $(this).attr("id");
        });
    },function(){
        $(this).removeClass('anchor').unbind('click');
    });
});