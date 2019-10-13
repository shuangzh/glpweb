// left-menu componet 

Vue.component("leftmenu", {
	props: ['menudata'],
	template: '#leftMenu',
	methods: {
		mclick(index) {
			console.log("mclick -- " + index)
			this.$emit('mclick-event', index)
		},
		handleOpen(key, keypath) {
			console.log(key, keypath)
		},
		handleClose(key, keypath) {
			console.log(key, keypath)
		}
	}
})

// maintabs componets 
Vue.component("maintabs", {
	template: '#mainTabs',
	data: function() {
		return {
			tabvalue: '1',
			tabsdata: [],
			tabindex: 1
		}
	},
	methods: {
		handleClick(tab, event) {
			console.log(tab, event);
		},
		addtab(label, cont) {
			let newname = ++this.tabindex + ''
			this.tabsdata.push({
				title: label,
				name: newname,
				content: cont
			})
			this.tabvalue = newname
		},
		removeTab(targertName) {
			console.log("remove tab " + targertName)
			let tabs = this.tabsdata
			let activeName = this.tabvalue
			if(activeName == targertName) {
				tabs.forEach((tab, index) => {
					if(tab.name == targertName) {
						let nexttab = tabs[index + 1] || tabs[index - 1]
						if(nexttab) {
							activeName = nexttab.name
						}
					}
				})
			}
			this.tabvalue = activeName
			this.tabsdata = tabs.filter(tab => tab.name != targertName);
			if(this.tabsdata.length <= 0) {
				this.addtab('欢迎页面', 'welcome')
			}
		}
	}
})

// Welcome component
Vue.component('welcome', {
	template: '#welcome'
})

Vue.component('userman', {
	template: '#userMan',
	data: function() {
		return {
			usertabledata: [{
					id: 100,
					name: '周双',
					account: 'zhou ddf',
					roles: '管理员',
					roles_id:[1],
					status: "启用",
					pwd: '101010101010',
					disabled: false
				},
				{
					id: 101,
					name: '周双1',
					account: 'zhoushuang',
					roles: '质检员',
					roles_id:[2],
					status: "禁用",
					pwd: '10101011111',
					disabled: true
				}
			],
			
			// 编辑用户
			dialogTitle:'编辑用户',
			filedDisabled:true,
			dialogAction:'edit',
			dialogFormVisible: false,
			formLabelWidth:'80px',
			opuser: {
				account:'zhou',
				name:'zhoushuang',
				roles_id:[1, 2]
			},
			sys_roles:[{value:1, label:'admin'}, {value:2, label:'tester'}, {value:3, label:'oper'}],
			
			// reset密码
			visi_reset:false
			
		}
	},
	methods: {
		handleClick(row) {
			console.log(row);
			console.log(row.account)
			row.disabled = !row.disabled;
			if(row.disabled) {
				row.status = '禁用';
			} else {
				row.status = '启用'
			}
		},
		editClick(row){
			console.log(row);
			this.dialogFormVisible=true;
			this.filedDisabled=true;
			this.dialogTitle='编辑用户信息';
			this.dialogAction='edit';
			this.opuser = row;
		},
		addClick(){
			this.dialogFormVisible=true;
			this.filedDisabled=false;
			this.dialogTitle='添加新用户';
			this.dialogAction='add';
			this.opuser = {account:'', name:'', roles_id:[]}
		},
		resetClick(row){
			this.visi_reset=true;
			this.opuser=row;
		}
	}
})

Vue.component('roleman', {
	template: '#roleMan'
})

Vue.component('permman', {
	template: '#permMan'
})

Vue.component('menuman', {
	template: '#menuMan'
})

Vue.component('dataanly', {
	template: '#dataAnly'
})

const instance = new Vue({
	el: '#app',
	data: {
		menudata: menudata,
	},
	methods: {
		menuclick(index) {
			console.log('index=' + index)
			let menus = this.menudata.menus
			let title = undefined
			let mpath = undefined
			menus.forEach((menu, it) => {
				if(menu.index == index) {
					if(menu.mpath) {
						title = menu.title
						mpath = menu.mpath
					}
				}

				if(menu.issub) {
					if(menu.smenus) {
						let smenus = menu.smenus
						smenus.forEach((m, it) => {
							if(m.index == index) {
								if(m.mpath) {
									title = m.title
									mpath = m.mpath
								}
							}
						})
					}
				}
			})
			if(title) {
				console.log(title, mpath)
				this.$refs.maintabs.addtab(title, mpath)
			}
		},
		logout() {
			if(confirm("退出登陆状态？ 是－退出， 否-取消")) {
				window.location.href = "/logout"
			}
		}

	}
})

instance.$refs.maintabs.addtab('欢迎页面', 'welcome')