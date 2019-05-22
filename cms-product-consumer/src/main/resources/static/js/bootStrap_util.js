/**
 * 动态加载下拉列表框
 * @param selectId  	下拉列表框ID
 * @param url			后台请求路径
 * @param type  		实体Bean对应展示字段名称		现阶段支持  text  和  name		不填默认是name
 * @param flag  		实体Bean对应展示字段名称		现阶段支持  text  和  name		不填默认是name
 * 
 * 实例					initSelect('searchDept','user/findSearchDeptList.do','text');
 * 						initSelect('searchRole','user/findSearchRoleList.do');
 */
initSelect = function(selectId,url,type){
	$.ajax({
		url:url,
		type:'post',
		data:{},
		dataType:'json',
		success:function(data){
			var option = '<option value="-1">请选择</option>';
			if (type == name || type == '' || type == undefined) {
				type = 'name';
			}
			for (var i = 0; i < data.length; i++) {
				if (type=='name') {
					option += '<option value="'+data[i].id+'">'+data[i].name+'</option>'
				}
				if (type=='text') {
					option += '<option value="'+data[i].id+'">'+data[i].text+'</option>'
				}
			}
			$("#"+selectId).html(option);
		}
	});
}



/**
 * 提示弹框
 * @param size		弹框尺寸
 * @param title		提示标题
 * @param message	提示内容
 * 
 * 	实例				alertbox('small','提示','删除失败');
 * 
 * 需要引入文件			<script src="<%=basePath%>js/bootstrap/bootstrap-bootbox/bootbox.js"></script>
 */
alertbox = function(size,title,message){
	bootbox.alert({
		size: size,
		title: title,
		message: message
	})
}


/**
 * 获取联动下拉框
 * @param selectId		动态加载下拉框
 * @param pid			父节点ID
 * @param url			后台请求路径
 */
getLinkage = function(selectId,pid,url){
	$.ajax({
		url:url,
		type:'get',
		async:false,
		data:{
			pid:pid
		},
		dataType:'json',
		success:function(data){
			var option = "<option value='-1'>请选择</option>";
			for (var i = 0; i < data.length; i++) {
				option += '<option value="'+data[i].id+'">'+data[i].type_name+'</option>';
			}
			$("#"+selectId).html(option);
		}
	});
}




/**
 * 初始化 地区二级联动  下拉框
 * id = "当前需要查询节点的上一级id"
 * url = "查询数据的后台控制层地址"
 * provinceDom = "省下拉框id"
 * cityDom = "市下拉框id"
 * 示例 initArea(0,'<%=path%>/student/findArea.do','provinceSelect','citySelect');
 */
function initArea(id,url,provinceDom,cityDom){
	$.ajax({
		url:url,
		type:'get',
		data:{
			id:id
		},
		dataType:'json',
		success:function(data){
			var html = "<option value='-1'>请选择</option>";
			for(var i = 0 ; i < data.length; i++){
				html += "<option value='"+data[i].id+"'>"+data[i].name+"</option>"
			}
			if(provinceDom != null && provinceDom != '' && cityDom != null && cityDom != ''){
				$('#'+provinceDom).html(html);
			}else if(provinceDom != null && provinceDom != ''){
				$('#'+provinceDom).html(html);
			}else if((provinceDom == null || provinceDom == '') && (cityDom != null && cityDom != '') ){
				$('#'+cityDom).html(html);
			}
			
		},
		error:function(){
			alert('初始化'+id+"节点下的数据失败")
		}
	})
	if(provinceDom != null || provinceDom != ''){
		initProvinceChange(provinceDom,url,cityDom);
	}
}


/**
 * 动态加载 地区二级联动 下拉框
 * @param provinceDom 省下拉框id
 * @param url		  查询数据后台地址
 * @param cityDom	  市下拉框id
 * @returns
 * 示例代码：initProvinceChange("provinceSelect","<%=request.getContextPath()%>/book/findArea.do","citySelect");
 */
function initProvinceChange(provinceDom,url,cityDom){
	$('#'+provinceDom).change(function(){
		var id = $(this).val();
		initArea(id,url,'',cityDom);
	})
}


/**
 * 批量删除
 * @param tableId	表格ID
 * @param url		后台请求路径
 * @param flag		是否删除前询问
 * @param fn		执行删除后的调用方法
 * 
 * 实例				$("#delUserBtn").click(function(){
						delMany('myTable','user/delUserInfo.do',true,'reloadTable()')
					});
 */
/*delMany = function(tableId,url,flag,fn){
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
}*/

/**
 * 单删
 * @param id	需要删除的数据主键
 * @param name	需要删除的数据名字
 * @param url	后台请求路径
 * @param flag	是否删除前询问
 * @param fn	执行删除后的调用方法
 * 
 * 
 * 
 */
delOne = function(id,url,flag,fn,name){
	
	if (name == '' || name == null || name == undefined) {
		name = '';
	}
	
	if (!flag) {
		del(id,url,fn);
		return;
	}
	bootbox.confirm({
		size: "small",
		message: "确定要删除"+name+"吗?", 
		callback: function(result){
			if (!result) {
				return;
			}
			del(id,url,fn);
		}
	});
}



/**
 * 删除方法
 * @param id	需要删除的数据主键
 * @param url	后台请求路径
 * @param fn	执行删除后的调用方法
 */
del = function(id,url,fn){
	
	$.ajax({
		url:url,
		type:'post',
		data:{
			ids:id
		},
		async:false,
		dataType:'json',
		success:function(data){
			if (data) {
				alertbox('small','提示','删除成功');
				eval(fn);
				return;
			}
			alertbox('small','提示','删除失败');
		}
	});
}


/**
 * 打开窗口，只能有一个按钮
 * @param title			窗口标题
 * @param url			内容引入页面跳转路径
 * @param label			按钮名字
 * @param className		按钮风格
 * @param fn			点击按钮调用方法
 * 
 * 实例					openDialog('保存用户信息窗口','page/toUserSave.do','保存','btn-info','saveUser()');
 * 
 * 需要引入文件				<script src="<%=basePath%>js/bootstrap/bootstrap-bootbox/bootbox.js"></script>
 * 
 * 				
 */
openDialog = function(title,url,label,className,fn){
	bootbox.dialog({
		size:'large',
		title:title,
	    message:createAddContent(url),
	    closeButton: true,
	    buttons: {
	        ok: {
	            label: label,
	            className: className,
	            callback: function(){
	            	eval(fn);
	            }
	        }
	    }
	});
}

/**
 * 
 * @param formId	表单ID
 * @param url		后台请求路径
 * @param tableId	刷新表格ID
 */
submitForm = function(formId,url,tableId){
	$.ajax({
		url:url,
		type:'post',
		data:$("#"+formId).serialize(),
		dataType:'json',
		success:function(data){
			if (data) {
				reload(tableId);
				return;
			}
			alertbox('small','提示','保存失败');
		}
	});
}


/**
 * 初始化展示表格
 * @param tableId		展示列表ID
 * @param toolbarId		工具条ID
 * @param rows			每页展示数据条数
 * 
 * 
 * 需要 引入 文件			<link rel="stylesheet" href="<%=basePath%>js/bootstrap/bootstrap-table/bootstrap-table.css">
						<script src="<%=basePath%>js/bootstrap/bootstrap-table/bootstrap-table.js"></script>
						<script src="<%=basePath%>js/bootstrap/bootstrap-table/locale/bootstrap-table-zh-CN.js"></script>
						
 * html					<div id="toolbar"></div>
						<div class="table" id="myTable"></div>
 * 
 */
initTable = function(){
	$('#tableId').bootstrapTable({
		toolbar:'#toolbar',
		url:'user/findUserBeanListByPage.do',
		method:'get',
		contentType:'application/x-www-form-urlencoded',//post请求按照表单方式
		pagination:true, //是否展示分页
		pageList:[1,2,5,10],//分页组件
		pageNumber:1,
		pageSize:2,//默认每页条数
		//search:true,//是否显示搜索框
		//searchText:'试试',//初始化搜索文字
		showColumns:false,//是否显示 内容列下拉框
		showToggle:false,//是否显示 切换试图（table/card）按钮
		showPaginationSwitch:false,//是否显示 数据条数选择框
		showRefresh:false,//是否显示刷新按钮
		detailView:false,//设置为 true 可以显示详细页面模式。
		showFooter:false,//是否显示列脚
		clickToSelect: true, //是否启用点击选中行
		sidePagination:'server',//分页方式：client客户端分页，server服务端分页（*
		striped:true,
		queryParams:function(){
			return {
				page: this.pageNumber,
				rows: this.pageSize,
			}
		},
		columns:[
			{checkbox:true},
			{field:'id',title:'id'},
			{field:'headImg',title:'头像',formatter:function(value,row,index){
				return '<img width="50px" height="50px" src="'+value+'"/>'
			}},
			{field:'username',title:'账号'},
			{field:'password',title:'密码',formatter:function(value,row,index){
				return "*********";
			}},
			{field:'sex',title:'性别',formatter:function(value,row,index){
				return value == 1 ? "男" : "女";
			}},
			{field:'birthday',title:'生日'},
			{field:'deptName',title:'部门'},
			{field:'status',title:'状态',formatter:function(value,row,index){
				return value == 0 ? "正常" : "<font color='red'>锁定</font>";
			}},
			{field:'phoneNumber',title:'电话号',formatter:function(value,row,index){
				//var ph = value.substring(0,8);
				return "****";
			}},
			{field:'roleName',title:'角色'},
			{field:'provinceName',title:'地区',formatter:function(value,row,index){
				return value + "-" + row.cityName;
			}},
			{field:'123',title:'操作',formatter:function(value,row,index){
				return 	'<a href="javascript:openUserEdit('+row.id+');">修改</a> '+
						'<a href="javascript:toDelUserInfo('+row.id+',\''+row.name+'\');">删除</a> ';
			}}
		]
	})
}


/**
 * 刷新展示表格
 * @param tableId	需要刷新的表格ID
 */
reload = function(tableId){
    $("#"+tableId).bootstrapTable("refresh");
}


/**
 * 初始化时间框		注意		html 文本框  class为  date
 * @param format	时间格式
 * 
 * 实例				initDateInput('yyyy-mm-dd');
 * 
 * 需要引入文件			<script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js"></script>
				  	<script type="text/javascript" src="<%=basePath%>js/bootstrap/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"></script>
				  	<link rel="stylesheet" href="<%=basePath%>js/bootstrap/bootstrap-datetimepicker/css/bootstrap-datetimepicker.css" type="text/css"></link>
				  	
 * html				<div class="form-group ">
						<label for="searchBirthday">生日</label>
						<div id="searchBirthday" class="input-group">
							<input type="text" class="form-control date" id="searchStartDate">
							<div class="input-group-addon"> <i class="glyphicon glyphicon-minus"></i> </div>
							<input type="text" class="form-control date" id="searchEndDate">
 						</div>
					</div>
 */
initDateInput = function(format){
	$('.date').datetimepicker({
		  language: 'zh-CN',//显示中文
		  format: format,//显示格式
		  minView: "month",//设置只显示到月份
		  initialDate: new Date(),//初始化当前日期
		  autoclose: true,//选中自动关闭
		  todayBtn: true//显示今日按钮
	});
}


/**
 * 上传插件
 * 需要引入文件			<script src="<%=basePath%>js/bootstrap/bootstrap-fileinput/js/fileinput.js"></script>
					<script src="<%=basePath%>js/bootstrap/bootstrap-fileinput/js/locales/zh.js"></script>
					<link rel="stylesheet" href="<%=basePath%>js/bootstrap/bootstrap-fileinput/css/fileinput.css">
					
					<div class="row">
						<div class="col-md-12 form-group" >
							<lable class="col-sm-2 control-label" for="fileInput">头像</lable>
							<div class="col-sm-10" id="fileInput">
								<input type="hidden" id="testimg" name="headImg" />
								<input type="file" multiple class="projectfile" accept="image/*" name="file" id="FileDom">
							</div>
						</div>
					</div>
					
 * @param imgname	需要回显的图片名称
 * @param path		服务器全路径	
 * var path = 'http://<%= request.getServerName()%>:<%=request.getServerPort()%><%=request.getContextPath()%>/upload/';
 */
initImg = function(path,imgname){
	$('#FileDom').fileinput({
		language: 'zh', //设置语言
		uploadUrl: 'upload/addFile.do', //上传的地址
		initialPreview:imgname,
		//初始化图片配置：
		initialPreviewConfig: [
   	        {key: 1, showDelete: false}
		 ],
		//是否初始化图片显示
		initialPreviewAsData: true,
		allowedFileExtensions: ['jpg', 'gif', 'png'],//接收的文件后缀
		showUpload: true, //是否显示上传按钮
		showCaption: false,//是否显示标题
		browseClass: "btn btn-primary", //按钮样式 
		//dropZoneEnabled: false,//是否显示拖拽区域
		//minImageWidth: 50, //图片的最小宽度
		//minImageHeight: 50,//图片的最小高度
		//maxImageWidth: 1000,//图片的最大宽度
		//maxImageHeight: 1000,//图片的最大高度
		//maxFileSize: 0,//单位为kb，如果为0表示不限制文件大小
		//minFileCount: 0,
		maxFileCount: 1, //表示允许同时上传的最大文件个数
		enctype: 'multipart/form-data',
		validateInitialCount:true,
		previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
		msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
		
	}).on('fileuploaded', function(event, data, previewId, index) {
		imgval = path+data.response.imgname;
		
		$('#testimg').val(imgval);
	});
}