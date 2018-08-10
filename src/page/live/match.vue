<template>
	<div class="w100">
		<div class="match w100">
			<div class="title" v-if="liveContent.first.length != 0">
				<i class="el-icon-info"></i>
				<span>上半场</span>
			</div>
			<div v-else style="font-size: 14px;color:#999">
				比赛尚未开始，可以在聊天室发言
			</div>
			<div class="content">
				<div v-for="item in liveContent.first" v-if="liveContent.first">
					<div class="content_item pad5">
						<p class="item_header">
							<span class="circle"></span>
							<img :src="item.team.icon"> {{item.team.name}}</p>
						<p class="pad5" v-if="item.content">{{item.time}} {{item.content}}</p>
						<p v-if="item.img"><img :src="item.img"></p>
					</div>
				</div>
			</div>
		</div>

		<div class="match w100">
			<div class="title" v-if="liveContent.second.length != 0">
				<i class="el-icon-info"></i>
				<span>下半场</span>
			</div>
			<div class="content">
				<div v-for="item in liveContent.second" v-if="liveContent.second">
					<div class="content_item pad5">
						<p class="item_header">
							<span class="circle"></span>
							<img :src="item.team.icon"> {{item.team.name}}</p>
						<p class="pad5" v-if="item.content">{{item.time}} {{item.content}}</p>
						<p v-if="item.img"><img :src="item.img"></p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import request from '@/utils/request'
export default{
	data(){
		return{
			liveContent:{
				first: [],
				second: [],
				ws: null
			}
		}
	},
	props:['id'],
	created(){
		request.get('/live/list/'+this.id).then(res=>{
			res.data.forEach(item=>{
				if(item.section == 0){
					this.liveContent.first.push(item)
				}else{
					this.liveContent.second.push(item)
				}
			})
		})

		this.ws = new WebSocket("ws://192.168.1.121:8811");

		this.ws.onopen = evt => {
			console.log('websocket connecting ....');
		}

		this.ws.onmessage = evt => {
			var data = JSON.parse(evt.data);
			console.log(data);
			//如果赛事id和当前id不符合 不渲染到页面
			if(data.match_id == this.id){
				if(data.section === '1'){
					this.liveContent.second.push(data);
				}else if(data.section === '0'){
					this.liveContent.first.push(data);
				}			
			}

		}

	}
}
</script>
<style scoped>
.match{
	margin: 10px;
}
.match .title{
	padding: 0 10px;
	border-radius: 15px;
	background-color: red;
	width: 70px;	
	font-size: 14px;
	color: #fff;
}
.content{
	border-left: dotted 1px #38f;
	font-size: 14px;
}
.content .item_header{
	color: #777;
	position: relative;
}
.content .item_header img{
	width: 30px;
	height: 30px;
}
.content_item img{
	width:95%;
}
.circle{
	background-color: #38f;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	position: absolute;
	left: -10px;
	top: 50%;
	margin-top: -8px;
}
</style>