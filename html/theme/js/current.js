$('input,textarea').not('input.ipt.form-control.gotoPageNo').bind('input propertychange change', function() {
    var inputVal = $(this).val();
    $input = $(this);
    $placeholder = $(this).siblings('.placeholder');
    if (inputVal == "") {
        $placeholder.show();
    } else {
        $placeholder.hide();
    }
});

$('.choose-phone-number input').keyup(function() {
    var c = $(this);
    if (/[^\d]/.test(c.val())) {
        var temp_amount = c.val().replace(/[^\d]/g, '');
        $(this).val(temp_amount);
    };
});

//$('input.ipt.form-control.gotoPageNo').keyup(function() {
//  var c = $(this);
//  if(/[^\d]/.test(c.val())) {
//      var temp_amount = c.val().replace(/[^\d]/g, '');
//      $(this).val(temp_amount);
//  };
//
//  if(c.val() > 35 || c.val() < 1) {
//      c.css({
//          "border-color": "#E85F5C",
//          "color": "#E85F5C"
//      });
//      $(this).parent().next('.page-tips').show();
//  } else {
//      c.css({
//          "border-color": "#24AC7E",
//          "color": "#555"
//      });
//      $(this).parent().next(".page-tips").hide();
//  };
//});

$('.goBtn').blur(function() {
    $(this).parent().next(".page-tips").hide();
});

$('.search-phoneNum').keyup(function() {
    var c = $(this);
    if (/[^\d]/.test(c.val())) {
        var temp_amount = c.val().replace(/[^\d]/g, '');
        $(this).val(temp_amount);
    };
});

$('.tree-secondary-items_search button').click(function() {
    var inputVal = $('.tree-secondary-items_search input').val();
    $('span.tree-third-items').each(function() {
        if (inputVal === $(this).text()) {
            $('span.tree-third-items').removeClass('active');
            $(this).addClass('active');
            $(this).parent('li').parent('ul').addClass('open');
        }
    });
});

$('.tree-secondary-items_search input').keydown(function(e) {
    if (e.keyCode == 13) {
        var inputVal = $('.tree-secondary-items_search input').val();
        $('span.tree-third-items').each(function() {
            if (inputVal === $(this).text()) {
                $('span.tree-third-items').removeClass('active');
                $(this).addClass('active');
                $(this).parent('li').parent('ul').addClass('open');
            }
        });
    }
});

$(function() {
    $('.date_selector').on('click', function(e) {
        e.stopPropagation();
    });

    $('.form-select-btn').click(function(e) {
        $(this).parent().toggleClass('open');
    });

    $('.form-right').on('click', '.form-select-menu li', function() {
        $(this).siblings('li').removeClass('choosed');
        $(this).addClass('choosed');
        var btnMenuChooseText = $(this).text();
        $(this).parent().siblings('button').children('p').text(btnMenuChooseText);
        $(this).parent().parent().removeClass('open');
        return false;
    });
});

$('body').click(function(e) {
    var _strategyName = $('.strategy-name'); // 设置目标区域
    if (_strategyName.hasClass('edit')) {
        // 防止点击ifarme，无法获取父窗口对象
        _strategyName = _strategyName.length > 0 ? _strategyName : parent.$('.strategy-name');
        if (!_strategyName.is(e.target) && _strategyName.has(e.target).length === 0) {
            _strategyName.removeClass('edit').attr('readonly', "readonly");
        }
    }

    var _fastNewBuilt = $('.fast-new-built'); // 设置目标区域
    // 防止点击ifarme，无法获取父窗口对象
    _fastNewBuilt = _fastNewBuilt.length > 0 ? _fastNewBuilt : parent.$('.fast-new-built');
    if (!_fastNewBuilt.is(e.target) && _fastNewBuilt.has(e.target).length === 0) {
        _fastNewBuilt.removeClass('open');
    } else {
        _fastNewBuilt.toggleClass('open');
    }
    //
    //    var _waitMeTask = $('.wait-me-task'); // 设置目标区域
    //    // 防止点击ifarme，无法获取父窗口对象
    //    _waitMeTask = _waitMeTask.length > 0 ? _waitMeTask : parent.$('.wait-me-task');
    //    if (!_waitMeTask.is(e.target) && _waitMeTask.has(e.target).length === 0) {
    //        _waitMeTask.removeClass('open');
    //    } else {
    //        _waitMeTask.toggleClass('open');
    //    }

    var _userProfile = $('.user-profile'); // 设置目标区域
    // 防止点击ifarme，无法获取父窗口对象
    _userProfile = _userProfile.length > 0 ? _userProfile : parent.$('.user-profile');
    if (!_userProfile.is(e.target) && _userProfile.has(e.target).length === 0) {
        _userProfile.removeClass('open');
    } else {
        _userProfile.toggleClass('open');
    }

    var _myCollect = $('.my-collect'); // 设置目标区域
    // 防止点击ifarme，无法获取父窗口对象
    _myCollect = _myCollect.length > 0 ? _myCollect : parent.$('.my-collect');
    if (!_myCollect.is(e.target) && _myCollect.has(e.target).length === 0) {
        _myCollect.removeClass('open');
    } else {
        _myCollect.toggleClass('open');
    }
    //
    //    var _search = $('.header_search'); // 设置目标区域
    //    // 防止点击ifarme，无法获取父窗口对象
    //    _search = _search.length > 0 ? _search : parent.$('.header_search');
    //    if (!_search.is(e.target) && _search.has(e.target).length === 0) {
    //        _search.find(".dropdown-menu").hide();
    //        _search.find("input").removeClass('focus');
    //    }

    var _formSelectMenu = $('.form-select-menu').parents(".form-right"); // 设置目标区域
    // 防止点击ifarme，无法获取父窗口对象
    _formSelectMenu = _formSelectMenu.length > 0 ? _formSelectMenu : parent.$('.form-select-menu');
    if (!_formSelectMenu.is(e.target) && _formSelectMenu.has(e.target).length === 0) {
        _formSelectMenu.removeClass('open');
    } else {
        //      $(e.target).parents('.form-items').siblings().find('.open').removeClass('open');
    }

    var _formSelectMenu1 = $('#channel-name').find(".form-right"); // 设置目标区域
    // 防止点击ifarme，无法获取父窗口对象
    _formSelectMenu1 = _formSelectMenu1.length > 0 ? _formSelectMenu1 : parent.$('#channel-name');
    if (!_formSelectMenu1.is(e.target) && _formSelectMenu1.has(e.target).length === 0) {
        _formSelectMenu1.removeClass('open');
    }

    var _formSelectMenu2 = $('#operation-name').find(".form-right"); // 设置目标区域
    // 防止点击ifarme，无法获取父窗口对象
    _formSelectMenu2 = _formSelectMenu2.length > 0 ? _formSelectMenu2 : parent.$('#operation-name');
    if (!_formSelectMenu2.is(e.target) && _formSelectMenu2.has(e.target).length === 0) {
        _formSelectMenu2.removeClass('open');
    }

    var _formSelectMenu3 = $('.form-right .special-tree').parents(".form-right"); // 设置目标区域
    // 防止点击ifarme，无法获取父窗口对象
    _formSelectMenu3 = _formSelectMenu3.length > 0 ? _formSelectMenu3 : parent.$('.special-tree');
    if (!_formSelectMenu3.is(e.target) && _formSelectMenu3.has(e.target).length === 0) {
        _formSelectMenu3.removeClass('open');
    } else {
        //      $(e.target).parents('.form-items').siblings().find('.open').removeClass('open');
    }

});

// 选择上传文件js
$('body').on('change', '.select-file', function() {
    // $('.show-path').html($(this).val());修改有多个上传input时，路径显示都只会显示一种,值会覆盖之前的
    $(this).prev().html($(this).val()); //tanggao
})

$("body").on('focus', '.Wdate', function() {
    $('.form-LocationInput').children("ul.special-tree").slideUp();
    $('.form-right').removeClass('open');
    $(".viewFramework-index-body").scroll(function() {
        if ($(window.top.document).find(".myDate97").length > 0) {
            $(window.top.document).find(".myDate97").hide();
        };
    });
});

//operationTipsTrue系列函数移至operationTips.js

function operationTipsLoading(obj) {
    if (!obj) {
        var LoadingPrimaryText = "上传中";
        var LoadingSecondaryText = "请等待上传完成";
    } else {
        var LoadingPrimaryText = obj.Ptext ? obj.Ptext : "上传中";
        var LoadingSecondaryText = obj.Stext ? obj.Stext : "请等待上传完成";
    }
    $("body").append(
        '<div class="operation-tips-bg">' +
        '<div class="operation-tips operation-tips-true loading-tips">' + '<div class="operation-tips-img">' + '<img src="img/loading.gif" width="50" height="50" />' + '</div>'

        +
        '<span class="primary-content">' + LoadingPrimaryText + '</span>' + '<span class="secondary-content">' + LoadingSecondaryText + '</span>' + '</div>' +
        '</div>'
    );
    $(window.top.document).find('.operation-tips-bg').fadeIn();
};
//function operationBtnOnclick() {
//  $('body').on('click', '.operation-tips button', function() {
//      if($(this).hasClass('TextBtn-import')) {
//          return true;
//      } else {
//          return false;
//      }
//  });
//}

$('body').on('click', '.operation-tips .icon-close,.operation-tips button', function() {
    $('body').off("click", ".TextBtn-import.confirm");
    $(this).parents('.operation-tips-bg').fadeOut(function() {
        $(this).remove();
    });
});


function loadingImg() {
    $('body').append(
        '<div class="loading">' + '<img src="img/loading.gif" />' + '<span>Loading</span>' + '</div>'
    )
}

$('input[readonly], textarea[readonly]').not('.Wdate').attr('UNSELECTABLE', 'on');
//校验时间
function checkOverTime() {
    var startTime = $(this).val();
    $(this).parent().siblings(".over-date").find("input.Wdate").attr("onfocus", "WdatePicker({onpicked:checkStartTime, minDate:'" + startTime + "',dateFmt:'HH:mm:00',skin:'twoer'})");
}

function checkStartTime() {
    var overTime = $(this).val();
    $(this).parent().siblings(".start-date").find("input.Wdate").attr("onfocus", "WdatePicker({onpicked:checkOverTime, maxDate:'" + overTime + "',dateFmt:'HH:mm:00',skin:'twoer'})");
}


//校验日期
function checkOverDate() {
    var startTime = $(this).val();
    $(this).parent().siblings(".over-date").find("input.Wdate").attr("onfocus", "WdatePicker({onpicked:checkStartDate,minDate:'" + startTime + "',dateFmt:'yyyy-MM-dd',skin:'twoer'})");
}

function checkStartDate() {
    var overTime = $(this).val();
    $(this).parent().siblings(".start-date").find("input.Wdate").attr("onfocus", "WdatePicker({onpicked:checkOverDate,maxDate:'" + overTime + "',dateFmt:'yyyy-MM-dd',skin:'twoer'})");
}

$('body').on('click', '.right-alert-closeBtn,.right-alert .ok,.right-alert .cancel,.right-alert .return,.right-alert .cancel-btn', function() {
    $('.right-alert').animate({
        marginRight: "-875px"
    }, 300).fadeOut();
    $("body").css("overflow-y", "auto");
});

//构建树形菜单
//入参：
//parentField 父节点id字段名
//idField 父节点id字段名
//generateTagA a标签生成函数
//出参：
//<ul>
//  <li><a>...</a></li>
//</ul>
//用法示例：var menu = new treeMenu(data.root).init("COST_SUB_PARENT", "COST_SUB_ID", function(a, level) {
//              return "<a data-id='" + a.COST_SUB_ID + "'>" + a.COST_SUB_NAME + '</a>'
//          })
//demo：详见cost-subject.js line 223~226
function treeMenu(a) {
    this.tree = a || [];
    this.groups = {};
};
treeMenu.prototype = {
    init: function(parentField, idField, generateTagA) {
        this.group(parentField);
        return this.getDom(this.groups[0], 1, idField, generateTagA);
    },
    group: function(parentField) {
        for (var i = 0; i < this.tree.length; i++) {
            if (!this.groups[this.tree[i][parentField]]) {
                this.groups[this.tree[i][parentField]] = [];
            }
            this.groups[this.tree[i][parentField]].push(this.tree[i]);
        }
    },
    getDom: function(a, dept, idField, generateTagA) {
        if (!a) {
            return ''
        }
        var html = '<ul>';
        for (var i = 0; i < a.length; i++) {
            html += "<li>" + generateTagA(a[i], dept);
            html += this.getDom(this.groups[a[i][idField]], dept + 1, idField, generateTagA);
            html += '</li>';
        };
        html += '</ul>';
        return html;
    }
};

var HtmlEncode = function(str) {
    var hex = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');
    var preescape = str;
    var escaped = "";
    for (var i = 0; i < preescape.length; i++) {
        var p = preescape.charAt(i);
        escaped = escaped + escapeCharx(p);
    }

    return escaped;

    function escapeCharx(original) {
        var found = true;
        var thechar = original.charCodeAt(0);
        switch (thechar) {
            case 10:
                return "<br/>";
                break; //newline
            case 32:
                return "&nbsp;";
                break; //space
            case 34:
                return "&quot;";
                break; //"
            case 38:
                return "&amp;";
                break; //&
            case 39:
                return "&#x27;";
                break; //'
            case 47:
                return "&#x2F;";
                break; // /
            case 60:
                return "&lt;";
                break; //<
            case 62:
                return "&gt;";
                break; //>
            case 198:
                return "&AElig;";
                break;
            case 193:
                return "&Aacute;";
                break;
            case 194:
                return "&Acirc;";
                break;
            case 192:
                return "&Agrave;";
                break;
            case 197:
                return "&Aring;";
                break;
            case 195:
                return "&Atilde;";
                break;
            case 196:
                return "&Auml;";
                break;
            case 199:
                return "&Ccedil;";
                break;
            case 208:
                return "&ETH;";
                break;
            case 201:
                return "&Eacute;";
                break;
            case 202:
                return "&Ecirc;";
                break;
            case 200:
                return "&Egrave;";
                break;
            case 203:
                return "&Euml;";
                break;
            case 205:
                return "&Iacute;";
                break;
            case 206:
                return "&Icirc;";
                break;
            case 204:
                return "&Igrave;";
                break;
            case 207:
                return "&Iuml;";
                break;
            case 209:
                return "&Ntilde;";
                break;
            case 211:
                return "&Oacute;";
                break;
            case 212:
                return "&Ocirc;";
                break;
            case 210:
                return "&Ograve;";
                break;
            case 216:
                return "&Oslash;";
                break;
            case 213:
                return "&Otilde;";
                break;
            case 214:
                return "&Ouml;";
                break;
            case 222:
                return "&THORN;";
                break;
            case 218:
                return "&Uacute;";
                break;
            case 219:
                return "&Ucirc;";
                break;
            case 217:
                return "&Ugrave;";
                break;
            case 220:
                return "&Uuml;";
                break;
            case 221:
                return "&Yacute;";
                break;
            case 225:
                return "&aacute;";
                break;
            case 226:
                return "&acirc;";
                break;
            case 230:
                return "&aelig;";
                break;
            case 224:
                return "&agrave;";
                break;
            case 229:
                return "&aring;";
                break;
            case 227:
                return "&atilde;";
                break;
            case 228:
                return "&auml;";
                break;
            case 231:
                return "&ccedil;";
                break;
            case 233:
                return "&eacute;";
                break;
            case 234:
                return "&ecirc;";
                break;
            case 232:
                return "&egrave;";
                break;
            case 240:
                return "&eth;";
                break;
            case 235:
                return "&euml;";
                break;
            case 237:
                return "&iacute;";
                break;
            case 238:
                return "&icirc;";
                break;
            case 236:
                return "&igrave;";
                break;
            case 239:
                return "&iuml;";
                break;
            case 241:
                return "&ntilde;";
                break;
            case 243:
                return "&oacute;";
                break;
            case 244:
                return "&ocirc;";
                break;
            case 242:
                return "&ograve;";
                break;
            case 248:
                return "&oslash;";
                break;
            case 245:
                return "&otilde;";
                break;
            case 246:
                return "&ouml;";
                break;
            case 223:
                return "&szlig;";
                break;
            case 254:
                return "&thorn;";
                break;
            case 250:
                return "&uacute;";
                break;
            case 251:
                return "&ucirc;";
                break;
            case 249:
                return "&ugrave;";
                break;
            case 252:
                return "&uuml;";
                break;
            case 253:
                return "&yacute;";
                break;
            case 255:
                return "&yuml;";
                break;
            case 162:
                return "&cent;";
                break;
            case '\r':
                break;
            default:
                found = false;
                break;
        }
        if (!found) {
            if (thechar > 127) {
                var c = thechar;
                var a4 = c % 16;
                c = Math.floor(c / 16);
                var a3 = c % 16;
                c = Math.floor(c / 16);
                var a2 = c % 16;
                c = Math.floor(c / 16);
                var a1 = c % 16;
                return "&#x" + hex[a1] + hex[a2] + hex[a3] + hex[a4] + ";";
            } else {
                return original;
            }
        }
    }
}