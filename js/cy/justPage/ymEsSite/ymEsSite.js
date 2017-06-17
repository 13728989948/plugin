$(document).ready(function() {
	wrap_ymEsSite();
});
function wrap_ymEsSite() {
	getAllEsSites();
	bindJqueryBubbleUp();
}

function bindClickLx() {
	$(".lx-span").bind("click", function(event) {
		var cuSpanDom = $(this);
		$(".lx-span").removeClass("current");
		cuSpanDom.addClass("current");

		var items = $(".item");
		var cuFilterLxId = ("" + cuSpanDom.attr("data-lx-id"));// 当前过滤条件的类型Id

		// 若为全部
		if (cuFilterLxId == "-1") {
			items.show();
			return;
		}

		items.hide();
		items.each(function() {
			var item = $(this);
			var lxIds = item.attr("data-lx-ids");
			var lxIdArr = lxIds.split(",");
			if (lxIdArr && lxIdArr.length > 0) {
				var len = lxIdArr.length;
				for (var i = 0; i < len; i++) {
					var lxId = lxIdArr[i];
					if (lxId == cuFilterLxId) {
						item.show();
					}
				}
			}
		});
	});
};

function bindJqueryBubbleUp() {
	isIeVersion("8.0") || $("#sareInnerDiv ul#sareMenu li img").bubbleup({
		tooltip : !0,
		scale : 80
	})
};

// 获取站点类型们
function getEsSiteLx() {
	var url = "../json/esSiteLx.json";
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

function getAllEsSites() {
	var url = "../json/esSite.json";
	$.ajax({
		url : url,
		type : "get",
		dataType : "json",
		success : function(result) {
			var html = getEsSiteHtml(result);
			$("#listItemsDiv").append(html);

			getEsSiteLx();
		},
		error : function(e) {
		}
	});
}

function getEsSiteHtml(result) {
	var html = "";
	var imgSec = (qzSec ? ("/" + qzSec) : "");
	if (result && result.length > 0) {
		var len = result.length;
		for (var i = 0; i < len; i++) {
			var sin = result[i];
			var lxIds = sin.lxIds;
			var title = sin.linkTitle;
			var hrefLink = sin.link;
			var imagePath = imgSec + sin.imagePath;

			html += "      <div data-lx-ids=\"" + lxIds + "\" class=\"item\">" + "\n";
			html += "       <div class=\"u-listShow f-card\">" + "\n";
			html += "        <div class=\"item-top\">" + "\n";
			html += "         <a href=\"javascript:click_jump('" + hrefLink + "');\">" + "\n";
			html += "          <img src=\"" + imagePath + "\" />" + "\n";
			html += "          <span></span>" + "\n";
			html += "         </a>" + "\n";
			html += "        </div>" + "\n";
			html += "        " + "\n";
			html += "        <div class=\"item-bottom s-bg-fff\">" + "\n";
			html += "         <div class=\"tit\">" + "\n";
			html += "          <h4>" + "\n";
			html += "           <a href=\"javascript:click_jump('" + hrefLink + "');\">" + title + "</a>" + "\n";
			html += "          </h4>" + "\n";
			html += "         </div>" + "\n";
			html += "         <div class=\"con\">" + "\n";
			html += "          <a href=\"javascript:click_jump('" + hrefLink + "');\" class=\"item_get is_vip\">进入网站</a>" + "\n";
			html += "         </div>" + "\n";
			html += "        </div>" + "\n";
			html += "       </div>" + "\n";
			html += "      </div>" + "\n";
		}
	}

	return html;
}

function click_jump(hrefLink) {
	window.open(hrefLink);
}