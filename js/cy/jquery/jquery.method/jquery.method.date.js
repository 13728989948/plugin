function getDateByStr(a){if(!reg_NULL(a))return-1!=a.indexOf("-")&&(a=a.replaceAll("-","/")),new Date(Date.parse(a))};
