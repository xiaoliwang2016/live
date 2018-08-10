var dateObj  = {
	/**
	 * 判断时间戳是今天 明天 后天
	 * 今天返回0 ，明天返回1 后天返回2
	 */
	isWhichDay : function(time){
		// 获取当天 0 点的时间戳
    	var timeStamp = new Date(new Date().setHours(0, 0, 0, 0)) / 1000;
    	var diff = parseInt((time - timeStamp) / 86400);
    	return diff
	},	
	/**
	 * 格式化时间戳
	 * 输出 *月*日 星期*
	 */
	formatDate : function(timeStamp){
		var date = new Date(timeStamp * 1000);
		var weekArr = ['一','二','三','四','五','六','日'];
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var week = date.getDay();
		return month + '月' + day + '日' + '  ' + '星期' + weekArr[week] ;
	},
	/**
	 * 格式化时间戳
	 * 输出 ** : **
	 */
	getHourAndMin : function(timeStamp){
		var date = new Date(timeStamp*1000);
		var min = date.getMinutes();
		if(min < 10){
			min = '0' + min
		}
		return date.getHours() + ' : ' + min;
	}

}

export {dateObj}
