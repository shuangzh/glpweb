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
            var that = this
            axios.post("/useradmin/toggledisabled", Qs.stringify({user_id: row.id}), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                .then(function (resp) {
                    console.log(resp)
                    if (row.disabled) {
                        row.status = '禁用';
                    } else {
                        row.status = '启用'
                    }

                    that.$message(row.account + "已" + row.status)

                }).catch(function (err) {
                console.log(err)
            })
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
                    if (resp.data.code == 0) {
                        that.$message({message: '添加用户成功', type: 'success'})
                    } else {
                        that.$message({message: '添加用户出现异常', type: 'warning'})
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
        },
        postedituser() {
            this.ed_loading = true
            var that = this
            axios.post("/useradmin/edituser", Qs.stringify(that.opuser), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                .then(function (resp) {
                    that.ed_loading = false;
                    that.dialogFormVisible = false;
                    that.loaddata();
                }).catch(function (err) {
                that.ed_loading = false;
                that.dialogFormVisible = false;
            })
        },
        resetuser() {
            var that = this
            axios.post("/useradmin/resetuser", Qs.stringify(that.opuser), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                .then(function (resp) {

                }).catch(function (err) {

            })
        }
    },

    created: function () {
        this.loaddata();
    }

})

Vue.component('roleman', {
    template: '#roleMan',
    data: function () {
        return {
            roledata: [{
                id: 1,
                name: 'admin',
                description: '管理员',
                perms: 'user:admin',
                perms_id: [1],
                status: '正常',
                disabled: false
            },
                {
                    id: 2,
                    name: 'tester',
                    description: '测试人员',
                    perms: 'test:data',
                    perms_id: [5],
                    status: '禁用',
                    disabled: false
                }],
            sys_perms: [{value: 1, label: 'user:admin'}, {value: 2, label: 'test:data'}],

            ed_loading: false,
            dialogFormVisible: false,
            filedDisabled: false,
            dialogTitle: '',
            dialogAction: 'add',
            oprole: {},

        }
    },
    methods: {
        handleClick(row) {

        },
        editClick(row) {
            this.oprole = row;
            this.dialogFormVisible = true;
            this.filedDisabled = false;
            this.dialogAction = 'edit';
            this.ed_loading = false;
        },
        addClick() {
            this.dialogTitle = '添加新角色';
            this.dialogAction = "add";
            this.oprole = {id: 0, name: '', description: '', perms_id: []}
            this.dialogFormVisible = true;
        },
        postaddrole() {

        },
        posteditrole() {

        }

    }

})

Vue.component('permman', {
    template: '#permMan',
    data: function () {
        return {
            permdata: [{id: 1, perm: 'user:admin', description: 'sys用户管理', status: '正常', disabled: false},
                {id: 2, perm: 'user:focus', description: "用户聚焦", status: '正常', disabled: false}],


        }
    },

    methods: {

        handleClick(row) {

        },
        editClick(row) {
            this.oprole = row;
            this.dialogFormVisible = true;
            this.filedDisabled = false;
            this.dialogAction = 'edit';
            this.ed_loading = false;
        },
        addClick() {
            this.dialogTitle = '添加新角色';
            this.dialogAction = "add";
            this.oprole = {id: 0, name: '', description: '', perms_id: []}
            this.dialogFormVisible = true;
        },
        postaddperm() {

        },
        posteditperm() {

        }
    }
})

Vue.component('menuman', {
    template: '#menuMan'
})

Vue.component('dataanly', {
    template: '#dataAnly'
})


Vue.component('smodel', {
    props:[upbuttons, tabledata , tablecolumn, opbuttons],
    template: '#smodel',
    data() {
        return {
            // upbuttons: [
            //     {
            //         icon: 'el-icon-plus',
            //         label: '添加用户',
            //         type: 'dialog',
            //         dial: {
            //             form: [{label: '用户名', prop: 'name'}, {label: 'id', prop: 'id'},
            //                 {label: 'id', prop: 'hehe', type: 'select', options: [{label: 'pp', value: 1}]}],
            //             title: '添加新用户', before: function () {
            //                 console.log("this is before")
            //             }, exec: function () {
            //                 console.log("this is exec")
            //             }
            //         }
            //     },
            //     {
            //         icon: 'el-icon-plus', label: '默认', type: 'dialog', dial: {
            //             form: [{label: '用户名', prop: 'name'}, {label: 'id', prop: 'id'}],
            //             title: '添用户'
            //         }
            //     }],
            //
            // tabledata: [{id: 1, name: 'zhoushuang', pwd: 'hello'},
            //     {id: 2, name: 'zhoushuang', pwd: 'hello'}],
            // tablecolumn: [{prop: 'name', label: '姓名'}, {prop: 'pwd', label: '密码'}],
            //
            // opbuttons: [{
            //     label: '禁用', type: 'confirm', msg: "确认禁用", exec: function () {
            //         console.log("confirm  msagggg")
            //     }
            // }, {label: '启用', type: 'confirm'}],

            dialogForm: [{label: '用户名', prop: 'name'}, {label: 'id', prop: 'id'}],
            opdata: {},
            dialogFormVisible: false,
            ed_loading: false,
            dialogTitle: 'haha',
            dailogBtn: ""
        }
    },
    methods:
        {
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