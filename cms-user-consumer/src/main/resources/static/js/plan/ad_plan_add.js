$(document).ready(function(){
	layui.use('form', function () {
	    var form = layui.form;
	
	    //监听提交
	    form.on('submit(formDemo)', function (data) {
	        //layer.msg(JSON.stringify(data.field));
	        $.ajax({
	        	url:'/plan/save',
	        	data:$("form").serialize(),
	        	success:function(data){
	        		if(data.status==0){
	        			 layer.alert("保存成功",function(){
	        				 window.location.href="/adm/index?tab=plan";
	        			 });
	        		}else{
	        			layer.alert("保存失败！");
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

});