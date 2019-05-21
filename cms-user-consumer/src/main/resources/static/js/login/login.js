// 登录
layui.use('form', function() {
	var form = layui.form;
	// 禁止用户点击浏览器返回键回退到登录页面
	if (window.history && window.history.pushState) {
		$(window).on('popstate', function() {
			window.history.pushState('forward', null, '#');
			window.history.forward(1);
		});
	}
	// 在IE中必须得有这两行
	window.history.pushState('forward', null, '#');
	window.history.forward(1);
	form.on('submit(formDemo)', function(data) {
		$.ajax({
	        type: 'post',
	        url: '/login',
	        data: {'username':data.field.username,'password':data.field.password},
	        cache: false,
	        async : false,
	        dataType: 'json',
	        success: function (data ,textStatus, jqXHR)
	        {
	        	if(data.status == '0'){
	        		window.location.href='/index?company='+data.company+'&username='+data.username; 
	        	}else{
	        		layer.open({
	        			content: data.message
	        		});  
	        	}
	        },
	        error:function (XMLHttpRequest, textStatus, errorThrown) {      
	            layer.open({
	            	content: '请求失败'
	            }); 
	        }
	     });
		return false;
	});
});


function login(){
	
	var username = $("[name='username']").val();
	var password = $("[name='password']").val();
	$.ajax({
        type: 'post',
        url: '/login',
        data: {'username':username,'password':password},
        cache: false,
        async : false,
        dataType: 'json',
        success: function (data ,textStatus, jqXHR)
        {
        	if(data.status == '0'){
//        		window.location.href='/index?company='+data.company+'&username='+data.username; 
        		window.location.href=data.locationUrl; 
        	}else{
        		layer.open({
        			content: data.message
        		});  
        	}
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {      
            layer.open({
            	content: '请求失败'
            }); 
        }
     });
}

function datalogin(){
	
	var username = $("[name='username']").val();
	var password = $("[name='password']").val();
	$.ajax({
        type: 'post',
        url: '/login',
        data: {'username':username,'password':password},
        cache: false,
        async : false,
        dataType: 'json',
        success: function (data ,textStatus, jqXHR)
        {
        	if(data.status == '0'){
        		window.location.href='/async/asynclist'; 
//        		window.location.href=data.locationUrl; 
        	}else{
        		layer.open({
        			content: data.message
        		});  
        	}
        },
        error:function (XMLHttpRequest, textStatus, errorThrown) {      
            layer.open({
            	content: '请求失败'
            }); 
        }
     });
}