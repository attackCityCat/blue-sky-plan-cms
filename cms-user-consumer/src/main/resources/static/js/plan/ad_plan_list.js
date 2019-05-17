$(document).ready(function() {
	 $.ajax({
	     	url:'/user/getUsers',
	     	data:{},
	     	success:function(data){
	     		var html="<option value=''>请选择</option>";
				   var data=data.data;
				   if(data==null){
					   return;
				   }
				   $.each(data,function(i){
					   	html=html+"<option value="+data[i].userId+">"+data[i].nickname+"</option>";
				   });
				   $("#ad").html(html);
	     }
 })
 
 	$("#ad").on("change",function(){
 		$("[name='creator']").val($("#ad option:selected").text());
 	});
 
})


layui.use(['layer'], function(){
  var layer = layui.layer;
});
var permissions=parent.parent.permissions;

$('#planTable').bootstrapTable({
        columns: [
            /*{
                checkbox: true
            }
            , */
            {
            	align:'center',
                visible: false,
                field: 'advertPlanId',
                title: '计划id'
            }
            , {
            	align:'center',
                visible: true,
                field: 'title',
                title: '广告计划'
            }
            , {
            	align:'center',
                visible: true,
                field: 'status',
                title: '状态',
                formatter:function(value,row,index){
                	if(value==0){
                		return '正常';
                	}else{
                		return '暂停';
                	}
                }
            }, {
            	align:'center',
                visible: true,
                field: 'budget',
                title: '预算（元）',
                formatter:function(value,row,index){
                	if(value==0){
                		return '不限';
                	}else{
                		return value;
                	}
                }
            }
            , {
            	align:'center',
                visible: true,
                field: 'dissum',
                title: '展现次数'
                //formatter: turnCode
            }, {
            	align:'center',
                visible: true,
                field: 'loadsum',
                title: '下载次数'
            }, {
            	align:'center',
                visible: true,
                field: 'loadrate',
                title: '转化率'
            }, {
            	align:'center',
                visible: true,
                field: 'totalConsume',
                title: '总花费(元)'
            }, {
            	align:'center',
            	field: 'advertPlanId',
            	title: '操作',
            	align: 'center',
            	formatter : function(value, row, index) {
    				var element = "<a class='detail' href='javascript:void(0)' data-target=\"#dayDetailModal\" data-toggle=\"modal\" onclick=\"dayDetail('p','"+value+"')\">每日明细</a> |"
    						+ " <a href=\"/report/reportList?planId="
    						+ value
    						+ "\">效果报告</a>  ";
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
            }
        ],//页面需要展示的列，后端交互对象的属性
        method: 'get',
        //toolbar: '#toolbar',   //工具按钮用哪个容器
        striped: true,           //是否显示行间隔色
        cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,     //是否显示分页（*）
//        sortable: false,        //是否启用排序
//        singleSelect: true,                     // 单选checkbox
//        clickToSelect: true,
//        sortOrder: "desc",     //排序方式
        pageNumber: 1,      //初始化加载第一页，默认第一页
        pageSize: 10,          //每页的记录行数（*）
        pageList: [10, 20, 50, 100],  //可供选择的每页的行数（*）
        queryParamsType: '', //默认值为 'limit' ,在默认情况下 传给服务端的参数为：offset,limit,sort
        // 设置为 ''  在这种情况下传给服务器的参数为：pageSize,pageNumber

        queryParams: queryParams,//前端调用服务时，会默认传递上边提到的参数，如果需要添加自定义参数，可以自定义一个函数返回请求参数
        sidePagination: "server",   //分页方式：client客户端分页，server服务端分页（*）
        search: false,      //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: false,
        showColumns: false,     //是否显示所有的列
        showRefresh: false,     //是否显示刷新按钮
        // minimumCountColumns: 2,    //最少允许的列数
        // clickToSelect: true,    //是否启用点击选中行
        searchOnEnterKey: true,
        responseHandler: function (res) {        	
        	var rows=res.data.rows;
        	if(rows==null){
        		rows=[];
        	}
            return {
                "total": res.data.total,//总页数
                "rows": rows   //数据
            };
        },
//        queryParams: function (params) {
//        	 return {
//        		 title: $("[name='title']").val(),
//        		 beginTime:$("#startDate").val(),
//        		 endTime:$("#endDate").val(),
//                 pageSize: params.pageSize,
//                 pageNumber: params.pageNumber
//             }
//        },//请求服务器数据时的参数
        url:'/plan/list' //服务器数据的加载地址
    });

function queryParams(params) {
	 return {
		 title: $("[name='title']").val(),
		 beginTime:$("#startDate").val(),
		 endTime:$("#endDate").val(),
         pageSize: params.pageSize,
         pageNumber: params.pageNumber
     }
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
			$('#schemeTable').bootstrapTable('refresh');
		},
		error : function() {
		}
	});
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
			$('#planTable').bootstrapTable('refresh');
		},
		error : function() {
		}
	});

}
// 修改计划状态结束----------------
// 修改创意状态开始----------------
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
			$('#ideaTable').bootstrapTable('refresh');
		},
		error : function() {
		}
	});

}

// $(".iconfont.icon-shuaxin").click(function(){
//	 $('#table').bootstrapTable('refresh',{pageNumber:1});
// });
 
 $("#plan_query").click(function () {
     $('#planTable').bootstrapTable('refresh',{pageNumber:1});
 });
 
 function exportPlan(){
	 var title=$("#title").val();
	 var beginTime=$("#startDate").val();
	 var endTime=$("#endDate").val();
	 window.location.href="/plan/export?title="+title+"&beginTime="+beginTime+"&endTime="+endTime;
 }
 
 function savePlan(){
	 $.ajax({
     	url:'/plan/save',
     	data:$("#planForm").serialize(),
     	success:function(data){
     		if(data.status==0){
     			 layer.alert("保存成功",function(){
     				 window.location.href="/adm/index";
     			 });
     		}else{
     			layer.alert("保存失败！");
     		}
     	}
     });
 }
