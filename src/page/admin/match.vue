<template>
	<div>
		<p style="padding: 0 40px;text-align: right;">
			<el-button type="text" @click="showAdd"><i class="glyphicon glyphicon-plus"></i> 添加新比赛</el-button>
		</p>
		<div class="player">
				<div v-for="match in matchs">
					<div class="match_item"> 
						<div class="team_box">
							<img :src="match.team1.icon">
							<p>{{match.team1.name}}</p>
						</div>
						<div class="banner">
							<img :src="match.banner">
							<p>{{match.type}}</p>
							<p>{{match.time}}</p>
						</div>
						<div class="team_box">
							<img :src="match.team2.icon">
							<p>{{match.team2.name}}</p>
						</div>
					</div>
				</div>
		</div>
		<el-dialog title="添加球员" :visible.sync="dialogVisible" width="80%" style="min-width: 420px;">
			<el-form label-width="100px" class="demo-ruleForm">
				<el-form-item label="主队">
					<el-select v-model="team1_id" placeholder="求选择球队">
						<el-option :label="team.name" :value="team.id" v-for="team in teams"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="客队">
					<el-select v-model="team2_id" placeholder="求选择球队">
						<el-option :label="team.name" :value="team.id" v-for="team in teams"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="比赛时间">
				    <el-date-picker
				      v-model="time"
				      type="datetime"
				      placeholder="选择日期时间">
				    </el-date-picker>
				</el-form-item>

				<el-form-item label="比赛Banner">
					<el-upload
					  class="avatar-uploader"
					  action="http://wx.live.com//index/player/upload"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload"
					  name="image">
					  <img v-if="imageUrl" :src="imageUrl" class="avatar" style="max-width: 200px;">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>

				<el-form-item label="比赛类型">
					<el-select v-model="type" placeholder="比赛类型">
						<el-option label="国际联赛" :value="1"></el-option>
						<el-option label="友谊赛" :value="2"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="add()">立即创建</el-button>
				</el-form-item>

			</el-form>
		</el-dialog>
	</div>
</template>
<script>
import request from '../../utils/request'
import {dateObj} from '../../utils/date'
export default {
	data() {
		return {
			dialogVisible: false,
			matchs: [],
			teams: [],
			team1_id: '',
			team2_id: '',
			banner: '',
			time: '',
			type: '',
			imageUrl: '',
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		showAdd() {
			request.get('/team/list').then(res => {
				this.teams = res.data
			})
			this.dialogVisible = true
		},
		handleAvatarSuccess(res, file) {
			this.banner = res;
			this.imageUrl = URL.createObjectURL(file.raw);
		},
		beforeAvatarUpload(file) {
			const isLt2M = file.size / 1024 / 1024 < 2;
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
			}
			return isLt2M;
		},
		add(){
			var data = {
				team1_id: this.team1_id,
				team2_id: this.team2_id,
				banner: this.banner,
				time: (this.time.getTime())/1000,
				type: this.type 
			} 
			request({
				url: '/match/add',
				method: 'POST',
				data: data
			}).then(res=>{
				this.dialogVisible = false
		        this.$message({
		          message: '添加成功',
		          type: 'success'
		        })
			})
		},
		getInfo(){
			request({
				url: '/match/all',
				method: 'GET'
			}).then(res=>{
				res.data.forEach((item,index)=>{
					res.data[index]['time'] = dateObj.formatDate(item['time']) + ' -- ' + dateObj.getHourAndMin(item['time'])
				})
				this.matchs = res.data
			})	
		}
	}
}

</script>
<style>
@import '../../assets/css/admin.css'

</style>
