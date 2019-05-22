// 角色管理
$(document).ready(function() {
		window.roleId = '';
		window.userArr = [];
		window.userlist = [];
		window.selectResourceIds = [];
		getData();
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

// 带条件搜索角色列表
function checkRole() {
	$('#table').bootstrapTable('destroy');
	getData();
}

// 填充角色列表组件
function getData() {
	$('#table')
			.bootstrapTable(
					{
						url : '/role/getroleinfo',
						method : 'get',
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
										var string = '';
										if (row.roleid > 1) {
											string += '<button class="btn btn-xs btn-danger m-r-5" data-toggle="modal" data-target="#modalAddUser" onclick="editProductStock(\''
												+ row.roleid
												+ '\')"><i class="fa fa-trash"></i>关联用户</button>';
											string += '<button class="btn btn-xs btn-info m-r-5" data-toggle="modal" data-target="#modalAddUser" onclick="editProductStock(\''
												+ row.roleid
												+ '\')"><i class="fa fa-edit"></i>关联功能</button>';
										}
										return [ string ].join('');
									},width:200}
								]
					})
}


       function editProductStock(roleid,userid) {
	          $.ajax({
		             url:'/role/editUser',
		             type:'post',
		             data:{
			              roleid:roleid,
			              userid:userid
		                  },
				     dataType:'json',
		             success:function(data){
			                if(data){
				                   searchProduct();
			                }else{
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