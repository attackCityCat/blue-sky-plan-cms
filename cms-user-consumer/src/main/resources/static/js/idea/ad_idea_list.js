layui.use(['layer'], function(){
  var layer = layui.layer;
});
var permissions=parent.parent.permissions;
$('#ideaTable').bootstrapTable({
        columns: [
             {
                visible: false,
                align:'center',
                field: 'advertIdeaId',
                title: 'id',
                width:'60px'
            }
            , /*{
                visible: true,
                field: 'type',
                title: '类型',
                formatter:typeFormatter
            }
            , */{
                visible: true,
                align:'center',
                field: 'planName',
                title: '广告计划'
            }
            , {
                visible: true,
                align:'center',
                field: 'scheme',
                title: '广告方案'
            }
            , {
                visible: true,
                align:'center',
                field: 'ideaName',
                title: '广告创意'
            }
            , {
                visible: true,
                align:'center',
                field: 'status',
                title: '状态',
                formatter:function(value,row,index){
                	if(value==0){
                		return '正常';
                	}else{
                		return '暂停';
                	}
                }
            }
            , {
                visible: true,
                align:'center',
                field: 'dissum',
                title: '展现次数'
                //formatter: turnCode
            }, {
                visible: true,
                align:'center',
                field: 'loadsum',
                title: '下载次数'
            }, {
                visible: true,
                align:'center',
                field: 'loadrate',
                title: '转化率'
            }, {
                visible: true,
                align:'center',
                field: 'totalConsume',
                title: '总花费（元）',
                width:'85px',
                align:'center',
            }, {
                visible: true,
                align:'center',
                field: 'bidding',
                title: '单价（元）',
                align:'center',
            }, {
            	align:'center',
            	field: 'advertIdeaId',
            	title: '操作',
            	align: 'center',
            	width:'18%',
            	formatter : function(value, row, index) {
            		var str = JSON.stringify(row).replace(/"/g, '&quot;');
    				var element = "<a href='Javascript:void(0)' data-target=\"#dayDetailModal\" data-toggle=\"modal\" onclick=\"dayDetail('i','"+value+"')\">每日明细</a> ";
    				if(permissions.indexOf("idea:mod")!=-1){
    					element += " | <a href=\"#\" data-toggle=\"modal\" data-target=\"#editIdeaModal\" onclick=\"updateIdea("+str+")\" >修改</a>  ";
    				}
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
            }
        ],//页面需要展示的列，后端交互对象的属性
        method: 'get',
        //toolbar: '#toolbar',   //工具按钮用哪个容器
        striped: true,           //是否显示行间隔色
        cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,     //是否显示分页（*）
//        sortable: false,        //是否启用排序
        singleSelect: true,                     // 单选checkbox
        clickToSelect: true,
//        sortOrder: "desc",     //排序方式
        pageNumber: 1,      //初始化加载第一页，默认第一页
        pageSize: 10,          //每页的记录行数（*）
        pageList: [10, 20, 50, 100],  //可供选择的每页的行数（*）
        queryParamsType: '', //默认值为 'limit' ,在默认情况下 传给服务端的参数为：offset,limit,sort
        // 设置为 ''  在这种情况下传给服务器的参数为：pageSize,pageNumber

        //queryParams: queryParams,//前端调用服务时，会默认传递上边提到的参数，如果需要添加自定义参数，可以自定义一个函数返回请求参数
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
        queryParams: function (params) {
        	 return {
        		 planName: $("#plan_ame").val(),
        		 scheme:$("#scheme_name").val(),
        		 ideaName:$("#idea_name").val(),
                 pageSize: params.pageSize,
                 pageNumber: params.pageNumber
             }
        },//请求服务器数据时的参数
        url:'/idea/list' //服务器数据的加载地址
    });
	function operateFormatter(value, row, index) {
	    var status = row.status;
	    var a = [
	        '<button class="btn btn btn-xs btn-info m-r-5"><i class="fa fa-calendar"></i><a class="like link" target="iframe_a"   href="/idea/detail?ideaId='+row.advertIdeaId+'" title="Like">',
	        '每日明细',
	        '</a> </button> ',
	        '<button class="btn btn btn-xs btn-info m-r-5"><i class="fa fa-edit"></i><a class="like link" href="/idea/query/'+row.advertIdeaId+'"  target="iframe_a" title="Like">',
	        '修改',
	        '</a></button>  '
	    ].join('');
	    if(permissions.indexOf("idea:changeStaus")!=-1){
		    if (status == 1) {
		        var b = '<i class="iconfont icon-bofang" onclick="changeStatus(0,'+row.advertIdeaId+','+row.advertSchemeId+','+row.planId+')"></i>';
		    } else {
		        var b = '<i class="iconfont icon-zanting" onclick="changeStatus(1,'+row.advertIdeaId+','+row.advertSchemeId+','+row.planId+')"></i>';
		    }
	    }
	    return a + b;
	}
	
	function dayDetail(flag,status){
		$("#detailIframe").attr("src","/home/detaillist?flg="+flag+"&id="+status);
		var text = $("#creatType").find("[class='active']").text();
		$("#myModal").text(text+"明细");
	}

	function changeStatus(status,ideaId,schemeId,planId){
		$.ajax({
			url:"/idea/changeStaus",
			data:{"status":status,"advertIdeaId":ideaId,"advertSchemeId":schemeId,"planId":planId},
			success:function(data){
				if(data.status==0){
					$('#table').bootstrapTable('refresh');
				}else{
					$.alert("操作失败");
				}
			}
			
		});
	}
	
	function typeFormatter(value,row,index){
		switch (value){
		case '0':
			return "横幅";
		case '1':
			return "全屏";
		case '2':
			return "开屏";
		case '3':
			return "原生";
		case '4':
			return "H5";
		case '5':
			return "video";
		case '6':
			return "插屏";
		case '7':
			return "弹窗";
		default:
			return '-';
		}
	}
 $(".iconfont.icon-shuaxin").click(function(){
	 $('#table').bootstrapTable('refresh',{pageNumber:1});
 });
 
 $("#idea_query").click(function () {
     $('#ideaTable').bootstrapTable('refresh',{pageNumber:1});
 });
 function exportIdea(){
	 var planName=$("#plan_name").val();
	 var scheme=$("#scheme_name").val();
	 var ideaName=$("#idea_name").val();
	 window.location.href="/idea/export?planName="+planName+"&scheme="+scheme+"&ideaName="+ideaName;
 }
 
 
 function updateIdea(row){
		$("#editIdeaName").val(row.ideaName);
		$("#editWebsite").val(row.website);
		$("#editCode").val(row.code);
		$("#editIdeaId").val(row.advertIdeaId);
		$("#editUnitPrice").val(row.unitPrice);
		$("input[name=type][value="+row.type+"]").click();
		$("input[name=masterailType][value="+row.masterailType+"]").click();
		$("#editSchemeName [value="+row.advertSchemeId+"]").attr("selected",true);
		$("#editSize [value='"+row.size+"']").attr("selected",true);
	}
 
 
 function clearModal(){
	 $("#editIdeaName").val('');
		$("#editWebsite").val('');
		$("#editCode").val('');
		$("#editIdeaId").val('');
		$("#editUnitPrice").val('');
		$("input[name='type']:checked").attr("checked",false);
		$("input[name='masterailType']:checked").attr("checked",false);
		$("#editSchemeName:selected").attr("selected",false);
		$("#editSize :selected").attr("selected",false);
 }
 
 
 function saveIdea(){
	 $.ajax({
     	url:'/idea/save',	        	
     	data:$("#ideaForm").serialize(),
     	success:function(data){
     		if(data.status==0){
     			 layer.alert("保存成功"
     			);
     			$('#ideaTable').bootstrapTable('refresh');
 				$('#editIdeaModal').modal('toggle');
     		}else{
     			layer.alert(data.message);
     		}
     	}
     });
 }
 
 
 $(document).ready(function(){
	 
	 $('#editIdeaModal').on('hide.bs.modal', function() {
			clearModal();
		})
	 
	//尺寸
	   $.ajax({
		   url:'/idea/selectSize',
		   data:{},
		   type:"post",
		   async:false,
		   success:function(response){
			   var html="<option value=''>请选择</option>";
			   var data=response.data;
			   if(data==null){
				   return;
			   }
			   $.each(data,function(i){
//				   if(data[i].size!=selectSize){
				   	html=html+"<option value="+data[i].size+">"+data[i].size+"</option>";
//				   }else{
//					   html=html+"<option value="+data[i].size+" selected>"+data[i].size+"</option>";
//				   }
			   });
			   $("#editSize").html(html);
		   }
	   });
	   
	 //方案列表
		$.ajax({
			   url:'/idea/selectScheme',
			   data:{},
			   type:"post",
			   async:false,
			   success:function(response){
				   var html="<option value=''>请选择</option>";
				   var data=response.data;
				   if(data==null){
					   return;
				   }
				   $.each(data,function(i){
//					   if(data[i].advertSchemeId!=selectScheme){
					   	html=html+"<option value="+data[i].advertSchemeId+">"+data[i].planName+"-"+data[i].scheme+"</option>";
//					   }else{
//						   html=html+"<option value="+data[i].advertSchemeId+" selected>"+data[i].planName+"-"+data[i].scheme+"</option>";
//					   }
				   });
				   $("#editSchemeName").html(html);
			   }
		   });
 })