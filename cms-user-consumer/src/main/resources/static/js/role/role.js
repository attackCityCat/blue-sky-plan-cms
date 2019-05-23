// 角色管理
$(document).ready(function() {
		window.roleId = '';
		window.userArr = [];
		window.userlist = [];
		window.selectResourceIds = [];
	    initMyTable();
	$('#relateUserModal').on('hide.bs.modal', function() {
		window.roleId = '';
		window.userArr = [];
		window.userlist = [];
	});
	$('#relateFuncModal').on('hide.bs.modal', function() {
		window.roleId = '';
		window.selectResourceIds = [];
	});
	$('#roleModal').on('hide.bs.modal', function() {
		$("#role").val('');
		$("#code").val('');
		$('#code').show()
		window.roleId = '';
	});
});

// 初始化加载
$(function(){
	initMyTable();
})

// 页面加载表格
function initMyTable(){
	$('#table').bootstrapTable({
		url:'/role/getroleinfo',
		method : 'get',
		//toolbar:'#toolbar',
		//pagination:true, //是否展示分页
		//pageList:[1,2,3,5, 10, 20, 50],//分页组件
		//pageNumber:1,
		//pageSize:5,	//默认每页条数
		//sidePagination:'server',//分页方式：client客户端分页，server服务端分页（*
		//striped:true,
		//clickToSelect: true, //是否启用点击选中行
		//queryParams:function(){
		// return  {
		//     page:this.pageNumber,
		//     rows:this.pageSize
		// }
		//},
		columns : [
			{
				align:'center',
				field : 'rolename',
				title : '角色'
			},
			{
				align:'center',
				field : 'status',
				title : '是否有效',
				formatter : function(value, row, index) {
					if (value != undefined) {
						if (value == '0') {
							return '否';
						} else {
							return '是';
						}
					}
				}
			},


			{
				align:'center',
				field : 'modifyTime',
				title : '最后修改时间',
				formatter : function(value, row, index) {
					if (value != undefined) {
						var crtTime = new Date(value);
						return dateFtt(
							"yyyy-MM-dd hh:mm:ss",
							crtTime);
					}
				}
			},
			{field:'123',title:'操作栏',formatter:function(value,row,index){
					var btn = "";
					if (row.roleid > 1) {
						btn += "<a href='javascript:editProduct(" + row.roleid + ");'>关联用户</a>   ";
						btn += "<a href='javascript:editState(" + row.roleid + ");'>关联功能</a>  ";
					}
					return  btn;
				}}
		]
	})
}

// 修改库存弹框
function editProduct(roleid){
	bootbox.dialog({
		title:'<i class="glyphicon glyphicon-user"></i>选择用户',
		message:createAddContent('/page/toUpdateRole'),
		size: 'small',  // large  弹框略大     small  代表弹框略小
		closeButton:true,
		buttons:{
			ok: {
				label: "<i class='glyphicon glyphicon-floppy-saved'></i>保存",
				className: 'btn-info',
				callback: function(){
					editProductStock(roleid);
				}
			}
		}
	})
}


function editProductStock(roleid) {
	$.ajax({
		url:'/role/editUser',
		type:'post',
		data:{
			roleid:roleid,
			userid:$("#productStock").val()
		},
		dataType:'json',
		success:function(data){
			if(data){
				searchProduct();
			}else {
				searchProduct();
			}

		}
	})
}


// 刷新页面函数
function searchProduct(){
	$('#table').bootstrapTable('refresh')
}




// 删除用户列表选中项
function handleClick(e, userId) {
	$(e).parent().remove();
	var massage = "未知错误,联系管理员";
	var canelSelectUser = [ userId ];
	if ($(e).attr("isnew") == "yes") {
		$(e).parent().remove();
		
	}else{
		$.ajax({
			type:"post",
			data:{
				'roleId':"",
				'userId':"'"+userId+"'",
				'sou':-2
			},
			cache : false,
			async : false,
			url : '/user/save',
			success : function(data, textStatus, jqXHR) {
				message = '操作用户成功';
				$(e).parent().remove();
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				message = '请求失败';
			}
		});
	}
	
	
	$('#userTable').bootstrapTable('uncheckBy', {
		field : 'userId',
		values : canelSelectUser
	});
}

// 选中的用户列表
function selectUser() {
	var selectUsers = [];
	$('.user-form>input[type="hidden"]').each(function(index, input) {
		selectUsers.push($(input).val());
		$.each(window.userlist, function(index, row) {
			if (selectUsers.indexOf(row) >= 0) {
				removeByValue(selectUsers, row);
			}
		})
	});
	var message = '无选中的关联用户';
	if (selectUsers.length > 0) {
		var userIds = "";
		$.each(selectUsers, function(index, row) {
			if (userIds == "") {
				userIds += "'"+row+"'";
			}else{
				userIds += "," + "'"+row+"'";
			}
		});
		$.ajax({
			type : 'get',
			url : '/user/save',
			data : {
				'userId' : userIds,
				'roleId' : window.roleId,
				'sou' : -2
			},
			cache : false,
			async : false,
			dataType : 'json',
			success : function(data, textStatus, jqXHR) {
				message = '操作用户成功';
				alert(message);
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				message = '请求失败';
				alert(message);
			}
		});
	}
	if (message == '操作用户成功') {
		$('#relateUserModal').modal('toggle');
		checkRole();
	} 
}


// 阻止添加重复的需要提交的用户数据
function preventRepeatUser(index) {
	if (window.userArr.indexOf(index) >= 0) {
		return true;
	}
	window.userArr.push(index);
}

// Array删除指定数组元素
function removeByValue(arr, val) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == val) {
			arr.splice(i, 1);
			break;
		}
	}
}



// 功能列表点击事件
function onCheck(event, treeId, treeNode) {
	window.selectResourceIds = [];
	var treeObj = $.fn.zTree.getZTreeObj("tree");
	var parentNode=treeNode.getParentNode();
    var state=parentNode?parentNode.check_Child_State:null;
    console.log(state);
    if(state==1){
        treeObj.checkNode(parentNode, true, true);
        onCheck(event, treeId, parentNode);
    }else  if(state==1||state==0){
        treeObj.checkNode(parentNode, false, false);
        onCheck(event, treeId, parentNode);
    }
	var nodes = treeObj
			.getCheckedNodes(true);
	for (var i = 0; i < nodes.length; i++) {
		window.selectResourceIds.push(nodes[i].id); // 获取所有选中节点的id
	}
}

// 给角色关联功能
function saveResource() {
	$.ajax({
		type : 'get',
		url : '/role/saveresourceids',
		data : {
			'roleId' : window.roleId,
			'resourceIds' : window.selectResourceIds.join(",")
		},
		cache : false,
		async : false,
		dataType : 'json',
		success : function(data, textStatus, jqXHR) {
			if (data.status == '0') {
				$('#relateFuncModal').modal('toggle');
				checkRole();
			} else {
//				layer.open({
//					content : data.message
//				});
				alert(data.message);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
//			layer.open({
//				content : '请求失败'
//			});
			alert('请求失败');
		}
	});
}

// 修改角色
function updateRole(roleId) {
	$('#code').hide();
	window.roleId = roleId;
}

// 增加/修改角色
function saveRole() {
	var data = '';
	if (window.roleId == '') {
		data = {
			'role' : $("#role").val(),
			'code' : $("#code").val()
		};
	} else {
		data = {
			'roleId' : window.roleId,
			'role' : $("#role").val()
		};
	}
	$.ajax({
		type : 'get',
		url : '/role/saverole',
		data : data,
		cache : false,
		async : false,
		dataType : 'json',
		success : function(data, textStatus, jqXHR) {
			if (data.status == '0') {
				$('#roleModal').modal('toggle');
				checkRole();
			} else {
//				layer.open({
//					content : data.message
//				});
				alert(data.mesage);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
//			layer.open({
//				content : '请求失败'
//			});
			alert('请求失败');
		}
	});
}