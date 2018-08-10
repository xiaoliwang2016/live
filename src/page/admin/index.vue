<template>
	<div class="admin_container">
		<div>

			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			  <el-menu-item index="1"><a class="logo" href="/admin"><img src="../../assets/image/fifa.png"></a></el-menu-item>
			  <el-menu-item index="5">
				<router-link to="/admin/home">直播管理</router-link>
			  </el-menu-item>
			  <el-menu-item index="2">
				<router-link to="/admin/match">赛事管理</router-link>
			  </el-menu-item>
			  <el-menu-item index="3">
			  	<router-link to="/admin/player">球员管理</router-link>
			  </el-menu-item>
			  <el-menu-item index="4">
			  	<router-link to="/admin/team">球队管理</router-link>
			  </el-menu-item>
			</el-menu>

		</div>
		<div>
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
export default{
	data(){
		return {
			activeIndex : '5'
		}
	},
	methods:{
		handleSelect(){
			return
		}
	}
}
</script>
<style>
@import '../../assets/css/admin.css'
</style>
