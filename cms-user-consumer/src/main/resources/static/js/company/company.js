//公司管理
$(document).ready(function() {
	layui.use('layer', function() {
		var layer = layui.layer;
		window.companyId = '';
		window.sou = 1;
		getData();
		getCompanyName();
		getRoleName();
	});
	$('#modal').on('hide.bs.modal', function() {
		clearModal();
	})
	$('#rechargeModal').on('hide.bs.modal', function() {
		$("#rcBalance").val("");
	})
});

// 带条件搜索公司列表
function checkCompany() {
	$('#table').bootstrapTable('refresh');
	getData();
}

// 填充公司列表组件
function getData() {
	$('#table')
			.bootstrapTable(
					{
						url : '/company/companys',
						method : 'get',
						cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
						pagination : true, // 是否显示分页（*）
						sortable : true, // 是否启用排序
						striped : true,
						hight:"auto",
						sortOrder : "asc", // 排序方式
						sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
						pageNumber : 1, // 初始化加载第一页，默认第一页
						pageSize : 10, // 每页的记录行数（*）
						pageList : [ 10, 25, 50, 100 ], // 可供选择的每页的行数（*）
						strictSearch : true,
						showColumns : false, // 是否显示所有的列
						uniqueId : "companyId", // 每一行的唯一标识，一般为主键列
						queryParamsType : '',
						queryParams : function(params) {
							return {
								company : $("[name= companyName]").val(),
								status : $("[name='status']").val(),
								pageSize : params.pageSize,
								pageNumber : params.pageNumber
							}
						}, // 请求服务器数据时的参数
						responseHandler : function(res) {
							var rows = res.data.list;
							if (rows == null) {
								rows = [];
							}
							return {
								"total" : res.data.total, // 总页数
								"rows" : rows
							// 数据
							};
						},
						columns : [
								{
									field : 'company',
									align : 'center',
									title : '公司名'
								},
								{
									field : 'address',
									align : 'center',
									title : '地址',
									width: '150px',
									cellStyle:function(value,row,index){
										return {
											css: {
												"max-width": "200px",
												"white-space": "nowrap",
												"overflow":"hidden",
												"text-overflow": "ellipsis"
											}
										}
									}
								},
								{
									field : 'status',
									align : 'center',
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
									field : 'telephone',
									align : 'center',
									title : '手机号码'
								},
								{
									field : 'website',
									align : 'center',
									title : '公司地址',
									cellStyle:function(value,row,index){
										return {
											css: {
												"white-space": "nowrap",
												"overflow":"hidden",
												"text-overflow": "ellipsis"
											}
										}
									}
								},
								{
									field : 'email',
									align : 'center',
									title : '邮箱'
								},
								{
									field : 'modifer',
									align : 'center',
									title : '修改人'
								},
								{
									field : 'loadsum',
									align : 'center',
									title : '操作',
									formatter : function(value, row, index) {
										var string = '';
										if (row.status == "0") {
											string += '<button class="btn btn btn-xs btn-info m-r-5"><i class="fa fa-toggle-off"></i><span class="like recovery" onclick="delorrCompany(1,\''
													+ row.companyId
													+ '\')">&nbsp;&nbsp;恢复</span></button>';

										} else {
											string += '<button class="btn btn btn-xs btn-danger m-r-5"><i class="fa fa-trash"></i><span class="like delete" onclick="delorrCompany(0,\''
													+ row.companyId
													+ '\')">&nbsp;&nbsp;删除</span></button>';
										}
										string += '<button class="btn btn btn-xs btn-primary m-r-5"><i class="fa fa-edit"></i><span class="like modify" data-toggle="modal" data-target="#modal" onclick="updateCompany('
												+ JSON.stringify(row).replace(
														/"/g, '&quot;')
												+ ')">&nbsp;&nbsp;修改</span><span class="like recharge" data-toggle="modal" data-target="#rechargeModal" onclick="reCharge(\''
												+ row.companyId
												+ '\',\''
												+ row.balance + '\')"></span></button>';
										return [ string ].join('');
									},
									cellStyle:function(value,row,index){
										return {
											css: {
												"text-align" : "center",
												"font-size" : "15px"
											}
										}
									}
								} ]
					});
}

// 获取公司列表
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
				$("#company").html(optionstring);
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

// 注册/修改公司
function saveCompany() {
	var data = {
			'companyId' : window.companyId,
			'company' : $("#companyName").val(),
			'email' : $("#email").val(),
			'address' : $("#address").val(),
			'website' : $("#website").val(),
			'telephone' : $("#telephone").val(),
		};
	var url = "";
	if (window.sou == 1) {
		url = '/company/saveCompany';
	} else {
		url = '/company/updateCompany';
	}
	$.ajax({
		type : 'post',
		url : url,
		data : data,
		cache : false,
		async : false,
		dataType : 'json',
		success : function(data, textStatus, jqXHR) {
			if (data.data == '保存公司成功' || data.data == '修改公司成功') {
				$('#modal').modal('toggle');
				clearModal();
				$('#table').bootstrapTable('refresh');
				getData();
			} else {
				layer.open({
					content : data.data
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

// 删除0/恢复公司1
function delorrCompany(dor, companyId) {
	$.ajax({
		type : 'post',
		url : '/company/updateCompany',
		data : {
			'status' : dor,
			'companyId' : companyId
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

// 修改公司信息
function updateCompany(row) {
	$("#companyName").val(row.company);
	$("#email").val(row.email);
	$("#address").val(row.address);
	$("#website").val(row.website);
	$("#telephone").val(row.telephone);
	window.companyId = row.companyId;
	window.sou = 0;
}

// 格式化模态框
function clearModal() {
	$("#companyName").val("");
	$("#email").val("");
	$("#address").val("");
	$("#website").val("");
	$("#telephone").val("");
	window.companyId = '';
	window.sou = 1;
}