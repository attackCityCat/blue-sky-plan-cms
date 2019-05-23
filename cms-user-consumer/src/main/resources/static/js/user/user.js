//用户管理
$(document).ready(function() {
		window.userId = '';
		window.sou = 1;
		getData();
		getCompanyName();
		getRoleName();
	$('#modalAddUser').on('hide.bs.modal', function() {
		clearModal();
	})
	$('#rechargeModal').on('hide.bs.modal', function() {
		$("#rcBalance").val("");
	})
});

// 带条件搜索用户列表
function checkUser() {
	$('#table').bootstrapTable('refresh');
	getData();
}

// 填充用户列表组件
function getData() {
	$('#table')
			.bootstrapTable(
					{
						url : 'query',
						method : 'get',
						columns : [
							    {
								align:'center',
								field : 'userid',
								title : '编号'
							     },
								{
									align:'center',
									field : 'username',
									title : '用户名'
								},
								{
									align:'center',
									field : 'useraccount',
									title : '账号'
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
									field : 'telephonenum',
									title : '手机号码'
								},
								{
									align:'center',
									field : 'companyname',
									title : '所属公司'
								},
								{
									align:'center',
									field : 'rolename',
									title : '角色'
								},
								{
									align:'center',
									field : 'modifer',
									title : '修改人'
								},
								{
									align:'center',
									field : 'loadsum',
									title : '操作',
									formatter : function(value, row, index) {
										var string = '';
										var userid = row.userid;
										if (row.userid > 1) {

											string += '<button class="btn btn-xs btn-danger m-r-5" onclick="delorrUser(\''
												+ row.userid
												+ '\')"><i class="fa fa-trash"></i>删除</button>';

											string += '<button class="btn btn-xs btn-info m-r-5" data-toggle="modal" data-target="#modalAddUser" onclick="updateUser('
												+ JSON.stringify(row).replace(
													/"/g, '&quot;')
												+ ')"><i class="fa fa-edit"></i>修改</button>';

										}
										return [string].join('');
									}
								}]
					});
}

//获取公司列表
function getCompanyName() {
	$.ajax({
		type : 'get',
		url : '/company/getcompanyname',
		cache : false,
		async : false,
		dataType : 'json',
		success : function(data) {
			var html = '';
			for (var i = 0; i < data.length; i++) {
				html += "<option value='"+data[i].companyid+"'>"+data[i].companyname+"</option>"
			}
			$("#company2").html(html);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			layer.open({
				content : '请求失败'
			});
		}
	});
}

// 获取角色列表
function getRoleName() {
	$.ajax({
		type : 'get',
		url : '/role/getrolename',
		cache : false,
		async : false,
		dataType : 'json',
		success : function(data) {
			var html = '';
			for (var i = 0; i < data.length; i++) {
				html += "<option value='"+data[i].roleid+"'>"+data[i].rolename+"</option>"
			}
				$("#roleId").html(html);

		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			layer.open({
				content : '请求失败'
			});
		}
	});
}

// 注册/修改用户
function saveUser() {
	if(window.userId != ""&&window.userId != 0){
		var url = {
			'username': $("#username").val(),
			'useraccount': $("#useraccount").val(),
			'userpassword': $("#userpassword").val(),
			'companyid': $("#company2").val(),
			'telephonenum': $("#telephonenum").val(),
			'roleid': $("#roleId").val(),
			'userid':window.userId
		}
	}else {
		var url = {
			'username': $("#username").val(),
			'useraccount': $("#useraccount").val(),
			'userpassword': $("#userpassword").val(),
			'companyid': $("#company2").val(),
			'telephonenum': $("#telephonenum").val(),
			'roleid': $("#roleId").val()
		}
	}

	$.ajax({
		type : 'post',
		url : '/save',
		data : url,
		cache : false,
		async : false,
		dataType : 'json',
		success : function(data, textStatus, jqXHR) {
			if (data) {
				$('#table').bootstrapTable('refresh');
				getData();
				
			} else {
//				layer.open({
//					content : '新增失败'
//				});
				alert('请求失败');
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

// 删除/恢复用户
function delorrUser(userid) {
	$.ajax({
		type : 'post',
		url : '/delete',
		data : {
			'userid' : userid
		},
		cache : false,
		async : false,
		dataType : 'json',
		success : function(data, textStatus, jqXHR) {
			$('#table').bootstrapTable('refresh');
			getData();
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			layer.open({
				content : '请求失败'
			});
		}
	});
}

// 修改用户信息
function updateUser(row) {
	$("#username").val(row.username);
	$("#userpassword").val('');
	$("#company2 option").filter(function() {
		return $(this).text() == "" + row.companyname + "";
	}).prop("selected", true);
	$("#telephonenum").val(row.telephonenum);
	$("#useraccount").val(row.useraccount);
	$("#roleId option").filter(function() {
		return $(this).text() == "" + row.rolename + "";
	}).prop("selected", true);
	$('#myModal').modal('toggle');

	window.userId = row.userid;
	window.sou = 0;
}

// 格式化模态框
function clearModal() {
	$("#username").val("");
	$("#nickrname").val("");
	$("#useraccount").val("");
	$("#password").val("");
	$("#company2").get(0).selectedIndex = 0;
//	$("#company2 option").removeAttr("selected");
	$("#telephonenum").val("");
	$("#email").val("");
	$("#roleId").get(0).selectedIndex = 0;
	$("#balance").val("");
	$('#username').removeAttr("readonly");
	window.userId = '';
	window.sou = 1;
}

// 充值
function reCharge(userId, balance) {
	window.userId = userId;
	window.sou = -1;
}