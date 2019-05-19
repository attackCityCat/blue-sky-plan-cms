$(document).ready(function() {
	function initDate(){
		$("#sandbox-container input").datepicker({
			language: "zh-CN",
			format: 'yyyy-mm-dd',
			autoclose:true
		});
	}
	initDate();
	getDefautlDate();
	var data, options;
	getUserInfo();
	getUserAdvertSchduleAndPuts();
	var $table = $("#table");
	$("#adSelect").on("change", function() {
		var selectType = $(this).val();
		var type = $("#adSelect").find("option:selected").text();
		$("#liebiaoTitle").text(type);
		selectView(selectType);
	});
//	// getChartInitData();
	$("#mychart").on("change", function() {
		var selectType = $(this).val();
		if ("消费趋势图" == selectType) {
			myChartInit(myData.date_list, myData.fee_list, selectType);
		} else if ("展示趋势图" == selectType) {
			myChartInit(myData.date_list, myData.dispose_list, selectType);
		} else if ("下载趋势图" == selectType) {
			myChartInit(myData.date_list, myData.click_list, selectType);
		} else if ("计划趋势图" == selectType) {
			myChartInit(myData.date_list, myData.plan_list, selectType);

		}
	});
	var url = '/home/getUserPlanList';
	plant(url, planArr);
	

})
var permissions=parent.parent.permissions;
function chartSearch(){
	
	var start_time = $("#start_time").val();
	var end_time = $("#end_time").val();
	getChartInitData(start_time, end_time);
}
/* 明细弹窗 */
function prepareUp(url) {
	$(".mask").load(url);
	$(".mask").show();
}

// 从后台获取时间
var getDefautlDate = function() {
	$.ajax({
		type : "POST",
		url : "/home/getInitDateSegment",
		dataType : "json",
		success : function(result) {
			if (result && result.hasOwnProperty("code") && result.code == 0
					&& result.hasOwnProperty("data")) {
				$("#start_time").val(result.data.start_time);
				$("#end_time").val(result.data.end_time);
				getChartInitData(result.data.start_time, result.data.end_time);
			}
		},
		failure : function(result) {
			console.info(result);
		}
	});
}

/* 获取初始化图标数据 */
var getChartInitData = function(start_time, end_time) {
	var selectType = $("#mychart").val();

	$
			.ajax({
				type : "POST",
				url : "/home/getCurUserAllSums",
				data : {
					start_time : start_time,
					end_time : end_time
//					start_time : '2019-03-25',
//					end_time : '2019-04-01'
				},
				dataType : "json",
				cache : false,
				success : function(result) {
					if (result && result.hasOwnProperty("code")
							&& result.code == 0
							&& result.hasOwnProperty("data")) {
						myData = result.data;
						if ("消费趋势图" == selectType) {
							myChartInit(myData.date_list, myData.fee_list,
									selectType);
						} else if ("展示趋势图" == selectType) {
							myChartInit(myData.date_list, myData.dispose_list,
									selectType);
						} else if ("下载趋势图" == selectType) {
							myChartInit(myData.date_list, myData.click_list,
									selectType);
						} else if ("计划趋势图" == selectType) {
							myChartInit(myData.date_list, myData.plan_list,
									selectType);
						}
					}
				},
				failure : function(result) {
					console.info(result);
				}
			});
}

function logout() {
	$.ajax({
		type : 'get',
		url : '/logout',
		cache : false,
		async : false,
		success : function(data, textStatus, jqXHR) {
			window.location.href = "/";
		}
	});
}

// ---------------导出excel开始------------------
var exportExcel = function() {
	console.log(1)
	var view = $("#adSelect").val();
	$("#myForm").attr({
		"action" : "/home/exportExcel?view=" + view,
		"method" : "POST"
	}).submit();
}
/* 创意column */
var ideaArr = [
		{
			field : 'planName',
			title : '广告计划',
			align : 'center',
		},
		{
			field : 'scheme',
			title : '广告方案',
			align : 'center',
		},
		{
			field : 'adTitle',
			title : '广告创意',
			align : 'center',
		}/*,
		{
			field : 'createTime',
			title : '创建时间',
			align : 'center',
			formatter : function(value, row, index) {
				var $now = new Date(value);
				var timeStr = $now.getFullYear() + "-" + ($now.getMonth() + 1)
						+ "-" + $now.getDate() + " " + $now.getHours() + ":"
						+ $now.getMinutes() + ":" + $now.getSeconds();
				return timeStr.substring(0,19);
			}
		}*/,
		{
			field : 'status',
			title : '状态',
			align : 'center',
			formatter : function(value, row, index) {
				if ('1' == value) {
					return '暂停';
				} else {
					return '正常';
				}
			}
		},
		{
			field : 'dissum',
			title : '展示',
			align : 'center',
		},
		{
			field : 'loadsum',
			title : '下载',
			align : 'center',
		},
		{
			field : 'clisum',
			title : '点击',
			align : 'center',
			formatter : function(value, row, index) {
				if ('0' == value) {
					return '-';
				} else {
					return value;
				}
			}
		},
		{
			field : 'loadrate',
			title : '转化率',
			align : 'center',
		},
		/*{
			field : 'unitPrice',
			title : '单价(元)',
			align : 'center',
		},
		{
			field : 'bidding',
			title : '当前出价(元)',
			align : 'center',
		},*/
		{
			field : 'advertIdeaId',
			title : '操作',
			align : 'center',
			formatter : function(value, row, index) {//<a href=\"/home/detaillist?flg=i&id=" + value
				//+ "\">每日明细</a>
				var element = "<a href='javascript:viod(0)' data-target=\"#dayDetailModal\" data-toggle=\"modal\" onclick=\"dayDetail('i','"+value+"')\">每日明细</a> | "
						+ " </i><a href=\"/report/reportList?planId=" + row.planId
						+ "&schemeId=" + row.advertSchemeId + "&schemeName="
						+ row.scheme + "&ideaId=" + value + "&ideaName="
						+ row.adTitle + "\">效果报告</a> ";
				if(permissions.indexOf("idea:changeStaus")!=-1){
					if ('1' == row.status) {
						element += " | <a href='javascript:updateIdeaStatus(" + value
						+ "," + row.status +","+ row.advertSchemeId+","+row.planId
						+ ")'><i class='fa fa-play'></i></a>"
					} else {
						element += " | <a href='javascript:updateIdeaStatus(" + value
						+ "," + row.status +","+ row.advertSchemeId+","+row.planId
						+ ")'><i class='fa fa-pause'></i></a>"
					}
				}
				return element;
			}
		} ];

function dayDetail(flag,status){
	$("#detailIframe").attr("src","/home/detaillist?flg="+flag+"&id="+status);
	var _title = $("#adSelect").find("option:selected").text();
	console.log(_title);
	$("#myModal").text(_title.replace("列表","明细"));
}

/* 方案column */
var schemeArr = [
		{
			field : 'planName',
			title : '广告计划',
			align : 'center',
		},
		{
			field : 'title',
			title : '广告方案',
			align : 'center',
		}/*,
		{
			field : 'createTime',
			title : '创建时间',
			align : 'center',
			formatter : function(value, row, index) {
				return value.substring(0,19);
			}
		}*/,
		{
			field : 'status',
			title : '状态',
			align : 'center',
			formatter : function(value, row, index) {
				if ('1' == value) {
					return '暂停';
				} else {
					return '正常';
				}
			}
		},
		{
			field : 'dissum',
			title : '展示',
			align : 'center',
		},
		{
			field : 'loadsum',
			title : '下载',
			align : 'center',
		},
		{
			field : 'clisum',
			title : '点击',
			align : 'center',
			formatter : function(value, row, index) {
				if ('0' == value) {
					return '-';
				} else {
					return value;
				}
			}
		},
		{
			field : 'loadrate',
			title : '转化率',
			align : 'center',
		},
		{
			field : 'totalConsume',
			title : '消费(元)',
			align : 'center',
		},
		/*{
			field : 'bidding',
			title : '当前出价(元)',
			align : 'center',
		},*/
		{
			field : 'advertSchemeId',
			title : '操作',
			align : 'center',
			formatter : function(value, row, index) {
				var status = row.status;
				var element = "<a href='javascript:void(0)' data-target=\"#dayDetailModal\" data-toggle=\"modal\" onclick=\"dayDetail('s','"+value+"')\">每日明细</a> | "
						+ " <a href=\"/report/reportList?planId=" + row.planId
						+ "&schemeId=" + value + "&schemeName=" + row.title
						+ "\">效果报告</a> ";
				if(permissions.indexOf("scheme:changeStaus")!=-1){
					if ('1' == row.status) {
						element += " | <a href='javascript:updateSchemeStatus(" + value
						+ "," + status+","+row.planId
						+ ")'><i class='fa fa-play'></i></a>";
					} else {
						element += " | <a href='javascript:updateSchemeStatus(" + value
						+ "," + status+","+row.planId
						+ ")'><i class='fa fa-pause'></i></a>";
					}
				}
				return element;
			}
		} ];
/* 计划colum */
var planArr = [
		{
			field : 'title',
			title : '广告计划',
			align : 'center',
		}/*,
		{
			field : 'createTime',
			title : '日期',
			align : 'center',
			formatter : function(value, row, index) {
				return value.substring(0,19);
			}
		}*/,
		{
			field : 'status',
			title : '状态',
			align : 'center',
			formatter : function(value, row, index) {
				if ('1' == value) {
					return '暂停';
				} else {
					return '正常';
				}
			}
		},
		{
			field : 'dissum',
			title : '展示',
			align : 'center',
		},
		{
			field : 'loadsum',
			title : '下载',
			align : 'center',
		},
		{
			field : 'loadrate',
			title : '转化率',
			align : 'center',
		},
		{
			field : 'totalConsume',
			title : '消费(元)',
			align : 'center',
		},
		{
			field : 'advertPlanId',
			title : '操作',
			align : 'center',
			formatter : function(value, row, index) {
				var element = "<a href='javascript:void(0)' data-target=\"#dayDetailModal\" data-toggle=\"modal\" onclick=\"dayDetail('p','"+value+"')\">每日明细</a> | "
						+ " <a href=\"/report/reportList?planId="
						+ value
						+ "\">效果报告</a>";
				if(permissions.indexOf("home:updatePlanStatus")!=-1){
					if ('1' == row.status) {
						element += " | <a href='javascript:updatePlanStatus(" + value
						+ "," + row.status
						+ ")'><i class='fa fa-play'></i></a>"
					} else {
						element += " | <a href='javascript:updatePlanStatus(" + value
						+ "," + row.status
						+ ")'><i class='fa fa-pause'></i></a>"
					}
				}
				return element;
			}
		} ];
// -----------列表选择显示计划、方案、创意 开始--------------
function selectView(selectType) {
	if (selectType == 'plan') {
		// $('#exportfile').attr("value", "plan");
		var url = '/home/getUserPlanList';
		plant(url, planArr);
	}
	if (selectType == 'scheme') {
		var url = '/home/getUserSchemeList';
		plant(url, schemeArr);
	}
	if (selectType == 'idea') {
		var url = '/home/getUserIdeaList';
		plant(url, ideaArr);
	}
}

function fmoney(s, n) {
	n = n > 0 && n <= 20 ? n : 2;
	s = parseFloat((s + '').replace(/[^\d\.-]/g, '')) + '';
	var l = s.split('.')[0].split('').reverse(), r = s.split('.')[1];
	var t = '';
	for (var i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
	}
	if (!r) {
		r = '0';
	}
	if (r.length < n) {
		for (var i = r.length; i < n; i++) {
			r += '0';
		}
	} else {
		r = r.substr(0, n);
	}

	var zhi = t.split('').reverse().join('') + '.' + r;
	if (n == 1) {
		zhi = zhi.substring(0, zhi.indexOf('.'));
	}

	if (zhi.substring(0, 1) == '-') {
		if (zhi.substring(1, 2) == ',') {
			zhi = zhi.substring(0, 1) + zhi.substring(2, zhi.length);
		}
	}
	return zhi;
}

function updateSchemeStatus(i, s,p) {
	if (s == 0) {
		s = 1;
	} else {
		s = 0;
	}
	$.ajax({
		type : "POST",
		url : "/scheme/changeStaus",
		dataType : "json",
		data : {
			'advertSchemeId' : i,
			'status' : s,
			'planId':p
		},
		success : function(result) {
			selectView('scheme');
			getUserAdvertSchduleAndPuts();
		},
		error : function() {
		}
	});
	getUserAdvertSchduleAndPuts();
}
// 修改方案状态结束----------------
// 修改计划状态开始----------------
function updatePlanStatus(i, s) {
	if (s == 0) {
		s = 1;
	} else {
		s = 0;
	}
	$.ajax({
		type : "POST",
		url : "/home/updatePlanStatus",
		dataType : "json",
		data : {
			'advertPlanId' : i,
			'status' : s
		},
		success : function(result) {
			selectView('plan');
			getUserAdvertSchduleAndPuts();
		},
		error : function() {
		}
	});

}
// 修改计划状态结束----------------
//修改创意状态开始----------------
function updateIdeaStatus(i, s,c,p) {
	if (s == 0) {
		s = 1;
	} else {
		s = 0;
	}
	$.ajax({
		type : "POST",
		url : "/idea/changeStaus",
		dataType : "json",
		data : {
			'advertIdeaId' : i,
			'status' : s,
			'advertSchemeId':c,
			'planId':p
		},
		success : function(result) {
			selectView('idea');
			getUserAdvertSchduleAndPuts();
		},
		error : function() {
		}
	});

}

var $now = new Date();
var endTimeStr = $now.getFullYear() + "-" + ($now.getMonth() + 1) + "-"
		+ $now.getDate();
var $sta = new Date($now);
$sta.setDate($now.getDate() - 7);
var startTimeStr = $sta.getFullYear() + "-" + ($sta.getMonth() + 1) + "-"
		+ $sta.getDate();

//layui.use('laydate', function() {
//	var laydate = layui.laydate;
//
//	// 执行一个laydate实例
//	laydate.render({
//		elem : '#start_time', // 指定元素
//		value : startTimeStr
//	});
//	laydate.render({
//		elem : '#end_time', // 指定元素
//		value : endTimeStr
//	});
//});

        function getUserInfo () {
			$.ajax({
				type : "POST",
				url : "/home/getUserInfo",
				dataType : "json",
				success : function(result) {
					console.log(totalPayment);
					console.log(balance);
					result.code == 0
							&& $("#total_payment_ajax")
									.html(
											fmoney(
													totalPayment,2
											)
													+ "<span>(元)</span>");
					result.code == 0
							&& $("#balance_ajax")
									.html(
											fmoney(
													balance,2
															)
													+ "<span>(元)</span>");
					result.code == 0
							&& $("#today_spend_ajax")
									.html(
											fmoney(
													result.today_total_spent ? result.today_total_spent
															: 0, 2)
													+ "<span>(元)</span>");
				},
				failure : function(result) {
					console.info(result);
				}
			});
}

function queryParams(params) {
	return {
		pageSize : params.limit,
		pageNum : params.offset / params.limit + 1,
	}
}

function responseHandler(result) {
	var errcode = result.code;
	if (errcode == "9999") {
		return {
			total : 0, // 总页数,前面的key必须为"total"
			data : null
		// 行数据，前面的key要与之前设置的dataField的值一致.
		}
	}
	// 如果没有错误则返回数据，渲染表格
	var data_ = result.data;
	var total = 0;
	var data = [];
	if (data_ != null) {
		total = result.data.total;
		data = result.data.list;
	}
	return {
		total : total, // 总页数,前面的key必须为"total"
		data : data
	// 行数据，前面的key要与之前设置的dataField的值一致.
	};
};

// JavaScript代码区域 table
function plant(url, column) {
	$("#table").bootstrapTable('destroy');
	$('#table').bootstrapTable({
		// 换行变色
		striped : true,
		// 查询数据的接口地址
		url : url,
		method : 'get',
		// 查询参数，可以用于增加表格的筛选条件，在下文的function queryParams()中实现
		queryParams : queryParams,
		// 设置接口返回值中用于填充表格数据的字段
		dataField : "data",
		contentType : "application/json",
		pageNumber : 1,
		sidePagination : 'server',
		// 接口返回数据的处理方法，使用该方法可以控制生成该组件所需的total和data字段
		responseHandler : responseHandler,
		pagination : true,
		pageSize : 5,
		pageList : [ 10, 30, 100 ],
		// 列，此处举例：序号生成方法+列按钮如何添加事件，并非上图对应的列信息
		columns : column
	});
}

//注册/修改用户
function saveUser() {
	var url = '';
		url = {
			'username' : $("#username").val(),
			'nickname' : $("#nickname").val(),
			'password' : $("#password").val(),
			'telephonenum' : $("#telephonenum").val(),
			'email' : $("#email").val(),
			'userId' : $("#userId").val(),
			'sou' : 0
		}
	$.ajax({
		type : 'get',
		url : '/user/saveNoPer',
		data : url,
		cache : false,
		async : false,
		dataType : 'json',
		success : function(data, textStatus, jqXHR) {
			if (data.data == '操作用户成功') {
					$('#modalAddUser').modal('toggle');
				alert(""+data.data);
			} else {
				alert(data.message);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert('请求失败');
		}
	});
}

/* 广告排期 */
var getUserAdvertSchduleAndPuts = function() {
	$.ajax({
		type : "POST",
		url : "/home/getUserAdvertSchduleAndPuts",
		dataType : "json",
		success : function(result) {
			if (result && result.hasOwnProperty("code") && result.code == 0
					&& result.hasOwnProperty("data")) {
				result.data.hasOwnProperty("advert_puts")
						&& $("#advert_puts").html(result.data.advert_puts+"<span>(个)</span>");
				result.data.hasOwnProperty("advert_schedules")
						&& $("#advert_schedules").html(
								result.data.advert_schedules+"<span>(个)</span>");
			}
		},
		failure : function(result) {
			console.info(result);
		}
	});
}

// 弹出框
//var layer = layui.layer;
//$('#add').click(function() {
//	layer.open({
//		type : 2,
//		title : '广告计划',
//		// maxmin: true,
//		shadeClose : true, // 点击遮罩关闭层
//		area : [ '600px', '400px' ],
//		content : './layer/add.html',
//		shade : 0.1
//	});
//	layer.iframeAuto();
//})

// 基于准备好的dom，初始化echarts实例
// var myChart = echarts.init(document.getElementById('main-left'));

// 指定图表的配置项和数据

// 使用刚指定的配置项和数据显示图表。
// -------------------------myChartInit---------------------
var myChart;
var myData;
var myChartInit = function(dataArr, myData, type) {
	data = {
			labels: dataArr,
			series: [{
				name: 'series-real',
				data: myData,
			}, {
				name: 'series-projection',
				data: myData,
			}]
		};

		options = {
			fullWidth: true,
			lineSmooth: false,
			height: "270px",
			low: 0,
			high: 'auto',
			lineSmooth: Chartist.Interpolation.simple({
			    divisor: 2
			  }),
			series: {
				'series-projection': {
					showArea: true,
					showPoint: false,
					showLine: false
				},
			},
			axisX: {
				showGrid: true,

			},
			axisY: {
				showGrid: true,
				onlyInteger: true,
				offset: 0,
			},
			chartPadding: {
				left: 50,
				right: 50
			}
		};

		var myChart = new Chartist.Line('#visits-trends-chart', data, options);
		
		myChart.on('draw', function(data) {
			  if(data.type === 'line' || data.type === 'area') {
			    data.element.animate({
			      d: {
			        begin: 2000 * data.index,
			        dur: 2000,
			        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
			        to: data.path.clone().stringify(),
			        easing: Chartist.Svg.Easing.easeOutQuint
			      }
			    });
			  }
			});
	
	
	
//	var option = {
//		title : {
//			text : type
//		},
//		brush : {
//		// brushType:'lineY'
//		},
//		tooltip : {},
//		// legend: {
//		// data: ['销量']
//		// },
//		xAxis : {
//			data : dataArr
//		},
//		yAxis : {},
//		series : [ {
//			name : '销量',
//			type : 'line',
//			data : myData,
//			smooth : 0.3,
//			itemStyle : {
//				normal : { // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
//					color : new echarts.graphic.LinearGradient(0, 0, 0, 1, [ {
//						offset : 0,
//						color : 'rgba(78, 215, 143, 0.8)'
//					} ]), // 背景渐变色
//					lineStyle : { // 系列级个性化折线样式
//						width : 3,
//						type : 'solid',
//						color : "rgba(78, 215, 143, 1)"
//					}
//				}
//			}, // 线条样式
//			symbolSize : 10, // 折线点的大小
//			areaStyle : {
//				normal : {}
//			}
//
//		} ]
//	};
//	if (myChart) {
//		myChart.dispose();
//	}
//	myChart = echarts.init(document.getElementById('main-left'));
//	myChart.setOption(option);
}

$('.detail').click(function() {
	$('.mask').fadeIn();
	$(document).scrollTop(0);
	$('body').css({
		overflow : 'hidden'
	});
})

$('.return').click(function() {
	$('.mask').fadeOut();
	$('body').css({
		overflow : 'auto'
	});
	
})