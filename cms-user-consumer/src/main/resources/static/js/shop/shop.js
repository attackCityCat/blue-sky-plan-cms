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
						striped : true,
						cache : false,
						pagination : true,
						sortable : true,
						sortOrder : "asc",
						sidePagination : "server",
						pageNumber : 1,
						pageSize : 10,
						pageList : [ 10, 25, 50, 100 ],
						strictSearch : true,
						showColumns : false,
						uniqueId : "roleId",
						queryParamsType : '',
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
								{
									field : 'loadsum',
									align: 'center',
									title : '操作',
									formatter : function(value, row, index) {
										return [
												'<button class="btn btn btn-xs btn-info m-r-5"><i class="fa fa-user-circle-o"></i><span class="like user"  data-toggle="modal" data-target="#relateUserModal" onclick="getRoleId(\''
														+ row.roleId + '\')">',
												'关联用户',
												'</span> </button>',
												'<button class="btn btn btn-xs btn-success m-r-5"><i class="fa fa-sliders"></i><span class="like func"  data-toggle="modal" data-target="#relateFuncModal" onclick="getResource(\''
														+ row.roleId
														+ '\',\''
														+ row.resourceIds
														+ '\')">',
												'关联功能',
												'</span></button> ',
												'<button class="btn btn btn-xs btn-primary m-r-5"><i class="fa fa-edit"></i><span class="like func"  data-toggle="modal" data-target="#roleModal" onclick="updateRole(\''
														+ row.roleId + '\')">',
												'修改', '</span> </button>' ].join('');
									}
								} ]
					});
}

// 填充用户列表组件
function getUserData() {
	$('#userTable').bootstrapTable('refresh');
	$('.selected-user').html('');
	$('#userTable')
			.bootstrapTable(
					{
						url : '/user/getuserinfo',
						method : 'get',
						cache : false,
						pagination : true,
						sortable : true,
						sortOrder : "asc",
						sidePagination : "server",
						pageNumber : 1,
						pageSize : 10,
						pageList : [ 10, 25, 50, 100 ],
						strictSearch : true,
						showColumns : false,
						uniqueId : "userId",
						queryParamsType : '',
						queryParams : function(params) {
							return {
								username : '',
								status : 1,
								pageSize : params.pageSize,
								pageNumber : params.pageNumber
							}
						},
						responseHandler : function(res) {
							var rows = res.data.rows;
							if (rows == null) {
								rows = [];
							}
							return {
								"total" : res.data.total,
								"rows" : rows
							};
						},
						columns : [
								{
									checkbox : true,
									visible : true,
									formatter : function(i, row) {// 每次加载
																	// checkbox时判断当前
																	// row的
																	// id是否已经存在全局
																	// Set()里
										if ($.inArray(row.username, Array
												.from(window.userArr)) != -1
												&& $
														.inArray(
																row.username,
																Array
																		.from(window.userlist)) != -1) {// 集合需要先转换成数组
											return {
												checked : true,// 存在则选中
												disabled : false
											// 设置是否可用
											}
										} else if ($.inArray(row.username,
												Array.from(window.userArr)) == -1
												&& $
														.inArray(
																row.username,
																Array
																		.from(window.userlist)) != -1) {
											return {
												disabled : false
											}
										} else if ($.inArray(row.username,
												Array.from(window.userArr)) != -1
												&& $
														.inArray(
																row.username,
																Array
																		.from(window.userlist)) == -1) {
											return {
												checked : true
											}
										}
									}
								},
								{
									field : 'username',
									title : '用户名'
								},
								{
									field : 'modifyTime',
									title : '修改时间',
									formatter : function(value, row, index) {
										if (value != undefined) {
											var crtTime = new Date(value);
											return dateFtt(
													"yyyy-MM-dd hh:mm:ss",
													crtTime);
										}
									}
								}, {
									field : 'creator',
									title : '创建人'
								}, {
									field : 'modifer',
									title : '修改人'
								} ],
						onCheck : function(row, $element) {
							var username = row.username;
							var userId = row.userId;
							if (preventRepeatUser(username))
								return;
							var txt = '<div class="user-form d-flex  justify-content-around '
									+ username
									+ '"><input type="text" disabled="true"  value='
									+ username
									+ '><input type="hidden" value='
									+ userId
									+ '><div class="btn btn-primary btn-sm delete" isnew="yes" onClick=handleClick(this,\''
									+ userId + '\')>删除</div></div>';
							$('.selected-user').append(txt);
						},
						onPreBody : function(data) {
							if (data != null) {
								userlists = data;
								$
										.each(
												userlists,
												function(index, row) {
													if (row.roleId != undefined
															|| row.roleId != '') {
														if (row.roleId == window.roleId) {
															var selectUser = [ row.username ];
															if (window.userlist
																	.indexOf(row.username) < 1) {
																window.userlist
																		.push(row.username);
															}
															$('#userTable')
																	.bootstrapTable(
																			'checkBy',
																			{
																				field : 'username',
																				values : selectUser
																			});
															$(
																	'.'
																			+ row.username
																			+ ' input')
																	.attr(
																			'disabled',
																			true);
															$(
																	'.'
																			+ row.username
																			+ ' .delete').attr('isnew','no');
																	/*.css(
																			{
																				"pointer-events" : "none",
																				"background-color" : "rgb(235, 235, 228)",
																				"color" : "rgb(84, 84, 84)",
																				"border-color" : "#A9A9A9"
																			});*/
														}
													}
												});
							}
						},
						onUncheck : function(row, $element) {
							var ele = $('.' + row.username + '').find("div");
							var userId = row.userId;
							if ($(ele).attr("isnew") == "yes") {
								$(ele).parent().remove();
								
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
										$(ele).parent().remove();
									},
									error : function(XMLHttpRequest, textStatus, errorThrown) {
										message = '请求失败';
									}
								});
							}
//							$('.' + row.username + '').remove();
							window.userArr.splice(window.userArr
									.indexOf(row.username), 1);
						},
						onCheckAll : function(rows) {
							var str = '';
							for (var i = 0; i < rows.length; i++) {
								var username = rows[i].username;
								if (preventRepeatUser(username))
									continue;
								str += '<div class="user-form d-flex justify-content-around'
										+ username
										+ '"><input type="text" value='
										+ username
										+ '><input type="hidden" value='
										+ username
										+ '><div class="btn btn-primary btn-sm delete" onClick=handleClick(this,\''
										+ rows[i].username
										+ '\')>删除</div></div>';
							}
							$('.selected-user').append(str);
						},
						onUncheckAll : function(row) {
							var selectrow = [];
							$.each(row, function(index, row) {
								selectrow.push(row.username);
							});
							$('.user-form>input')
									.each(
											function(index, input) {
												var val = $(input).val();
												if ($.inArray(val,
														window.userlist) == -1
														&& $.inArray(val,
																selectrow) != -1) {
													removeByValue(
															window.userArr, val);
													$(this).parent().remove();
												}
											});
						}
					});
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

// 获取当前需要关联用户的角色ID
function getRoleId(roleId) {
	window.roleId = roleId;
	getUserData();
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

// 获取功能列表
function getResource(roleId, resourceIds) {
	var resourceIdsarr = [];
	if (resourceIds != undefined) {
		resourceIdsarr = resourceIds.split(',');
	}
	window.roleId = roleId;
	var setting = {
		view : {
			selectedMulti : false,
			fontCss : {
				'font-size' : '16px',
				'font-family' : '微软雅黑'
			}
		},
		check : {
			enable : true,
				chkboxType: { "Y" : "", "N" : "" }
		},
		data : {
			key : {
				title : "title"
			},
			simpleData : {
				enable : true
			}
		},
		callback : {
			onCheck : onCheck
		// 单击事件
		}
	};
	$.ajax({
		type : 'post',
		url : '/resource/getallresource',
		cache : false,
		async : false,
		dataType : 'json',
		success : function(data, textStatus, jqXHR) {
			if (data.status == '0') {
				var zNodes = [];
				var isCheck = false;
				$.each(data.data, function(index, row) {
					if (resourceIdsarr.length > 0) {
						if (resourceIdsarr.indexOf(row.id) >= 0) {
							isCheck = true;
						} else {
							isCheck = false;
						}
					}
					zNodes.push({
						'id' : row.id,
						'pId' : row.parentId,
						'name' : row.name,
						'title' : '',
						'checked' : isCheck,
						'open' : true
					})
				});
				$.fn.zTree.init($("#tree"), setting, zNodes);
			} else {
//				layer.open({
//					content : data
//				});
				alert(data);
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