// left-menu componet
Vue.component("leftmenu", {
    template: '#leftMenu',
    data: function () {
        return {
            menudata: '',
            menudata_example: {
                menus: [{
                    index: '1',
                    title: '系统管理',
                    smenus: [{
                        index: '1-1',
                        title: '用户管理',
                        mpath: 'userman'
                    }, {
                        index: '1-2',
                        title: '角色管理',
                        mpath: 'roleman'
                    }, {
                        index: '1-3',
                        title: '权限管理',
                        mpath: 'permman'
                    }, {
                        index: '1-4',
                        title: '菜单管理',
                        mpath: 'menuman'
                    }]
                }, {
                    index: '2',
                    title: '数据分析',
                    mpath: 'dataanly',
                    smenus: []
                }]
            }
        }
    },
    methods: {
        mclick(index) {
            let menus = this.menudata.menus
            let title = undefined, mpath = undefined
            menus.forEach((menu, it) => {
                if (menu.index == index) {
                    if (menu.mpath) {
                        title = menu.title
                        mpath = menu.mpath
                    }
                }
                if (menu.smenus) {
                    let smenus = menu.smenus
                    smenus.forEach((m, it) => {
                        if (m.index == index) {
                            if (m.mpath) {
                                title = m.title
                                mpath = m.mpath
                            }
                        }
                    })
                }
            })
            this.$emit('mclick-event', index, title, mpath)
        },
        handleOpen(key, keypath) {
            console.log(key, keypath)
        },
        handleClose(key, keypath) {
            console.log(key, keypath)
        },
        loadmenus() {
            var that = this
            axios.get('/useradmin/getmenu')
                .then(function (response) {
                    var data = response.data, mdata = new Array(), ct = null;
                    for (var i = 0; i < data.length; i++) {
                        var it = data[i];
                        it.index = it.level;
                        it.mpath = it.target;
                        var ls = it.level.split('-');
                        if (ls.length == 1) {
                            ct = it;
                            ct.smenus = []
                            mdata.push(it)
                        } else {
                            ct.smenus.push(it)
                        }
                    }
                    that.menudata = {menus: mdata}
                }).catch(function (err) {
                console.log(err)
                that.menudata = that.menudata_example
            })
        }
    },
    created: function () {
        this.loadmenus();
    }
})

// maintabs componets 
Vue.component("maintabs", {
    template: '#mainTabs',
    data: function () {
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
            if (activeName == targertName) {
                tabs.forEach((tab, index) => {
                    if (tab.name == targertName) {
                        let nexttab = tabs[index + 1] || tabs[index - 1]
                        if (nexttab) {
                            activeName = nexttab.name
                        }
                    }
                })
            }
            this.tabvalue = activeName
            this.tabsdata = tabs.filter(tab => tab.name != targertName);
            if (this.tabsdata.length <= 0) {
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
    data: function () {
        return {
            usertabledata: [],
            usertabledata_example: [{
                id: 100,
                name: '周双',
                account: 'zhou ddf',
                role_name: '管理员',
                role_id: 1,
                status: "启用",
                disabled: false
            }, {
                id: 101,
                name: '周双1',
                account: 'zhoushuang',
                role_name: '质检员',
                role_id: 2,
                status: "禁用",
                disabled: true
            }
            ],

            // 编辑用户
            dialogTitle: '编辑用户',
            filedDisabled: true,
            dialogAction: 'edit',
            dialogFormVisible: false,
            formLabelWidth: '80px',
            opuser: {
                account: 'zhou',
                name: 'zhoushuang',
                role_id: 1
            },
            sys_roles: [{value: 1, label: 'admin'}, {value: 2, label: 'tester'}, {value: 3, label: 'oper'}],
            // reset密码
            visi_reset: false,
            ed_loading: false
        }
    },
    methods: {
        handleClick(row) {
            console.log(row);
            console.log(row.account)
            row.disabled = !row.disabled;
            if (row.disabled) {
                row.status = '禁用';
            } else {
                row.status = '启用'
            }
        },
        editClick(row) {
            console.log(row);
            this.dialogFormVisible = true;
            this.filedDisabled = true;
            this.dialogTitle = '编辑用户信息';
            this.dialogAction = 'edit';
            this.opuser = row;
        },
        addClick() {
            this.dialogFormVisible = true;
            this.filedDisabled = false;
            this.dialogTitle = '添加新用户';
            this.dialogAction = 'add';
            this.opuser = {account: '', name: '', role_id: ''}
        },
        resetClick(row) {
            this.visi_reset = true;
            this.opuser = row;
        },
        postadduser() {
            this.ed_loading = true;
            var that = this
            axios.post("/useradmin/addnewuser", Qs.stringify(that.opuser), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                .then(function (resp) {
                    that.ed_loading = false
                    that.dialogFormVisible = false;
                    if(resp.data.code == 0){
                    	that.$message({message: '添加用户成功', type: 'success'})
					}else{
                    	that.$message({message:'添加用户出现异常', type:'warning'})
					}
					that.loaddata();

                }).catch(function (err) {
                console.log(err)
                that.ed_loading = false
                that.dialogFormVisible = false;
                that.$message.error("添加用户失败")
            })
        },
        loaddata() {
            // load sys_roles
            var that = this
            axios.get("/useradmin/getroles")
                .then(function (response) {
                    var data = response.data;
                    for (var i = 0; i < data.length; i++) {
                        var it = data[i]
                        it.value = it.id
                        it.label = it.name
                    }
                    that.sys_roles = data
                })
                .catch(function (err) {
                    console.log(err);
                    that.$message.error("loading sys_roles failed")
                })

            // load all users
            axios.get("/useradmin/getusers")
                .then(function (response) {
                    var d = response.data
                    for (var i = 0; i < d.length; i++) {
                        var d1 = d[i]
                        d1.role_name = d1.role.name
                        d1.role_id = d1.role.id
                        if (d1.disabled)
                            d1.status = "禁用"
                        else
                            d1.status = "启用"
                    }
                    that.usertabledata = d
                }).catch(function (err) {
                console.log(err);
                that.$message.error("load usertablesdata failed")
                that.usertabledata = that.usertabledata_example
            })
        }
    },

    created: function () {
		this.loaddata();
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
        //menudata: menudata,
    },
    methods: {
        menuclick(index, title, mpath) {
            if (title) {
                if (mpath) {
                    console.log('menuclick', title, mpath)
                    this.$refs.maintabs.addtab(title, mpath)
                }
            }
        },
        logout() {
            if (confirm("退出登陆状态？ 是－退出， 否-取消")) {
                window.location.href = "/logout"
            }
        }
    },
    created: function () {
    }
})


instance.$refs.maintabs.addtab('欢迎页面', 'welcome')