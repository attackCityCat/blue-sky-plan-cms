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
						url : '/user/getuserinfo',
						method : 'get',
						striped : true,
						cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
						pagination : true, // 是否显示分页（*）
						sortable : true, // 是否启用排序
						sortOrder : "asc", // 排序方式
						sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
						pageNumber : 1, // 初始化加载第一页，默认第一页
						pageSize : 10, // 每页的记录行数（*）
						pageList : [ 10, 25, 50, 100 ], // 可供选择的每页的行数（*）
						strictSearch : true,
						showColumns : false, // 是否显示所有的列
						uniqueId : "userId", // 每一行的唯一标识，一般为主键列
						queryParamsType : '',
						queryParams : function(params) {
							return {
								username : $("[name='username']").val(),
								status : $("[name='status']").val(),
								pageSize : params.pageSize,
								pageNumber : params.pageNumber
							}
						}, // 请求服务器数据时的参数
						responseHandler : function(res) {
							var rows = res.data.rows;
							if (rows == null) {
								rows = [];
							}
							return {
								"total" : res.data.total, // 总页数
								"rows" : rows // 数据
							};
						},
						columns : [
								{
									align:'center',
									field : 'username',
									title : '用户名'
								},
								{
									align:'center',
									field : 'nickname',
									title : '昵称'
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
									field : 'company',
									title : '所属公司'
								},
								{
									align:'center',
									field : 'email',
									title : '邮箱'
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
										if (row.status == "0") {
											string += '<button class="btn btn-xs btn-info" onclick="delorrUser(1,\''
													+ row.userId
													+ '\')">恢复</button>';

										} else {
											string += '<button class="btn btn-xs btn-danger m-r-5" onclick="delorrUser(0,\''
													+ row.userId
													+ '\')"><i class="fa fa-trash"></i>删除</button>';
										}
										string += '<button class="btn btn-xs btn-info m-r-5" data-toggle="modal" data-target="#modalAddUser" onclick="updateUser('
												+ JSON.stringify(row).replace(
														/"/g, '&quot;')
												+ ')"><i class="fa fa-edit"></i>修改</button><button class="btn btn-xs btn-primary m-r-5"  data-toggle="modal" data-target="#rechargeModal" onclick="reCharge(\''
												+ row.userId
												+ '\',\''
												+ row.balance
												+ '\')"><i class="fa fa-credit-card"></i>充值</button>';
										return [ string ].join('');
									}
								}]
					});
}

//获取公司列表
function getCompanyName() {
	var optionstring = "";
	$.ajax({
		type : 'get',
		url : '/company/getcompanyname',
		cache : false,
		async : false,
		dataType : 'json',
		success : function(data, textStatus, jqXHR) {
			if (data.status == '0') {
				$.each(data.data, function(key, value) { // 循环遍历后台传过来的json数据
					optionstring += "<option value=\"" + value.company_id
							+ "\" >" + value.company + "</option>";
				});
				$("#company2").html(optionstring);
			} else {
				layer.open({
					content : data.message
				});
			}
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
	var optionstring = "";
	$.ajax({
		type : 'get',
		url : '/role/getrolename',
		cache : false,
		async : false,
		dataType : 'json',
		success : function(data, textStatus, jqXHR) {
			if (data.status == '0') {
				$.each(data.data, function(key, value) { // 循环遍历后台传过来的json数据
					optionstring += "<option value=\"" + key + "\" >" + value
							+ "</option>";
				});
				$("#roleId").html(optionstring);
			} else {
				layer.open({
					content : data.message
				});
			}
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
	var url = '';
	if ($("#rcBalance").val() != '') {
		url = {
			'userId' : window.userId,
			'balance' : $("#rcBalance").val(),
			'sou' : window.sou
		};
	} else {
		if ($("#company2").val().trim() == "") {
			alert("请选择公司");
		}
		url = {
			'username' : $("#username").val(),
			'nickname' : $("#nickname").val(),
			'password' : $("#password").val(),
			'company' : $("#company2").val(),
			'telephonenum' : $("#telephonenum").val(),
			'email' : $("#email").val(),
			'roleId' : $("#roleId").val(),
			'balance' : $("#balance").val(),
			'userId' : window.userId,
			'sou' : window.sou
		}
	}
	$.ajax({
		type : 'get',
		url : '/user/save',
		data : url,
		cache : false,
		async : false,
		dataType : 'json',
		success : function(data, textStatus, jqXHR) {
			if (data.data == '操作用户成功') {
				if ($("#rcBalance").val() != '') {
					$('#rechargeModal').modal('toggle');
				} else {
					$('#modalAddUser').modal('toggle');
				}
				alert(""+data.data);
				$('#table').bootstrapTable('refresh');
				getData();
				
			} else {
//				layer.open({
//					content : data.data
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

// 删除/恢复用户
function delorrUser(dor, userId) {
	$.ajax({
		type : 'get',
		url : '/user/delorrec',
		data : {
			'dor' : dor,
			'userId' : userId
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
	$("#password").val('');
	$("#nickname").val(row.nickname);
	$("#company2 option").filter(function() {
		return $(this).text() == "" + row.company + "";
	}).prop("selected", true);
	$("#telephonenum").val(row.telephonenum);
	$("#email").val(row.email);
	$("#roleId").val(row.roleId);
	$("#balance").val(row.balance);
	$('#myModal').modal('toggle');
	$('#username').attr("readonly", "readonly");
	window.userId = row.userId;
	window.sou = 0;
}

// 格式化模态框
function clearModal() {
	$("#username").val("");
	$("#nickrname").val("");
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