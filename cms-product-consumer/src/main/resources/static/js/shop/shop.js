// 初始化加载
$(function(){
	initMyTable();
})
// 上传logo
function uploadImgLogo(){
	$('#logoImg').fileinput({
		language: 'zh', //设置语言
		uploadUrl: '/product/updaloadImgLogo', //上传的地址
		allowedFileExtensions: ['jpg', 'gif', 'png'],//接收的文件后缀
		showUpload: true, //是否显示上传按钮
		showCaption: false,//是否显示标题
		browseClass: "btn btn-primary", //按钮样式
		dropZoneEnabled: false,//是否显示拖拽区域
		//minImageWidth: 50, //图片的最小宽度
		//minImageHeight: 50,//图片的最小高度
		//maxImageWidth: 1000,//图片的最大宽度
		//maxImageHeight: 1000,//图片的最大高度
		//maxFileSize: 0,//单位为kb，如果为0表示不限制文件大小
		//minFileCount: 0,
		maxFileCount: 7, //表示允许同时上传的最大文件个数
		enctype: 'multipart/form-data',
		validateInitialCount:true,
		previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
		msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",

	}).on('fileuploaded', function(event, data, previewId, index) {

		var imgval = $('#imgLogo').val();

		if(imgval == null || imgval == "" || imgval == undefined){
			imgval = data.response.img;

		}else{
			imgval += ","+data.response.img;/*","+"http://<%= request.getServerName()%>:<%=request.getServerPort()%><%=request.getContextPath()%>/"+data.response;*/
		}
		$('#imgLogo').val(imgval);
	});
}
// 上传图片
function uploadImg(){
	$('#headImg').fileinput({
		language: 'zh', //设置语言
		uploadUrl: '/product/updaloadImg', //上传的地址
		allowedFileExtensions: ['jpg', 'gif', 'png'],//接收的文件后缀
		showUpload: true, //是否显示上传按钮
		showCaption: false,//是否显示标题
		browseClass: "btn btn-primary", //按钮样式
		dropZoneEnabled: false,//是否显示拖拽区域
		//minImageWidth: 50, //图片的最小宽度
		//minImageHeight: 50,//图片的最小高度
		//maxImageWidth: 1000,//图片的最大宽度
		//maxImageHeight: 1000,//图片的最大高度
		//maxFileSize: 0,//单位为kb，如果为0表示不限制文件大小
		//minFileCount: 0,
		maxFileCount: 7, //表示允许同时上传的最大文件个数
		enctype: 'multipart/form-data',
		validateInitialCount:true,
		previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
		msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",

	}).on('fileuploaded', function(event, data, previewId, index) {

		var imgval = $('#testimg').val();

		if(imgval == null || imgval == "" || imgval == undefined){
			imgval = data.response.imgg;

		}else{
			imgval += ","+data.response.imgg;/*","+"http://<%= request.getServerName()%>:<%=request.getServerPort()%><%=request.getContextPath()%>/"+data.response;*/
		}
		$('#testimg').val(imgval);
	});
}
// 批量删除
$("#delBtn").click(function () {
	delMany("myTable","/product/delProduct",true,"searchProduct()");
});

delMany = function(tableId,url,flag,fn){
	var arr = $("#"+tableId).bootstrapTable('getSelections');
	var ids = '';
	names = '';
	var n = 0;
	for ( var i = 0; i < arr.length; i++) {
		ids += ids == '' ? arr[i].id : ',' + arr[i].id;
		names += names == '' ? arr[i].productTitle : ',' + arr[i].productTitle;
		n++;
	}

	if (arr.length <= 0) {
		alertbox("small","提示","请选择要删除的数据");
		return;
	}

	if (flag) {
		bootbox.confirm({
			size: "small",
			message: "确定要删除"+names+"吗?",
			callback: function(result){
				if (!result) {
					return;
				}
				del(ids,url,fn);
			}
		});
		return;
	}
	del(ids,url,fn);
}

// 页面加载表格
function initMyTable(){
	$('#myTable').bootstrapTable({
		url:'/product/findProductList',
		toolbar:'#toolbar',
		columns:[
			{checkbox:true},
			{field:'productTitle',title:'标题',width:300},
			{field:'brandName',title:'品牌',width:100},
			{field:'typeName',title:'类型',width:150},
			{field:'productPrice',title:'价格',width:100},
			{field:'colorName',title:'颜色',width:150},
			{field:'sizeName',title:'尺寸',width:100},
			{field:'productStock',title:'库存',width:100},
			{field:'productTime',title:'上架时间',width:200},
			{field:'productSales',title:'销量',width:100},
			{field:'productComments',title:'累计评论',width:100},
			{field:'productConcern',title:'关注量',width:100},
			{field:'productState',title:'上\下架',formatter:function(value,row,index){
					return value == 1 ? "未上架" : "已上架";
				},width:100},
			{field:'productAudit',title:'审核状态',formatter:function(value,row,index){
					return value == 1 ? "待审核" : "审核通过";
				},width:100},
			{field:'productSelling',title:'热卖状态',formatter:function(value,row,index){
					return value == 1 ? "非热卖" : "热卖";
				},width:100},
			{field:'123',title:'操作栏',formatter:function(value,row,index){
					var btn = "<a href='javascript:editProduct("+row.id+");'>增加库存</a>  ";
					if (row.productState == 1) {
						btn += "<a href='javascript:editState("+row.id+","+row.productState+","+row.productAudit+");'>上架</a>  ";

					}if (row.productState == 0) {
						btn += "<a href='javascript:editState("+row.id+","+row.productState+");'>下架</a>  ";
						if (row.productSelling == 1) {
							btn += "<a href='javascript:editSelling("+row.id+","+row.productSelling+");'>热卖</a>  ";
						}else{
							btn += "<a href='javascript:editSelling("+row.id+","+row.productSelling+");'>取消热卖</a>  ";
						}

					}
					return  btn;
				},width:200}
		]
	})
}
// 新增弹框
$("#addBtn").click(function(){
	bootbox.dialog({
		title:'<i class="glyphicon glyphicon-user"></i>新增',
		message:$.parseHTML(createAddContent('/page/toAddProduct')),
		size: 'large',
		closeButton:true,
		buttons:{
			ok: {
				label: "<i class='glyphicon glyphicon-floppy-saved'></i>保存",
				className: 'btn-info',
				callback: function(){
					saveProduct();
				}
			}
		}
	})
	uploadImg();
	uploadImgLogo();
	initBrandSelect();
	initColorSelect();
	initSizeSelect();
	getLinkage('typeSelect',0,'/product/findType');
})
// 刷新页面函数
function searchProduct(){
	$('#myTable').bootstrapTable('refresh')
}
// 刷新页面函数
function searchLogo(){
	$('#myTab').bootstrapTable('refresh')
}
// 新增提交
function saveProduct(){
	$.ajax({
		url:'/product/saveProduct',
		type:'post',
		data:$("#productForm").serialize(),
		dataType:'json',
		success:function(data){
			if (data) {
				bootbox.alert("保存成功");
				searchProduct();
			}else{
				bootbox.alert("保存失败");
			}
		}
	})
}
// 同步请求 根据新增弹框引用html页面
var res;
function createAddContent(url){
	$.ajax({
		url:url,
		async:false,
		success:function(data){
			res = data;
		}
	});
	return res;
}


//加载尺寸下拉
function initSizeSelect(){
	$.ajax({
		url:'/product/findSize',
		type:'get',
		data:{},
		dataType:'json',
		success:function(data){
			var html = '<option value="-1">请选择</option>';
			for (var i = 0; i < data.length; i++) {
				html += "<option value='"+data[i].id+"'>"+data[i].size_name+"</option>";
			}
			$("#inputSize").html(html);
		}
	})
}
//加载颜色下拉
function initColorSelect(){
	$.ajax({
		url:'/product/findColor',
		type:'get',
		data:{},
		dataType:'json',
		success:function(data){
			var html = '<option value="-1">请选择</option>';
			for (var i = 0; i < data.length; i++) {
				html += "<option value='"+data[i].id+"'>"+data[i].color_name+"</option>";
			}
			$("#inputColorId").html(html);
		}
	})
}
//加载品牌下拉
function initBrandSelect(){
	$.ajax({
		url:'/product/findBrand',
		type:'get',
		data:{},
		dataType:'json',
		success:function(data){
			var html = '<option value="-1">请选择</option>';
			for (var i = 0; i < data.length; i++) {
				html += "<option value='"+data[i].id+"'>"+data[i].brand_name+"</option>";
			}
			$("#inputBrandId").html(html);
		}
	})
}
// 修改库存弹框
function editProduct(id){
	bootbox.dialog({
		title:'<i class="glyphicon glyphicon-user"></i>增加库存',
		message:createAddContent('/page/toUpdate'),
		size: 'small',  // large  弹框略大     small  代表弹框略小
		closeButton:true,
		buttons:{
			ok: {
				label: "<i class='glyphicon glyphicon-floppy-saved'></i>保存",
				className: 'btn-info',
				callback: function(){
					editProductStock(id);
				}
			}
		}
	})
}
/**
 *修改库存数量
 * @param id
 *
 */
function editProductStock(id) {
	$.ajax({
		url:'/product/editProduct',
		type:'post',
		data:{
			id:id,
			num:$("#inputProductStock").val()
		},
		dataType:'json',
		success:function(data){
			searchProduct();
		}
	})
}

/**
 *修改上下架状态
 * @param id
 * @param state
 */
function editState(id,state,audit) {
	if (audit == 1 && state == 1){
		bootbox.alert("未审核商品不能做上架操作");
		searchProduct();
	}else{
		$.ajax({
			url:'/product/editState',
			type:'post',
			data:{
				id:id,
				state:state
			},
			dataType:'json',
			success:function(data){
				searchProduct();
			}
		})
	}
}

/**
 * 设置热卖  and  取消热卖
 * @param id
 * @param selling
 */
function editSelling(id,selling) {
	$.ajax({
		url:'/product/editSelling',
		type:'post',
		data:{
			id:id,
			selling:selling
		},
		dataType:'json',
		success:function(data){
			searchProduct();
		}
	})
}