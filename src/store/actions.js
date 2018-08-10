import request from '@/utils/request'

export default{

	//获得比赛详情页面信息
	getMatchInfo({commit,state},id){
		request.get('/match/get_match/' + id).then(data=>{
			commit('getMatchInfo',data)
		})
	}
}