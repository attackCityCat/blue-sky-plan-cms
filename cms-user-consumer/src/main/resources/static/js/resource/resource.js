// 功能管理
$(document).ready(function() {
	layui.use('layer', function() {
		getData();
		window.zNodes = [];
		window.parentNode = [];
		window.selectNode = [];
		getResource();
	});
	$('#funModal').on('hide.bs.modal', function() {
		$('#parentName').val('');
		$('#name').val('');
		$('#type').get(0).selectedIndex = 0;
		$('#isShow').get(0).selectedIndex = 0;
		$('#permissions').val('');
		$('#rurl').val('');
		$('#sort').val('0');
		$('#icon').val('0');
		window.parentNode = [];
		window.selectNode = [];
	});
});

// 带条件搜索功能列表
function checkResource() {
	$('#table').bootstrapTable('destroy');
	getData();
}

// 填充功能列表组件
function getData() {
	$('#table')
			.bootstrapTable(
					{
						url : '/resource/getresource',
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
						uniqueId : "id",
						queryParamsType : '',
						striped : true,
						queryParams : function(params) {
							return {
								name : $("[name='name']").val(),
								state : $("[name='state']").val(),
								isshow : '',
								ismanager : '0',
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
								"total" : res.data.total,
								"rows" : rows
							};
						},
						columns : [
								{
									align:'center',
									field : 'name',
									title : '菜单名称'
								},
								{
									align:'center',
									field : 'state',
									title : '是否有效',
									formatter : function(value, row, index) {
										if (value != undefined) {
											if (value == '0') {
												return '是';
											} else {
												return '否';
											}
										}
									}
								},
								{
									align:'center',
									field : 'permissions',
									title : '权限标识'
								},
								{
									align:'center',
									field : 'url',
									title : 'url'
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
									align:'center',
									field : 'modifer',
									title : '修改人'
								},
								{
									align:'center',
									field : 'loadsum',
									title : '操作',
									formatter : function(value, row, index) {
										console.log(row.isShow);
										var str = '';
										if (row.isShow == 0) {
											str = '<button class="btn btn btn-xs btn-success m-r-5"><i class="fa fa-toggle-off"></i><span class="" onclick="updateIsShow('
													+ JSON.stringify(row)
															.replace(/"/g,
																	'&quot;')
													+ ' , 1)"> 隐藏 </span></button>';
										} else {
											str = '<button class="btn btn btn-xs btn-success m-r-5"><i class="fa fa-toggle-off"></i><span class="like display" onclick="updateIsShow('
													+ JSON.stringify(row)
															.replace(/"/g,
																	'&quot;')
													+ ' , 0)"> 显示 </span></button>';
										}
										str += '<button class="btn btn btn-xs btn-info m-r-5"><i class="fa fa-edit"></i><span class="like display" data-toggle="modal" data-target="#funModal" onclick="updateInfo('
												+ JSON.stringify(row).replace(
														/"/g, '&quot;')
												+ ' , 0)"> 修改 </span></button>';
										return [ str ].join('');
									}
								} ]
					});
}

// 修改功能显示状态
function updateIsShow(row, isshow) {
	$.ajax({
		type : 'get',
		url : '/resource/updateisshow',
		data : {
			'id' : row.id,
			'name' : row.name,
			'parentId' : row.parentId,
			'parentIds' : row.parentIds,
			'icon' : row.icon,
			'isShow' : row.isShow,
			'is_show' : isshow
		},
		cache : false,
		async : false,
		dataType : 'json',
		success : function(data, textStatus, jqXHR) {
			if (data.status == '0') {
				layer.open({
					content : data.data,
					yes : function(index, layero) {
						layer.close(index); // 如果设定了yes回调，需进行手工关闭
						$('#table').bootstrapTable('refresh');
						getData();
					}
				});
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

// 填充功能列表
function getResource() {
	$.ajax({
		type : 'post',
		url : '/resource/getallresource',
		cache : false,
		async : false,
		dataType : 'json',
		success : function(data, textStatus, jqXHR) {
			if (data.status == '0') {
				$.each(data.data, function(index, row) {
					window.zNodes.push({
						'id' : row.id,
						'pId' : row.parentId,
						'parentIds' : row.parentIds,
						'name' : row.name,
						'icon' : row.icon,
						'permissions' : row.permissions,
						'rurl' : row.url,
						'sort' : row.sort,
						'isShow' : row.isShow,
						'type' : row.type,
						'open' : true
					})
				});
			} else {
				layer.open({
					content : data
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

// 新增功能列表点击的回掉函数
function onClick(event, treeId, treeNode) {
	$('#parentName').val(treeNode.name);
	$('#parentId').val(treeNode.id);
	$('#parentIds').val(treeNode.parentIds + treeNode.id + ',');
}

//function beforeClick(treeId, treeNode, clickFlag) {
//	var name = $('.curSelectedNode>.node_name').html();
//	if (treeNode.name !== name)
//		return false;
//}
//
//function beforeDrag(treeId, treeNodes) {
//	var name = $('.curSelectedNode>.node_name').html();
//	if (treeNodes[0].name !== name)
//		return false;
//};
//
//function onDrop(event, treeId, treeNodes, targetNode, moveType) {
//	window.parentNode = treeNodes[0].getParentNode()
//};

// 添加
function save() {
//	$('#parentnamediv').css({
//		'display' : 'flex'
//	});
	var setting = {
		data : {
			simpleData : {
				enable : true
			}
		},
		callback : {
			onClick : onClick
		}
	};
	$.fn.zTree.init($("#tree"), setting, window.zNodes);
}

// 修改功能属性
function updateInfo(row) {
//	$('#parentnamediv').css({
//		'display' : 'none'
//	});
//	$("#parentName").attr("disabled",true);
	window.selectNode = row;
	$('#name').val(row.name);
	$('#permissions').val(row.permissions);
	$('#rurl').val(row.url);
	$('#icon').val(row.icon);
	$("#type option[value='" + row.type + "']").attr("selected", true);
	$('#sort').val(row.sort);
	$("#isShow option[value='" + row.isShow + "']").attr("selected", true);
	$('#parentId').val(row.id);
	$('#parentIds').val(row.parentIds + row.id + ',');
//	var setting = {
//		data : {
//			simpleData : {
//				enable : true
//			}
//		},
//		edit : {
//			enable : true,
//			showRemoveBtn : false,
//			showRenameBtn : false,
//			drag : {
//				autoExpandTrigger : true,
//				isCopy : false,
//				isMove : true
//			}
//		},
//		callback : {
//			onClick : onClick,
//			beforeClick : beforeClick,
//			beforeDrag : beforeDrag,
//			onDrop : onDrop
//		}
//	};
//	$.fn.zTree.init($("#tree"), setting, window.zNodes);
//	var treeObj = $.fn.zTree.getZTreeObj("tree");
//	var nodes = treeObj.getNodes();
//	$.each(nodes, function(i, item) {
//		$('#' + item.tId + '_a').removeClass('curSelectedNode');
//	})
//	treeObj.expandAll(true);
//	var node = treeObj.getNodesByFilter(filter, true); // 仅查找一个节点
//	$('#' + node.tId + '_a').addClass('curSelectedNode');
//	function filter(node) {
//		return (node.name.indexOf('' + row.name + '') > -1);
//	}
	var setting = {
		data : {
			simpleData : {
				enable : true
			}
		},
		callback : {
			onClick : onClick
		}
	};
	$.fn.zTree.init($("#tree"), setting, window.zNodes);
}

// 添加功能
function saveResource() {
	var operation = 1;
	var data = '';
	if($.isArray(window.selectNode)){
		operation = 0;
	}
	if($('#parentName').val() != ''){
		data = {
			'id' : window.selectNode.id,
			'name' : $('#name').val(),
			'permissions' : $('#permissions').val(),
			'url' : $('#rurl').val(),
			'icon' : $('#icon').val(),
			'parentId' : $('#parentId').val(),
			'parentIds' : $('#parentIds').val(),
			'sort' : $('#sort').val(),
			'type' : $("[name='type']").val(),
			'isShow' : $("[name='isShow']").val(),
			'operation' : operation
		};
	}else{
		data = {
			'id' : window.selectNode.id,
			'name' : $('#name').val(),
			'permissions' : $('#permissions').val(),
			'url' : $('#rurl').val(),
			'icon' : $('#icon').val(),
			'sort' : $('#sort').val(),
			'type' : $("[name='type']").val(),
			'isShow' : $("[name='isShow']").val(),
			'operation' : operation
		};
	}	
//	if ($('#parentnamediv').css('display') == 'none') {
//		operation = 1;
//		if (Object.keys(window.parentNode).length > 0) {
//			if (window.parentNode.pId == null) {
//				parentId = 1;
//			} else {
//				parentId = window.parentNode.id;
//			}
//			parentIds = window.parentNode.parentIds + parentId + ',';
//		} else {
//			parentId = window.selectNode.parentId;
//			parentIds = window.selectNode.parentIds;
//		}
//	}
	$.ajax({
		type : 'post',
		url : '/resource/saveresource',
		data : data,
		cache : false,
		async : false,
		dataType : 'json',
		success : function(data, textStatus, jqXHR) {
			if (data.status == '0') {
				layer.open({
					content : data.data,
					yes : function(index, layero) {
						layer.close(index); // 如果设定了yes回调，需进行手工关闭
						$('#funModal').modal('toggle');
						$('#table').bootstrapTable('refresh');
						checkResource();
						window.zNodes = [];
						getResource();
					}
				});
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