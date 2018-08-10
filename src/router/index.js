import Vue from 'vue'
import Router from 'vue-router'
import Home from '../page/home/index'
import Live from '../page/live/index'
import Match from '../page/live/match'
import Chat from '../page/live/chat'
import Data from '../page/live/data'

import Admin from '../page/admin/index'
import Login from '../page/admin/login'
import MtachAdmin from '../page/admin/match'
import PlayerAdmin from '../page/admin/player'
import TeamAdmin from '../page/admin/team'
import HomeAdmin from '../page/admin/home'
import LiveAdmin from '../page/admin/live'


Vue.use(Router)

export default new Router({
	linkActiveClass: 'active',
	routes:[
		{
		  path: '/',
		  component : Home
		},
		{
		  path: '/login',
		  component : Login
		},
		{
		  path: '/live/:id',
		  component: Live,
		  props:true,
		  children: [
			{
			  path: 'match/:id',
			  component : Match,
			  props:true
			},		
			{
			  path: 'chat/:id',
			  component : Chat,
			  props:true
			},	
			{
			  path: 'data',
			  component : Data
			},	  	
		  ]
		},
		{
			path: '/admin',
			component : Admin,
			children: [
				{
					path: 'home',
			        component: HomeAdmin
				},
				{
					path: 'live/:id',
			        component: LiveAdmin,
			        props: true
				},
				{
					path: 'match',
			        component: MtachAdmin
				},
				{
					path: 'player',
			        component: PlayerAdmin
				},
				{
					path: 'team',
			        component: TeamAdmin
				}
			]
		},
	]
})