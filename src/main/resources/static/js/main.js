axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';


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
            let title = undefined,
                mpath = undefined
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
                    var data = response.data,
                        mdata = new Array(),
                        ct = null;
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
                    that.menudata = {
                        menus: mdata
                    }
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
            let newname = ++this.tabindex + '';
            let opened = undefined;
            for (let i = 0; i < this.tabsdata.length; i++) {
                if (this.tabsdata[i].title == label && this.tabsdata[i].content == cont) {
                    opened = this.tabsdata[i];
                    this.tabvalue = opened.name;
                    break;
                }
            }
            if (opened == undefined) {
                this.tabsdata.push({
                    title: label,
                    name: newname,
                    content: cont,
                });
                this.tabvalue = newname
            }
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

// 账号管理
Vue.component('userman', {
    template: '#userMan',
    data: function () {
        var that = this;
        return {
            tabledata: [],
            tablecolumn: [{
                prop: 'account',
                label: '账号'
            }, {
                prop: 'name',
                label: '名字'
            }, {
                prop: 'role_name',
                label: '角色'
            }, {
                prop: 'status',
                label: '状态'
            }],
            upbuttons: [{
                label: '新账号',
                type: 'dialog',
                icon: 'el-icon-plus',
                dial: {
                    title: '添加新账号',
                    form: [{
                        label: '账号',
                        prop: 'account'
                    }, {
                        label: '名字',
                        prop: 'name'
                    },
                        {
                            label: '角色',
                            prop: 'role_id',
                            type: 'select',
                            options: [{
                                label: 'admin',
                                value: 1
                            }, {
                                label: 'tester',
                                value: 2
                            }]
                        }
                    ],
                    exec: that.postadduser
                }
            },],
            opbuttons: [
                {
                    label: '编辑',
                    type: 'dialog',
                    dial: {
                        title: '编辑',
                        form: [{
                            label: '账号',
                            prop: 'account'
                        }, {
                            label: '名字',
                            prop: 'name'
                        },
                            {
                                label: '角色',
                                prop: 'role_id',
                                type: 'select',
                                options: []
                            },
                            {
                                label: '状态',
                                prop: 'disabled',
                                type: 'select',
                                options: [{label: '启用', value: 0}, {label: '禁用', value: 1}]
                            }
                        ],
                        exec: that.postedituser
                    }
                },
                {
                    label: '删除',
                    type: 'confirm',
                    msg: '确认删除',
                    exec: that.postdeluser
                },
                {
                    label: '重置',
                    type: 'confirm',
                    msg: '确认重置密码',
                    exec: that.postresetuser
                }
            ],
        }
    },
    methods: {
        loaddata() {
            let that = this
            axios.get("/useradmin/getusers")
                .then(function (response) {
                    var d = response.data
                    for (var i = 0; i < d.length; i++) {
                        var d1 = d[i]
                        d1.role_name = d1.role.name
                        d1.role_id = d1.role.id
                        if (d1.disabled == 1)
                            d1.status = "禁用"
                        else
                            d1.status = "启用"
                    }
                    that.tabledata = d
                }).catch(function (err) {
                console.log(err);
                that.$message.error("load usertablesdata failed")
            })

            axios.get("/useradmin/getroles")
                .then(function (response) {
                    var data = response.data;
                    for (var i = 0; i < data.length; i++) {
                        var it = data[i]
                        it.value = it.id
                        it.label = it.name
                    }
                    that.upbuttons[0].dial.form[2].options = data
                    that.opbuttons[0].dial.form[2].options = data
                })
                .catch(function (err) {
                    console.log(err);
                    that.$message.error("loading sys_roles failed")
                })
        },

        postadduser(smod, data) {
            smod.ed_loading = true;
            let that = this;
            axios.post("/useradmin/addnewuser", Qs.stringify(data), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(function (resp) {
                    smod.ed_loading = false
                    smod.dialogFormVisible = false;
                    if (resp.data.code == 0) {
                        that.$message({
                            message: '添加用户成功',
                            type: 'success'
                        })
                    } else {
                        that.$message({
                            message: '添加用户出现异常',
                            type: 'warning'
                        })
                    }
                    that.loaddata();
                }).catch(function (err) {
                console.log(err)
                smod.ed_loading = false
                smod.dialogFormVisible = false;
                that.$message.error("添加用户失败")
            })
        },

        postedituser(smod, data) {
            smod.ed_loading = true;
            var that = this;
            axios.post("/useradmin/edituser", Qs.stringify(data), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(function (resp) {
                    smod.ed_loading = false;
                    smod.dialogFormVisible = false;
                    that.loaddata();
                    that.$message('已修改账户信息')
                }).catch(function (err) {
                smod.ed_loading = false;
                smod.dialogFormVisible = false;
                that.$message.error('修改账户信息失败')
            })
        },

        postdeluser(smod, data) {
            var that = this;
            axios.post("/useradmin/deluser", Qs.stringify(data), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(function (resp) {
                    console.log(resp)
                    that.$message(data.account + "已删除")
                    that.loaddata();
                }).catch(function (err) {
                console.log(err)
            })
        },

        postresetuser(smod, data) {
            var that = this;
            axios.post("/useradmin/resetuser", Qs.stringify(data), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(function (resp) {
                    console.log(resp)
                    that.$message(data.account + "已重置密码")
                }).catch(function (err) {
                that.$message.error("重置密码失败")
                console.log(err)
            })
        }

    },
    created() {
        this.loaddata()
    }
});


Vue.component('roleman', {
    template: '#roleMan',
    data: function () {
        var that = this;
        return {
            tabledata: [],
            tablecolumn: [{label: '角色', prop: 'name'}, {label: '说明', prop: 'description'}, {
                label: '权限',
                prop: 'perms'
            }, {label: '状态', prop: 'status'}],
            upbuttons: [{
                label: '新角色', icon: 'el-icon-plus', type: 'dialog',
                dial: {
                    title: '添加新角色', form: [{label: '角色', prop: 'name'}, {label: '说明', prop: 'description'},
                        {
                            label: '权限', prop: 'perms_id', type: 'select', multi: true,
                            options: [{label: 'user:admin', value: 1}, {label: 'data:look', value: 2}]
                        }],
                    exec: that.postaddrole
                }

            },],
            opbuttons: [{
                label: '编辑', type: 'dialog', dial: {
                    title: '修改角色', form: [{label: '角色', prop: 'name'}, {label: '说明', prop: 'description'},
                        {label: '权限', prop: 'perms_id', type: 'select', multi: true, options: []},
                        {
                            label: '状态',
                            prop: 'disabled',
                            type: 'select',
                            options: [{label: '启用', value: 0}, {label: '禁用', value: 1}]
                        }],
                    exec: that.posteditrole
                }
            }, {label: '删除', type: 'confirm', msg: '确认删除吗', exec: that.postdelrole}],
        }
    },
    methods: {
        loaddata() {
            let that = this;
            axios.get('/useradmin/getroles').then(function (resp) {
                let d = resp.data;
                for (let i = 0; i < d.length; i++) {
                    let perms_id = new Array();
                    let perms = ""
                    for (let j = 0; j < d[i].permissions.length; j++) {
                        perms = perms + " " + d[i].permissions[j].perm
                        perms_id.push(d[i].permissions[j].id)
                    }
                    d[i].perms = perms.trim();
                    d[i].perms_id = perms_id;
                    console.log("ddff  == ", d[i])
                    if (d[i].disabled == 1) {
                        console.log("d is disabled")
                        console.log(d)
                        d[i].status = '禁用'
                    } else {
                        d[i].status = '启用'
                    }
                }
                that.tabledata = d
            }).catch(function (error) {
                console.log(error)
            });

            axios.get('/useradmin/getperms').then(function (resp) {
                let d = resp.data;
                console.log(d)
                for (let i = 0; i < d.length; i++) {
                    d[i].label = d[i].perm;
                    d[i].value = d[i].id;
                }
                that.upbuttons[0].dial.form[2].options = d;
                that.opbuttons[0].dial.form[2].options = d;
            }).catch(function (err) {
                console.log(err)
            })
        },

        postaddrole(smod, data) {
            let that = this;
            console.log("here is postaddrole")
            smod.ed_loading = true
            axios.post("/useradmin/addrole", Qs.stringify(data), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (resp) {
                smod.ed_loading = false;
                smod.dialogFormVisible = false;
                that.loaddata();
                that.$message({type: 'success', message: '角色添加成功'})
            }).catch(function (err) {
                smod.ed_loading = false;
                smod.dialogFormVisible = false;
                that.$message.error("添加角色失败")
            })
        },

        posteditrole(smod, data) {
            let that = this;
            console.log("here is postaddrole")
            smod.ed_loading = true
            axios.post("/useradmin/editrole", Qs.stringify(data)).then(function (resp) {
                smod.ed_loading = false;
                smod.dialogFormVisible = false;
                that.loaddata();
                that.$message({type: 'success', message: '修改成功'})
            }).catch(function (err) {
                smod.ed_loading = false;
                smod.dialogFormVisible = false;
                that.$message.error("修改角色失败")
            })
        },

        postdelrole(smod, data) {
            let that = this;
            console.log("here is postaddrole")
            smod.ed_loading = true
            axios.post("/useradmin/delrole", Qs.stringify(data)).then(function (resp) {
                smod.ed_loading = false;
                smod.dialogFormVisible = false;
                that.loaddata();
                that.$message({type: 'success', message: '删除角色成功'})
            }).catch(function (err) {
                smod.ed_loading = false;
                smod.dialogFormVisible = false;
                that.$message.error("删除角色失败")
            })
        }
    },
    created() {
        this.loaddata();
    }
})

Vue.component('permman', {
    template: '#permMan',
    data: function () {
        var that = this;
        return {
            tabledata: [],
            tablecolumn: [{label: '权限', prop: 'perm'}, {label: '说明', prop: 'description'}, {
                label: '状态',
                prop: 'status'
            }],
            upbuttons: [{
                label: '新权限', icon: 'el-icon-plus', type: 'dialog',
                dial: {
                    title: '添加权限', form: [{label: '权限', prop: 'perm'}, {label: '说明', prop: 'description'}],
                    exec: that.postaddperm
                }

            },],
            opbuttons: [{
                label: '编辑', type: 'dialog', dial: {
                    title: '修改权限', form: [{label: '权限', prop: 'perm'}, {label: '说明', prop: 'description'},
                        {
                            label: '状态',
                            prop: 'disabled',
                            type: 'select',
                            options: [{label: '启用', value: 0}, {label: '禁用', value: 1}]
                        }],
                    exec: that.posteditperm
                }
            }, {label: '删除', type: 'confirm', msg: '确认删除吗', exec: that.postdelperm}],
        }
    },
    methods: {
        loaddata() {
            let that = this;
            axios.get('/useradmin/getperms').then(function (resp) {
                let d = resp.data;
                for (let i = 0; i < d.length; i++) {
                    if (d[i].disabled == 1) {
                        d[i].status = '禁用'
                    } else {
                        d[i].status = '启用'
                    }
                }
                that.tabledata = d
            }).catch(function (error) {
                console.log(error)
            });
        },

        postaddperm(smod, data) {
            let that = this;
            smod.ed_loading = true
            axios.post("/useradmin/addperm", Qs.stringify(data)).then(function (resp) {
                smod.ed_loading = false;
                smod.dialogFormVisible = false;
                that.loaddata();
                that.$message({type: 'success', message: '添加成功'})
            }).catch(function (err) {
                smod.ed_loading = false;
                smod.dialogFormVisible = false;
                that.$message.error("添加失败")
            })
        },

        posteditperm(smod, data) {
            let that = this;
            smod.ed_loading = true
            axios.post("/useradmin/editperm", Qs.stringify(data)).then(function (resp) {
                smod.ed_loading = false;
                smod.dialogFormVisible = false;
                that.loaddata();
                that.$message({type: 'success', message: '修改成功'})
            }).catch(function (err) {
                smod.ed_loading = false;
                smod.dialogFormVisible = false;
                that.$message.error("修改失败")
            })
        },

        postdelperm(smod, data) {
            let that = this;
            smod.ed_loading = true
            axios.post("/useradmin/delperm", Qs.stringify(data)).then(function (resp) {
                smod.ed_loading = false;
                smod.dialogFormVisible = false;
                that.loaddata();
                that.$message({type: 'success', message: '删除成功'})
            }).catch(function (err) {
                smod.ed_loading = false;
                smod.dialogFormVisible = false;
                that.$message.error("删除失败")
            })
        }
    },
    created() {
        this.loaddata();
    }
})


Vue.component('menuman', {
    template: '#menuMan',
    data: function () {
        var that = this;
        return {
            tabledata: [],
            tablecolumn: [{label: '标题', prop: 'title'}, {label: '目标', prop: 'target'}, {
                label: '权限',
                prop: 'perm'
            }, {label: '层级', prop: 'level'}, {label: '说明', prop: 'description'}, {label: '状态', prop: 'status'}],
            upbuttons: [{
                label: '新菜单', icon: 'el-icon-plus', type: 'dialog',
                dial: {
                    title: '添加菜单',
                    form: [{label: '标题', prop: 'title'}, {label: '目标', prop: 'target'}, {label: '层级', prop: 'level'},
                        {label: '权限', prop: 'perm_id', type: 'select', options: []}, {
                            label: '说明',
                            prop: 'description'
                        }],
                    exec: that.postaddmenu
                }

            },],
            opbuttons: [{
                label: '编辑', type: 'dialog', dial: {
                    title: '修改菜单',
                    form: [{label: '标题', prop: 'title'}, {label: '目标', prop: 'target'}, {label: '层级', prop: 'level'},
                        {label: '权限', prop: 'perm_id', type: 'select', options: []}, {label: '说明', prop: 'description'},
                        {
                            label: '状态',
                            prop: 'disabled',
                            type: 'select',
                            options: [{label: '启用', value: 0}, {label: '禁用', value: 1}]
                        }],
                    exec: that.posteditmenu
                }
            }, {label: '删除', type: 'confirm', msg: '确认删除吗', exec: that.postdelmenu}],
        }
    },
    methods: {
        loaddata() {
            let that = this;
            axios.get('/useradmin/getallmenu').then(function (resp) {
                let d = resp.data;
                for (let i = 0; i < d.length; i++) {
                    d[i].perm_id = d[i].permission.id
                    d[i].perm = d[i].permission.perm
                    if (d[i].disabled == 1) {
                        d[i].status = '禁用'
                    } else {
                        d[i].status = '启用'
                    }
                }
                that.tabledata = d
            }).catch(function (error) {
                console.log(error)
            });

            axios.get('/useradmin/getperms').then(function (resp) {
                let d = resp.data;
                console.log(d)
                for (let i = 0; i < d.length; i++) {
                    d[i].label = d[i].perm;
                    d[i].value = d[i].id;
                }
                that.upbuttons[0].dial.form[3].options = d;
                that.opbuttons[0].dial.form[3].options = d;
            }).catch(function (err) {
                console.log(err)
            })
        },

        postaddmenu(smod, data) {
            let that = this;
            console.log("here is postaddrole")
            smod.ed_loading = true
            axios.post("/useradmin/addmenu", Qs.stringify(data)).then(function (resp) {
                smod.ed_loading = false;
                smod.dialogFormVisible = false;
                that.loaddata();
                that.$message({type: 'success', message: '添加成功'})
            }).catch(function (err) {
                smod.ed_loading = false;
                smod.dialogFormVisible = false;
                that.$message.error("添加失败")
            })
        },

        posteditmenu(smod, data) {
            let that = this;
            smod.ed_loading = true
            axios.post("/useradmin/editmenu", Qs.stringify(data)).then(function (resp) {
                smod.ed_loading = false;
                smod.dialogFormVisible = false;
                that.loaddata();
                that.$message({type: 'success', message: '修改成功'})
            }).catch(function (err) {
                smod.ed_loading = false;
                smod.dialogFormVisible = false;
                that.$message.error("修改失败")
            })
        },

        postdelmenu(smod, data) {
            let that = this;
            console.log("here is postaddrole")
            smod.ed_loading = true
            axios.post("/useradmin/delmenu", Qs.stringify(data)).then(function (resp) {
                smod.ed_loading = false;
                smod.dialogFormVisible = false;
                that.loaddata();
                that.$message({type: 'success', message: '删除成功'})
            }).catch(function (err) {
                smod.ed_loading = false;
                smod.dialogFormVisible = false;
                that.$message.error("删除失败")
            })
        }
    },
    created() {
        this.loaddata();
    }

})

Vue.component('dataanly', {
    template: '#dataAnly'
})

Vue.component('smodel', {
    props: ['upbuttons', 'tabledata', 'tablecolumn', 'opbuttons'],
    template: '#smodel',
    data() {
        return {
            dialogForm: [{
                label: '用户名',
                prop: 'name'
            }, {
                label: 'id',
                prop: 'id'
            }],
            opdata: {},
            dialogFormVisible: false,
            ed_loading: false,
            dialogTitle: 'title',
            dailogBtn: ""
        }
    },
    methods: {
        UpClick(bt) {
            if (bt.type == 'dialog') {
                this.dialogForm = bt.dial.form;
                this.dialogTitle = bt.dial.title;
                this.dailogBtn = bt;
                this.opdata = {}
                this.ed_loading = false;
                this.dialogFormVisible = true;
                if (bt.dial.before) {
                    bt.dial.before(bt.dial)
                }
            }
        },
        OpClick(bt, row) {
            this.opdata = row;
            var smod = this
            if (bt.type == "confirm") {
                if (confirm(bt.msg)) {
                    if (bt.exec) {
                        bt.exec(smod, this.opdata)
                    }
                }
            } else if (bt.type == 'dialog') {
                this.dialogForm = bt.dial.form;
                this.dialogTitle = bt.dial.title;
                this.dailogBtn = bt;
                this.ed_loading = false;
                this.dialogFormVisible = true;
                if (bt.dial.before) {
                    bt.dial.before(bt.dial)
                }
            }
        },
        dialConfirm() {
            var smod = this;
            if (this.dailogBtn.dial.exec) {
                this.dailogBtn.dial.exec(smod, this.opdata)
            } else {
                this.dialogFormVisible = false;
            }
        }
    }
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