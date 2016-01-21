(function (root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports = factory();
	else
		root.FHselect=factory();
}(this, function() {

	//添加 绑定 事件
	function addEvent(obj, sEv, fn) {
	    if (obj.addEventListener) {
	        obj.addEventListener(sEv, function(ev) {
	            var oEvent = ev || event;
	            if (fn.apply(obj, arguments) == false) {
	                oEvent.cancelBubble = true;
	                oEvent.preventDefault();
	            }
	        }, false);
	    } else {
	        obj.attachEvent('on' + sEv, function(ev) {
	            var oEvent = ev || event;
	            if (fn.apply(obj, arguments) == false) {
	                oEvent.cancelBubble = true;
	                return false;
	            }
	        });
	    }
	}

	//加载在  自定义下拉的样式
	function loadStyle(href) {
	    href = trimAll(href);
	    if (!href) {
	        console.log("请检查样式地址是否正确")
            return;
	    }

	    var oHead = document.getElementsByTagName("head")[0];
	    var Link = document.createElement("link");

	    Link.setAttribute("rel", "stylesheet");
	    Link.setAttribute("type", "text/css");
	    Link.setAttribute("href", href);

	    oHead.appendChild(Link);
	}

	//对传入的字符串 去掉所有的空格
	function trimAll(str) {
	    if (typeof str === "string") {
	        str = str.replace(/\s/g, "");
	        return str.length > 0 ? str : false;
	    }
	    return false;
	};

	//获取 城市 下拉 数据
	function getCityData(url) {
		url = trimAll(url);
		if (url==1){
			console.log("locationURl 设置不正确");
			return;
		};
		if(userMsg.cityId == 0 || !userMsg.cityId){
			//初始化  城市  显示为  “选择城市”
		}
		if (userMsg.cityId == 3066) {
			//初始化 城市  显示为  “北京”
		};

        $.ajax({
            "url" : url,
            "type" : "get",
            "data" : {},
            "dataType" : "json",
           	success : function(json){
				if(json.errno == 0){
					var def={"id":0,"name":"选择城市"};
					json.data.unshift(def);
					cache.areaData=json.data;
				}else{
					cache.areaData=[];
					console.log("areaURL 返回的数据中 errno的值 ！= 0");
				}
			}
        })
    }

	//获取 商区 下拉 数据
	function getAreaData(url) {
		url = trimAll(url);
		if (url==1){
			console.log("cityURL 设置不正确");
			return;
		};
		if(userMsg.cityId == 0)return;
        $.ajax({
            "url" : url,
            "type" : "get",
            "data" : {
                "cityId" : userMsg.cityId
            },
            "dataType" : "json",
           	success : function(json){
				if(json.errno == 0){
					cache.areaData=json.data;
				}else{
					cache.areaData="";
					console.log("areaURL  errno的值 不为 0");
				}
			}
        })
    }





	var userMsg={},
        cache={
        	cityData:[
        		{"id":0,"name":"选择城市"},
        		{"id":3066,"name":"北京"}
        	],
        	locationData:[
        		{"id":0,"name":"选择商圈"}
        	],
        	areaData:[
        		{"id":0,"name":"选择区域"}
        	]
        };

	var FHselect = function (options){
		options = options || {};
		this.container = options.container || "";

		userMsg.cityId = options.cityId || "0";
		userMsg.locationId = options.locationId || "0";
		userMsg.areaId = options.areaId || "0";

		this.cityURL = options.cityURL || "./src/addData.txt";
		this.locationURl = options.locationURl || "./src/topData.txt";
		this.areaURL = options.areaURL || "./src/bottomData.txt";

		this.styleLink = options.styleLink || "./src/select.css"; 		// * 上线前添加一个默认样式链接


		getCityData(this.locationURl);

		loadStyle(this.styleLink);
	};

	FHselect.prototype.getMsg = function() {
	    return userMsg;
	};

	return FHselect;
}));


















var str = "d d ";
var select = new FHselect({
	"container" : "#mySelect",     				//结构中  包裹 下拉列表 最外层 盒子的id
	
	"cityId" : "3066",		//初始化 city，  填写 城市对应的 id ，  例如：显示北京，则需要填入 3066；
	"locationId" : "0",
	"areaId" : "0",

	"cityURL" : "./src/addData.txt",				//第1级下拉列表的 数据接口     城市列表
	"locationURl" : "./src/topData.txt", 		   	//第2级下拉列表的 数据接口     区域列表
	"areaURL" : "./src/bottomData.txt",				//第3级下拉列表的 数据接口     商圈列表
	"styleLink" : ""							//外联样式 链接地址   可选项
})
console.log(select);
alert(select);
