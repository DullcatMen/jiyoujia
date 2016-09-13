$(".inputBox input").mouseenter(function() {
	$(".btn-ok").css({
		display: "block",
		border: "1px solid #e8e8e8",
	});
});
$(".inputBox").mouseleave(function() {
	$(".btn-ok").css({
		display: "",
		border: "",
	});
});
$(".btn-ok").mouseenter(function() {
	$(".btn-ok").css({
		display: "block",
		border: "1px solid #e8e8e8",
	});
}).mouseleave(function() {
	$(".btn-ok").css({
		display: "",
		border: "",
	});
});

$.ajax({
	url : "http://www.ikindness.cn/api/test/getProduct",
}).done(function(data){
	var _data = data.data;
	var dataLen = data.data.length;

	//鼠标Enter事件函数
	var _mouseenter = function(){
		$(".main-box").mouseenter(function() {
			$(this).css("border-color","red");
			$(this).find(".btn-mai").css("display","block");
		}).mouseleave(function() {
			$(this).css("border-color","");
			$(this).find(".btn-mai").css("display","");
		});
		$(".main233 .btn-mai").click(function() {
			var _paice = parseInt($(this).parent().find(".jiage-num").text());
			$.ajax({
				url : "http://www.ikindness.cn/api/test/getInfo",
				data : {
					price : _paice,
				},
			}).done(function(data){
				console.log(data.message);
			});
		});
	};

	//重新生成函数
	//参数：排序后的数组array
	var createNewdata = function(array){
		var len = array.length;
		var startPage = [];
		//筛选
		for(var m=0;m<len;m++){
			if(m<10){
				startPage.push(array[m]);
			}
		}
		$(".main233").append(template("tmpl",{
			data : startPage,
		}));

		var count = len / 10; //一个变量获取 当前数组的数据个数 除以 一页的数据个数
		var emLen; //一个变量用来存放翻页按钮的个数
		//判断
		if(count <= 1){
			emLen = 1;
		}else{
			if(len%10 == 0){
				emLen = count;
			}else{
				emLen = parseInt(count) + 1;
			}
		}
		//循环添加em
		for(var j=0;j<emLen;j++){
			var num = j+1;
			var _em = "<em>"+num+"</em>";

			$(".embox").append(_em);
		}

		$(".embox em").eq(0).css({
				backgroundColor: '#f40',
				color: '#fff',
		});
	};

	var emClick = function(array){

		//em翻页按钮点击事件
		$(".embox em").click(function() {
			//样式
			var x = $(this).index();
			$(".embox em").eq(x).css({
				backgroundColor: '#f40',
				color: '#fff',
			}).siblings().css({
				backgroundColor: '#fff',
				color: '',
			});

			var len = array.length;
			
			var prepCount = $(this).index() * 10;
			var count = ($(this).index()+1) * 10 ;

			var newPage = [];
			//筛选
			for(var i=0;i<len;i++){
				if(i>=prepCount && i<count){
					newPage.push(array[i]);
				}
			}

			$(".main-box").remove();

			$(".main233").append(template("tmpl",{
				data : newPage,
			}));

			_mouseenter();

		});

	};


	//页面初始数据
	createNewdata(_data);

	//翻页按钮函数
	emClick(_data);

	_mouseenter();

	
	
	//a 标签点击样式
	$(".top-nav a").click(function() {
		$(this).css({
			backgroundColor: "#fff",
			borderRight: "1px solid #e8e8e8",
			borderLeft: "1px solid #e8e8e8",
			color: "red",
		}).siblings().css({
			backgroundColor: "",
			borderRight: "",
			borderLeft: "",
			color: "",
		});
	});


	//价格升序
	$(".top-nav .jg-up").click(function() {
		//清空
		$(".main-box").remove();
		$(".embox").empty();

		//排序
		var array = _data;
		// console.log(array[0]);

		var m , n , len=array.length , d ;

		for(m=0;m<len;m++){
			for(n=0;n<len;n++){
				if( parseFloat(array[m].price) < parseFloat(array[n].price) ){
					d = array[n];
					array[n] = array[m];
					array[m] = d;
				}
			}
		}

		//重新生成
		createNewdata(array);

		//翻页按钮函数
		emClick(array);

		_mouseenter();

	});

	//价格降序
	$(".top-nav .jg-down").click(function() {
		//清空
		$(".main-box").remove();
		$(".embox").empty();

		//排序
		var array = _data;
		// console.log(array[0]);

		var m , n , len=array.length , d ;

		for(m=0;m<len;m++){
			for(n=0;n<len;n++){
				if( parseFloat(array[m].price) > parseFloat(array[n].price) ){
					d = array[n];
					array[n] = array[m];
					array[m] = d;
				}
			}
		}

		//重新生成
		createNewdata(array);

		//翻页按钮函数
		emClick(array);

		_mouseenter();
		
	});
		
	//交易量升序
	$(".top-nav .jy-up").click(function() {
		//清空
		$(".main-box").remove();
		$(".embox").empty();

		//排序
		var array = _data;

		var m , n , len=array.length , d ;

		for(m=0;m<len;m++){
			for(n=0;n<len;n++){
				if( parseInt(array[m].sold) < parseInt(array[n].sold) ){
					d = array[n];
					array[n] = array[m];
					array[m] = d;
				}
			}
		}

		//重新生成
		createNewdata(array);

		//翻页按钮函数
		emClick(array);

		_mouseenter();
		
	});

	//交易量降序
	$(".top-nav .jy-down").click(function() {
		//清空
		$(".main-box").remove();
		$(".embox").empty();

		//排序
		var array = _data;

		var m , n , len=array.length , d ;

		for(m=0;m<len;m++){
			for(n=0;n<len;n++){
				if( parseInt(array[m].sold) > parseInt(array[n].sold) ){
					d = array[n];
					array[n] = array[m];
					array[m] = d;
				}
			}
		}

		//重新生成
		createNewdata(array);

		//翻页按钮函数
		emClick(array);

		_mouseenter();
		
	});


	$(".btn-ok .btnOk").click(function() {
		console.log($("#up_ipt")[0].value,$("#down_ipt")[0].value);
		var minPrice = $("#up_ipt")[0].value;
		var maxPrice = $("#down_ipt")[0].value;
		//清空
		$(".main-box").remove();
		$(".embox").empty();

		//筛选
		var array = _data;
		var newArray = [];

		var i , d , len=array.length;

		for(i=0;i<len;i++){
			if(parseInt(array[i].price)>=minPrice && parseInt(array[i].price)<=maxPrice){
				newArray.push(array[i]);
			}
			if(minPrice=="" && maxPrice==""){
				newArray.push(array[i]);
			}
		}

		//重新生成
		createNewdata(newArray);

		//翻页按钮函数
		emClick(newArray);

		_mouseenter();

	});		

});






