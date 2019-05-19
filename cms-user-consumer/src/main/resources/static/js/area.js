/**
 * id = "当前需要查询节点的上一级id"
 * url = "查询数据的后台控制层地址"
 * provinceDom = "省下拉框id"
 * cityDom = "市下拉框id"
 * 示例 initArea(0,'<%=path%>/student/findArea.do','provinceSelect','citySelect');
 */
function initArea(id,url,provinceDom,cityDom){
	$.ajax({
		url:url,
		type:'post',
		async:false,
		data:{
			id:id
		},
		dataType:'json',
		success:function(data){
			var html = "<option value='-1'>请选择</option>";
			for(var i = 0 ; i < data.length; i++){
				html += "<option value='"+data[i].id+"'>"+data[i].name+"</option>"
			}
			if(provinceDom != null && provinceDom != '' && cityDom != null && cityDom != ''){
				$('#'+provinceDom).html(html);
			}else if(provinceDom != null && provinceDom != ''){
				$('#'+provinceDom).html(html);
			}else if((provinceDom == null || provinceDom == '') && (cityDom != null && cityDom != '') ){
				$('#'+cityDom).html(html);
			}
			
		},
		error:function(){
			alert('初始化'+id+"节点下的数据失败")
		}
	})
	if(provinceDom != null || provinceDom != ''){
		initProvinceChange(provinceDom,url,cityDom);
	}
}


function inArea(id,url,provinceDom,cityDom){
	$.ajax({
		url:url,
		type:'post',
		async:false,
		data:{
			id:id
		},
		dataType:'json',
		success:function(data){
			var html = "<option value='-1'>请选择</option>";
			for(var i = 0 ; i < data.length; i++){
				html += "<option value='"+data[i].id+"'>"+data[i].name+"</option>"
			}
			if(provinceDom != null && provinceDom != '' && cityDom != null && cityDom != ''){
				$('#'+provinceDom).html(html);
			}else if(provinceDom != null && provinceDom != ''){
				$('#'+provinceDom).html(html);
			}else if((provinceDom == null || provinceDom == '') && (cityDom != null && cityDom != '') ){
				$('#'+cityDom).html(html);
			}
			
		},
		error:function(){
			alert('初始化'+id+"节点下的数据失败")
		}
	})
	if(provinceDom != null || provinceDom != ''){
		initProvinceChange(provinceDom,url,cityDom);
	}
}



function inEditArea(id,url,provinceDom,cityDom){
	$.ajax({
		url:url,
		type:'post',
		data:{
			id:id
		},
		dataType:'json',
		success:function(data){
			var html = "<option value='-1'>请选择</option>";
			for(var i = 0 ; i < data.length; i++){
				html += "<option value='"+data[i].id+"'>"+data[i].name+"</option>"
			}
			if(provinceDom != null && provinceDom != '' && cityDom != null && cityDom != ''){
				$('#'+provinceDom).html(html);
			}else if(provinceDom != null && provinceDom != ''){
				$('#'+provinceDom).html(html);
			}else if((provinceDom == null || provinceDom == '') && (cityDom != null && cityDom != '') ){
				$('#'+cityDom).html(html);
			}
			
		},
		error:function(){
			alert('初始化'+id+"节点下的数据失败")
		}
	})
	if(provinceDom != null || provinceDom != ''){
		initProvinceChange(provinceDom,url,cityDom);
	}
}

/**
 * 
 * @param provinceDom 省下拉框id
 * @param url		  查询数据后台地址
 * @param cityDom	  市下拉框id
 * @returns
 * 示例代码：initProvinceChange("provinceSelect","<%=request.getContextPath()%>/book/findArea.do","citySelect");
 */
function initProvinceChange(provinceDom,url,cityDom){
	$('#'+provinceDom).change(function(){
		var id = $(this).val();
		initArea(id,url,'',cityDom);
	})
}