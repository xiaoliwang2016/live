<template>
	<div>
		<div v-if="!empty">
			<div class="player">
				<div v-for="match in matchs">
					<div class="match_item"> 
						<div class="team_box">
							<img :src="match.team1.icon">
							<p>{{match.team1.name}}</p>
						</div>
						<div class="banner">
							<p>{{match.type}}</p>
							<img :src="match.banner">
							<p>{{match.time}}</p>
							<p> <el-button type="danger" @click="jump(match.id)">点击直播</el-button> </p>
						</div>
						<div class="team_box">
							<img :src="match.team2.icon">
							<p>{{match.team2.name}}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-else>
			<h1 style="padding: 40px">没有正在直播的比赛....</h1>
		</div>
	</div>
</template>
<script>
import request from '../../utils/request'
import {dateObj} from '../../utils/date'
export default{
	data(){
		return {
			empty: true,
			matchs: [],
		}
	},
	created(){
		this.getInfo()
	},
	methods: {
		jump(id){
			this.$confirm('开始比赛吗？').then(res=>{
				request({
					url: '/match/begain/' + id,
					method: 'GET'
				}).then(res=>{
					this.$router.push({
						path: '/admin/live/'+id
					})
				})
			})
		},
		getInfo(){
			request({
				url: '/match/live',
				method: 'GET'
			}).then(res=>{
				if(res.data.length !== 0){
					this.empty = false
					res.data.forEach((item,index)=>{
						res.data[index]['time'] = dateObj.formatDate(item['time']) + ' -- ' + dateObj.getHourAndMin(item['time'])
					})
				}
				this.matchs = res.data
			})	
		}
	}
}
</script>
<style>
@import '../../assets/css/admin.css'
</style>