$(document).ready(function() {
	wrap_ymPlugin();
});
function wrap_ymPlugin() {
	getPluginLx();
	bindJqueryBubbleUp();
}

function bindClickLx() {
	$(".lx-span").bind("click", function(event) {
		$(".lx-span").removeClass("current");
		$(this).addClass("current");
	});
};

function bindJqueryBubbleUp() {
	isIeVersion("8.0") || $("#sareInnerDiv ul#sareMenu li img").bubbleup({
		tooltip : !0,
		scale : 80
	})
};

// 获取插件类型们
function getPluginLx() {
	var url = "json/pluginLx.json";
	$.ajax({
		url : url,
		type : "get",
		dataType : "json",
		success : function(result) {

			var html = "";
			if (result && result.length > 0) {
				var len = result.length;
				for (var i = 0; i < len; i++) {
					var sin = result[i];
					var id = sin.id;
					var lxName = sin.lxName;

					html += "<span data-lx-id=\"" + id + "\" class=\"lx-span\">" + lxName + "</span>" + "\n";
				}
			}

			$("#mainCaDiv").append(html);

			bindClickLx();
		},
		error : function(e) {

		}
	});
}
