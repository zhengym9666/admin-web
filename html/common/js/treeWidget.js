/**
 * 树形控件
 * 本插件基于zTree(www.zTree.me)完成
 * 参数请参考demo
 * 
 * auther: caojy@asiainfo.com
 * date: 2017/03/01
 */
var zTreePath = rootPath + "/page/common/js/ztree";

document.write('<link rel="stylesheet" href="' + zTreePath + '/zTreeStyle.css" type="text/css">');
document.write('<script type="text/javascript" src="' + zTreePath + '/jquery.ztree.all.min.js"></script>');
var TreeWidget = {
    setting: null,
    tNodes: null,
    zTreeObj: null,
    async: false,
    treeInit: function(selector, tNodes, setting) {
        if (!$(selector)[0]) { //hack "id" and "#id"，but does't working when selector is "div"
            selector = '#' + selector;
        }

        TreeWidget.setting = setting;
        TreeWidget.tNodes = tNodes;
        TreeWidget.zTreeObj = $.fn.zTree.init($(selector), TreeWidget.getSetting(), tNodes);

        TreeWidget.initSearch();
    },
    getSetting: function() {
        var setting = TreeWidget.setting;

        var async = {};
        if (setting && setting.async) {
            TreeWidget.async = true;
            async = {
                enable: true,
                url: setting.async.url,
                autoParam: ["id", "name", "level"],
                otherParam: setting.async.param,
            }
        }

        return {
            async: async,
            data: {
                keep: {
                    parent: true
                }
            },
            view: {
                showLine: false,
                showIcon: false,
                selectedMulti: false,
                dblClickExpand: false,
                txtSelectedEnable: true,
                addDiyDom: function(treeId, treeNode) {
                    var spaceWidth = 18;
                    var switchObj = $("#" + treeNode.tId + "_switch");
                    var icoObj = $("#" + treeNode.tId + "_ico");
                    switchObj.remove();
                    icoObj.before(switchObj);

                    if (treeNode.level > 0) {
                        switchObj.before("<span style='display: inline-block;width:" + (spaceWidth * (treeNode.level - !treeNode.isParent)) + "px'></span>");
                    }

                    if (treeNode.level == 0 && treeNode.open && treeNode.search) {
                        TreeWidget.initSearchInput(treeNode);
                    }
                }
            },
            callback: {
                beforeClick: function(treeId, treeNode, clickFlag) {
                    if (treeNode.level == 0) {
                        TreeWidget.zTreeObj.expandNode(treeNode);
                        if (treeNode.search && !$("#" + treeNode.tId + "_ul .search")[0]) {
                            TreeWidget.initSearchInput(treeNode);
                            TreeWidget.initSearch();
                        }
                        return false;
                    }
                    return !treeNode.isParent;
                },
                onClick: function(event, treeId, treeNode, clickFlag) {
                    TreeWidget.setting.onClick(event, treeNode.id, treeNode.name)
                },
                beforeRightClick: function(treeId, treeNode) {
                    return treeNode && treeNode.level > 0;
                },
                onRightClick: function(event, treeId, treeNode) {
                    if (treeNode) {
                        TreeWidget.zTreeObj.selectNode(treeNode);
                        TreeWidget.showMenu(treeNode, event.clientX, event.clientY);
                    }
                },
                onAsyncSuccess: function(event, treeId, treeNode, msg) {
                    if (!treeNode) { //load the root
                        TreeWidget.tNodes = eval(msg);
                    }
                    TreeWidget.initSearch(async);
                },
            }
        };
    },
    initSearch: function() {
        var delay = (function() {
            var timer = 0;
            return function(callback, time) {
                clearTimeout(timer);
                timer = setTimeout(callback, time);
            };
        })();

        var show = function(nodes, key) { //dfs
            var isOpen = false;
            for (var i = 0; i < nodes.length; i++) {
                var name = nodes[i].name;

                var node = nodes[i].children && show(nodes[i].children, key);
                var leaf = !nodes[i].children && !nodes[i].isParent && name && name.toUpperCase().indexOf(key.toUpperCase()) > -1;

                if (node || leaf) {
                    isOpen = nodes[i].open = true;
                } else {
                    nodes.splice(i--, 1);
                }
            }
            return isOpen;
        }

        $(".ztree .search input").keyup(function() {
            var index = $(".ztree .search input").index(this);
            var key = $(this).val();

            delay(function() {
                var nodes = eval(JSON.stringify(TreeWidget.tNodes[index].children)); //deep copy
                if (key && TreeWidget.async) {
                    $.post(TreeWidget.setting.async.url, { index: index, keyword: key }, function(data) {
                        nodes = eval(data)

                        TreeWidget.updateNodes(nodes, index, key);
                    });
                } else {
                    if (key) {
                        show(nodes, key);
                    }
                    TreeWidget.updateNodes(nodes, index, key);
                }
            }, 555);
        });
    },
    initSearchInput: function(node, key) {
        var value = key ? "value='" + key + "' " : "";
        $("#" + node.tId + "_ul").prepend('<li class="search"><input type="text" class="level0" ' + value + ' placeholder="' + node.search + '" autocomplete="off" /></li>');
        if (key || key === "") {
            $("#" + node.tId + "_ul .search input")[0].focus();
            $("#" + node.tId + "_ul .search input").val($("#" + node.tId + "_ul .search input").val());
        }
    },
    updateNodes: function(nodes, index, key) {
        var o = TreeWidget.zTreeObj;
        var root = o.getNodes()[index];
        o.removeChildNodes(root);
        o.addNodes(root, nodes);

        TreeWidget.initSearchInput(root, key);
        TreeWidget.initSearch();
    },
    showMenu: function(treeNode, x, y) {
        if (!treeNode.rmenu) {
            return;
        }

        var setting = TreeWidget.setting;
        $("#smart_menu_box").remove();
        var menuDom =
            '<div id="smart_menu_box" class="smart_menu_box" style="display:block; left: ' + x + 'px; top: ' + y + 'px;">' +
            '    <div class="smart_menu_body">' +
            '        <ul class="smart_menu_ul">';

        var table = {
            add: "新增",
            edit: "编辑",
            remove: "删除"
        }
        for (var i in treeNode.rmenu) {
            menuDom += '<li class="smart_menu_li"><a id="smart_menu_' + treeNode.rmenu[i] + '" type="' + treeNode.rmenu[i] + '" class="smart_menu_a">' + table[treeNode.rmenu[i]] + '</a></li>';
            menuDom += '<li class="smart_menu_li_separate">&nbsp;</li>';
        }
        menuDom += '</ul>' +
            '</div>' +
            '</div>';
        $("body").append(menuDom);

        $("body").bind("mousedown", function() {
            $("#smart_menu_box").remove();
        });

        $(".smart_menu_a").bind("mousedown", function(event) {
            var type = $(this).attr("type");
            eval("TreeWidget.setting.onRmenuClick." + type + "(event, treeNode.id, treeNode.name);")
        });
    }
};
