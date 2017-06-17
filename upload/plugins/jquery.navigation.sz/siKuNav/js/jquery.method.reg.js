/*******************************************************************************
 * jquery.method.reg.js插件
 * @version 1.0.3
 * @author ice(古雨)(QQ:494174519,phone:13728989948)
 * @site 暂无(暂时可以在http://www.t3pay.cn查到)
 *******************************************************************************/

/*******************************************************************************
 * FI区域(过滤字符区)
 ******************************************************************************/

// TRIM模式过滤
function fiNULL(str) {
	if (reg_NULL(str)) {
		return "";
	}
	str = str.replace(/(^\s*)|(\s*$)/g, "");
	return str;
}

// 全空格模式过滤
function fiNULL2(str) {
	if (reg_NULL(str)) {
		return "";
	}
	str = str.replace(/\s*/g,'');
	return str;
}

// 过滤英文
function fiYw(str) {
	if (reg_NULL(str)) {
		return "";
	}
	str = str.replace(/[a-zA-Z]/g,'');
	return str;
}

// 过滤大写英文
function fiDxYw(str) {
	if (reg_NULL(str)) {
		return "";
	}
	str = str.replace(/[A-Z]/g,'');
	return str;
}

// 过滤中文
function fiChinese(str) {
	if (reg_NULL(str)) {
		return "";
	}
    str = str.replace(/[\u4e00-\u9fa5]/g,'');
    return str;
}

// 过滤数字
function fiSz(str) {
	if (reg_NULL(str)) {
		return "";
	}
	str = str.replace(/[0-9]/g,'');
	return str;
}

// 过滤英文和中文
function fiYwChinese(str) {
	if (reg_NULL(str)) {
		return "";
	}
	str = str.replace(/[a-zA-Z\u4e00-\u9fa5]/g,'');
	return str;
}

// 过滤常用特殊字符(排除英文逗号,英文句号)
function fiTSZF(str) {
	if (reg_NULL(str)) {
		return "";
	}
	str = str.replace(/[`~!@#$%^&*()+=|{}':;'\[\]<>\/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]/g,'');
	return str;
}

// 过滤任何非单词字符
function fiDxW(str) {
	if (reg_NULL(str)) {
		return "";
	}
	str = str.replace(/\W/g,'');
	return str;
}

/*******************************************************************************
 * FIC区域(过滤出字符区)
 ******************************************************************************/

// 过滤出中文
function ficChinese(str) {
	if (reg_NULL(str)) {
		return "";
	}
    str = str.replace(/[^\u4e00-\u9fa5]+/g,'');
    return str;
}

// 过滤出数字
function ficSz(str) {
	if (reg_NULL(str)) {
		return "";
	}
	str = str.replace(/[^0-9]+/g,'');
	return str;
}

// 过滤出数字(1-9)
function ficSz002(str) {
	if (reg_NULL(str)) {
		return "";
	}
	str = str.replace(/[^1-9]+/g,'');
	return str;
}

// 过滤出英文
function ficYw(str) {
	if (reg_NULL(str)) {
		return "";
	}
	str = str.replace(/[^a-zA-Z]+/g,'');
	return str;
}

/*******************************************************************************
 * REG区(与服务器JS同型验证)
 ******************************************************************************/

// 永远为真
function reg_True(str){
	return true;
}

// 永远为假
function reg_False(str){
	return true;
}

// 判断字符串是否为空或空字符或长度是否为0(程序中直接调用,判断是否为空为空返回真,不为空返回假)
function reg_NULL(str){
	if(str==undefined||str==""||str.length==0){
		return true;
	}
	return false;
}

// 判断字符串是否为空(验证时调用,判断是否通过,为空返回假说明不能通过,不为空返回真说明可以通过)
function reg_AcNull(str){
	var reg=/\s*\S+/;
	return reg.test(str);
}

// 与reg_AcNull相似,不同之处为这个支持多参数(隐式传递参数)
function reg_AcDcNull(){
	var reg=/\s*\S+/;
	for(var i = 0; i < arguments.length; i++){
		if(!reg.test(arguments[i])){
			return false;
		}
	}
	return true;
}

// 判断必须为除换行符以外的任意字符
function reg_Zf(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^.+$/;
	return reg.test(str);
}

// 判断必须为除换行符以外的任意字符(非空)
function reg_Zf2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_Zf(str);
}

// 判断必须为中文
function reg_Zw(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^[\u4E00-\u9FA5]+$/;
	return reg.test(str);
}

// 判断必须为中文(非空)
function reg_Zw2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_Zw(str);
}

// 判断必须为数字
function reg_Sz(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^(-?\d+)(\.\d+)?$/;
	return reg.test(str);
}

// 判断必须为数字(非空)
function reg_Sz2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_Sz(str);
}

// 判断必须为正浮点数
function reg_Zfds(str){
	if(reg_NULL(str)) {
		return true;
	}
	var reg = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/;
	return reg.test(str);
}

// 判断必须为正浮点数(非空)
function reg_Zfds2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_Zfds(str);
}

// 判断必须为负浮点数
function reg_Ffds(str){
	if(reg_NULL(str)) {
		return true;
	}
	var reg = /^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$/;
	return reg.test(str);
}

// 判断必须为负浮点数(非空)
function reg_Ffds2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_Ffds(str);
}

// 判断必须为零和正浮点数
function reg_Lzfds(str){
	if(reg_NULL(str)) {
		return true;
	}
	var reg = /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$/;
	return reg.test(str);
}

// 判断必须为零和正浮点数(非空)
function reg_Lzfds2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_Lzfds(str);
}

// 判断必须为零和负浮点数
function reg_Lffds(str){
	if(reg_NULL(str)) {
		return true;
	}
	var reg = /^(-([1-9]\d*\.\d*|0\.\d*[1-9]\d*))|0?\.0+|0$/;
	return reg.test(str);
}

// 判断必须为零和负浮点数(非空)
function reg_Lffds2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_Lffds(str);
}

// 判断必须为数字(包含正号和小数)
function reg_Zsz(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^[+]?\d+|\d+[.]?\d+$/;
	return reg.test(str);
}

// 判断必须为数字(包含正号和小数)(非空)
function reg_Zsz2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_Zsz(str);
}

// 判断必须为数字(包含正号和小数)
function reg_Fsz(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^[-]?\d+|\d+[.]?\d+$/;
	return reg.test(str);
}

// 判断必须为数字(包含正号和小数)(非空)
function reg_Fsz2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_Fsz(str);
}

// 判断必须为正负数字
function reg_Zfsz(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^[+-]?\d+|[+-]\d+[.]?\d+$/;
	return reg.test(str);
}

// 判断必须为正负数字(非空)
function reg_Zfsz2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_Zfsz(str);
}

// 判断必须为正负数字(允许第一位只有点号)
function reg_Zfszyxdh(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^[+-]?[.]?\\d+|[+-]?\\d+[.]?\\d+$/;
	return reg.test(str);
}

// 判断必须为正负数字(允许第一位只有点号)(非空)
function reg_Zfszyxdh2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_Zfszyxdh(str);
}

// 判断必须为字母
function reg_Zm(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^[a-zA-Z]*$/;
	return reg.test(str);
}

// 判断必须为字母(非空)
function reg_Zm2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_Zm(str);
}

// 判断必须为中文,数字(不含小数)
function reg_ZwSz(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^[0-9\u4e00-\u9fa5]*$/;
	return reg.test(str);
}

// 判断必须为中文,数字(不含小数)(非空)
function reg_ZwSz2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_ZwSz(str);
}

// 判断必须为中文,字母
function reg_ZwZm(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^[A-Za-z\u4e00-\u9fa5]*$/;
	return reg.test(str);
}

// 判断必须为中文,字母(非空)
function reg_ZwZm2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_ZwZm(str);
}

// 判断必须为数字(不含小数),字母
function reg_SzZm(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^[0-9A-Za-z]*$/;
	return reg.test(str);
}

// 判断必须为数字(不含小数),字母(非空)
function reg_SzZm2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_SzZm(str);
}

// 判断必须为中文,数字(不含小数),字母
function reg_ZwSzZm(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^[A-Za-z0-9\u4e00-\u9fa5]*$/;
	return reg.test(str);
}

// 判断必须为中文,数字(不含小数),字母(非空)
function reg_ZwSzZm2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_ZwSzZm(str);
}

// 判断必须为中文,数字(不含小数),下划线
function reg_ZwSzXHX(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^[0-9\u4e00-\u9fa5_]*$/;
	return reg.test(str);
}

// 判断必须为中文,数字(不含小数),下划线(非空)
function reg_ZwSzXHX2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_ZwSzXHX(str);
}

// 判断必须为中文,字母,下划线
function reg_ZwZmXHX(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^[A-Za-z\u4e00-\u9fa5_]*$/;
	return reg.test(str);
}

// 判断必须为中文,字母,下划线(非空)
function reg_ZwZmXHX2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_ZwZmXHX(str);
}

// 判断必须为数字(不含小数),字母,下划线
function reg_SzZmXHX(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^[0-9A-Za-z_]*$/;
	return reg.test(str);
}

// 判断必须为数字(不含小数),字母,下划线(非空)
function reg_SzZmXHX2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_SzZmXHX(str);
}

// 判断必须为中文,数字(不含小数),字母,下划线
function reg_ZwSzZmXHX(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^[\w\u4e00-\u9fa5]+$/;
	return reg.test(str);
}

// 判断必须为中文,数字(不含小数),字母,下划线(非空)
function reg_ZwSzZmXHX2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_ZwSzZmXHX(str);
}

// 判断必须为中文,数字(不含小数),字母(包括括号,-号)
function reg_ZwSzZmKhJh(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^[A-Za-z0-9\u4e00-\u9fa5\(\)\-]*$/;
	return reg.test(str);
}

// 判断必须为中文,数字(不含小数),字母(包括括号,-号)(非空)
function reg_ZwSzZmKhJh2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_ZwSzZmKhJh(str);
}

// 判断必须为正整数
function reg_Zzs(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^[0-9]*[1-9][0-9]*$/;
	return reg.test(str);
}

// 判断必须为正整数(非空)
function reg_Zzs2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_Zzs(str);
}

// 判断必须为零和正整数
function reg_Lzzs(str){
	if(reg_NULL(str)){
		return true;
	}
	if(str.replace(/(^\s*)|(\s*$)/g, "")=="0"){
		return true;
	}
	var reg = /^[0-9]*[1-9][0-9]*$/;
	return reg.test(str);
}

// 判断必须为零和正整数(非空)
function reg_Lzzs2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_Lzzs(str);
}

// 判断必须为正整数,小数
function reg_ZzsXs(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /[0-9]+(.[0-9]+)?/;
	return reg.test(str);
}

// 判断必须为正整数,小数(非空)
function reg_ZzsXs2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_ZzsXs(str);
}

// 判断必须为逗号隔开的字符串(包括中文,数字,字母)
function reg_DhZfc(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^([A-Za-z0-9\u4e00-\u9fa5]+[,])*([A-Za-z0-9\u4e00-\u9fa5]+)$/;
	return reg.test(str);
}

// 判断必须为逗号隔开的字符串(包括中文,数字,字母)(非空)
function reg_DhZfc2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_DhZfc(str);
}

// 判断必须为逗号隔开的字符串(包括中文,数字,字母,括号,下划线)
function reg_DhZfcKhXhxHgDh(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^([A-Za-z0-9\u4e00-\u9fa5\(\)_\-、]+[,])*([A-Za-z0-9\u4e00-\u9fa5\(\)_\-、]+)$/;
	return reg.test(str);
}

// 判断必须为逗号隔开的字符串(包括中文,数字,字母,括号,下划线)(非空)
function reg_DhZfcKhXhxHgDh2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_DhZfcKhXhxHgDh(str);
}

// 判断必须为QQ号
function reg_Qq(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^\d{5,10}$/;
	return reg.test(str);
}

// 判断必须为QQ号(非空)
function reg_Qq2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_Qq(str);
}

// 判断必须为IP号
function reg_Ip(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^\b((?!\d\d\d)\d+|1\d\d|2[0-4]\d|25[0-5])\.((?!\d\d\d)\d+|1\d\d|2[0-4]\d|25[0-5])\.((?!\d\d\d)\d+|1\d\d|2[0-4]\d|25[0-5])\.((?!\d\d\d)\d+|1\d\d|2[0-4]\d|25[0-5])\b$/;
	return reg.test(str);
}

// 判断必须为IP号(非空)
function reg_Ip2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_Ip(str);
}

// 判断必须为正确的邮箱格式
function reg_Email(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
	return reg.test(str);
}

// 判断必须为正确的邮箱格式(非空)
function reg_Email2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_Email(str);
}

// 判断必须为18位身份证
function reg_SFZ(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^\d{18}|\d{17}(X){1}$/;
	return reg.test(str);
}

// 判断必须为18位身份证(非空)
function reg_SFZ2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_SFZ(str);
}

// 判断必须为6位邮编
function reg_Yb(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^[0-9]{6}$/;
	return reg.test(str);
}

// 判断必须为6位邮编(非空)
function reg_Yb2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_Yb(str);
}

// 判断必须为手机号码
function reg_Sj(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^1\d{10}$/;
	return reg.test(str);
}

// 判断必须为手机号码(非空)
function reg_Sj2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_Sj(str);
}

// 判断必须为手机或座机号码(座机如:0755-863246)
function reg_SjZj(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^1\d{10}$|^(\d{3,4}-)\d{7,8}(-\d{1,6})?$/;
	return reg.test(str);
}

// 判断必须为手机或座机号码(座机如:0755-863246)(非空)
function reg_SjZj2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_SjZj(str);
}

// 判断折扣必须在0.01-1.00之间包括边界
function reg_ZheKou(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^([0][.][1-9][0-9]|[0][.][0-9][1-9])|[1][.][0][0]$/;
	return reg.test(str);
}

// 判断折扣必须在0.01-1.00之间包括边界(非空)
function reg_ZheKou2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_ZheKou(str);
}

// 判断是否是10元,20元,30元这种格式
function reg_MianZhi(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^([0-9]+[\u5143][,])*([0-9]+[\u5143])$/;
	return reg.test(str);
}

// 判断是否是10元,20元,30元这种格式(非空)
function reg_MianZhi2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_MianZhi(str);
}

// 判断登录用户名由数字,字母,下划线组成,长度为6-18位,第一个字符不能为数字
function reg_UserName(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^[0-9a-zA-Z_]{6,18}$/;
	if(reg.test(str)){
		if(!reg_Sz2(str.substr(0,1))){
			return true;
		}
	}
	return false;
}

// 判断登录用户名由数字,字母,下划线组成,长度为6-18位,第一个字符不能为数字(非空)
function reg_UserName2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_UserName(str);
}

// 判断密码由数字,字母,下划线组成且长度(最小值6,最大值20)
function reg_Password(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^[0-9a-zA-Z_]{6,20}$/;
	return reg.test(str);
}

// 判断密码由数字,字母,下划线组成且长度(最小值6,最大值20)(非空)
function reg_Password2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_Password(str);
}

// 判断必须为指定日期格式:格式如:2100-01-01,2100-1-1,02/20/2100
function reg_Rq(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^\d{4}\-[01]?\d\-[0-3]?\d$|^[01]\d\/[0-3]\d\/\d{4}$/;
	return reg.test(str);
}

// 判断必须为指定日期格式:格式如:2100-01-01,2100-1-1,02/20/2100(非空)
function reg_Rq2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_Rq(str);
}

// 判断必须为指定日期格式:格式如:2100-01-01,2100-1-1,02/20/2100,2100年01月01日
function reg_RqF(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^\d{4}\-[01]?\d\-[0-3]?\d$|^[01]\d\/[0-3]\d\/\d{4}$|^\d{4}年[01]?\d月[0-3]?\d[日号]$/;
	return reg.test(str);
}

// 判断必须为指定日期格式:格式如:2100-01-01,2100-1-1,02/20/2100,2100年01月01日(非空)
function reg_RqF2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_RqF(str);
}

// 判断必须为指定日期格式:格式如:2100-01-01 12:00:00,2100-1-1 12:00:00,02/20/2100 12:00:00
function reg_RqT(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^\d{4}\-[01]?\d\-[0-3]?\d (\d{2}):(\d{2}):(\d{2})$|^[01]\d\/[0-3]\d\/\d{4} (\d{2}):(\d{2}):(\d{2})$/;
	return reg.test(str);
}

// 判断必须为指定日期格式:格式如:2100-01-01 12:00:00,2100-1-1 12:00:00,02/20/2100 12:00:00(非空)
function reg_RqT2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_RqT(str);
}

// 判断必须为指定结构(Action):格式如:adminAction!method.action
function reg_ActionJg(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^([0-9a-zA-Z])+(!){1}([0-9a-zA-Z])+(.action){1}$/;
	return reg.test(str);
}

// 判断必须为指定结构(Action):格式如:adminAction!method.action(非空)
function reg_ActionJg2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_ActionJg(str);
}

// 判断图片类型必须为:(jpg|gif|png|jpeg|bmp|JPG|GIF|PNG|JPEG|BMP)
function reg_ImageType(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /(.*\.(jpg|gif|png|jpeg|bmp|JPG|GIF|PNG|JPEG|BMP))/;
	return reg.test(str);
}

// 判断图片类型必须为:(jpg|gif|png|jpeg|bmp|JPG|GIF|PNG|JPEG|BMP)(非空)
function reg_ImageType2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_ImageType(str);
}

// 判断字符串必须以字母开头,并且所有字符必须由字母或数字组成
function reg_ZmKt(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^[a-zA-Z]+\w*$/;
	return reg.test(str);
}

// 判断字符串必须以字母开头,并且所有字符必须由字母或数字组成(非空)
function reg_ZmKt2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_ZmKt(str);
}

// 判断验证码必须为4-6位字母或数字或它们的组合
function reg_Yzm(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^[a-zA-Z0-9]{4,6}$/;
	return reg.test(str);
}

// 判断验证码必须为4-6位字母或数字或它们的组合(非空)
function reg_Yzm2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_Yzm(str);
}

// 判断手机验证码必须为6位数字
function reg_SjYzm(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^\d{6}$/;
	return reg.test(str);
}

// 判断手机验证码必须为6位数字(非空)
function reg_SjYzm2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_SjYzm(str);
}

// 判断通商卡密码必须为6位数字
function reg_T3payCardPassword(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^\d{6}$/;
	return reg.test(str);
}

// 判断通商卡密码必须为6位数字(非空)
function reg_T3payCardPassword2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_T3payCardPassword(str);
}

// 判断通商卡号必须为19位数字
function reg_T3payCardNumber(str){
	if(reg_NULL(str)){
		return true;
	}
	var reg = /^\d{19}$/;
	return reg.test(str);
}

// 判断通商卡号必须为19位数字(非空)
function reg_T3payCardNumber2(str){
	if (reg_NULL(str)) {
		return false;
	}
	return reg_T3payCardNumber(str);
}

/***************************************************************************
 * mREG区(多参数REG)(与服务器JS同型验证)
 **************************************************************************/

// 判断字符串是否在自定长度范围内
function mReg_ZfCd(str,minLength,maxLength){
	str = fiNULL(str);
	if(reg_NULL(str)){
		return true;
	}
	if((str.length>minLength||str.length==minLength)&&(str.length<maxLength||str.length==maxLength)){
		return true;
	}
	return false;
}

// 判断字符串是否在自定长度范围内(非空)
function mReg_ZfCd2(str,minLength,maxLength){
	if (reg_NULL(str)) {
		return false;
	}
	return mReg_ZfCd(str,minLength,maxLength);
}
/*******************************************************************************
 * SET区,循环验证区被包含在JQUERY.METHOD.JS中
 ******************************************************************************/