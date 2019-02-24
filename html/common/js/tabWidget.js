var TabWidget = {
    tabInit: function(selector, tabs) {
        if (!$(selector)[0]) {
            selector = '#' + selector;
        }

        var templ = '<ul class="tabs_menu">';
        var defaultTab = 0;
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i]['default']) {
                defaultTab = i;
            }

            var content = "url='" + tabs[i].url + "'";
            if (tabs[i].domId) {
                content = "domId='" + tabs[i].domId + "'";
                $("#" + tabs[i].domId).hide();
            }

            templ += '<li class="js-tabs-btn2">' +
                '<a ' + content + '>' + tabs[i].title + '</a>' +
                '</li>';
        }
        templ += '<hr>';
        templ += '<div class="tabs_box"></div>';
        templ += '<div style="display: none;" class="tabs_backup_box"></div>';

        //render
        $(selector).html(templ);
        $(selector).addClass("viewFramework-index-tabs");

        //init
        $(selector + " .js-tabs-btn2:eq(" + defaultTab + ")").addClass("current");
        TabWidget.tabSwitch(selector, tabs[defaultTab]);

        //switch
        $(selector + " .js-tabs-btn2").click(function() {
            if ($(this)[0] == $(selector + " .current")[0]) {
                return;
            }

            $(selector + " .current").removeClass("current");
            $(this).addClass("current");

            TabWidget.tabSwitch(selector, {
                'url': $(this).children("a").attr('url'),
                'domId': $(this).children("a").attr('domId')
            });
        })
    },
    tabSwitch: function(selector, tab) {
        if (tab.domId) {
            var dom = $("#" + tab.domId);
            dom.show();
            $(selector + " .tabs_backup_box").append($(selector + " .tabs_box").children())
            $(selector + " .tabs_box").html(dom);
            $(selector + " .tabs_box").attr("type", "id")
        } else if (tab.url) {
            if ($(selector + " .tabs_box").attr("type") == "id") {
                $(selector + " .tabs_backup_box").append($(selector + " .tabs_box").children())
            } else {
                $(selector + " .tabs_box").html("");
            }

            $(selector + " .tabs_box").load(tab.url);
            $(selector + " .tabs_box").attr("type", "url")
        }
    }

};
