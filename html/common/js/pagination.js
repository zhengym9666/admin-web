/**
 * Created by yohn on 17/2/16.
 */

/**
 * 分页封装js组件
 * 要求的html代码:
 * <tfoot id="actFooot">
 * <tr>
 *     <td colspan="6">
 *         <div class="page-box pull-right">
 *             <div class="pagination-info">
 *                 共有<font class="totalCount"></font>条，每页显示<font class="limit"></font>条
 *             </div>
 *             <ul class="pagination">
 *
 *             </ul>
 *             <div class="pagination-goto">
 *                 <input type="text" class="ipt form-control gotoPageNo">
 *                 <button type="button"
 *                         class="btn btn-default goBtn">GO</button>
 *                 <input type="hidden" class="totalCount" name="totalCount" />
 *             </div>
 *             <p class="page-tips">
 *                 请输入1-<span></span>之间的有效页码
 *             </p>
 *         </div></td>
 * </tr>
 * </tfoot>
 *
 * 其中tfoot的id根据具体情况设置,需要将此id设置到方法的初始化方法中去 ,td的colspan根据具体情况设置
 *
 * 实现的功能:
 * 此封装可以实现项目中的分页,支持在同一个页面中有多个分页的情况,多个分页之间不会相互影响
 * 按照上述html代码结构不须再写GO的实现方法
 *
 * 用法:
 * 在页面中引入此js,要求在页面js之前引用
 * 在页面js中初始化Pages,入参是一个object格式如下:
 * {
 *    id: "actFooot",      //设置tfoot的id
 *    obj:$("#actFooot"),  //设置tfoot的jquery对象,设置此对象设置id无效
 *    limit: 4,            //设置一页的数据条数
 *    visiblePages: 5,     //设置页码最大数
 *    qryFunc: queryTable  //设置查询数据库的方法
 * }
 *
 * 例如:
 * var pages = new Page({id: "actFooot", limit: 4, visiblePages: 5, qryFunc: queryTable});
 *
 * 在按参数查询时需要执行 queryBySearch 方法;
 * 例如:
 *  pages.queryBySearch();
 *
 *  更新查询时方法，增加入参判断是否需要调用查询的方法，如传入true会自动调用查询方法，如不传任何值或者传入非true值不进行查询
 *
 * 在使用ajax查询时需要将分页信息传到后台
 * 例如:
 * var param = {
 * start:pages.start,
 * limit:pages.limit
 * }
 *
 * 在查询数据后调用分页的方法,以实现分页
 * 例如:
 *  pages.pages(totalCount,pages);
 *  需要注意的是totalCount是查出来的数据总数,pages是分页的对象,这里传分页的对象是为了解决分页方法中获取不到分页信息的问题
 *  2017-04-10 优化pages方法，修改为第二个入参为非必穿参数，即调用方法可以为：
 *  pages.pages(totalCount); 也可以是 pages.pages(totalCount,pages);
 *
 * 增加删除数据查询方法，提供两个一个是删除一行一个是删除多行，用法如下：
 * 1）删除一行数据
 *    在进行完删除的业务代码后调用deleteOneRowQuery方法
 * 2）删除多行数据
 *    在进行完删除的业务代码后调用deleteRowsQuery方法，传入删除的行数
 * @param id
 * @param limit
 * @param visiblePages
 * @param qryFunc
 * @constructor
 */

function Page(option) {

    var options = typeof option === 'object' ? option : {};

    this.start = 1; //开始查询的索引
    this.limit = 10; //一页展示条数
    this.currentPage = 1; //显示的当前页
    this.currentPageSize = 0; //当前页的数据条数
    this.place = "";
    this.clickTag = "";
    this.totalpage = 0;
    this.totalCount = 0;
    this.visiblePages = 5;
    this.qryFunc = options.qryFunc;
    this.id = options.id;
    this.footObj = {};

    if (options.obj === undefined || options.obj === null) {
        this.footObj = $("#" + this.id);
    } else {
        this.footObj = options.obj;
    }


    if (options.limit !== undefined && options.limit !== null) {
        this.limit = options.limit;
    }

    if (options.visiblePages !== null && options.visiblePages !== undefined) {
        this.visiblePages = options.visiblePages;
    }

    this.setVisiblePages = function(visiblePages) {
        this.visiblePages = visiblePages;
    };

    this.setStart = function(start) {
        this.start = start;
    };

    this.setLimit = function(limit) {
        this.limit = limit;
    };

    this.setCurrentPage = function(current) {
        this.currentPage = currrent;
    };

    this.setPlace = function(place) {
        this.place = place;
    };

    this.setClickTag = function(clickTag) {
        this.clickTag = clickTag;
    };

    this.setTotalpage = function(totalpage) {
        this.totalpage = totalpage;
    };

    this.setTotalCount = function(totalCount) {
        this.totalCount = totalCount;
    };

    var thisBtnObj = this;

    //给翻页GO绑定方法
    this.footObj.on("click", ".goBtn", function() {
        var page = thisBtnObj.footObj.find('.pagination-goto .gotoPageNo').val();
        //在此加上对于输入的校验
        if (!/^\d+$/.test(page) || page <= 0 || page > thisBtnObj.totalpage) {
            thisBtnObj.footObj.find('.page-tips span').html(thisBtnObj.totalpage);
            thisBtnObj.footObj.find('.page-tips').show();
            thisBtnObj.footObj.find('.page-tips').css("display", "block");
            return;
        }
        thisBtnObj.currentPage = parseInt(page);
        thisBtnObj.footObj.find('.page-tips').hide();
        thisBtnObj.start = (page - 1) * thisBtnObj.limit + 1;
        thisBtnObj.clickTag = "";
        thisBtnObj.qryFunc.call(thisBtnObj.qryFunc.caller);
    });

}

/**
 * 点击查询按钮查询
 * @param  {Boolean} isQuery [为了兼容之前的代码，这里要求传入是否调用查询方法的标识]
 * @return {[type]}          [description]
 */
Page.prototype.queryBySearch = function(isQuery) {
    this.start = 1;
    this.currentPage = 1;
    this.clickTag = "";
    if (isQuery !== undefined && isQuery === true) {
        this.qryFunc.call(this.qryFunc.caller);
    }
};


/**
 * 进行分页,这里不传分页的对象会出现点击事件中无法获取分页信息的问题
 * @param totalCount  总数据量
 * @param thisObj  分页的对象
 */
Page.prototype.pages = function(totalCount, thisObj) {
    if (thisObj === null || thisObj === undefined) {
        thisObj = this;
    }
    if ((typeof totalCount == 'string') && totalCount.constructor == String) {
        totalCount = parseInt(totalCount);
    }
    thisObj.totalCount = totalCount;
    thisObj.footObj.find(".pagination-info .totalCount").text(thisObj.totalCount);
    thisObj.footObj.find(".pagination-info .limit").text(thisObj.limit);
    thisObj.footObj.find(".pagination-goto input").val("");

    thisObj.totalpage = Math.ceil(thisObj.totalCount / thisObj.limit);
    thisObj.currentPageSize = Math.ceil(thisObj.totalCount % thisObj.limit);
    if (thisObj.totalpage === 0) {
        thisObj.totalpage = 1;
    }

    thisObj.place = "end";
    if (thisObj.clickTag != "onclick") {
        var $page = thisObj.footObj.find(".pagination");
        //下面三行代码是解决分页不刷行的bug
        $page.empty(); // 移除pagination
        $page.removeData("twbs-pagination"); // 移除导入的数据
        $page.unbind("page"); //移除事件处理器
    } else {
        thisObj.clickTag = "";
        thisObj.place = "";
    }

    var total = thisObj.totalpage;
    var visible = thisObj.visiblePages;
    var current = thisObj.currentPage;

    thisObj.footObj.find(".pagination").twbsPagination({
        totalPages: total,
        visiblePages: visible,
        startPage: current,

        onPageClick: function(event, page) {
            if (thisObj.place == "end") {
                thisObj.place = "";
                return;
            }

            thisObj.start = (page - 1) * thisObj.limit + 1;
            thisObj.currentPage = page;
            thisObj.qryFunc.call(thisObj.qryFunc.caller);
            thisObj.clickTag = "onclick";
        }
    });
};

/**
 * 删除一行进行查询
 * @param  {Page} thisObj [当前分页的对象（即分页对象本身）]
 * @return {null}          [description]
 */
Page.prototype.deleteOneRowQuery = function() {
    this.deleteRowsQuery(1);
};

/**
 * 删除多行进行查询
 * @param  {int}  rows    [删除的行数]
 * @param  {Page} thisObj [当前分页的对象（即分页对象本身）]
 * @return {null}          [description]
 */
Page.prototype.deleteRowsQuery = function(rows) {
    if ((this.currentPageSize - rows) <= 0 && this.currentPage > 1) {
        this.currentPage = this.currentPage - 1;
        this.start = this.start - this.limit;
    }
    this.qryFunc.call(this.qryFunc.caller);
};

