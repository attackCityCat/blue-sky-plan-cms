/*创建同步树
 * 
 * treeId	字符串型参数	调用tree方法元素ID
 * 
 * url		字符串型参数	同步树后台方法路径
 * 
 * tabId	字符串型参数	选项卡  easyui-tabs DIV_ID
 * */
createSyncTree = function(treeId,url,tabId){
	$("#"+treeId).tree({
		url:url,
		lines:true,//开启连线
		onClick:function(node){//点击事件	参数为点击节点
			//判断该节点是否有子节点 如果有 则 无效
			if (node.children.length <= 0) {
				//通过节点名字	判断该节点对应选项卡是否打开  如果打开则选中该节点对应选项卡  否则打开该节点对应选项卡 
				var exists = $("#"+tabId).tabs('exists',node.text);
				if (exists) {
					$("#"+tabId).tabs('select',node.text);//选中该节点对应选项卡
				}else{
					$("#"+tabId).tabs('add',{//选中该节点对应选项卡
						title:node.text,//标题
						content:createIframe(node.url),//内容，通过createIframe(url)方法 填充该选项卡内容
						closable:true,//开启可关闭按钮
						tools:[{
							iconCls:'icon-mini-refresh',//刷新图标
							handler:function(){
								var tab = $("#"+tabId).tabs('getSelected');//找到该选项卡
								//刷新选项卡
								$("#"+tabId).tabs('update',{
									tab:tab,
									options:{
										content:createIframe(node.url)
									}
								});
								
							}
						}]
					});
				}
			}
		}
	});
}
//初始化util树
initUtilTree = function(treeId,url,tabId){
	$("#"+treeId).tree({
		url:url,
		parentField:'pid',
		lines:true,
		onClick:function(node){//点击事件	参数为点击节点
			//判断该节点是否有路径 如果没有 则 无效
			if (node.url != null && node.url != '') {
				//通过节点名字	判断该节点对应选项卡是否打开  如果打开则选中该节点对应选项卡  否则打开该节点对应选项卡 
				var exists = $("#"+tabId).tabs('exists',node.text);
				if (exists) {
					$("#"+tabId).tabs('select',node.text);//选中该节点对应选项卡
				}else{
					$("#"+tabId).tabs('add',{//选中该节点对应选项卡
						title:node.text,//标题
						content:createIframe(node.url),//内容，通过createIframe(url)方法 填充该选项卡内容
						closable:true,//开启可关闭按钮
						tools:[{
							iconCls:'icon-mini-refresh',//刷新图标
							handler:function(){
								var tab = $("#"+tabId).tabs('getSelected');//找到该选项卡
								//刷新选项卡
								$("#"+tabId).tabs('update',{
									tab:tab,
									options:{
										content:createIframe(node.url)
									}
								});
								
							}
						}]
					});
				}
			}
		}


	});
}
//创建内联框架
//url	字符串型参数	内联框架引入路径
createIframe = function(url){
	return "<iframe src='"+url+"' width='99%' height='99%'></iframe>";
}


//打开窗口	关键样式：easyui-dialog
openDialog = function(dialogId,title,iconCls,formId){
	//重置表单
	$("#"+formId).form('reset');
	//初始化新增窗口
	$("#"+dialogId).dialog({
		title:title,
		iconCls:iconCls,
		closed:false
	});
}


//关闭窗口
closeDialog = function(dialogId){
	$("#"+dialogId).dialog('close');
}


//二级联动 动态获取下拉列表框
// id:一级下拉列表框ID	初始父节点ID	二级下拉列表框ID
get = function(id,pid,cid){
	$("#"+id).combobox({
		url:'book/queryAddr.do?pid='+pid,
		valueField:'id',
		textField:'name',
		editable:false,
		onChange:function(newValue,oldValue){
			$("#"+cid).combobox({
				url:'book/queryAddr.do?pid='+newValue,
				valueField:'id',
				textField:'name',
				editable:false
			});
		}
	});
}


//获取树状下拉列表	无需关键样式	利用递归
getSelectTree = function(id,url){
	$("#"+id).combotree({
		url:url,
		onClick:function(node){
  			if (node.children.length > 0) {
				$.messager.alert('提示','无法选择该类型！','warning');
				$("#"+id).combotree('setValue','');
			}
  		}
	});
}

//获取下拉列表		关键样式：class="easyui-combobox"
getSelect = function(id,url){
	$("#"+id).combobox({
		url:url,//后台请求路径
		editable:false,//是否可直接修改
		valueField:'id',//value值对应字段
		textField:'name'//显示文本对应字段
	});
}


//初始化 展示表格
/*
show = function(){
	$("#tableId").datagrid({
		url:'',
		method:'post',
		toolbar:'#toolbar',
		fit:true,
		pagination:true,
		pageSize:4,
		pageList:[1,2,3,4,5,6,7,8,9,10],
		pageNumber:1,
		columns:[[
			{field:'123',checkbox:true},
			{field:'id',title:'编号'},
			{field:'name',title:'名称'},
			{field:'author',title:'作者'},
			{field:'url',title:'封面',formatter:function(value,row,index){
				return "<img src='<%=basePath%>upload/"+value+"' width='120px' height='80px' />";
			}},
			{field:'provinceName',title:'地址',formatter:function(value,row,index){
				return value+"--"+row.cityName;
			}},
			{field:'info',title:'详情'},
			{field:'456',title:'操作',formatter:function(value,row,index){
				return "<a href=''>修改</a>";
			}}
		]]
	});
}

*/

queryById = function(id,url,formId,editor,path){
	
	$.ajax({
		url:url,
		type:'post',
		data:{
			id:id
		},
		dataType:'json',
		success:function(data){
			$("#"+formId).form('load',data);
			editor.html(data.info);
			$("#imgDom2").prop('src',path+'upload/'+data.url);
		}
		
	});
}



//批量删除
delMany = function(tableId,url,flag){
		var arr = $("#"+tableId).datagrid('getSelections');
		var ids = '';
		names = '';
		var n = 0;
		for ( var i = 0; i < arr.length; i++) {
			ids += ids == '' ? arr[i].id : ',' + arr[i].id;
			names += names == '' ? arr[i].name : ',' + arr[i].name;
			n++;
		}
		if (arr.length <= 0) {
			$.messager.alert('提示','请选择需要删除的数据','info');
			return;
		}
		
		if (flag) {
			$.messager.confirm('提示','你确定要删除'+names+'吗？',function(boo){
				if (boo) {
					del(ids,url);
					delTwo(ids,url);
				}
			});
			return;
		}
		del(ids,url);
		delTwo(ids,url);
}
delManyMenu = function(tableId,url,flag){
	var arr = $("#"+tableId).datagrid('getSelections');
	var ids = '';
	names = '';
	var n = 0;
	for ( var i = 0; i < arr.length; i++) {
		ids += ids == '' ? arr[i].id : ',' + arr[i].id;
		names += names == '' ? arr[i].name : ',' + arr[i].name;
		n++;
	}
	if (arr.length <= 0) {
		$.messager.alert('提示','请选择需要删除的数据','info');
		return;
	}
	
	if (flag) {
		$.messager.confirm('提示','你确定要删除'+names+'吗？',function(boo){
			if (boo) {
				delMenu(ids,url);
			}
		});
		return;
	}
	
	delMenu(ids,url);
	
}




//单删
delOne = function(id,flag){
	//queryNameById
	$.ajax({
		url:'book/queryById.do?id='+id,
		success:function(data){
			if (flag) {
				$.messager.confirm('提示','确定删除'+data.name+'吗？',function(boo){
					if (boo) {
						del(id,'book/del.do');
						return
					}
				});
				return;
			}
			del(id,'book/del.do');
		}
	});
	
}

//执行删除
del = function(id,url){
	$.ajax({
		url:url,
		data:{
			ids:id
		},
		success:function(){

			$.messager.alert('提示','删除成功','info',function(){
				init('myTable','role/findRoleList.do');
			});

		}
	});
}
//执行删除
delMenu = function(id,url){
	$.ajax({
		url:url,
		data:{
			ids:id
		},
		success:function(){
			$.messager.alert('提示','删除成功','info',function(){
				load();
			});
			
		}
	});
}
delTwo = function(id,url){
	$.ajax({
		url:url,
		data:{
			ids:id
		},
		success:function(){
			
			$.messager.alert('提示','删除成功','info',function(){
				initUserTable('myTable','role/findUserList.do');
			});
			
		}
	});
}




