<template>
	<div class="login_box">
		<p style="text-align: center;margin: 30px 0;">登录直播管理</p>
		<el-form label-width="80px">
			<el-form-item label="账号">
				<el-input v-model="user"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input type="password" v-model="passwd"></el-input>
			</el-form-item>
			<el-form-item>
				 <el-button type="primary" @click="login">登录</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
import { setToken } from '../../utils/auth'
import request from '@/utils/request'

export default {
	data(){
		return {
			user: '',
			passwd: ''
		}
	},
	methods: {
		login(){
			if(this.user == '' || this.passwd == ''){
				this.$message.error('账号密码不能为空')
				return
			}
			request({
				url: '/login',
				method: 'POST',
				data: {
					user: this.user,
					passwd: this.passwd
				}
			}).then(res=>{
				if(res.code == '1001'){
					if(setToken(res.data)){
						this.$router.push({
							path: '/admin/home'
						})
					}
				}
			})
		}
	}
}

</script>
<style scoped>
.login_box{
	padding: 30px;
}
</style>
