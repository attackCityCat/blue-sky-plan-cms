layui.use(['form'], function(){
  var layer = layui.layer;
  var form=layui.form;
  form.on('submit(formDemo)',function(data){
		$.ajax({
			url:'/idea/updateDetail',
			data:$("#updateForm").serialize(),
			success:function(data){
				if(data.status==0){
					$('#detail').bootstrapTable('refresh',{pageNumber:1});
					$('#modal').modal('hide');
				}else{
					layer.alert("修改失败");
				}
			}
		});
		
		
	})
});
$('#detail').bootstrapTable({
        columns: [
            {
                checkbox: true
            }
            , {
                visible: true,
                field: 'date',
                title: '日期'
            }
            , {
                visible: true,
                field: 'disnum',
                title: '曝光次数'
            }
            ,  {
                visible: true,
                field: 'loadnum',
                title: '下载次数'
            }
            ,{
                visible: true,
                field: 'loadrate',
                title: '转化率'
            }, {
                visible: true,
                field: 'usernum',
                title: '用户数'
            }, {
                visible: true,
                field: 'bidding',
                title: '平均出价'
            }, {
                visible: true,
                field: 'totalMoney',
                title: '花费（元）'
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
                 pageSize: params.pageSize,
                 pageNumber: params.pageNumber
             }
        },//请求服务器数据时的参数
        url:'/idea/listDetail?ideaId='+ideaId //服务器数据的加载地址
    });

function update(){
	var select = $("#detail").bootstrapTable('getSelections');
	if(select.length<1){
		layer.alert("请选择");
		return ;
	}
	$("#id").val(select[0].id);
	$("#disnum").val(select[0].disnum);
	$("#loadnum").val(select[0].loadnum);
	$("#bidding").val(select[0].bidding);
	$('#modal').modal('show');
}



/*function save(){
	alert("22");
	$
}*/