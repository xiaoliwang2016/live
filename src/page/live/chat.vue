<template>
  <div class="chat_container">
    <div class="content">
      <ul>
        <li v-for="item in messages">
          <span class="time">{{item.time}} 游客：</span>
          <span class="msg">{{item.message}}</span>
        </li>
      </ul>
    </div> 
    <div class="input_box">
      <el-input placeholder="说点啥吧" v-model="myMsg" clearable></el-input>
      <el-button @click="sendMsg">发送</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      myMsg: '',
      messages: [],
      ws: null
    }
  },

  props: ['id'],

  created() {

    this.ws = new WebSocket("ws://192.168.1.121:8812")

    this.ws.onopen = evt => {
      console.log('websocket connecting ....')
    }

    this.ws.onmessage = evt => {
      var data = JSON.parse(evt.data);
      if (data.message && data.match_id == this.id) {
        this.messages.push(data);
      }
    }

  },

  methods: {

    sendMsg() {
      var data = {
        "msg": this.myMsg,
        "match_id": this.id
      }
      this.ws.send(JSON.stringify(data))
      this.myMsg = ''
    }

  }
}

</script>
<style scoped>
.chat_container{
  width: 100%;
}
.chat_container .content{
  width: 100%;
  height: 40vh;
  overflow: scroll;
}

.chat_container .time{
  width: 10%;
  font-size: 14px;
  margin: 0 10px;
  color: #999;
}
.chat_container .msg{
  font-size: 16px;
}
.chat_container .input_box{
  width: 100%;
  position: fixed;
  bottom: 0;
} 
.input_box{
  display: flex;
}

</style>
