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
	
	//加载在  自定义下拉的样式
	function loadStyle(href){ 
		href = trimAll(href);
		if(!href){console.log("请检查样式地址是否正确")}

		var oHead = document.getElementsByTagName("head")[0];
		var Link = document.createElement("link");

		Link.setAttribute("rel", "stylesheet");
		Link.setAttribute("type", "text/css");
		Link.setAttribute("href", href);

		oHead.appendChild(Link);
	}

	//对传入的字符串 去掉所有的空格
	function trimAll(str){ 
		if (typeof str ==="string") {
			str=str.replace(/\s/g,"");
			return str.length>0?str:false;
		}
		return false;
	};

	//
	
	var FHselect = function(options){
		options = options || {};
		this.container = options.container || "";
		
		this.cityId = options.cityId || "0";
		this.bottomLayerId = options.bottomLayerId || "0";
		this.addLayerId = options.addLayerId || "0";

		this.topLayerURL = options.topLayerURL || "";
		this.bottomLayerURL = options.bottomLayerURL || "";
		this.addLayerURL = options.addedLayerURL || "";

		this.styleLink = options.styleLink || "./src/select.css"; 		// * 上线前添加一个默认样式链接
		



		loadStyle(this.styleLink);
	};
	

	FHselect.prototype.getTopData=function(){
		
	};
	FHselect.prototype.getBottomData=function(){
		
	};
	FHselect.prototype.getAddData=function(){
		
	};

	return FHselect;
}));


















var str = "d d ";
var select=new FHselect({
	"container" : "#mySelect",     				//结构中  包裹 下拉列表 最外层 盒子的id
	"topLayerURL" : "topData.txt", 		   				//第一级下拉列表的 数据接口
	"bottomLayerURL" : "bottomData.txt",						//第二级下拉列表的 数据接口
	"addedLayerURL" : "addData.txt",						//第三级下拉列表的 数据接口
	"styleLink" : ""							//外联样式 链接地址   可选项
})
console.log(select);
alert(select);