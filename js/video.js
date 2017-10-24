window.onload = function() {
	var obj = [{
			songName: "无条件",
			singer: "陈奕迅",
			time: "04:04",
			src: "vedios/陈奕迅 - 无条件.mp4"
		},
		{
			songName: "告白气球",
			singer: "周杰伦",
			time: "03:35",
			src: "vedios/周杰伦 - 告白气球.mp4"
		},
		{
			songName: "前世情人",
			singer: "周杰伦",
			time: "03:27",
			src: "vedios/周杰伦 - 前世情人.mp4"
		},
		{
			songName: "See You Again",
			singer: "Wiz Khalifa",
			time: "03:57",
			src: "vedios/Wiz Khalifa,Charlie Puth - See You Again.mp4"

		},
		{
			songName: "Wake Me Up",
			singer: "Avicii",
			time: "04:32",
			src: "vedios/Avicii - Wake Me Up.mp4"

		},
		{
			songName: "泡沫",
			singer: "邓紫棋",
			time: "04:33",
			src: "vedios/G.E.M.邓紫棋 - 泡沫.mp4"
		},
		{
			songName: "你把我灌醉",
			singer: "邓紫棋",
			time: "04:49",
			src: "vedios/G.E.M.邓紫棋 - 你把我灌醉.mp4"
		},
		{
			songName: "夜半小夜曲",
			singer: "李克勤",
			time: "04:38",
			src: "vedios/李克勤 - 月半小夜曲.mp4"
		},
		{
			songName: "信仰",
			singer: "张信哲",
			time: "04:09",
			src: "vedios/张信哲 - 信仰.mp4"
		},
		{
			songName: "爱就一个字",
			singer: "张信哲",
			time: "04:31",
			src: "vedios/张信哲 - 爱就一个字 版本2.mp4"
		}
	];

	/*获取侧边视频播放列表标签div.video-list 中的ul 加载音乐信息*/
	var ul = document.getElementsByClassName("video-list")[0].children[0];
	//获取当前音乐
	var video = document.getElementsByTagName("video")[0];
	//	console.log(ul);
	for(var i = 0; i < obj.length; i++) {

		//创建li span 标签
		var li = document.createElement("li");
		var span = document.createElement("span");

		//自定义属性
		li.setAttribute("index", i);

		//往标签里添加内容
		li.innerHTML = obj[i].songName + "--" + obj[i].singer;
		span.innerHTML = obj[i].time;

		//ul添加子标签
		li.appendChild(span);
		ul.appendChild(li);
	}

	/*点击视频列表播放视频*/
	var dex; //存当前音乐的index值
	var li = document.getElementsByTagName("li");
	for(var j = 0; j < li.length; j++) {
		li[j].addEventListener("click", function() {

			//获取当前被点击的li 的index值
			dex = this.getAttribute("index");
			//进度条归零
			barCrimson.style.width = 0;

			//调用changeSongSrc()函数
			changSongSrc(dex);

		}, true);
	}
	
	
	/*当前音乐随机播放*/
	var objLength = obj.length;
	video.onended = function(){
		video.setAttribute("src",obj[Math.floor(Math.random()*objLength)]["src"]);
	}

	/*创建函数 根据点击的li 的index值来改变视频的路径*/

	function changSongSrc(index) {
		var src = obj[index]["src"];
		video.setAttribute("src", src);
//		video.setAttribute("video_id", index);
		
	}

	/*创建函数 音乐播放条随着时间在前进  以及点击哪里 音乐从哪里开始*/
	var barWhiteProgress = document.getElementsByClassName("bar-white")[0];
	var barCrimson = barWhiteProgress.children[0];
	barWhiteProgress.addEventListener("mouseenter", function(event) {

		//点击进度条
		var offsetX = event.offsetX;
		//给红色条长度
		barCrimson.style.width = offsetX + "px";
		//进度条跳到当前位置
		video.currentTime = (offsetX / barWhiteProgress.offsetWidth) * (video.duration);

	}, true);



	//创建函数 保存当前播放的百分比
	//定时器开始获取当前音乐播放进度  给个宽

	setInterval(getSongPresess, 10);

	function getSongPresess() {
		//当前歌曲总时长
		var duration = video.duration;
		//播放位置
		var currentTime = video.currentTime;
		var percent = currentTime / duration;

//		return percent;
		barCrimson.style.width = (percent * barWhiteProgress.offsetWidth) + "px";
	}
	
	

	//设置控制面板当前时间的播放进度
	var control = document.getElementsByClassName("control")[0];
	//循环获取当前时间
	setInterval(function() {
		var currentTime = video.currentTime;
		control.children[1].innerHTML = time(currentTime) + " / 00:00";
	}, 100);

	//封装函数计时器
	function time(time) {
		var minute = parseInt(time / 60);
		var second = parseInt(time % 60);
		minute = minute < 10 ? "0" + minute : minute;
		second = second < 10 ? "0" + second : second;
		return minute + ":" + second;
	}

	//点击暂停按钮触发视频暂停播放事件
	var pausePlayBtn = control.children[0];
//	var flag = true;
	pausePlayBtn.addEventListener("click", function() {
//		flag = !flag;
		if(video.paused == true) {
			this.className = "fa fa-pause";
			video.play();
		} else {
			this.className = "fa fa-play";
			video.pause();

		}
		//		this.className = (flag ==true)? "fa fa-pause":"fa fa-play";
	}, true);

	//点击音量按钮调整音量大小
	var volume = control.children[2];
	//获取音量进度条
	var volumeBarCrimson = document.getElementsByClassName("volume-bar-crimson")[0];

	var mark = true;
	volume.addEventListener("click", function() {
		var siblingWidth = this.nextElementSibling.offsetWidth;
		console.log(siblingWidth);
		mark = !mark;
		if(mark == true) {
			this.className = "fa fa-volume-up volume";
			video.volume = 1;
			volumeBarCrimson.style.width = siblingWidth +"px";
		} else if(mark ==false){
			this.className = "fa fa-volume-off volume";
			video.volume = 0;
			volumeBarCrimson.style.width = 0;
		}
	}, true);

	//点击父节点 子节点变化
	//获取红色音量进度条的父节点
	var volumeBarSilver = volumeBarCrimson.parentNode;
	volumeBarSilver.addEventListener("mouseenter", function(event) {

		//获取当前鼠标的位置
		var offsetX = event.offsetX;
		var percent = offsetX / 120;

		//设置当前音量
		video.volume = percent;
		//设置当前进度条长度
		volumeBarCrimson.style.width = offsetX + "px";
		
	}, true);

	//点击全屏按钮触发事件
	//获取全屏按钮
	var screenBtn = document.getElementsByClassName("resize")[0];
	//单击按钮 全屏
	screenBtn.addEventListener("click", function(e) {
		//W3C标准
		if(video.requestFullscreen) {
			video.requestFullscreen();
		}
		//firefox
		else if(video.mozRequestFullScreen) {
			video.mozRequestFullScreen();
		}
		//chrome
		else if(video.webkitRequestFullScreen) {
			video.webkitRequestFullScreen();
		}
		//IE11
		else if(video.msRequestFullscreen) {
			video.msRequestFullscreen();
		}
	}, true);
	
	
	//双击视频推出全屏
	video.addEventListener("dblclick", function() {
		//W3C标准
		if(this.exitFullscreen) {
			this.exitFullscreen();
		}
		//firefox
		else if(document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		}
		//chrome
		else if(this.webkitExitFullscreen) {
			this.webkitExitFullscreen();
		}
		//IE11
		else if(document.msExitFullscreen) {
			document.msExitFullscreen();
		}

	}, false);
	
	
	/*video.onended = function(){
		alert("结束！");
	}
	video.onpause = function(){
		alert("暂停了该歌曲!");
	}
	video.onplay = function(){
		alert("该歌曲播放!");
	}
	video.onvolumechange = function(){
		alert("音量改变了！");
	}
	video.ontimeupdate = function(){
		alert("播放的当前位置发生了改变！");
	}*/
}