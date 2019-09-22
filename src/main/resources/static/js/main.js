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
	template: '#userMan'
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