$(document).ready(function(){
    //表格小时计数
    $('td:not(.week)').click(function () {
        $(this).toggleClass('selected');
        var len = $('.selected').length;
        var total = $('td').length - 7 - len;
        $('.total').html(total);
    });

    
    // 树形图例子 数据
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
    		zNodes=res.data;
    		$.fn.zTree.init($("#tree"), setting, zNodes);   
    	}
    });
 
     
	
	
	layui.use('form', function () {
	    var form = layui.form;
	
	    //监听提交
	    form.on('submit(formDemo)', function (data) {
	        //layer.msg(JSON.stringify(data.field));
	    	gethour();
	    	getarea();
	        $.ajax({
	        	url:'/scheme/save',	        	
	        	data:$("form").serialize(),
	        	success:function(data){
	        		if(data.status==0){
	        			 layer.alert("保存成功",function(){
	        				 window.location.href="/adm/index?tab=scheme";
	        			 });
	        		}else{
	        			layer.alert("保存失败！");
	        		}
	        	}
	        });
	        return false;
	    });
        form.on('radio', function () {
            var val = this.value.trim();
            if (val == '0') {
                $('.bottom').addClass('layui-hide')
            } else if(val == '1') {
                //bottom类隐藏
            $(this).parents('.layui-form-item').next().removeClass('layui-hide')
            }
        });	    
	    
	});
	
    //修改回显
	if(isLimitHour=='1'){
		$("#hour").click();
		$("#hour").parents('.layui-form-item').next().removeClass('layui-hide')
	}	
	if(hours!=null){
		for(var i=0;i<hours.length;i++){
			var week=hours[i].week;
			var hour=hours[i].hours.split(",");
			for(var j=0;j<hour.length;j++){
				$("tr[i="+week+"]").find("td").eq(parseInt(hour[j])+1).click();
			}									
		}	        	        		
	}
	
	//地域
	if(isLimitLocal=='1'){
		$("#local").click();
		$("#local").parents('.layui-form-item').next().removeClass('layui-hide')
	}
	//操作系统
	if(system!=null&&system!='0'){
		$("#system").click();
		$("#system").parents('.layui-form-item').next().removeClass('layui-hide')
	}
	//投放频次
	if(isLimitFrequency=='1'){
		$("#frequency").click();
		$("#frequency").parents('.layui-form-item').next().removeClass('layui-hide')		
	}
	//浏览器
	if(browser!=null&&browser!=0){		
		$("#browser").click();
		$("#browser").parents('.layui-form-item').next().removeClass('layui-hide')		
	}
	
	if(areas!=null){
		zTree = $.fn.zTree.getZTreeObj("tree");
		for(var i=0;i<areas.length;i++){
			var node = zTree.getNodeByParam("id",areas[i].province);
			zTree.checkNode(node,true)
		}
	}
	
	//计划列表
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
				   if(data[i].advertPlanId!=selectPlan){
				   	html=html+"<option value="+data[i].advertPlanId+">"+data[i].title+"</option>";
				   }else{
					   html=html+"<option value="+data[i].advertPlanId+" selected>"+data[i].title+"</option>";
				   }
			   });
			   $("#planId").html(html);
		   }
	   });
});
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
	function getarea(){
		var treeObj=$.fn.zTree.getZTreeObj("tree");
        nodes=treeObj.getCheckedNodes(true);
        var val="";
        for(var i=0;i<nodes.length;i++){
        	var item=nodes[i].id+"-"+nodes[i].name;
        	val=val+","+item;
        }
        $("#areas").val(val.substring(1,val.length));
	}