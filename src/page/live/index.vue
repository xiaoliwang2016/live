<template>
  <div class="detail_container">
    <header class="header w100">
      <span class="back"> <router-link to="/"><i class="el-icon-arrow-left"></i></router-link> </span> {{match_data.team1.name}} VS {{match_data.team2.name}}
    </header>
    <div class="banner w100">
      <img :src="match_data.banner">
      <div class="team team_1">
        <img :src="match_data.team1.icon">
        <p>{{match_data.team1.name}}</p>
        <p>{{match_data.team1.score}}</p>
      </div>
      <div class="team team_2">
        <img :src="match_data.team2.icon">
        <p>{{match_data.team2.name}}</p>
        <p>{{match_data.team2.score}}</p>
      </div>
    </div>
    <div class="nav w100">
      <ul>
        <li class="br"><router-link :to="'/live/'+id+'/match/'+id">比赛直播</router-link></li>
        <li class="br"><router-link :to="'/live/'+id+'/chat/'+id">聊天室</router-link></li>
        <li><router-link :to="'/live/'+id+'/data'">数据</router-link></li>
      </ul>
    </div>

    <router-view></router-view>
    
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  data(){
    return{
      match_data : {
        team1 : {},
        team2 : {},
        score : {},
        goal : {}
      }
    }
  },
  computed:{
    ...mapState([
        'matchInfo'
      ])
  },
  props: ['id'],
  mounted() {
    this.getMatchInfo(this.id);
  },
  methods:{
    ...mapActions([
        'getMatchInfo'
      ])
  },
  watch:{
    matchInfo:function(newVal){
      this.match_data = newVal
    }
  }
}

</script>
<style scoped>
.detail_container{
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
}
.detail_container .header{
  height: 40px;
  line-height: 40px;
  position: relative;
  text-align: center;
  font-size: 16px;
}
.detail_container .header .back{
  position: absolute;
  left: 14px;
}
.banner{
  position: relative;
}

.banner .team{
  position: absolute;
  border-radius: 50%;
  padding: 20px;
/*  width: 120px;
  height: 120px;*/
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  background-color: rgba(255,255,255,.7);
}
.banner>img{
  width: 100%;
  min-height: 260px;
}
.banner .team img{
  width: 40px;
  height: 40px;
}
.banner .team_1{
  left: 50px;
  bottom: 50px;
}
.banner .team_2{
  right: 50px;
  bottom: 50px;
}

.nav ul li{
  float: left;
  width: 33%; 
  text-align: center;
  height: 36px;
  line-height: 36px;
  margin: 5px 0;
}
.nav ul li a{
  display: block;
  width: 100%;
  text-decoration: none;
  color: #666;
  font-size: 16px;
}
.nav ul li .active{
  border-bottom: 2px solid #38f;
}

</style>
