/*******************************************************************************
 * jquery.method.js插件
 * @version 1.0.3
 * author ice(古雨)(QQ:494174519,phone:13728989948)
 * @site 暂无
 ******************************************************************************/

/**PROTOTYPE区域(库引用区,在这里设置了就可以全局引用)********************************************************************************/

// 构造replaceAll函数使得其他地方可以直接引用(String.prototype加上的意思是可以str.replaceAll(par1,par2)这两调用)
String.prototype.replaceAll = function(s1,s2){
    var r = new RegExp(s1.replace(/([\(\)\[\]\{\}\^\$\+\-\*\?\.\"\'\|\/\\])/g,"\\$1"),"ig");
    return this.replace(r,s2);
}

String.prototype.startWith=function(str){
    var reg = new RegExp("^"+str);
    return reg.test(this);
}

String.prototype.endWith=function(str){
    var reg = new RegExp(str+"$");
    return reg.test(this);
}

/**常用操作区***********************************************************************************************************************/

// 弹出功能未开放
function alertPauseJsGn(){
	alert("对不起该功能暂未开放!");
}

// 停用JS功能,并返回false
function pauseJsGn(){
	alertPauseJsGn();
	return false;
}

// 是否停用JS功能
function isJsPause(){
	var isPause = true;
	if(isPause){
		alertPauseJsGn();
	}
	return isPause;
}

// 弹出返回消息
function alertMessageContent(){
	var mMessageContent = $("#mMessageContent").val();
	if(!reg_NULL(mMessageContent)){
		alert(mMessageContent);
	}
}

// 判断值是否为空
function isBlank(value){
	if(value==undefined||!value){
		return true;
	}
	if($.trim(value)==""){
		return true;
	}
	return false;
}

// 是否确认删除
function isConfirmSc(){
	if(confirm("确定删除?")){
		return true;
	}
	return false;
}

// 是否确认批量删除
function isConfirmPlsc(){
	if(confirm("确定批量删除?")){
		return true;
	}
	return false;
}

// 是否确认撤单
function isConfirmCd(){
	if(confirm("确定撤单?")){
		return true;
	}
	return false;
}

// 判断控件是否存在
function isKjExsit(id){
	if($("#"+id).length==0){
		return false;
	}
	return true;
}

// 判断控件是否存在,若不存在就弹出消息
function isKjExsitIfNotDoAlert(id){
	if(!isKjExsit(id)){
		alert(id + "控件不存在");
		return false;
	}
	return true;
}

// 判断控件是否含有TEXT内容
function isKjHasText(id){
	var text = $.trim($("#"+id).text());
	if(text != ""){
		return true;
	}
	return false;
}

// 判断控件是否含有TEXT内容,若有内容就弹出该内容
function isKjHasTextAndAlert(id){
	if(isKjHasText(id)){
		alert(text);
		return true;
	}
	return false;
}

// 获取根路径
function getRootPath(){
    var strFullPath=window.document.location.href;
    var strPath=window.document.location.pathname;
    var pos=strFullPath.indexOf(strPath);
    var prePath=strFullPath.substring(0,pos);
    var postPath=strPath.substring(0,strPath.substr(1).indexOf('/')+1);
    return(prePath+postPath);
}

// 获取安全Float
function getSafeFloat(number){
	if(isNaN(parseFloat(number))){
		return 0;
	}
	return number;
}

// 显示时间
function getTime() {
	var d = new Date();
	var arr = new Array();
	arr[0] = "星期天";
	arr[1] = "星期一";
	arr[2] = "星期二";
	arr[3] = "星期三";
	arr[4] = "星期四";
	arr[5] = "星期五";
	arr[6] = "星期六";
	var h = d.getHours();
	var m = d.getMinutes();
	var s = d.getSeconds();
	if (h.toString().length < 2) {
		h = "0" + h;
	}
	if (m.toString().length < 2) {
		m = "0" + m;
	}
	if (s.toString().length < 2) {
		s = "0" + s;
	}
	var str = d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日" + "  " + h + ":" + m + ":" + s + "  " + arr[d.getDay()] + "  ";
	return str;
}

// 获得页面(PAGE)滚动条位置
function getPageScroll() {
	var x, y;
	if (window.pageYOffset) {
		y = window.pageYOffset;
		x = window.pageXOffset;
	} else if (document.documentElement && document.documentElement.scrollTop) {
		y = document.documentElement.scrollTop;
		x = document.documentElement.scrollLeft;
	} else if (document.body) {
		y = document.body.scrollTop;
		x = document.body.scrollLeft;
	}
	return {
		L : x,
		T : y
	};
}

// 获得Hidden指定ID的值
function getHiddenValue(id) {
	return $("#[id='"+id+"']:hidden").val();
}

// 获得Visible指定ID的值
function getVisibleValue(id) {
	return $("#[id='"+id+"']:visible").val();
}

// 获得Hidden指定ID的对象
function getHiddenObj(id) {
	return $("#[id='"+id+"']:hidden");
}

// 获得Visible指定ID的对象
function getVisibleObj(id) {
	return $("#[id='"+id+"']:visible");
}

// 根据ID获取Objs
function getObjsById(id) {
	return $("#[id='"+id+"']");
}

// 删除最后一个元素
function subLast(str,rep) {
	if(str.endWith(rep)!=-1){
		str=str.substr(0,str.lastIndexOf(rep));
    }
	return str;
}

// 删除最后一个元素(最后一个元素是逗号)
function subLastByDH(str) {
	return subLast(str,",");
}

// 匹配空格按逗号分组
function split(v) {
    return v.split(/,\s*/);
}

// 绑定显示隐藏边栏(sideBarControllTd:边栏控制ID,sideBarId:边栏ID,imgBackgroundPositionByVisble:显示时图片背景坐标,imgBackgroundPositionByHidden:隐藏时图片背景坐标)
function bindShowHideSideBar(sideBarControllTd, sideBarId, imgBackgroundPositionByVisble, imgBackgroundPositionByHidden){
 $("#"+sideBarControllTd).bind("click", function(event) {
   var isLeftTdVisible = $("#"+sideBarId).is(":visible");
   if(isLeftTdVisible) {
     $("#"+sideBarId).hide();
     $("#"+sideBarControllTd).css("background-position", imgBackgroundPositionByHidden);
   } else {
     $("#"+sideBarId).fadeIn();
     $("#"+sideBarControllTd).css("background-position", imgBackgroundPositionByVisble);
   }
 });
}

// 获取指定字符串在源字符串中出现的次数
function getStrCxCs(yStr,targetStr){
	var yStrLen = yStr.length;
	var targetStrLen = targetStr.length;
	if(targetStrLen>0&&yStrLen>targetStrLen){
		return (yStrLen - yStr.replaceAll(targetStr,"").length) / targetStrLen;
	}
	return 0;
}

// 获取从左剪断指定次后的字符串(yStr:源字符串,targetStr:指定字符串,n:次数)
function subStrByTimes(yStr,targetStr,n){
	var temp = yStr;
	for(var i=0;i<n;i++) {
	  	temp = temp.substr(temp.indexOf(targetStr)+1,temp.length);
	}
	return temp;
}

// 获取从左剪断指定次后返回指定字符串+剪断后的字符串(yStr:源字符串,targetStr:指定字符串,n:次数)
function subStrByTimesToAddTargetAndSubStr(yStr,targetStr,n){
	var temp = yStr;
	for(var i=0;i<n;i++) {
	  	temp = temp.substr(temp.indexOf(targetStr)+1,temp.length);
	}
	return targetStr+temp;
}

// 依照split将最后一个元素取出
function extractLast(term) {
	if($.trim(term)==""){
        return;
    }
    return split(term).pop();
}

// 比较两个数的大小(后者大返回true,前者大返回false)
function compareHZD(value1,value2){
	if(value2>value1){
		return true;
	}else{
		return false;
	}
}

// alert后select和focus
function alertSelectFocus(id,alertMessage){
	alert(alertMessage);
	select_focus(id);
}

// alert后select和focus
function alertSelectFocusByOBJ(obj,alertMessage){
	alert(alertMessage);
	select_focusByOBJ(obj);
}

// select和focus
function select_focus(id){
	if(id!=""){
		$("#"+id).select();
		$("#"+id).focus();
	}
}

// select和focus
function select_focusByOBJ(obj){
	$(obj).select();
	$(obj).focus();
}

// 兼容IE6的Location.href(若为a标签,在a的href属性中设置为###也可兼容)
function startLocationHref(url){
	location.href=url;// 将当前页面改变
	return false;
}

// 兼容IE6的submit
function startSubmit(formId){
	$("#"+formId).submit();
   	return false;
}

// 兼容IE6的submit(包含设置Action)
function startSubmitBySetAction(formId,action){
	$("#"+formId).attr("action",action);
	$("#"+formId).submit();
	return false;
}

// 为表单设置需要提交的元素们
function prepareElementsForFormSubmitByDPH(formId,hiddenId,visibleId){
	$("#[id='"+hiddenId+"']:hidden").remove();// 删除隐藏的表单DIV
	$("#[id='"+visibleId+"']:visible").prependTo($("#"+formId)).hide();// 添加表单到form下,并隐藏
}

// 弹出一个新页面(urlSection:如:/jsp/test/test.jsp)
function startOpenUrl(urlSection){
	var url = "";
	if(!urlSection.startWith("http://")){
		url = $("#path").val() + urlSection;
	}else{
		url = urlSection;
	}
	window.open(url);
}

// 判断浏览器是否火狐
function isHuoHu(){
	return navigator.userAgent.indexOf("Firefox")!=-1;
}

// 判断浏览器是否IE6
function isIe6(){
	if($.browser.msie){
		if($.browser.version=="6.0"){
			return true;
		}
	}
	return false;
}

// 清除artDialogList
// 依赖:1:jquery.artDialog.js
function clearArtDialogList(){
 var list = art.dialog.list;
  for (var i in list) {
    list[i].close();
  };
}

/**TEXT相关操作区*********************************************************************************************************************************************/

// 通用自动增长的TEXT(最大宽度为300)
// 依赖:1:jquery.autoGrowInput.js
function textAutoGrow(ys){
	$(ys).autoGrowInput({
		maxWidth: 300
	});
}

// 通用自动增长的TEXT(最大宽度为指定长度)
// 依赖:1:jquery.autoGrowInput.js
function textAutoGrowWithMaxWidth(id,maxWidth){
	$("#"+id).autoGrowInput({
		maxWidth: maxWidth
	});
}
	
// 字数限制处理(TEXT)
function textLimit(obj,showId, maxLength) {
	if (obj.value.length > maxLength) {
		alert("已达到" + maxLength + "个字符超出的将自动去除!");
		obj.value = obj.value.substring(0, maxLength);
		obj.focus();
		return;
	}
	$("#"+showId).text(maxLength - obj.value.length);
}

/**TEXTAREA相关操作区****************************************************************************************************************************************/

// 通用自动增长的TEXTAREA
function textAreaAutoGrow(id){
	$("textarea#"+id).autoResize({
		// On resize:
		onResize : function() {
		$(this).css({opacity:1});
		},
		// After resize:
		animateCallback : function() {
			$(this).css({opacity:1});
		},
		// Quite slow animation:
		animateDuration : 300,
		// More extra space:
		extraSpace : 20
	});
}

// 字数限制处理(TEXTAREA)
function textLimitKindEditor(obj, showId, maxLength) {
	var text=obj.text();
	if (text.length > maxLength) {
		obj.text(text.substring(0, maxLength));
		obj.appendHtml("");
	}
	var sub = maxLength - text.length;
	if(sub<0){
		$("#"+showId).html(main.m_wordLimit+"<strong>"+maxLength+"!</strong>");
	}else{
		$("#"+showId).text(maxLength - text.length);
	}
}

/**CHECKBOX相关操作区*****************************************************************************************************************************************/

// 点选Customer checkBox
function clickCustomerCheckBox(id) {
	$("#"+id).click();
	$("#"+id).trigger("updateState");
}

// 全选选中与取消
function checkbox_qx(ck_quanxuan, ck_single) {
	var cu = $("input[name='" + ck_quanxuan + "']")[0];
	checkbox_select_all_cancel(ck_single);
	if (cu.checked) {
		checkbox_select_all(ck_single);
	}else{
		checkbox_select_all_cancel(ck_single);
	}
	$('input[type=checkbox]').trigger("updateState");
}

// 全部选中
function checkbox_select_all(ck_single) {
	$("input[name='" + ck_single + "']").each(function() {
		$(this).get(0).defaultChecked=true;
		$(this).attr("checked", true);
	});
}

// 取消选中
function checkbox_select_all_cancel(ck_single) {
	$("input[name='" + ck_single + "']").each(function() {
		$(this).get(0).defaultChecked=false;
		$(this).attr("checked", false);
	});
}

// 反选
function checkbox_select_all_reverse(ck_single) {
	$("input[name='" + ck_single + "']").each(function() {
		$(this).get(0).defaultChecked=!this.checked;
		$(this).attr("checked", !this.checked);
	});
}

/**DIV相关操作区*****************************************************************************************************************************/

// 隐藏或显示By加号减号(imgID为加号减号图片ID,kjID为显示隐藏的控件(如DIV,TR)的ID,a为加号image的全路径,b为减号image的全路径)
function divShowAndHideByJjh(imgID,kjID,a,b){
	// 检查显示控件ID是否不存在
	if($("#"+kjID).length==0){
		alert("对不起,元素:"+kjID+"不存在");
		return;
	}
	var kj = $("#"+kjID);
	if(kj[0].style.display=="none"){
		$("#"+kjID).fadeIn("fast");
		$("#"+imgID)[0].src=b;
    }else{
    	$("#"+kjID).fadeOut("fast");
    	$("#"+imgID)[0].src=a;
    }
}

// 绑定Ajax提交loading图(divID图片显示到的divID)
function ajaxLoading(divID){
  var left = $("#"+divID).width()/2;
  var top = $("#"+divID).height()/2;
  // 用OFFSET定位时不加PX,用获取宽度和高度定位时可以加PX
  $("#"+divID).append("<img id='loadingImage' style='position:absolute;top:"+top+"px;left:"+left+"px;' src='"+$("#path").val()+"/images/wrap/icon/icon_g_005.gif' />");
}

// 绑定Ajax提交loading完成
function ajaxLoadingOver(divID){
	$("#loadingImage", $("#"+divID)).remove();
}

/**TABLE相关操作区*****************************************************************************************************************************************/

// table隔行换色:"o表格id","a奇数行背景","b偶数行背景","c鼠标经过背景","d点击后背景"
function tableChangeColor(o, a, b, c, d) {
	if (!document.getElementById(o)) {
		return;
	}
	var tr = document.getElementById(o).getElementsByTagName("tr");
	for ( var i = 1; i < tr.length; i++) {
		tr[i].style.backgroundColor = (tr[i].sectionRowIndex % 2 == 0) ? a : b;
		tr[i].onclick = function() {
			if (this.x != "1") {
				this.style.backgroundColor = d;
				this.x = "1";
			} else {
				this.style.backgroundColor = (this.sectionRowIndex % 2 == 0) ? a : b;
				this.x = "0";
			}
		}
		tr[i].onmouseover = function() {
			if (this.x != "1") {
				this.style.backgroundColor = c;
			}
		}
		tr[i].onmouseout = function() {
			if (this.x != "1") {
				this.style.backgroundColor = (this.sectionRowIndex % 2 == 0) ? a : b;
			}
		}
	}
}

// table隔行换色:"o表格id","a奇数行背景","b偶数行背景","c鼠标经过背景"(不显示点击后的颜色)
function tableChangeColor(o, a, b, c) {
	if (!document.getElementById(o)) {
		return;
	}
	var tr = document.getElementById(o).getElementsByTagName("tr");
	for ( var i = 1; i < tr.length; i++) {
		tr[i].style.backgroundColor = (tr[i].sectionRowIndex % 2 == 0) ? a : b;
		tr[i].onmouseover = function() {
			if (this.x != "1") {
				this.style.backgroundColor = c;
			}
		}
		tr[i].onmouseout = function() {
			if (this.x != "1") {
				this.style.backgroundColor = (this.sectionRowIndex % 2 == 0) ? a : b;
			}
		}
	}
}

// 将一个table转化为jquery的dataTable(需指定table的<tbody>或<thead>或<tfoot>元素)
function tableToJqueryDataTable(id) {
	$("#"+id).dataTable({
		"bPaginate": false, // 是否显示分页器  
		"bInfo": false, // 是否显示表格的一些信息
		"bFilter": false, // 是否启用客户端过滤器(即本table搜索)
		"bSort": true, // 是否启用各列具有按列排序的功能
		"oLanguage": {"sUrl": $("#path").val()+"/txt/i18n/jquery.dataTables/jquery.dataTables.zh_CN.txt"}
	});
}

// 将一个table转化为jquery的dataTable(需指定table的<tbody>或<thead>或<tfoot>元素)(不按内容排序)
function tableToJqueryDataTableNoSort(id) {
	$("#"+id).dataTable({
		"bPaginate": false, // 是否显示分页器  
		"bInfo": false, // 是否显示表格的一些信息
		"bFilter": false, // 是否启用客户端过滤器(即本table搜索)
		"bSort": false, // 是否启用各列具有按列排序的功能
		"oLanguage": {"sUrl": $("#path").val()+"/txt/i18n/jquery.dataTables/jquery.dataTables.zh_CN.txt"}
	});
}

// 根据指定开头ID的每一个元素重设该元素和对应展开的内容的一对ID
function setAddSubIds(idStart,idContent){
	$("#[id^='"+idStart+"']").each(function(index) {
		var addSubTr = $(this).parentsUntil("tr").parent("tr");
		var addSubTrNext = addSubTr.next();
		$(this).attr("id",idStart+(index+1));
		$(addSubTrNext).attr("id",idContent+(index+1));
	});
}
/**FROM相关操作区****************************************************************************************************************************************/

// 绑定FORM提交loading图(formID表单ID,divID图片显示到的divID)
function formLoading(formID,divID){
 $("#"+formID).submit(function(){
	  var left=$("#"+divID).width()/2;
	  var top=$("#"+divID).height()/2;
	  // 用offset定位时不加PX,用获取宽度和高度定位时可以加PX
	  $("#"+divID).append("<img id='loadingImage' style='position:absolute;top:"+top+"px;left:"+left+"px;' src='"+$("#path").val()+"/images/wrap/icon/icon_g_005.gif' />");
  });
}

/**TAB相关操作区************************************************************************************************************************************************/

// 切换TAB
function tabChange(obj, className) {
	var id = "";
	if (typeof obj == "string") {
		id = obj;
	} else if (typeof obj == "object") {
		id = obj.id;
	}
	var left = id.substr(0, id.indexOf("_"));
	var right = id.substr(id.indexOf("_") + 1, id.length);
	$("li[id^='" + left + "']").attr("class", "no" + className);
	$("div[id^='c" + left + "']").css("display", "none");
	$("#" + id).attr("class", className);
	$("#" + "c" + id).css("display", "block");
}

// 切换TAB支持10个TAB
function tabChangeCur(index){
	for(var i=0;i<10;i++){
		if($("#"+"cur"+i)[0]){
		    $("#"+"c_cur"+i).css("display","none");
		    $("#"+"cur"+i)[0].className="no_cur";
		}
	}
	$("#"+"c_cur"+index).css("display","block");
	$("#"+"cur"+index)[0].className="cur";
}

/**CIRLCE循环验证区***************************************************************************************************************************************/

// 循环执行验证任务(传来必须是JSON格式数据)
// 参数说明:第一个参数map为JSON格式数据包
// 第二个参数(隐式)为是否为弹出模式
function circle(map) {
 var id = "";// 空间ID
 var EC = "";// 元素名称(alert前置信息)
 var flag = true;// 出错监控标记
 var message = "";// 主alert弹出信息(又是alert后置信息)
 var valueKJ = "";// 控件值
 var isAlert = arguments[1];// 判断是否为弹出模式
 // 开始循环检查
 $.each(map, function(key,value) {
	  // 当出现一个元素不正确的时候返回
	  if(!flag){
		  return flag;
	  }
	  id = key;// 控件ID(左端字符串)
	  // 若没有该控件
	  if($("#"+id).length==0){
		  return;// jquery的each函数中不能使用continue功能,用return替代continue
	  }
	  $(value).each(function() {
	   message = $(this)[0].alert;
	   EC = $("#"+id+"_circle").text();// 该元素值为前置显示信息可以不设定,若需设定就在控件id名后加_circle然后加到相应前置输出信息控件上
	   // 如果传来的id元素有多个就对这些元素一一判断
	   var elements=$("#[id='"+id+"']");
	   var elements_circle=$("#[id='"+id+"_circle']");
	   if(elements.length>1) {
		    for(var j=0;j<elements.length;j++){
			     if(elements_circle.length==elements.length){
			    	 EC = $($(elements_circle)[j]).text();
			     }
			     valueKJ=$.trim($(elements[j]).val()).replaceAll("\n","");
			     if(flag&&!(eval($(this)[0].method+ "('"+valueKJ+"')"))){
				      flag = false;// 通过flag来中断对下一个元素的判断
				      if(isAlert==undefined||isAlert==true){
				    	  alert(EC+message);
				      }
				      select_focusByOBJ(elements[j]);
			     }
		    }
	   }
	   else {
			valueKJ=$.trim($("#"+id).val()).replaceAll("\n","");
			if(flag&&!(eval($(this)[0].method+ "('"+valueKJ+"')"))){
			     flag = false;// 通过flag来中断对下一个元素的判断
			     if(isAlert==undefined||isAlert==true){
			    	 alert(EC+message); 
			     }
			     select_focus(id);
		    }
	   }
	  });
 });
 return flag;
}

// 循环执行验证任务(不检查隐藏元素)
// 参数说明:第一个参数map为JSON格式数据包
// 第二个参数(隐式)为是否为弹出模式
function circleWithOutHidden(map) {
	var id = "";// 空间ID
	var EC = "";// 元素名称(alert前置信息)
	var flag = true;// 出错监控标记
	var message = "";// 主alert弹出信息(又是alert后置信息)
	var valueKJ = "";// 控件值
	var isAlert = arguments[1];// 判断是否为弹出模式
	// 开始循环检查
	$.each(map, function(key,value) {
		// 当出现一个元素不正确的时候返回
		if(!flag){
			return flag;
		}
		id = key;// 控件ID(左端字符串)
		// 若没有该控件
		if($("#"+id).length==0){
			return;// jquery的each函数中不能使用continue功能,用return替代continue
		}
		$(value).each(function() {
			message = $(this)[0].alert;
			EC = $("#"+id+"_circle").text();// 该元素值为前置显示信息可以不设定,若需设定就在控件id名后加_circle然后加到相应前置输出信息控件上
			// 如果传来的id元素有多个就对这些元素一一判断
			var elements=$("#[id='"+id+"']");
			var elements_circle=$("#[id='"+id+"_circle']");
			if(elements.length>1) {
				for(var j=0;j<elements.length;j++){
					if(!$(elements[j]).is(":hidden")){
						if(elements_circle.length==elements.length){
							EC = $($(elements_circle)[j]).text();
						}
						valueKJ=$.trim($(elements[j]).val()).replaceAll("\n","");
						if(flag&&!(eval($(this)[0].method+ "('"+valueKJ+"')"))){
							flag = false;// 通过flag来中断对下一个元素的判断
							if(isAlert==undefined||isAlert==true){
								alert(EC+message);
							}
							select_focusByOBJ(elements[j]);
						}
					}
				}
			}
			else {
				if(!$("#"+id).is(":hidden")){
					valueKJ=$.trim($("#"+id).val()).replaceAll("\n","");
					if(flag&&!(eval($(this)[0].method+ "('"+valueKJ+"')"))){
						flag = false;// 通过flag来中断对下一个元素的判断
						if(isAlert==undefined||isAlert==true){
							alert(EC+message); 
						}
						select_focus(id);
					}
				}
			}
		});
	});
	return flag;
}

//循环执行验证任务(显示Txt形式)
//参数说明:第一个参数map为JSON格式数据包
//第二个参数(隐式)为是否为弹出模式
function circleErrorShow(map) {
	var id = "";// 空间ID
	var EC = "";// 元素名称(alert前置信息)
	var flag = true;// 出错监控标记
	var message = "";// 主alert弹出信息(又是alert后置信息)
	var valueKJ = "";// 控件值
	var isAlert = arguments[1];// 判断是否为弹出模式
	$.each(map, function(key,value) {
		// 当出现一个元素不正确的时候返回
		if(!flag){
			return;
		}
		id = key;// 控件ID(左端字符串)
		// 若没有该控件
	    if($("#"+id).length==0){
		    return;
		}
		$(value).each(function() {
			message = $(this)[0].alert;
			EC = $("#"+id+"_circle").text();// 该元素值为前置显示信息可以不设定,若需设定就在控件id名后加_circle然后加到相应前置输出信息控件上
			// 如果传来的id元素有多个就对这些元素一一判断
			var elements = $("#[id='"+id+"']");
			var elements_circle = $("#[id='"+id+"_circle']");
			if(elements.length>1){
				for(var j=0;j<elements.length;j++){
					if(elements_circle.length==elements.length){
						EC=$($(elements_circle)[j]).text();
					}
					valueKJ = $.trim($(elements[j]).val()).replaceAll("\n","");
					if(flag){
						if(!(eval($(this)[0].method+ "('"+valueKJ+"')"))){
							flag = false;// 通过flag来中断对下一个元素的判断
							select_focusByOBJ(elements[j]);
							if(isAlert==undefined||isAlert==true){
								// 判断控件是否存在
								if(!isKjExsitIfNotDoAlert(id+"ErrorShowSpan")){
									return false;
								}
								$("#"+id+"ErrorShowSpan").text(EC+message);
							}
						}else{
							$("#"+id+"ErrorShowSpan").text("");
						}
					}
				}
			}else{
				valueKJ = $.trim($("#"+id).val()).replaceAll("\n","");
				if(flag){
					if(!(eval($(this)[0].method+ "('"+valueKJ+"')"))){
						flag=false;// 通过flag来中断对下一个元素的判断
						select_focus(id);
						if(isAlert==undefined||isAlert==true){
							// 判断控件是否存在
							if(!isKjExsitIfNotDoAlert(id+"ErrorShowSpan")){
								return false;
							}
							$("#"+id+"ErrorShowSpan").text(EC+message);
						}
					}else{
						$("#"+id+"ErrorShowSpan").text("");
					}
				}
			}
		});
	});
	return flag;
}

// 循环执行验证任务(添加class形式)
// 参数说明:第一个参数map为JSON格式数据包
// 第二个参数(隐式)为是否为弹出模式
function circleAddClass(map) {
	var id = "";// 空间ID
	var EC = "";// 元素名称(alert前置信息)
	var flag = true;// 出错监控标记
	var message = "";// 主alert弹出信息(又是alert后置信息)
	var valueKJ = "";// 控件值
	var isAlert = arguments[1];// 判断是否为弹出模式
	$.each(map, function(key,value) {
		// 当出现一个元素不正确的时候返回
		if(!flag){
			return flag;
		}
		id = key;// 控件ID(左端字符串)
		// 若没有该控件
	    if($("#"+id).length==0){
		    return;
		}
		$(value).each(function() {
			message = $(this)[0].alert;
			EC = $("#"+id+"_circle").text();// 该元素值为前置显示信息可以不设定,若需设定就在控件id名后加_circle然后加到相应前置输出信息控件上
			// 如果传来的id元素有多个就对这些元素一一判断
			var elements=$("#[id='"+id+"']");
			var elements_circle=$("#[id='"+id+"_circle']");
			if(elements.length>1){
				for(var j=0;j<elements.length;j++){
					if(elements_circle.length==elements.length){
						EC=$($(elements_circle)[j]).text();
					}
					valueKJ = $.trim($(elements[j]).val()).replaceAll("\n","");
					if(flag){
						if(!(eval($(this)[0].method+ "('"+valueKJ+"')"))){
							flag = false;// 通过flag来中断对下一个元素的判断
							select_focusByOBJ(elements[j]);
							// 判断是否需要弹出消息
							if(isAlert==undefined||isAlert==true){
								alert(EC+message);
							}
							// 判断控件是否存在
							if(!isKjExsitIfNotDoAlert(id+"ErrorShowSpan")){
								return false;
							}
							var errorShowSpanClass = $(this)[0].errorShowSpanClass;// 出错span的Class
							// 判断是否有指定出错span的Class
							if(errorShowSpanClass==undefined){
								errorShowSpanClass = "errorShowSpanStyle";
							}
							$("#"+id+"ErrorShowSpan").removeClass(successShowSpanClass).addClass(errorShowSpanClass).text(EC+message);
						}else{
							var successShowSpanClass = $(this)[0].successShowSpanClass;// 验证通过的span的Class
							// 判断是否有指定验证通过的span的Class
							if(successShowSpanClass==undefined){
								successShowSpanClass = "successShowSpanStyle";
							}
							$("#"+id+"ErrorShowSpan").removeClass(errorShowSpanClass).addClass(successShowSpanClass).text("");
						}
					}
				}
			}else{
				valueKJ = $.trim($("#"+id).val()).replaceAll("\n","");
				if(flag){
					if(!(eval($(this)[0].method+ "('"+valueKJ+"')"))){
						flag = false;// 通过flag来中断对下一个元素的判断
						select_focus(id);
						// 判断是否需要弹出消息
						if(isAlert==undefined||isAlert==true){
							alert(EC+message);
						}
						// 判断控件是否存在
						if(!isKjExsitIfNotDoAlert(id+"ErrorShowSpan")){
							return false;
						}
						var errorShowSpanClass = $(this)[0].errorShowSpanClass;// 出错span的Class
						// 判断是否有指定出错span的Class
						if(errorShowSpanClass==undefined){
							errorShowSpanClass = "errorShowSpanStyle";
						}
						$("#"+id+"ErrorShowSpan").removeClass(successShowSpanClass).addClass(errorShowSpanClass).text(EC+message);
					}else{
						var successShowSpanClass = $(this)[0].successShowSpanClass;// 验证通过的span的Class
						// 判断是否有指定验证通过的span的Class
						if(successShowSpanClass==undefined){
							successShowSpanClass = "successShowSpanStyle";
						}
						$("#"+id+"ErrorShowSpan").removeClass(errorShowSpanClass).addClass(successShowSpanClass).text("");
					}
				}
			}
		});
	});
	return flag;
}

/**分页相关*********************************************************************************************************************************************/

// 是否为多级分页模式
function isSplitPageByMuti(){
 var splitIsMuti = $("#splitIsMuti").val();
 if(splitIsMuti=="true"){
	 return true;
 }
 return false;
}

// 分页层级减一
function subOneByPageLevel(){
   if(isSplitPageByMuti()){
	 if(isKjExsitIfNotDoAlert("submitType")){
		 $("#submitType").val("goBack");
		 var pageLevel = $("#pageLevel").val()*1;
		 $("#[id='pageLevel']").val(pageLevel-1);
	 }
   }
}

// 分页层级增一
function addOneByPageLevel(){
   if(isSplitPageByMuti()){
	 if(isKjExsitIfNotDoAlert("submitType")){
		 $("#submitType").val("goFront");
		 var pageLevel = $("#pageLevel").val()*1;
		 $("#[id='pageLevel']").val(pageLevel+1);
	 }
   }
}

// 点击前后页
function openPage(splitPageDqNum) {
	$("#splitPageDqNum").val(splitPageDqNum);
	setSplitValueAndSubmit();
}

// 选择下拉列表
function selectOpenPage() {
	$("#splitPageDqNum").val($("#splitPageSelect").val());
	setSplitValueAndSubmit();
}

// 点击1,2,3
function numberOpenPage(splitPageDqNum) {
	$("#splitPageDqNum").val(splitPageDqNum);
	setSplitValueAndSubmit();
}

// 选择自定义显示页数下拉列表
function selectOpenMyNumZdySelect() {
	$("#splitPageDqNum").val(1);
	$("#splitPageMyNumByZdySelect").val($("#splitPageSelect2").val());
	setSplitValueAndSubmit();
}

// 设置提交类型以及提交URL,并提交
function setSplitValueAndSubmit(){
	if(isKjExsitIfNotDoAlert("submitType")){
		 $("#submitType").val("点击分页");
		 var splitPageFormAction = $("#splitPageFormAction").val();
		 if(splitPageFormAction!="" && splitPageFormAction!="null"){
			var splitPageFormId=$("#splitPageFormId").val();
		 	$("#"+splitPageFormId).attr("action",splitPageFormAction);
		 }
		 $("#"+$("#splitPageFormId").val()).submit();
		 return false;
	}
}