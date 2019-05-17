$(document).ready(function(){
	layui.use('form', function () {
	    var form = layui.form;
	
	    //监听提交
	    form.on('submit(formDemo)', function (data) {
	        //layer.msg(JSON.stringify(data.field));
	        $.ajax({
	        	url:'/idea/save',	        	
	        	data:$("form").serialize(),
	        	success:function(data){
	        		if(data.status==0){
	        			 layer.alert("保存成功",function(){
	        				 window.location.href="/adm/index?tab=idea";
	        			 });
	        		}else{
	        			layer.alert(data.message);
	        		}
	        	}
	        });
	        return false;
	    });
	});
	
	layui.use('laydate', function () {
	    var laydate = layui.laydate;
	    lay('.date').each(function () {
	        laydate.render({elem: this, trigger: 'click'});
	    });
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
				   if(data[i].advertSchemeId!=selectScheme){
				   	html=html+"<option value="+data[i].advertSchemeId+">"+data[i].planName+"-"+data[i].scheme+"</option>";
				   }else{
					   html=html+"<option value="+data[i].advertSchemeId+" selected>"+data[i].planName+"-"+data[i].scheme+"</option>";
				   }
			   });
			   $("#advertSchemeId").html(html);
		   }
	   });
	
	
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
				   if(data[i].size!=selectSize){
				   	html=html+"<option value="+data[i].size+">"+data[i].size+"</option>";
				   }else{
					   html=html+"<option value="+data[i].size+" selected>"+data[i].size+"</option>";
				   }
			   });
			   $("#size").html(html);
		   }
	   });
});