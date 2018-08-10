<template>
	<div class="live">
		<el-form :rules="rules" ref="ruleForm" class="demo-ruleForm">
			<el-form-item>
				比赛当前状态
				<p>
					<el-button type="success" disabled v-if="!status">上半场</el-button>
					<el-button type="danger" disabled v-else="status">下半场</el-button>
					<el-button type="primary" icon="el-icon-check" v-show="!status" circle @click="changeMatchStat"></el-button>
				</p>
			</el-form-item>

			</el-form-item label="请选择球队" v-if="" matchInfo.team1">
			 	 <el-radio v-model="team_id" :label="matchInfo.team1.id"><img :src="matchInfo.team1.icon" class="player_team_avater">  {{matchInfo.team1.name}}</el-radio>
 				 <el-radio v-model="team_id" :label="matchInfo.team2.id"><img :src="matchInfo.team2.icon" class="player_team_avater">  {{matchInfo.team2.name}}</el-radio>
			</el-form-item>

			<el-form-item>
				比分板
				<p>
					<el-button type="success" disabled>{{matchInfo.score.team1_score}} : {{matchInfo.score.team2_score}}</el-button>
					<el-button type="danger"  @click="getScore">进球了！</el-button>
				</p>
			</el-form-item>

			<el-form-item label="内容" prop="content">
				<el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="content">
				</el-input>
			</el-form-item>

			<el-form-item label="图片(可选)">
				<el-upload
					  class="avatar-uploader"
					  action="http://wx.live.com/index/player/upload"
					  :show-file-list="false"
					  :on-success="handleAvatarSuccess"
					  :before-upload="beforeAvatarUpload"
					  name="image">
					  <img v-if="imageUrl" :src="imageUrl" class="avatar" style="max-width: 220px;">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>

			<el-button type="primary" @click="onSubmit">发送</el-button>
			<el-button @click="clearForm">清空</el-button>

			</el-form-item>
		</el-form>


		<el-dialog title="选择进球队员" :visible.sync="dialogVisible" width="80%">
		  <ul>
		  	<li v-for="player in winner">
		  		<el-radio v-model="player_id" :label="player.id"><img :src="player.icon" class="player_team_avater">  {{player.name}}</el-radio>
		  	</li>
		  </ul>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible=false">取 消</el-button>
		    <el-button type="primary" @click="submitGoal">确 定</el-button>
		  </span>

		</el-dialog>
	</div>
</template>
<script>
import request from '../../utils/request'
export default {
	data() {
		return {
			matchInfo: {},
			team_id: '',
			content: '',
			img: '',
			imageUrl: '',
			//比赛状态 false为上半场  true下半场
			status: false,
			rules: {
				team_id: [
					{ required: true, message: '请选择球队', trigger: 'blur' },
				],
				content: [
					{ required: true, message: '请输入内容', trigger: 'blur' },
				]
			},
			dialogVisible: false,
			//进球队伍
			winner: [],
			//进球球员
			player_id: ''
		}
	},
	props: ['id'],
	created() {
		this._getMatchInfo()
	},
	methods: {
		handleAvatarSuccess(res, file) {
			this.img = res;
			this.imageUrl = URL.createObjectURL(file.raw);
		},
		beforeAvatarUpload(file) {
			const isLt2M = file.size / 1024 / 1024 < 2;
			if (!isLt2M) {
				this.$message.error('上传头像图片大小不能超过 2MB!');
			}
			return isLt2M;
		},
		clearForm(){
			this.team_id = '',
			this.content = '',
			this.img = '',
			this.imageUrl = ''
		},
		onSubmit(){
			if(this.team_id=='' && this.content==''){
				this.$message.error('输入不能为空')
				return false
			}

			var formData = new FormData();

			formData.append("team_id", this.team_id)
			formData.append("content", this.content)
			formData.append("img", this.img)
			formData.append("match_id", this.id)
			formData.append("section", this.status ? 1 : 0)
			formData.append("time", this._getCurrentlyTime())

			var config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }

            request.post('/live/push', formData, config).then(res=>{
              	this.$message.success('发送成功');
		        this.clearForm()
            })

		},
		//切换到下半场
		changeMatchStat(){
			if(Date.now()-this.matchInfo.time < 2700){
       			 this.$message.error('现在还不可以进入下半场');
			}
	        this.$confirm('是否进入下半场', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	        	request({
	        		url: '/match/switch_status/' + this.id,
	        		method: 'GET'
	        	}).then(res=>{
	        		this.status = true
	        	})
	        });
		},
		//选择进球队员
		getScore(){
			if(!this.team_id){
				this.$message.error('请选择进球球队');
				return
			}
			request({
				url: '/players/' + this.team_id,
				method: 'GET'
			}).then(res=>{
				this.winner = res.data
				this.dialogVisible = true
			})
		},
		//提交进球
		submitGoal(){
			var data = {
				match_id: this.id,
				team_id: this.team_id,
				section: this.status ? 1 : 0,
				time: this._getCurrentlyTime(),
				player_id: this.player_id
			}
			//判断是否是主队进球
			if(this.matchInfo.team1.id == this.team_id){
				data.team = 1 
			}else{
				data.team = 0
			}
			request({
				url: '/match/modify_score',
				method: 'POST',
				data: data
			}).then(res=>{
				this._getMatchInfo()
				this.dialogVisible = false
				this.content = '进球了'
				this.onSubmit()
			})
		},

		//获得比赛当前时间
		_getCurrentlyTime(){
			//如果status 存在 则表示已进行到下半场 
			var diff = 0;
			if(this.matchInfo.status){
				//如果是下半场 则加上上半场45分钟时间
				diff = Date.now()/1000 - this.matchInfo.time + 2700
			}else{
				diff = Date.now()/1000 - this.matchInfo.time
			}
			//如果时间差大于120分钟 则把时间设置为 0：00
			if(diff < 0 || diff > 7200){
				return '00:00'
			}else{
				return this._formatTime(diff)
			}
		},

		_formatTime(seconds){
			return parseInt(seconds / 60) + ':' + parseInt(seconds % 60)
		},

		_getMatchInfo(){
			request({
				url: '/match/get_match/' + this.id,
				method: 'GET'
			}).then(res => {
				this.matchInfo = res.data
				this.status = this.matchInfo.status == '1' ? true : false
			})	
		}
	}
}

</script>
<style>
@import '../../assets/css/admin.css'
</style>
