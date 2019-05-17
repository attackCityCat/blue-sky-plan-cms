function check(){
	   $('#userForm').bootstrapValidator({
	        message: 'This value is not valid',
	        feedbackIcons: {//input状态样式图片
	            valid: 'glyphicon glyphicon-ok',
	            invalid: 'glyphicon glyphicon-remove',
	            validating: 'glyphicon glyphicon-refresh'
	        },
	        fields: {//验证：规则
	        	username: {//验证input项：验证规则 parentName
	                message: 'The username is not valid',        
	                validators: {
	                    notEmpty: {//非空验证：提示消息 ^((?!\s).)*$
	                        message: '用户名不能为空'
	                    },regexp: {//正则验证 
		                    regexp:  /^((?!\s).)*$/,  
		                    message: '用户名不可以包含空格'  
		                },
	                    remote: {
	                    	url: rootUrl + '/user/checkUsername' ,
	                        message: '用户名已存在',
	                        type: 'GET',
	                        delay :  500,
	                        //自定义参数
	                        data: {
	                            username: $('#username').val(),
	                            userId: $('#userId').val(),
	                            "apptype": 1
	                              }
	                    }
	                }
	            },password: {
	                //message: 'The newPassword is not valid',        
	                validators: {
	                    notEmpty: {
	                        message: '新密码不能为空'
	                    },
	                    regexp: {//正则验证 
		                    regexp:  /^(?=.*[0-9])(?=.*[a-zA-Z])(.{8,18})$/,  
		                    message: '必须包含字母和数字,且长度为8-18位'  
		                },identical: {
		                	field: 'rpassword',
		                	//message: 'The password and its confirm are not the same'
		                	}
	                },  
	                
	            },rpassword: {
		            validators: {
		            	 notEmpty: {
		                        message: '确认密码不能为空'
		                    },
		                identical: {
		                    field: 'password',
		                    message: '两次输入的密码不相符'
		                }
		            },roleIds: {
	                message: 'The roleIds is not valid',        
	                validators: {
	                    notEmpty: {
	                        message: '角色不能为空'
	                    }
	                }
	            }
		            },organizationId: {
	                message: 'The roleIds is not valid',        
	                validators: {
	                    notEmpty: {
	                        message: '机构不能为空'
	                    }
	                }
	            }
	            
	        }
	    });
}


/*  根据不同条件 禁用某个校验
$("#detailform").bootstrapValidator("addField", "approvalMemo", {    
    validators: {    
        notEmpty : {  
            message : '审批意见不能为空'  
        }   
    }    
});  
$("#detailform").bootstrapValidator('removeField','approvalMemo'); */



var tree;
function showTree(){
	$('#treeview3').show();
	console.log('开始展示树结构');
	$("#treeview3").jstree({  
	    'core' : {  
	        "multiple" : false,  
	        'data' : tree,  
	        'dblclick_toggle': false          //禁用tree的双击展开  
	    },  
	    "plugins" : ["search"]   
	});

	$('#treeview3').on("changed.jstree", function (e, data) {  
	    console.log("The selected nodes are:");  
	    console.log(data.node.id);               //选择的node id  
	    console.log(data.node.text);            //选择的node text  
	    $("#q_organizationId").val(data.node.id);
	    $("#parentName3").val(data.node.text);
	    $('#treeview3').hide();
	  
	}); 
}

function showTree4(){
	$('#treeview4').show();
	console.log('开始展示树结构');
	$("#treeview4").jstree({  
	    'core' : {  
	        "multiple" : false,  
	        'data' : tree,  
	        'dblclick_toggle': false          //禁用tree的双击展开  
	    },  
	    "plugins" : ["search"]   
	});

	$('#treeview4').on("changed.jstree", function (e, data) {  
	    console.log("The selected nodes are:");  
	    console.log(data.node.id);               //选择的node id  
	    console.log(data.node.text);            //选择的node text  
	    $("#organizationId").val(data.node.id);
	    $("#parentName4").val(data.node.text);
	    $('#treeview4').hide();
	  
	});
}

function returnname(m,nodeId){
	var keyList = eval(m);
	for(var i=0;i<keyList.length;i++){	
		if(nodeId==keyList[i].id){
			$("#parentName4").val(keyList[i].text);
		}
		if(keyList[i].children!=null){
			returnname(keyList[i].children,nodeId);
		}
	}
}

$(document).ready(function () {
	   //Modal验证销毁重构
    $('#myModal').on('hidden.bs.modal', function() {
      $("#userForm").data('bootstrapValidator').destroy();
      $('#userForm').data('bootstrapValidator', null);
      check();
    });
	//添加验证
	check();
   
   
	//用户角色下拉列表
   	$.ajax({
   		url:rootUrl+'/role/listAll',
   		data:{},
   		success:function(data){
   			var html="";
   			if(data.status==0){
   				var roles=data.data;
   				for(var i=0;i<roles.length;i++){
   					html=html+"<option value='"+roles[i].id+"'>"+roles[i].role+"</option>";
   				}
   				
   			}
   			$("#roleIds").html(html);
   		}
   	});
    $(".select2").select2();

	
	console.log('开始展示树结构');            //此处展现主树
	$.ajax({
		type : 'GET',
		url :rootUrl+ '/organ/jsTree',
		success : function(s) {
			console.log("请求成功"+s.data);
			tree=s.data;
			$("#treeview").jstree({  
			    'core' : {  
			        "multiple" : false,  
			        'data' : s.data,  
			        'dblclick_toggle': false          //禁用tree的双击展开  
			    },  
			    "plugins" : ["search"]   
			});
		},
		error:function(s){
			console.log('调取树结构失败');  
		}
	});
	
	$("#treeview").bind("select_node.jstree", function (e, data) {  
		treeId = data.node.id;
		$("#q_organId").val(treeId);
		$('#tableList').bootstrapTable('refresh');
	/*    if(data.node.id !=1 ){                           //排除第一个节点 
	        data.instance.toggle_node(data.node);        //单击展开下面的节点  
	    }  */
	      
	}); 		
/*	$("#treeview").bind("select_node.jstree", function (e, data) {  
		treeId = data.node.id;
    	$("#infoTitle").val("");
		$("#treeId").val(treeId);
		$('#tableList').bootstrapTable('refresh');	 
	    if(data.node.id !=1 ){                           //排除第一个节点 
	        data.instance.toggle_node(data.node);        //单击展开下面的节点  
	    }  
	      
	}); */
	
    
    //官方使用方法的语法：<code>$('#table').bootstrapTable('method', parameter)</code>
    $('#tableList').bootstrapTable({
        columns: [
            {
                checkbox: true
            }
            , {
                visible: true,
                field: 'username',
                title: '用户名'
            }
            , {
                visible: true,
                field: 'organizationName',
                title: '机构'
            }
            , {
                visible: true,
                field: 'roleNames',
                title: '角色'
            }, {
                visible: false,
                field: 'id',
                title: '用户ID'
            }
            , {
                visible: true,
                field: 'locked',
                title: '是否锁定',
                formatter: turnCode
            }
        ],//页面需要展示的列，后端交互对象的属性
        method: 'get',
        toolbar: '#toolbar',   //工具按钮用哪个容器
        striped: true,           //是否显示行间隔色
        cache: false,            //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: true,     //是否显示分页（*）
        sortable: true,        //是否启用排序
        singleSelect: true,                     // 单选checkbox
        clickToSelect: true,
        sortOrder: "asc",     //排序方式
        pageNumber: 1,      //初始化加载第一页，默认第一页
        pageSize: 10,          //每页的记录行数（*）
        pageList: [10, 25, 50, 100],  //可供选择的每页的行数（*）
        queryParamsType: '', //默认值为 'limit' ,在默认情况下 传给服务端的参数为：offset,limit,sort
        // 设置为 ''  在这种情况下传给服务器的参数为：pageSize,pageNumber

        //queryParams: queryParams,//前端调用服务时，会默认传递上边提到的参数，如果需要添加自定义参数，可以自定义一个函数返回请求参数
        sidePagination: "server",   //分页方式：client客户端分页，server服务端分页（*）
        search: false,      //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: false,
        showColumns: true,     //是否显示所有的列
        showRefresh: true,     //是否显示刷新按钮
        // minimumCountColumns: 2,    //最少允许的列数
        // clickToSelect: true,    //是否启用点击选中行
        searchOnEnterKey: true,
        responseHandler: function (res) {
            return {
                "total": res.data.total,//总页数
                "rows": res.data.rows   //数据
            };
        },
        queryParams: function (params) {
        	 return {
        		 // userName: $("#txtSearchTempletName").val(),
        		 username: $("#q_username").val(),
        		 organizationId:$("#q_organizationId").val(),
        		 organId:$("#q_organId").val(),
                 pageSize: params.pageSize,
                 pageNumber: params.pageNumber
                /* fromChannel:$("#fromChannel").val()*/
             }
        },//请求服务器数据时的参数
        url: rootUrl + '/user/list' //服务器数据的加载地址
    });
    
    
    
    //查询
    $("#btn_query").click(function () {
        $('#tableList').bootstrapTable('refresh');
    });
    //重置表单
    $("#btn_add").click(function () {
    	$("#userForm").find("input").val("");
    /*	if($('#totaladd').val()==0){
    		setTimeout(function(){$('#userForm').data('bootstrapValidator').resetForm(true);},200);
    	}else{
    		$('#totaladd').val("0");
    	}
    	check();*/
    	$("#pwd").css("display","block");
    	$("#rpwd").css("display","block");
    	  document.getElementById('username').disabled=false;
    	$("#roleIds").val([]).trigger('change');

    });

    

    // 输入校验
 /*   $("#attributeDefineForm").bootstrapValidator({
        message: '这个值是无效的',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            attributeSequence: {
                message: '字段顺序校验失败',
                validators: {
                    notEmpty: {
                        message: '字段顺序不能为空'
                    },
                    regexp: {
                        regexp: /^[0-9_]+$/,
                        message: '字段顺序只能是整数'
                    }
                }
            }
        }
    });*/

    //添加用户
    $("#save").click(function () {
	    	var roleData=$('#roleIds').select2("data");
	    	var roleIds="";
	    	for(var i=0;i<roleData.length;i++){
	    		roleIds=roleIds+roleData[i].id+",";
	    	}
	    	roleIds=roleIds.substring(0,roleIds.length-1);
    	
    	
            //表单提交的方法、比如ajax提交
            var userId = $('#userId').val();
            var url = "";
          
            	 var bootstrapValidator = $("#userForm").data('bootstrapValidator');
            	   bootstrapValidator.validate();
            	   if(bootstrapValidator.isValid())
            	     $("#userForm").submit();
            	   else{
            		   return; 
            	   } 
             	      
            if (userId != "") {
                url = rootUrl + "/user/update";
            } else {
                url = rootUrl + "/user/add";
            }
            $.ajax({
                cache: false,
                dataType: "json",
                type: "POST",
                url: url,
                data: $('#userForm').serialize()+"&roleIds="+roleIds,// 你的formid
                async: false,
                error: function (request) {
                    $('#myModal').modal('hide');//关闭模框体
                    modalAlert(2, request.message);
                },
                success: function (data) {
                	if(data.status==0){
                		modalAlert(1, data.message);
                        $("#tableList").bootstrapTable('refresh', {url: rootUrl+'/user/list'});  //刷新窗体
                        //	$("#closeModal").click(function(){alert("123456")});
                        //	$("#myModal").modal("toggle")
                        $('#myModal').modal('hide');//关闭模框体
                        $(".modal-backdrop").remove();//清空
                        $("body").removeClass('modal-open');
                	}else{
                		modalAlert(2, data.message);
                        $("#tableList").bootstrapTable('refresh', {url: rootUrl+'/user/list'});  //刷新窗体
                        //	$("#closeModal").click(function(){alert("123456")});
                        //	$("#myModal").modal("toggle")
                        $('#myModal').modal('hide');//关闭模框体
                        $(".modal-backdrop").remove();//清空
                        $("body").removeClass('modal-open');
                	}
                    
                }
            });
    });

    //编辑
    $('#btn_edit').click(function () {
    	var userId = $('#userId').val();
    /*	if($("#totaldelete").val()==0){
    		//setTimeout(dsy(),200);
    		setTimeout(function(){$("#userForm").data('bootstrapValidator').destroy();},200);
    		$("#totaldelete").val("-1");
    	}else{
    		$("#totaldelete").val("-1");
    	}*/
    	
    	$("#userForm").find("input").val("");
    	$("#roleIds").val([]).trigger('change');
        var selectContent = $("#tableList").bootstrapTable('getSelections')[0];
        if (typeof(selectContent) == 'undefined') {
            modalAlert(3, '请选择一列数据!'); //警告
            return false;
        } else {
        	$("#pwd").css("display","none");
        	$("#rpwd").css("display","none");
            $("#username").val(selectContent.username);
            document.getElementById('username').disabled=true;
            $("#userId").val(selectContent.id);
            $("#organizationId").val(selectContent.organizationId)
           // $("#roleIds").val(selectContent.roleIds);
            $("#roleIds").val(selectContent.roleIds.split(",")).trigger('change');
            $("#locked").val(selectContent.locked);
            //$("#publishState").val(selectContent.publishState);
            returnname(tree,selectContent.organizationId);
            $('#myModal').modal('show');

        }
    });

    //删除
    $('#btn_delete').click(function () {
        var selectContent = $("#tableList").bootstrapTable('getSelections')[0];


        if (typeof(selectContent) == 'undefined') {
            modalAlert(3, '请选择一列数据!'); //警告
            return false;
        } else {
            var userId = selectContent.id;
            $.fn.modalConfirm("确定要删除吗?", function (status) {

                if (status) {
                    $.ajax({
                        cache: true,
                        dataType: "json",
                        type: "POST",
                        url: rootUrl +'/user/delete',
                        data: {userId:userId},
                        async: false,
                        error: function (request) {
                            //alert(request.msg);
                            layer.closeAll('dialog');
                            modalAlert(2, request.message);
                        },
                        success: function (data) {
                        	 layer.closeAll('dialog');//关闭确认对话框
                        	 if(data.status==0){
                        		 modalAlert(1, data.message);
                        	 }else{
                        		 modalAlert(2, data.message);
                        	 }
                             
                            $("#tableList").bootstrapTable('refresh', {url: rootUrl+'/user/list'});  //刷新窗体
                           
                        }
                    });
                }
            });
        }
    });

  
    

    
    $("#btn_resetPassword").click(function(){
        var selectContent = $("#tableList").bootstrapTable('getSelections')[0];
        

        if (typeof(selectContent) == 'undefined') {
            modalAlert(3, '请选择一列数据!'); //警告
            return false;
        } else {
        	var userId = selectContent.id;
        	$.ajax({
        		url:rootUrl+'/user/resetPassword',
        		data:{'userId':userId},
        		type: "POST",
        		success:function(data){
        			if(0==data.status){
        				modalAlert(1, "成功");
        			}else{
        				modalAlert(2, "失败");
        			}
        		}
        	});
        }
    });
});

//用户锁定转码
function turnCode(value, row, index) {
    if (value == "0") {
      	 return '<span class="label label-sm label-default">未锁定</span>';
      } else if (value == "1") {
      	 return '<span class="label label-sm label-danger">锁定</span>';
      }
	/*if (value == "0") {
     	 return '<div class="switch" data-on="success" data-off="warning"><input type="checkbox" checked /></div>';
     } else if (value == "1") {
     	 return '<div class="switch" data-on="success" data-off="warning"><input type="checkbox"  /></div>';
     }*/
	
   }