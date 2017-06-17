/*******************************************************************************
 * jquery.method.bind.js插件
 * @version 1.0.3
 * @description 存放绑定事件的插件
 * author ice(古雨)(QQ:494174519,phone:13728989948)
 * @site 暂无
 ******************************************************************************/
	
// 绑定点击控件后将该控件的Text追加到指定控件的Value中(textId:被点击的text的ID,appendKjId:被追加的控件ID)
function bindClickTextAndSetTextAppendToValue(idClick,appendKjId){
	var isFocus = false;
	$("#[id^='"+idClick+"']").bind("click", function() {
		$("#"+appendKjId).val($.trim($("#"+appendKjId).val())+$.trim($(this).text()));
		if(!isFocus){
			$("#"+appendKjId).focus();
			isFocus = true;
		}
	});
}

// 绑定弹出隐藏的span的内容(若存在则弹出)
function bindAlertHiddenSpanText(spanId){
	// 判断控件是否存在
	if(isKjExsitIfNotDoAlert(spanId)){
		isKjHasTextAndAlert(spanId);// 判断控件是否含有TEXT内容,若有就弹出内容
	}
}

// 绑定回车键也可以点登录(submitId:点击登录的控件ID)
// 依赖:jquery.hotkeys.js
function bindClickEnterSubmit(submitId){
	$(document).bind("keydown", "return", function(){ 
		$("#"+submitId).click();
	});
}

// 绑定通用点击清空按钮(resetId:reset按钮控件的ID,resetIdDhStrArr:逗号隔开的需要reset的控件ID们)
function bindReset(resetId,targetIdDhStrArr){
	$("#"+resetId).bind("click", function(event) {
		var targetIds = targetIdDhStrArr.split(",");
		for(var i=0;i<targetIds.length;i++){
			$("#"+targetIds[i]).val("");
		}
	});
}

// 绑定表单文字显隐动画效果(id:控件名,labelId:显隐文字,文中内容,fieldMessage:控件显示消息内容)
function bindAnimateInputField(id,labelId,fieldMessage) {
	$("#"+id).focus(function() {
		$("#"+labelId).animate({ opacity: "0" }, "fast");
		if($(this).val() == fieldMessage){
			$(this).val() == "";
		}
	}).blur(function() {
		if($(this).val() == "") {
			$(this).val() == fieldMessage;
			$("#"+labelId).animate({ opacity: "0.7" }, "fast");
		}
	});
	$("#"+labelId).animate({ opacity: "0.7" }, "fast");
	$("#"+labelId).bind("click", function() {
		$(this).remove();
		$("#"+id).focus();
	});
}

// 绑定验证码图片点击事件
function bindClickImgYzm(id) {
	$("#[id^='"+id+"']").bind("click", function() {
		// 为图片重设src值,这样会触发一次提交
		var img = $(this);
		var src = img.attr("src");
		var timestamp = (new Date()).valueOf();
		// 为了使每次生成图片不一致，即不让浏览器读缓存，所以加上时间戳
		src = src + "?timestamp=" + timestamp;
		img.attr("src", src);
	}).css("cursor","pointer");
}
	
// 绑定artZoom控件效果(图片旋转,放大效果)
function bindArtZoom(idOrClass) {
	if(!(idOrClass.startWith("."))){
	   idOrClass = "#"+idOrClass;
	}
	$(idOrClass).artZoom({
	  	path: $("#path").val()+'/ex/jquery.artZoom/images',// 设置artZoom图片文件夹路径
	  	preload: true,// 设置是否提前缓存视野内的大图片
	  	minWidth : 197,
	  	maxWidth : 197,
	  	maxHeight : 175,
	  	minHeight : 175,
	  	blur: true,// 设置加载大图是否有模糊变清晰的效果
	  	left: "左旋转",// 左旋转按钮文字
	  	right: "右旋转",// 右旋转按钮文字
	  	source: "看原图"	// 查看原图按钮文字
    });
}
  
// 绑定自动提示(id:需要绑定的id控件,action提交的URL)
// 依赖1:jquery.autocomplete.js
function bindAutocomplete(id,action) {
	bindAutocompleteWithWidth(id,action,200);
}

// 绑定自动提示(id:需要绑定的id控件,action提交的URL,showUlWidth:显示的ul宽度(提示的宽度))
// 依赖1:jquery.autocomplete.js
function bindAutocompleteWithWidth(id,action,showUlWidth) {
	// 设置控件属性
	$("#"+id).attr("autocomplete","off");// 自动提交需消除默认浏览器自动提示记录
	
	// 绑定输入框(focus)
	$("#"+id).css("color", "#bcbcbc").focus(function() {
		if ($(this).val() == this.defaultValue) {
			$(this).css("color", "#640000")
		}
	});
	// 绑定输入框(blur)
	$("#"+id).blur(function() {
		if ($.trim($(this).val()) == "") {
			$(this).css("color", "#bcbcbc");
		} else {
			$(this).css("color", "#640000");
		}
	});
	// 绑定自动完成功能
	if($("#searchType").length==0){
		alert("页面没有搜索类型:searchType");
		return;
	}
	$("select[id^='searchType']").bind("change",function(){
		var symbolStr = "?";
		if(action.indexOf("?")!=-1){
			symbolStr = "&";
		}
		var temp=symbolStr+"searchType="+encodeURI($("#searchType").val());
		temp += "&searchType2="+encodeURI($("#searchType2").val());
		$("#"+id).autocomplete(action+temp, {
			max : 50,// 列表里的条目数
			width : showUlWidth,// 提示的宽度,溢出隐藏
			matchSubset: false,// 使用查询缓存
			delay: 200,// 延时搜索
			matchContains : true,// 包含匹配,就是data参数里的数据,是否只要包含文本框里的数据
			autoFill : false,// 自动填充
			scrollHeight : 200,// 提示的高度,溢出显示滚动条
			dataType : "json",
			parse : function(data) {
			return $.map(data, function(row) {
				return {
					data : row,
					value : row.name
				}
			});
		},
		formatItem : function(row, i, max) {
			return row.name;//显示的格式
		},
		formatMatch : function(row, i, max) {
			return row.name;//匹配的内容
		},
		formatResult : function(row) {
			return row.name;//结果内容
		}
		}).result(function(event, data, formatted){
			if(data.id){
				$("#id").val(data.id);// 点击后将页面id控件赋上值,表示操作当前主实体id
			}
			if(data.code){
				$("#code").val(data.code);// 点击后将页面code控件赋上值,表示操作当前主实体code
			}
		});
	});
	$("select[id^='searchType']").change();
}

// 绑定通用日期控件
// 依赖:1:jquery.ui.datepicker
function bindDatePicker(id) {
	// (注意:DATEPICKER在绑定的时候,遇到有了hasDatepicker类的都会以为已绑定)
	$("input[id^="+id+"]:visible").attr("class",""); // 首先把已经有hasDatepicker的元素的class删掉
	// $("#"+id).next().remove();// 再把生成的日期图片删掉
	$("input[id^="+id+"]:visible").datepicker({
		 buttonImage: $("#path").val()+"/images/wrap/icon/icon_p_003.png",
		 buttonImageOnly: true,
		 changeMonth: true,
		 changeYear: true,
		 showOn: 'both'// 是否又显示控件又显示图片
	});
	$("input[id^="+id+"]").attr("autocomplete","off");
}

// 绑定通用日期控件002(不含图片)
// 依赖:1:jquery.ui.datepicker
function bindDatePicker002(id) {
	$("input[id^="+id+"]").datepicker({
		 buttonImageOnly: true,
		 changeMonth: true,
		 changeYear: true
	});
	$("input[id^="+id+"]").attr("autocomplete","off");
}

// 绑定通用日期控件003(不含图片,将选择后的值分派到对应的控件并为隐藏控件赋值,指定日期范围为生日)
// 依赖:1:jquery.ui.datepicker
function bindDatePicker003(id,yearId,monthId,dayId,hiddenId) {
	$("input[id^="+id+"]").datepicker({
		buttonImageOnly: true,
		changeMonth: true,
		changeYear: true,
		yearRange:'c-70:c+0',
		onClose: function(dateText, inst) {
			var strArr = dateText.split("-");
			if(reg_Rq2(dateText)){
				$("#"+dayId).val(strArr[2]+"日");
				$("#"+yearId).val(strArr[0]+"年");
				$("#"+monthId).val(strArr[1]+"月");
				$("#"+hiddenId).val(dateText);// 为隐藏控件赋值
			}
		}
	});
	$("input[id^="+id+"]").attr("autocomplete","off");
}

//绑定通用日期控件004(不含图片,指定日期范围为生日)
//依赖:1:jquery.ui.datepicker
function bindDatePicker004(id) {
	$("input[id^="+id+"]").datepicker({
		 buttonImageOnly: true,
		 changeMonth: true,
		 changeYear: true,
		 yearRange:'c-70:c+0'
	});
	$("input[id^="+id+"]").attr("autocomplete","off");
}

// 绑定file控件效果(id:控件ID)
function bindFileStyle(id) {
   $("#"+id).filestyle({
		image: $("#path").val()+"/images/ht/ht_p_047.png",
		imageheight : 22,
		imagewidth : 82,
		width : 205
   });
}

// 绑定 kindeditor编辑器(id:绑定的textAreaID)
// 依赖:1:kindeditor.js
function bindKindEditor(id){
  bindKindEditorWordLimit(id,0);
}

// 绑定 kindeditor编辑器(id:绑定的textAreaID)(限定字数)
// 依赖:1:kindeditor.js,2:jquery.method.js
function bindKindEditorWordLimit(id, wordMaxLength){
 KindEditor.ready(function(K) {
   var editor = K.create("textarea[id='"+id+"']", {
   	    id: id,
	   	uploadJson : '/ex/kindeditor/jsp/kindeditorUpload.jsp',
	   	fileManagerJson : '/ex/kindeditor/jsp/kindeditorFileManager.jsp',
	    allowFileManager : true,
	    afterCreate : function() {},
	    afterChange : function(id) {
	    	var self = this;
	    	self.sync();// 同步(KINDEDITOR的缺点)
	    	if(wordMaxLength!=0){
		    	textLimitKindEditor(this,this.id+"LimitShow",wordMaxLength);
	    	}
	    }
   });
 });
}

// 点击显示隐藏元素(idStartSec:以idStartSec开始的元素)
// 依赖:1:jquery.reg.js
function bindShowHideYs(idStartSec) {
	// 根据指定开头ID的每一个元素重设该元素和对应展开的内容的一对ID
	setAddSubIds("addSubImg","kindeditorContext");
	
	// 开始绑定 
	$("#[id^='"+idStartSec+"']").bind("click", function() {
		var addSubId = $(this)[0].id;// Thumb控件ID
		var imgPath = $("#path").val() + "/images/ht/ht_p_050.png";
		var imgPath2 = $("#path").val() + "/images/ht/ht_p_051.png";
		var showKj = "kindeditorContext" + fiYw(addSubId);// 显示隐藏的控件ID
		
		// 检查Thumb控件ID是否存在
		if(!isKjExsitIfNotDoAlert(addSubId)){
			return false;
		}
		
		// 隐藏或显示By加号减号
		divShowAndHideByJjh(addSubId, showKj, imgPath, imgPath2);
	});
}

// 绑定通用弹出窗口控件
// 依赖:1:jquery.artDialog.js
function bindPopDiv(id) {
	bindPopDivWithTitle(id,"消息");
}

// 绑定点击通用ArtDialog消框(textId点击该控件弹出框的Text的ID,hiddenTextId与textId对应的隐藏控件ID)
function bindClickCancelArtDialog(textId,hiddenTextId){
  $("#treeViewUL_"+textId+" span").bind("click",function(){
      art.dialog.list[textId].close();
      $("#"+hiddenTextId).val($(this).parent()[0].id);
      $("#"+textId).val($(this).text());
  });
}

// 绑定通用弹出窗口控件
// 依赖:1:jquery.artDialog.js
function bindPopDivWithTitle(id,title) {
	$("#"+id).bind("click",function(){
		// 首先关闭所有对话框再弹出一个对话框
		clearArtDialogList();
		art.dialog({
			title:title,
			zIndex:100,
			content: document.getElementById("popDiv_"+id),
			id: id// 设定对话框唯一标识(防止重复弹出)
		});
	});
}

// 绑定树控件(hiddenId:隐藏的控件ID,showNameId:显示名称的控件ID)
function bindTreeView(hiddenId,showNameId){
  // 绑定树控件
  $("#treeViewUL_"+showNameId).treeview();
  
  // 修复最上端露出的线
  $("#treeViewUL_"+showNameId+" li:first>div:first").css("marginTop","-1px");
  
  // 绑定点击每一个树节点
  $("#treeViewUL_"+showNameId+" span").bind("click",function(){
      art.dialog.list[showNameId].close();
      $("#"+hiddenId).val($(this)[0].id);
      $("#"+showNameId).val($(this).text());
  });
}

// 绑定已经获得数据的treeView点击元素事件(clickId:对应ys的隐藏Id,ys:该text控件元素)
// 依赖:1:jquery.treeView.js
function bindTreeViewYsClick(clickId,ys) {
	// 绑定树控件
    $("#treeViewUL_" + ys).treeview();
    
    // 绑定点击每一个树节点
    $("#treeViewUL_"+ ys +" span").bind("click",function(){
        art.dialog.list[ys].close();
        $("#"+clickId).val($(this)[0].id);
        $("#"+ys).val($(this).text());
    });
}

// 绑定TreeViewUL通用右键弹出菜单
// 依赖:1:jquery.contextmenu.js
function bindContextMenu() {
	$("ul[id^='treeViewUL'] li").each(function(){
		$(this).contextMenu("rightClickDiv", {
			bindings: {
				"add": function(t) {
					return pauseJsGn();
				},
				"edit": function(t) {
					return pauseJsGn();
				},
				"delete": function(t) {
					return pauseJsGn();
				}
			}
		});
	});
}

// 绑定图片通用右键弹出菜单
// 依赖:1:jquery.contextmenu.js
function bindContextMenuRightClickImage(name) {
	$("#[name^="+name+"]").each(function(){
		$(this).contextMenu("htPopRightClickImageDIV", {
			bindings: {
				"properties": function(t,target) {
					var elementId= $(t).attr("id");
					$("a[id='htPopRightClickImageCurrentA']").remove();
					var html="<a id='htPopRightClickImageCurrentA' href='javascript:;' rel='superbox[ajax][adminImageAction!getSingleImageByIndex.action?id="+elementId+"]'></a>";
					$("#htPopRightClickImageDIV").append(html);
					$.superbox.settings = {
					   	boxId: "superbox", // 避免库冲突ID
					    closeTxt: "关闭",
					    loadTxt: "加载中请稍等...",
					    nextTxt: "下一步",
					    prevTxt: "上一步",
					   	boxClasses: "test", // box的Class
					   	overlayOpacity: .1, // 背景透明度
					   	boxWidth: "600", // box的宽度
					   	boxHeight: "260" // box的高度
				    };
					$.superbox();
					$("#htPopRightClickImageCurrentA").click();
				},
				"delete": function(t,target) {
					if(confirm("确定删除?")){
						var iImage = $(t).attr("src");
						var elementId= $(t).attr("id");
						var jsonData = "{'id':"+elementId+",'iImage':'"+iImage+"'}";
						var url = "adminImageAction!imageDeleteByIndex.action";
						$.post(url, {
							jsonData : jsonData
						}, function(data) {
							alert(data.message);
							var status = data.status;
							if(status==1){
	        					 $("#[name='indexLbImage'][id="+data.imageId+"]").remove();
							}
						});
					}
				}
			}
		});
	});
}

// 绑定通用ajax提交(ysId:元素ID,url:提交地址,jsonData:提交数据)
function bindAjax(ysId,url,jsonData){
	$("#"+ysId).bind("click", function() {
		$.post(url, {
			jsonData : jsonData
		}, function(data) {
			alert(data.message);
		});
	});
}

// 绑定通用ajax提交,在提交前需要确认(ysId:元素ID,url:提交地址,jsonData:提交数据)
function bindAjaxWithConfirm(ysId,url,jsonData,confirmMessage){
	$("#"+ysId).bind("click", function() {
		if(confirm(confirmMessage)){
			$.post(url, {
				jsonData : jsonData
			}, function(data) {
				alert(data.message);
			});
		}
	});
}

// 绑定通用点击返回按钮(定义URL)
function bindBackByLocationHref(buttonId,urlId) {
	return bindBackByLocationHrefBySetAction(buttonId,$("#"+urlId).val());
}

// 绑定通用点击返回按钮(定义Action)
function bindBackByLocationHrefBySetAction(buttonId,action) {
	$("#"+buttonId).bind("click", function() {
		if(!action.startWith("/")){
			action = "/"+action;
		}
		location.href = $("#path").val() + action;// 将当前页面改变
		return false;
	});
}

// 绑定通用点击折叠按钮
function bindZdButton(buttonId) {
	$("#"+buttonId).bind("click", function() {
		$("#[id^='kindeditorContext']").each(function(){
			var id = $(this).attr("id");
			var isHidden = $(this).is(":hidden");
			if(!isHidden){
				var index = id.substr("kindeditorContext".length,id.length);
			 	$(this).show();
       			$("#addSubImg"+index).click();
			}
		})
    });
}

// 绑定通用点击展开按钮
function bindZkButton(buttonId) {
	$("#"+buttonId).bind("click", function() {
		$("#[id^='kindeditorContext']").each(function(){
			var id = $(this).attr("id");
			var isHidden = $(this).is(":hidden");
			if(isHidden){
				var index = id.substr("kindeditorContext".length,id.length);
			 	$(this).hide();
       			$("#addSubImg"+index).click();
			}
		})
    });
}

// 绑定批量添加(id:需要绑定的id控件,formId:需要提交的表单ID,action提交的URL)
function bindSubmitPLTJ(id,formId,action) {
	$("#"+id).bind("click", function() {
		$("#submitType").val("点击批量新增");
		$("#"+formId).attr("action",action);
		$("#"+formId).submit();
		return false;
	});
}

// 绑定通用点击上传Excel文件(buttonId:按钮ID,fileExcel:excel文件控件,FormId:提交Form的ID)
function bindSubmitExcelPLTJ(buttonId,FormId) {
	$("#"+buttonId).bind("click", function() {
	  	var fileExcel = $.trim($("#fileExcel").val());
	   	if(fileExcel.indexOf(".")!=-1){
	   		if (fileExcel.substr(fileExcel.lastIndexOf(".")+1,fileExcel.length)!="xls"){
	   			alert("请上传Excel文件!");
	   		}else{
	   			$("#"+FormId).submit();
	   			return false;
	   		}
	   	}else{
	   		alert("请上传Excel文件!");
	   	}
	});
}

// 绑定通用checkbox或radio效果
function bindCustomInput(ys){
	$(ys).customInput();
}

// 绑定通用jqueryUI风格
function bindJqueryUiStyle(id){
	$("#"+id).themeswitcher({cookieName:"jqueryUiTheme"});	
}

// 绑定通用图片型radio(ulId外层UL的ID,inputName内层input的Name)
function bindImageRadio(ulId,inputName){
	// 为A绑定函数
	$("#"+ulId+" a").bind("mouseover", function() {
		$(this).css("border", "#83a9c5 1px solid");
	});
	$("#"+ulId+" a").bind("mouseout", function() {
		$(this).css("border", "#d4e2ec 1px solid");
	});
	$("#"+ulId+" a").bind("click", function() {
		//$(this).find("#[name='"+inputName+"']").attr("checked", "checked");
		$(this).find("input[type='radio']").eq(0).attr("checked", "checked");
	});
	$("#[name='"+inputName+"']").eq(0).attr("checked", "checked");// 设置默认第一个选中
	$("#"+ulId+" a").css("border", "#d4e2ec 1px solid");// a的默认样式
}

// 绑定通用jquery.timetabs
function bindJqueryTimetabs(ys){
	$(ys).addClass("enabled").timetabs({
		defaultIndex: 0,
		interval: 5000,
		continueOnMouseLeave: true,
		animated: "fade",
		animationSpeed: 1000
	});
}

// 绑定只能输入数字
function bindInputSzXz(textId){
   $("#"+textId).keyfilter(/[0-9]/);// 绑定只能输入的内容为数字
}

// 绑定通用选择Select显示Span内容
function bindShowSpanBySelect(selectId){
	$("#"+selectId).bind("change",function(){
		var selectValue = $(this).val();
		$("#"+selectId+"Span").text(selectValue);
	});
}

// 绑定jquery.Multiselect(selectId:select控件ID,noneSelectedText:没选择显示的文本)
function bindJueryMultiselect(selectId,noneSelectedText){
	$("#"+selectId).multiselect({
	    multiple: false,
	    selectedList: 1,
	    noneSelectedText: noneSelectedText,
	    open: function(event, ui){
        }
	});
}

// 绑定jquery.Multiselect(selectId:select控件ID,指定select的最大宽度,noneSelectedText:没选择显示的文本)
function bindJueryMultiselect002(selectId,maxWidth,noneSelectedText){
	$("#"+selectId).multiselect({
		multiple: false,
		maxWidth: maxWidth,
		selectedList: 1,
		noneSelectedText: noneSelectedText,
		open: function(event, ui){
		}
	});
}

/**绑定SUBMIT按钮********************************************************************************************************************************/

// 绑定通用点击提交按钮(1:参数检查)
function bindSubmit(buttonId,formId) {
	$("#"+buttonId).bind("click", function() {
      if(checkParam()){
       	startSubmit(formId);
      }
    });
}

// 绑定通用点击提交按钮(1:参数检查,2:指定Action)
function bindSubmitAndSetAction(buttonId,formId,action) {
	$("#"+buttonId).bind("click", function() {
		if(checkParam()){
			startSubmitBySetAction(formId, action);
		}
	});
}

// 绑定通用点击提交按钮(1:参数检查,2:指定Action,3:再次确定)
function bindSubmitAndSetActionAndCheckConfirm(buttonId,formId,action,confirmMessage) {
	$("#"+buttonId).bind("click", function() {
		if(checkParam()){
			if(confirm(confirmMessage)) {
				startSubmitBySetAction(formId, action);
			}
		}
	});
}

// 绑定通用点击提交按钮(1:参数检查,2:指定Action,3:设置提交前的值)
function bindSubmitAndSetActionAndCheckAndSetBeforeValue(buttonId,formId,action) {
	$("#"+buttonId).bind("click", function() {
		if(checkParam()){
			setBeforeSubmitValue();
			startSubmitBySetAction(formId, action);
		}
	});
}

// 绑定通用点击提交按钮(1:不含参数检查)
function bindSubmitNoCheckParam(buttonId,formId) {
	$("#"+buttonId).bind("click", function() {
		startSubmit(formId);
	});
}

// 绑定通用点击提交按钮(1:不含参数检查,2:指定Action)
function bindSubmitNoCheckParamAndSetAction(buttonId,formId,action) {
	$("#"+buttonId).bind("click", function() {
		startSubmitBySetAction(formId, action);
	});
}

// 绑定通用点击提交按钮(1:不含参数检查,2:指定Action,3:再次确定)
function bindSubmitNoCheckParamAndSetActionAndCheckConfirm(buttonId,formId,action,confirmMessage) {
	$("#"+buttonId).bind("click", function() {
		if(confirm(confirmMessage)) {
			startSubmitBySetAction(formId, action);
		}
	});
}

// 绑定通用点击提交按钮(1:不含参数检查,2:指定Action,3:设置提交前的值)
function bindSubmitNoCheckParamAndSetActionAndSetBeforeValue(buttonId,formId,action) {
	$("#"+buttonId).bind("click", function() {
		setBeforeSubmitValue();
		startSubmitBySetAction(formId, action);
	});
}

/**绑定SUBMIT按钮(多级级模式)********************************************************************************************************************************/

// 多级模式:绑定通用点击提交按钮(1:参数检查)(当前)
function bindSubmitByCuByMuti(buttonId,formId) {
	$("#"+buttonId).bind("click", function() {
		if(checkParam()){
			bindSubmitByMutiEx(formId);
		}
	});
}
// 多级模式:绑定通用点击提交按钮(1:参数检查)(进入)
function bindSubmitByInByMuti(buttonId,formId) {
	$("#"+buttonId).bind("click", function() {
		if(checkParam()){
			addOneByPageLevel();
			bindSubmitByMutiEx(formId);
		}
	});
}
// 多级模式:绑定通用点击提交按钮(1:参数检查)(后退)
function bindSubmitByBcByMuti(buttonId,formId) {
	$("#"+buttonId).bind("click", function() {
		if(checkParam()){
			subOneByPageLevel();
			bindSubmitByMutiEx(formId);
		}
	});
}

// 多级模式:绑定通用点击提交按钮(1:参数检查,2:指定Action)(当前)
function bindSubmitAndSetActionByCuByMuti(buttonId,formId,action) {
	$("#"+buttonId).bind("click", function() {
		if(checkParam()){
			bindSubmitBySetActionByMutiEx(formId, action);
		}
	});
}
// 多级模式:绑定通用点击提交按钮(1:参数检查,2:指定Action)(进入)
function bindSubmitAndSetActionByInByMuti(buttonId,formId,action) {
	$("#"+buttonId).bind("click", function() {
		if(checkParam()){
			addOneByPageLevel();
			bindSubmitBySetActionByMutiEx(formId, action);
		}
	});
}
// 多级模式:绑定通用点击提交按钮(1:参数检查,2:指定Action)(后退)
function bindSubmitAndSetActionByBcByMuti(buttonId,formId,action) {
	$("#"+buttonId).bind("click", function() {
		if(checkParam()){
			subOneByPageLevel();
			bindSubmitBySetActionByMutiEx(formId, action);
		}
	});
}

// 多级模式:绑定通用点击提交按钮(1:参数检查,2:指定Action,3:再次确定)(当前)
function bindSubmitAndSetActionAndCheckConfirmByCuByMuti(buttonId,formId,action,confirmMessage) {
	$("#"+buttonId).bind("click", function() {
		if(checkParam()){
			if(confirm(confirmMessage)) {
				bindSubmitBySetActionByMutiEx(formId, action);
			}
		}
	});
}
// 多级模式:绑定通用点击提交按钮(1:参数检查,2:指定Action,3:再次确定)(进入)
function bindSubmitAndSetActionAndCheckConfirmByInByMuti(buttonId,formId,action,confirmMessage) {
	$("#"+buttonId).bind("click", function() {
		if(checkParam()){
			if(confirm(confirmMessage)) {
				addOneByPageLevel();
				bindSubmitBySetActionByMutiEx(formId, action);
			}
		}
	});
}
// 多级模式:绑定通用点击提交按钮(1:参数检查,2:指定Action,3:再次确定)(后退)
function bindSubmitAndSetActionAndCheckConfirmByBcByMuti(buttonId,formId,action,confirmMessage) {
	$("#"+buttonId).bind("click", function() {
		if(checkParam()){
			if(confirm(confirmMessage)) {
				subOneByPageLevel();
				bindSubmitBySetActionByMutiEx(formId, action);
			}
		}
	});
}

// 多级模式:绑定通用点击提交按钮(1:参数检查,2:指定Action,3:设置提交前的值)(当前)
function bindSubmitAndSetActionAndCheckAndSetBeforeValueByCuByMuti(buttonId,formId,action) {
	$("#"+buttonId).bind("click", function() {
		if(checkParam()){
			setBeforeSubmitValue();
			bindSubmitBySetActionByMutiEx(formId, action);
		}
	});
}
// 多级模式:绑定通用点击提交按钮(1:参数检查,2:指定Action,3:设置提交前的值)(进入)
function bindSubmitAndSetActionAndCheckAndSetBeforeValueByInByMuti(buttonId,formId,action) {
	$("#"+buttonId).bind("click", function() {
		if(checkParam()){
			setBeforeSubmitValue();
			addOneByPageLevel();
			bindSubmitBySetActionByMutiEx(formId, action);
		}
	});
}
// 多级模式:绑定通用点击提交按钮(1:参数检查,2:指定Action,3:设置提交前的值)(后退)
function bindSubmitAndSetActionAndCheckAndSetBeforeValueByBcByMuti(buttonId,formId,action) {
	$("#"+buttonId).bind("click", function() {
		if(checkParam()){
			setBeforeSubmitValue();
			subOneByPageLevel();
			bindSubmitBySetActionByMutiEx(formId, action);
		}
	});
}

// 多级模式:绑定通用点击提交按钮(1:不含参数检查)(当前)
function bindSubmitNoCheckParamByCuByMuti(buttonId,formId) {
	$("#"+buttonId).bind("click", function() {
		bindSubmitByMutiEx(formId);
	});
}
// 多级模式:绑定通用点击提交按钮(1:不含参数检查)(进入)
function bindSubmitNoCheckParamByInByMuti(buttonId,formId) {
	$("#"+buttonId).bind("click", function() {
		addOneByPageLevel();
		bindSubmitByMutiEx(formId);
	});
}
// 多级模式:绑定通用点击提交按钮(1:不含参数检查)(后退)
function bindSubmitNoCheckParamByBcByMuti(buttonId,formId) {
	$("#"+buttonId).bind("click", function() {
		subOneByPageLevel();
		bindSubmitByMutiEx(formId);
	});
}

// 多级模式:绑定通用点击提交按钮(1:不含参数检查,2:指定Action)(当前)
function bindSubmitNoCheckParamAndSetActionByCuByMuti(buttonId,formId,action) {
	$("#"+buttonId).bind("click", function() {
		bindSubmitBySetActionByMutiEx(formId, action);
	});
}
// 多级模式:绑定通用点击提交按钮(1:不含参数检查,2:指定Action)(进入)
function bindSubmitNoCheckParamAndSetActionByInByMuti(buttonId,formId,action) {
	$("#"+buttonId).bind("click", function() {
		addOneByPageLevel();
		bindSubmitBySetActionByMutiEx(formId, action);
	});
}
// 多级模式:绑定通用点击提交按钮(1:不含参数检查,2:指定Action)(后退)
function bindSubmitNoCheckParamAndSetActionByBcByMuti(buttonId,formId,action) {
	$("#"+buttonId).bind("click", function() {
		subOneByPageLevel();
		bindSubmitBySetActionByMutiEx(formId, action);
	});
}

// 多级模式:绑定通用点击提交按钮(1:不含参数检查,2:指定Action,3:再次确定)(当前)
function bindSubmitNoCheckParamAndSetActionAndCheckConfirmByCuByMuti(buttonId,formId,action,confirmMessage) {
	$("#"+buttonId).bind("click", function() {
		if(confirm(confirmMessage)) {
			bindSubmitBySetActionByMutiEx(formId, action);
		}
	});
}
// 多级模式:绑定通用点击提交按钮(1:不含参数检查,2:指定Action,3:再次确定)(进入)
function bindSubmitNoCheckParamAndSetActionAndCheckConfirmByInByMuti(buttonId,formId,action,confirmMessage) {
	$("#"+buttonId).bind("click", function() {
		if(confirm(confirmMessage)) {
			addOneByPageLevel();
			bindSubmitBySetActionByMutiEx(formId, action);
		}
	});
}
// 多级模式:绑定通用点击提交按钮(1:不含参数检查,2:指定Action,3:再次确定)(后退)
function bindSubmitNoCheckParamAndSetActionAndCheckConfirmByBcByMuti(buttonId,formId,action,confirmMessage) {
	$("#"+buttonId).bind("click", function() {
		if(confirm(confirmMessage)) {
			subOneByPageLevel();
			bindSubmitBySetActionByMutiEx(formId, action);
		}
	});
}

// 多级模式:绑定通用点击提交按钮(1:不含参数检查,2:指定Action,3:设置提交前的值)(当前)
function bindSubmitNoCheckParamAndSetActionAndSetBeforeValueByCuByMuti(buttonId,formId,action) {
	$("#"+buttonId).bind("click", function() {
		setBeforeSubmitValue();
		bindSubmitBySetActionByMutiEx(formId, action);
	});
}
// 多级模式:绑定通用点击提交按钮(1:不含参数检查,2:指定Action,3:设置提交前的值)(进入)
function bindSubmitNoCheckParamAndSetActionAndSetBeforeValueByInByMuti(buttonId,formId,action) {
	$("#"+buttonId).bind("click", function() {
		setBeforeSubmitValue();
		addOneByPageLevel();
		bindSubmitBySetActionByMutiEx(formId, action);
	});
}
// 多级模式:绑定通用点击提交按钮(1:不含参数检查,2:指定Action,3:设置提交前的值)(后退)
function bindSubmitNoCheckParamAndSetActionAndSetBeforeValueByBcByMuti(buttonId,formId,action) {
	$("#"+buttonId).bind("click", function() {
		setBeforeSubmitValue();
		subOneByPageLevel();
		bindSubmitBySetActionByMutiEx(formId, action);
	});
}

// 多级模式:绑定通用点击提交按钮扩展
function bindSubmitByMutiEx(formID){
	if(isKjExsitIfNotDoAlert("submitType")){
		startSubmit(formID);
	}
}

// 多级模式:绑定通用点击提交按钮扩展(设置Action)
function bindSubmitBySetActionByMutiEx(formID,action){
	if(isKjExsitIfNotDoAlert("submitType")){
		startSubmitBySetAction(formID, action);
	}
}

/**绑定SUBMIT_SEARCH按钮********************************************************************************************************************************/

// 绑定通用点击搜索按钮(1:参数检查)
function bindSubmitSearch(buttonId,formId) {
	$("#"+buttonId).bind("click", function() {
		if(checkParamBySearch()){
			if(bindSubmitSearchEx()){
				startSubmit(formId);
			}
		}
	});
}

// 绑定通用点击搜索按钮(1:参数检查,2:指定Action)
function bindSubmitSearchAndSetAction(buttonId,formId,action) {
	$("#"+buttonId).bind("click", function() {
		if(checkParamBySearch()){
			if(bindSubmitSearchEx()){
				startSubmitBySetAction(formId, action);
			}
		}
	});
}

// 绑定通用点击搜索按钮(1:参数检查,2:指定Action,3:设置提交前的值)
function bindSubmitSearchAndSetActionAndSetBeforeSubmitValue(buttonId,formId,action) {
	$("#"+buttonId).bind("click", function() {
		if(checkParamBySearch()){
			if(bindSubmitSearchEx()){
				setBeforeSubmitValueBySearch();
				startSubmitBySetAction(formId, action);
			}
		}
	});
}

// 绑定通用点击搜索按钮扩展
function bindSubmitSearchEx(){
	if(isKjExsitIfNotDoAlert("submitType")){
		$("#submitType").val("点击搜索");
		return true;
	}
	return false;
}