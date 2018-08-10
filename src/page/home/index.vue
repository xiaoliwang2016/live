<template>
  <div class="home_container">
    <header class="pad10 w100" style="text-align: center;position: relative;padding: 10px;">
      赛程
      <span style="position: absolute;right:20px;"><router-link to="/login"><i class="el-icon-setting"></i></router-link></span>
    </header>
    <div class="home_body w100">
      <template v-for="items,index in list">
        <div class="item_header w100" v-if="items">
          <span v-if="index == 0">今天</span>
          <span v-else-if="index == 1">明天</span>
          <span v-else>后天</span>
          <span>{{items[0].date}}</span>
        </div>
        <div class="item_body" v-for="item in items" v-if="items" @click="jump(item.id,item.is_live)">
          <div style="display: flex">
            <div style="padding: 5px;">
              <p class="flex"><span>{{item.time}}</span> <img src="../../assets/image/fifa.png"></p>
              <p style="color: #999">FIFA联赛</p>
            </div>
            <div style="padding: 5px;">
              <p class="flex"><img :src="item.team1.icon"> <span>{{item.team1.name}}</span></p>
              <p class="flex"><img :src="item.team2.icon"> <span>{{item.team2.name}}</span></p>
            </div>
          </div>
          <div style="display: flex">
            <div :class="{red : item.is_live}" style="padding: 5px;">
              <p>{{item.score.team1_score}}</p>
              <p>{{item.score.team2_score}}</p>
            </div>
            <div :class="{red : item.is_live}" style="padding: 5px;">
              <p>图文直播</p>
              <p v-show="item.is_live">进行中</p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import request from '@/utils/request'
import { dateObj } from '../../utils/date.js'
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    request.get('/match/list').then(res => {
      var arr = [];
      res.data.forEach((item, index) => {
        var day = dateObj.isWhichDay(item.time)
        item['is_live'] = Math.abs(parseInt(Date.now()/1000) - parseInt(item.time)) < 3600*3
        item['date'] = dateObj.formatDate(item.time)
        item['time'] = dateObj.getHourAndMin(item.time)
        if (arr[day]) {
          arr[day].push(item);
        } else {
          arr[day] = [];
          arr[day].push(item);
        }
      })
      this.list = arr
    })
  },
  methods: {
    jump(id, status) {
      if (status == 0) {
        alert('还没开始呢');
        return
      }
      this.$router.push({
        path: '/live/' + id + '/match/' + id,
      })
    }
  }
}

</script>
<style scoped>
.home_container{
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.home_body .item_header{
  padding: 5px 10px;
  font-size: 16px;
  background-color: #eee;
}

.item_body{
  display: flex;
  font-size: 16px;
  padding: 10px;
  justify-content: space-between;
}

.item_body img{
  width: 30px;
  height: 30px;
}
.flex{display: flex; font-size: 14px;}



</style>
