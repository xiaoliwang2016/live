<template>
  <div class="data w100">

    <div class="data_header">
      <div>
        <img :src="matchInfo.team1.icon">
        <p>{{matchInfo.team1.name}}</p>
      </div>
      <div>
      	<p>{{matchInfo.status == 0 ? '上半场' : '下半场'}}</p>
      	<p class="red">{{matchInfo.team1.score}} VS {{matchInfo.team2.score}}</p>
      	<p>{{matchInfo.type}}</p>
      </div>
      <div>
        <img :src="matchInfo.team2.icon">
        <p>{{matchInfo.team2.name}}</p>
      </div>
    </div>

    <div class="data_body w100">
    	<p class="title">赛况</p>
		<div class="w100">
			<table class="table table-striped w100 detail">
				<tr class="bb"><td>球队</td><td>上半场</td><td>下半场</td><td>总比分</td></tr>
				<tr><td><img :src="matchInfo.team1.icon"></td><td>{{matchInfo.score.team1_first}}</td><td>{{matchInfo.score.team1_second}}</td><td>{{matchInfo.score.team1_score}}</td></tr>
				<tr><td><img :src="matchInfo.team2.icon"></td><td>{{matchInfo.score.team2_first}}</td><td>{{matchInfo.score.team2_second}}</td><td>{{matchInfo.score.team2_score}}</td></tr>
			</table>
		</div>
    </div>


    <div class="data_footer mt10">
    	<p class="title">进球情况</p>
		<div class="w100">
			<table class="table table-striped w100 detail">
				<tr class="bb"><td>球队</td><td>时间</td><td>球员</td></tr>
				<tr v-for="goal in matchInfo.goal">
					<td><img :src="goal.team.icon"></td>
					<td>{{goal.time}}</td>
					<td><img :src="goal.player.icon"></td>
				</tr>
			</table>
		</div>
    </div>


  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed:{
    ...mapState([
        'matchInfo'
      ])
  }
}

</script>
<style scoped>
  .data{
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
}
.data .data_header{
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #fff;
  margin-bottom: 10px;
}
.data_header div{
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
}
.data .data_header p{
  height: 24px;
}
.data .data_header img{
  width: 60px;
  height: 60px;
}
.data_body,.data_footer{
  background-color: #fff;
  padding: 15px;
}
.data_body .detail{
  margin-top: 10px;
}
.detail tr{
  height: 40px;
  line-height: 40px;
}
.detail tr td{
  text-align: center;
  font-size: 14px;
}
.detail tr td img{
  width: 30px;
  height: 30px;
}
</style>