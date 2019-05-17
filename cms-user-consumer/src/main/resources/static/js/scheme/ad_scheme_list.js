layui.use(['layer'], function(){
  var layer = layui.layer;
});
var permissions=parent.parent.permissions;
$('#schemeTable').bootstrapTable({
        columns: [
            /*{
                checkbox: true
            }
            ,*/
            {
                visible: false,
                align:'center',
                field: 'advertSchemeId',
                title: '方案id'
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
                field: 'planName',
                title: '广告计划'
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
            },/* {
                visible: true,
                field: 'bidding',
                title: '出价（元）'
            }
            , */{
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
                title: '总花费(元)'
            }, {
            	align:'center',
            	field: 'advertSchemeId',
            	title: '操作',
            	align: 'center',
            	formatter : function(value, row, index) {
            		var str = JSON.stringify(row).replace(/"/g, '&quot;');
            		var status = row.status;
            		var element = "<a href='javascript:void(0)' data-target=\"#dayDetailModal\" data-toggle=\"modal\" onclick=\"dayDetail('s','"+value+"')\">每日明细</a> ";
            		if(permissions.indexOf("scheme:mod")!=-1){
            			element += " | <a href=\"#\" data-toggle=\"modal\" data-target=\"#editAdPlan\" onclick=\"updateScheme("+str+")\" >修改</a>";
            		}
            		
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
            }
        ],//页面需要展示的列，后端交互对象的属性
        method: 'get',
        //toolbar: '#toolbar',   //工具按钮用哪个容器
        striped: true,           //是否显示行间隔色
        cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,     //是否显示分页（*）
        sortable: true,        //是否启用排序
        singleSelect: true,                     // 单选checkbox
        clickToSelect: true,
        sortOrder: "asc",     //排序方式
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
        		 planName: $("#planName").val(),
        		 scheme: $("#scheme").val(),
        		 beginTime:$("#schemeStartDate").val(),
        		 endTime:$("#schemeEndDate").val(),
                 pageSize: params.pageSize,
                 pageNumber: params.pageNumber
             }
        },//请求服务器数据时的参数
        url:'/scheme/list' //服务器数据的加载地址
    });

function updateScheme(row){
	$.ajax({
    	url:'/scheme/queryWithJson/'+row.advertSchemeId+'',
    	data:{},
    	async:false,
    	success:function(res){
    		if(res.status == '0'){
    			var data = res.data;
    			var hours =data.hours;
    			var precise = data.precise;
    			var frequency = data.frequency;
    			if (hours != null) {
					for (var i = 0; i <hours.length; i++) {
						var hourArr = hours[i].hours.split(',');
						var tdArr = $("tr[i="+hours[i].week+"] td");
						for (var j = 0; j < hourArr.length; j++) {
							var index = parseInt(hourArr[j]) + 1;
							$(tdArr[index]).attr('class','selected');
						}
					}
				}
    			if (precise != null) {
					if (precise.realmw != null) {
						$("#editRealmw").html(precise.realmw);
					}
					if (precise.realmb != null) {
						$("#editRealmb").html(precise.realmb);
					}
					if(precise.ipw != null){
						$("#editIpw").html(precise.ipw);
					}
					if(precise.ipb != null){
						$("#editIpb").html(precise.ipb);
					}
					if(precise.app != null){
						$("#editApp").html(precise.app);
					}
					if(precise.system!=null&&precise.system!='0'){
						systems=precise.system.split(",");
						for(var i=0;i<systems.length;i++){
							$("input[name=systemV][value="+systems[i]+"]").click();
						}
					}
					
					if(precise.browser!=null&&precise.browser!='0'){
						browsers=precise.browser.split(",");
						for(var i=0;i<browsers.length;i++){
							$("input[name=browserV][value="+browsers[i]+"]").click();
						}
					}
					
					
					console.log(areas);
					if (areas != null) {
						var treeObj = $.fn.zTree
						.getZTreeObj("tree");
						for (var i = 0; i < areas.length; i++) {
							//根据角色菜单节点数据的属性搜索，获取与完整菜单树完全匹配的节点JSON对象集合
							var node = zTree.getNodeByParam("id",areas[i].province);
							zTree.checkNode(node,true)
							//勾选当前选中的节点
							treeObj.checkNode(nodes[0], true, true);
						}
					}
					
					
					if (frequency != null) {
						if (frequency.disnumd != null  || frequency.disnumd == 0) {
							$("#editDisnumd").val(frequency.disnumd);
						}
						if (frequency.disnumdip != null  || frequency.disnumdip == 0) {
							$("#editDisnumdip").val(frequency.disnumdip);
						}
						if (frequency.disnumdu != null  || frequency.disnumdu == 0) {
							$("#editDisnumdu").val(frequency.disnumdu);
						}
						if (frequency.discountip != null  || frequency.discountip == 0) {
							$("#editDiscountip").val(frequency.discountip);
						}
						if (frequency.clicountd != null  || frequency.clicountd == 0) {
							$("#editClicountd").val(frequency.clicountd);
						}
						if (frequency.clicountip != null  || frequency.clicountip == 0) {
							$("#editClicountip").val(frequency.clicountip);
						}
						if (frequency.disnumh != null  || frequency.disnumh == 0) {
							$("#editDisnumh").val(frequency.disnumh);
						}
						if (frequency.disnumhip != null  || frequency.disnumhip == 0) {
							$("#editDisnumhip").val(frequency.disnumhip);
						}
						if (frequency.disnumhu != null  || frequency.disnumhu == 0) {
							$("#editDisnumhu").val(frequency.disnumhu);
						}
						if (frequency.discountu != null  || frequency.discountu == 0) {
							$("#editDiscountu").val(frequency.discountu);
						}
						if (frequency.clicounth != null  || frequency.clicounth == 0) {
							$("#editClicounth").val(frequency.clicounth);
						}
						if (frequency.clicountu != null  || frequency.clicountu == 0) {
							$("#editClicountu").val(frequency.clicountu);
						}
						
					}
					
				}
    		}
    	}
    });
	$("#schId").val(row.advertSchemeId);
	$("#schIdF").val(row.advertSchemeId);
//	$('#editPlanName').html('<option checked value="'+row.planId+'">'+row.planName+'</option>');
	$("#editPlanName option[value='"+row.planId+"']").attr("selected",true);
	$('#editScheme').val(row.scheme);
	$('#budget').val(row.budget);
	$('#editStartTime').val(row.beginTime.substring(0,10));
	$('#editEndTime').val(row.endTime.substring(0,10));
	$('#editBidding').val(row.bidding);
	$("input[name=chargeName][value="+row.chargeName+"]").click();
	$("input[name=status][value="+row.status+"]").click();
	$("input[name=bakstatus][value="+row.bakstatus+"]").click();
	$("input[name=biddingType][value="+row.biddingType+"]").click();
	$("input[name=terminal][value="+row.terminal+"]").click();
}

function clearSchemeModal(e){
	$("#schId").val('');
	$("#schIdF").val('');
	$('#editPlanName:selected').attr('selected',false);
	$('#editScheme').val('');
	$('#budget').val('');
	$('#editStartTime').val('');
	$('#editEndTime').val('');
	$('#editBidding').val('');
	$("input[name='chargeName']:checked").attr("checked",false);
	$("input[name='status']:checked").attr("checked",false);
	$("input[name='bakstatus']:checked").attr("checked",false);
	$("input[name='biddingType']:checked").attr("checked",false);
	$("input[name='terminal']:checked").attr("checked",false);
	$("#editClicountu").val('');
	$("#editClicounth").val('');
	$("#editDiscountu").val('');
	$("#editDisnumhu").val('');
	$("#editDisnumhip").val('');
	$("#editDisnumh").val('');
	$("#editClicountip").val('');
	$("#editClicountd").val('');
	$("#editDiscountip").val('');
	$("#editDisnumdu").val('');
	$("#editDisnumdip").val('');
	$("#editDisnumd").val('');
	$("input[name='browserV']:checked").attr("checked",false);
	$("input[name='systemV']:checked").attr("checked",false);
	$("#editApp").html('');
	$("#editIpb").html('');
	$("#editIpw").html('');
	$("#editRealmb").html('');
	$("#editRealmw").html('');
	$("#week1").val('');
	$("#week2").val('');
	$("#week3").val('');
	$("#week4").val('');
	$("#week5").val('');
	$("#week6").val('');
	$("#week7").val('');
	$("#areas").val('');
	$('.tds td:not(.week)').attr('class','');
}


function gethour(){
	   $(".selected").each(function(){
	   var week =$(this).parent().attr("i");
	   var hour=$(this).prevAll("td").size()-1;
	   switch (parseInt(week))
	   {
		   case 1:
			   	$("#week1").val($("#week1").val()+","+hour);
			   	break;
		   case 2:
			   	$("#week2").val($("#week2").val()+","+hour);
			   	break;
		   case 3:
			   	$("#week3").val($("#week3").val()+","+hour);
			   	break;
		   case 4:
		   		$("#week4").val($("#week4").val()+","+hour); 
		   		break; 
		   case 5:
		   		$("#week5").val($("#week5").val()+","+hour);   
		   		break;
		   case 6:
		   		$("#week6").val($("#week6").val()+","+hour);	   
		   		break;
		   case 7:
		   		$("#week7").val($("#week7").val()+","+hour);
		   		break;                	 
		   default:
			   break;
	   }
});
}
function operateFormatter(value, row, index) {
    var status = row.status;
    var a = [
        '<button class="btn btn btn-xs btn-info m-r-5"><i class="fa fa-calendar"></i><a class="like link" target="iframe_a"   href="/scheme/detail?schemeId='+row.advertSchemeId+'" title="Like">',
        '每日明细',
        '</a></button>  ',
        '<button class="btn btn btn-xs btn-info m-r-5"><i class="fa fa-edit"></i><a class="like link"href="/scheme/query/'+row.advertSchemeId+'"  target="iframe_a" title="Like">',
        '修改',
        '</a></button>  '
    ].join('');
    if(permissions.indexOf("scheme:changeStaus")!=-1){
	    if (status == 1) {
	        var b = '<i class="iconfont icon-bofang" onclick="changeStatus(0,'+row.advertSchemeId+','+row.planId+')"></i>';
	    } else {
	        var b = '<i class="iconfont icon-zanting" onclick="changeStatus(1,'+row.advertSchemeId+','+row.planId+')"></i>';
	    }
    }
    return a + b;
}

function updateSchemeStatus(schemeId,status,planId){
	if (status == 0) {
		status = 1;
	} else {
		status = 0;
	}
	$.ajax({
		type : "POST",
		url:"/scheme/changeStaus",
		data:{"status":status,"advertSchemeId":schemeId,"planId":planId},
		success:function(data){
			if(data.status==0){
				$('#schemeTable').bootstrapTable('refresh');
			}else{
				layer.alert("操作失败");
			}
		}
	});
}

 


 $("#scheme_query").click(function () {
     $('#schemeTable').bootstrapTable('refresh',{pageNumber:1});
 });
 
 function exportScheme(){
	 var planName=$("#planName").val();
	 var scheme=$("#scheme").val();
	 var beginTime=$("#schemeStartDate").val();
	 var endTime=$("#schemeEndDate").val();
	 window.location.href="/scheme/export?planName="+planName+"&scheme="+scheme+"&beginTime="+beginTime+"&endTime="+endTime;
 }
 
 
 function getarea(){
		var treeObj=$.fn.zTree.getZTreeObj("tree");
		console.log(treeObj);
     nodes=treeObj.getCheckedNodes(true);
     var val="";
     for(var i=0;i<nodes.length;i++){
     	var item=nodes[i].id+"-"+nodes[i].name;
     	val=val+","+item;
     }
     $("#areas").val(val.substring(1,val.length));
	}
 
 function saveScheme(){
	 gethour();
// 	getarea();
     $.ajax({
     	url:'/scheme/save',	        	
     	data:$("#schemeForm").serialize(),
     	success:function(data){
     		if(data.status==0){
     			if(data.status==0){
        			 layer.alert("保存成功"
        			);
        			 $('#schemeTable').bootstrapTable('refresh');
     				$('#editSchemeModal').modal('hide');
     		}else{
     			layer.alert("保存失败！");
     		}
     	}
     	}
     });
 }
 $(document).ready(function() {
	 $('#editAdPlan').on('hide.bs.modal', function() {
			clearSchemeModal();
		})
		
		
		var zNodes = [];
	
	 var setting = {
		     view: {
		         selectedMulti: false,
		         showIcon: false,
		         fontCss: {
		             "font-size": "16px",
		             'font-family': '微软雅黑'
		         }

		     },
		     check: {
		         enable: true
		     },
		     data: {
		         key: {
		             title: "title"
		         },
		         simpleData: {
		             enable: true
		         }
		     },
		     // callback: {     onCheck: onCheck }
		 };
	$.ajax({
	 	url:'/scheme/localTree',
	 	data:{},
	 	async:false,
	 	success:function(res){
	 		var zNodes=res.data;
	 		$.fn.zTree.init($("#tree"), setting, zNodes);   
	 		console.log(zNodes);
	 		
	 	}
	 });
		
		
		$.ajax({
			   url:'/scheme/selectPlan',
			   data:{},
			   type:"post",
			   success:function(response){
				   var html="<option value=''>请选择</option>";
				   var data=response.data;
				   if(data==null){
					   return;
				   }
				   $.each(data,function(i){
					   	html=html+"<option value="+data[i].advertPlanId+">"+data[i].title+"</option>";
				   });
				   $("#editPlanName").html(html);
			   }
		   });
 })
 
 