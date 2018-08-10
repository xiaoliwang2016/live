<template>
	<div>
		<p style="padding: 0 40px;text-align: right;">
			<el-button type="text" @click="showAdd"><i class="glyphicon glyphicon-plus"></i> 添加新球员</el-button>
		</p>
		<div class="player">
			<el-row>
				<el-col :xs="12" :sm="8" :md="6" v-for="player in players">
					<div class="thumbnail">
						<img :src="player.icon" class="player_avatar">
						<div class="caption" v-if="player">
							<h3>{{player.name}}</h3>
							<p><img :src="player.team.icon" class="player_team_avater"><span>{{player.team.name}}</span></p>
						</div>
					</div>
				</el-col>
			</el-row>
		</div>
		<el-dialog title="添加球员" :visible.sync="dialogVisible" width="80%" style="min-width: 420px;">
			<el-form label-width="100px" class="demo-ruleForm">
				<el-form-item label="球员姓名">
					<el-input v-model="name"></el-input>
				</el-form-item>
				<el-form-item label="球员头像">
					<el-upload
					  class="avatar-uploader"
					  action="http://wx.live.com//index/player/upload"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload"
					  name="image">
					  <img v-if="imageUrl" :src="imageUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="所属球队">
					<el-select v-model="team_id" placeholder="求选择球队">
						<el-option :label="team.name" :value="team.id" v-for="team in teams"></el-option>
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
import axios from 'axios'
export default {
	data() {
		return {
			dialogVisible: false,
			players: [],
			teams: [],
			name: '',
			team_id: '',
			icon: '',
			imageUrl: '',
		}
	},
	created() {
		this.getInfo()
	},
	methods: {
		showAdd() {
			request({
				url: '/team/list',
				method: 'GET'
			}).then(res => {
				this.teams = res.data
			})
			this.dialogVisible = true
		},
		handleAvatarSuccess(res, file) {
			this.icon = res;
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
			request({
				url: '/player/add',
				method: 'POST',
				data: {
					name : this.name,
					icon : this.icon,
					team_id : this.team_id			
				}
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
				url: '/player/list',
				method: 'GET'
			}).then(res=>{
				this.players = res.data
			})	
		}
	}
}

</script>
<style>
@import '../../assets/css/admin.css'

</style>
