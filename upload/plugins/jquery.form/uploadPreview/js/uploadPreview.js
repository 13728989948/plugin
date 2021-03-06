﻿/*******************************************************************************
 * uploadPreview.js插件
 *
 * @version 1.0.1
 *
 * @参数说明: UpBtn:选择文件控件ID;DivShow:DIV控件ID;ImgShow:图片控件ID;Width:预览宽度;Height:预览高度;ImgType:支持文件类型格式:["jpg","png"];callback:选择文件后回调方法
 *
 * @描述: 图片上传本地预览插件兼容浏览器(IE,谷歌,火狐)不支持safari
 * @author zx(周详)(QQ:200592114)
 * @author2 ice(古雨)(QQ或微信:494174519)
 *
 * @site 更换中
 ******************************************************************************/

var uploadPreview = function (setting) {

    var _self = this;// 当前对象

    // 判断为null或者空值
    _self.IsNull = function (value) {
        if (value == undefined || value == null || value == "" || value.length == 0) {
            return true;
        }
        return false;
    }

    // 默认配置
    _self.DefautlSetting = {
        UpBtn: "",
        DivShow: "",
        ImgShow: "",
        Width: 100,
        Height: 100,
        ImgType: ["gif", "jpeg", "jpg", "bmp", "png"],
        ErrMsg: "选择文件错误,图片类型必须是(gif,jpeg,jpg,bmp,png)中的一种",
        callback: function () {
        }
    };

    // 读取配置
    _self.Setting = {
        UpBtn: _self.IsNull(setting.UpBtn) ? _self.DefautlSetting.UpBtn : setting.UpBtn,
        DivShow: _self.IsNull(setting.DivShow) ? _self.DefautlSetting.DivShow : setting.DivShow,
        ImgShow: _self.IsNull(setting.ImgShow) ? _self.DefautlSetting.ImgShow : setting.ImgShow,
        Width: _self.IsNull(setting.Width) ? _self.DefautlSetting.Width : setting.Width,
        Height: _self.IsNull(setting.Height) ? _self.DefautlSetting.Height : setting.Height,
        ImgType: _self.IsNull(setting.ImgType) ? _self.DefautlSetting.ImgType : setting.ImgType,
        ErrMsg: _self.IsNull(setting.ErrMsg) ? _self.DefautlSetting.ErrMsg : setting.ErrMsg,
        callback: _self.IsNull(setting.callback) ? _self.DefautlSetting.callback : setting.callback
    };

    // 获取文本控件URL
    _self.getObjectURL = function (file) {
        var url = null;
        if (window.createObjectURL != undefined) {
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) {
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    };

    // 绑定事件
    _self.Bind = function () {
        document.getElementById(_self.Setting.UpBtn).onchange = function () {
            if (this.value) {
                if (!RegExp("\.(" + _self.Setting.ImgType.join("|") + ")$", "i").test(this.value.toLowerCase())) {
                    alert(_self.Setting.ErrMsg);
                    this.value = "";
                    return false;
                }
                if (navigator.userAgent.indexOf("MSIE") > -1) {
                    try {
                        document.getElementById(_self.Setting.ImgShow).src = _self.getObjectURL(this.files[0]);
                    } catch (e) {
                        var div = document.getElementById(_self.Setting.DivShow);
                        this.select();
                        top.parent.document.body.focus();
                        var src = document.selection.createRange().text;
                        document.selection.empty();
                        document.getElementById(_self.Setting.ImgShow).style.display = "none";
                        div.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                        div.style.width = _self.Setting.Width + "px";
                        div.style.height = _self.Setting.Height + "px";
                        div.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src;
                    }
                } else {
                    document.getElementById(_self.Setting.ImgShow).src = _self.getObjectURL(this.files[0]);
                }
                _self.Setting.callback();
            }
        }
    };

    // 执行绑定事件
    _self.Bind();
};