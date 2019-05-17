// 首页
$(function() {
	var $now = new Date();
	var timeStr = $now.getFullYear() + "年" + ($now.getMonth() + 1)
			+ "月" + $now.getDate() + "日";
	$("#navbar-menu").find("div").eq(0).html("<i class='lnr lnr-calendar-full m-r-5'></i>"+timeStr);
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
	loadMenu();
	$('#company').html(GetQueryString('company'));
	$('.user-name').html(GetQueryString('username'));
	$("title").eq(0).text("蓝天计划平台");
//	 $("#navbar-menu").find("span").eq(0).text("退出");
//	 $("#navbar-menu").find("a").eq(0).attr("onclick","logout()");
	/*var companyId = $("#footerCompany").val();
	$.ajax({
		type : 'get',
		url : '/company/query/' + companyId,
		data : {},
		cache : false,
		async : false,
		dataType : 'json',
		success : function(data, textStatus, jqXHR) {
			$("#footer").text("版权所有 © " + data.company);
		}
	});*/
})

function loadMenu() {
	var html = "";
	$
			.ajax({
				url : '/resource/menuTree',
				data : {},
				async : false,
				success : function(data) {
					var test = window.location.pathname;
					var srcNum = test.split("/").length;
					if (data.status == 0) {
						var menu = data.data;
						for (var i = 0; i < menu.length; i++) {
							var url = menu[i].url;
							var childrenList = menu[i].children;
							if (url == undefined) {// 先判断是否有子集
								url = '#subPages';
							}
							if (childrenList != null) {// 如果有,判断子集里是否有当前url
								var flag = false;
								for (var j = 0; j < childrenList.length; j++) {
									var child = childrenList[j];
									if (test.indexOf(child.url) != -1) {
										flag = true;
									}
								}
								html = html + "<li>";
								if (flag) {
									html = html
											+ "<a href='"
											+ url
											+ "' data-toggle='collapse' class='active' aria-expanded='true'><i class='"
											+ menu[i].icon + "'></i>";
								} else {
									html = html
											+ "<a href='"
											+ url
											+ "' data-toggle='collapse' class='collapsed' aria-expanded='false'><i class='"
											+ menu[i].icon + "'></i>";
								}
								html = html
										+ "<span>"
										+ menu[i].text
										+ "</span>"
										+ "<i class='icon-submenu lnr lnr-chevron-left'></i></a>";
								if (flag) {
									html = html
											+ "<div id='subPages' class='collapse in' aria-expanded='false' style>"
											+ "<ul class='nav'>";
								} else {
									html = html
											+ "<div id='subPages' class='collapse' aria-expanded='true' style>"
											+ "<ul class='nav'>";
								}

								$.each(childrenList, function(index, row) {
									if (test.indexOf(row.url) != -1) {
										html += "<li><a href='" + row.url
												+ "' class='active'>"
												+ row.text + "</a></li>";
									} else {
										html += "<li><a href='" + row.url
												+ "' class=''>" + row.text
												+ "</a></li>";
									}
								});
								html += "</ul>";
								html += "</div>";
								html += "</li>";1
							} else {
								if (test.indexOf(url) != -1 && url.split("/").length == srcNum) {
									html = html + "<li><a href='" + url
											+ "' class='active'><i class='"
											+ menu[i].icon + "'></i> <span>"
											+ menu[i].text + "</span></a></li>";
								} else {
									html = html + "<li><a href='" + url
											+ "'><i class='" + menu[i].icon
											+ "'></i> <span>" + menu[i].text
											+ "</span></a></li>";
								}

							}
							// html = html
							// + "<li class='layui-nav-item'><a class='' href='"
							// + url + "' target='iframe_a'><i class='"
							// + menu[i].icon + "'></i>" + menu[i].text +
							// "</a>";
							// var childrenList = menu[i].children;
							// if (childrenList != null) {
							// html += "<dl class='layui-nav-child'>";
							// $.each(childrenList, function(index, row) {
							// html += "<dd class='user'><a href='" + row.url
							// + "' target='iframe_a'>" + row.text
							// + "</a></dd>";
							// });
							// html += "</dl>";
							// }
							// html += "</li>";
							// html = html
							// + "<li><a href='"+url+"'><i
							// class='"+menu[i].icon+"'></i>
							// <span>"+menu[i].text+"</span></a>";
							//					
							// if (childrenList != null) {
							// html += "<dl class='layui-nav-child'>";
							// $.each(childrenList, function(index, row) {
							// html += "<dd class='user'><a href='" + row.url
							// + "' target='iframe_a'>" + row.text
							// + "</a></dd>";
							// });
							// html += "</dl>";
							// }
							// html += "</li>";
						}
					}

				}
			});
	$("#menuTree").html(html);
}

// 退出登录
function logout() {
	$.ajax({
		type : 'get',
		url : '/logout',
		cache : false,
		async : false,
		success : function(data, textStatus, jqXHR) {
			window.location.href = "/";
		}
	});
}

//退出登录
function logoutByDataAdmin() {
	$.ajax({
		type : 'get',
		url : '/logout',
		cache : false,
		async : false,
		success : function(data, textStatus, jqXHR) {
			window.location.href = "/admin ";
		}
	});
}

// 获取参数
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return decodeURI(r[2]);
	return null;
}