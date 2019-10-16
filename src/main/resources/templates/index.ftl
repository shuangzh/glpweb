<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Green Light Planet</title>

    <!-- import element-ui CSS -->
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">

    <!-- import less -->
    <link rel="stylesheet" type="text/less" href="css/styles.less"/>
    <script src="//cdnjs.cloudflare.com/ajax/libs/less.js/3.10.0-beta/less.min.js"></script>
</head>

<body>
<!-- left Menu -->
<template id="leftMenu">
    <div>
        <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <template v-for="menu in menudata.menus">
                <el-submenu v-if="menu.smenus.length>0" :index="menu.index">
                    <template slot="title">{{menu.title}}</template>
                    <el-menu-item v-for="(sub, index) in menu.smenus" :key="index" :index="sub.index"
                                  @click="mclick(sub.index)">{{sub.title}}
                    </el-menu-item>
                </el-submenu>
                <el-menu-item v-else :index="menu.index" @click="mclick(menu.index)">
                    {{menu.title}}
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>

<!-- main tabs-->
<template id='mainTabs'>
    <div>
        <el-tabs v-model="tabvalue" type="border-card" closable @tab-click="handleClick" @tab-remove="removeTab">
            <el-tab-pane v-for="(item, index) in tabsdata" :key="item.name" :label="item.title" :name="item.name">
                <component v-bind:is="item.content"></component>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<!--  -->
<template id='welcome'>
    <h1>Welcome, GreenLight Planet !</h1>
</template>

<template id='userMan'>
    <smodel :upbuttons="upbuttons" :tabledata="tabledata" :tablecolumn="tablecolumn" :opbuttons="opbuttons"></smodel>
    <!--	-->
    <!--    <div>-->
    <!--        <div>-->
    <!--            <p>-->
    <!--                <el-button type="primary" icon="el-icon-plus" round size='mini' @click="addClick">新增用户</el-button>-->
    <!--            </p>-->
    <!--        </div>-->
    <!--        <el-table :data="usertabledata" border style="width:100%">-->
    <!--            <el-table-column type='index' width='50'>-->
    <!--            </el-table-column>-->

    <!--            <el-table-column prop='name' label='名字' width='120'>-->
    <!--            </el-table-column>-->

    <!--            <el-table-column prop='account' label='账号' width='160'>-->
    <!--            </el-table-column>-->

    <!--            <el-table-column prop='role_name' label='角色' width='140'>-->
    <!--            </el-table-column>-->

    <!--            &lt;!&ndash;<el-table-column prop='pwd' label='密码' width='140'>-->
    <!--            </el-table-column>&ndash;&gt;-->

    <!--            <el-table-column prop='status' label='状态' width='80'>-->
    <!--            </el-table-column>-->

    <!--            <el-table-column label="操作">-->
    <!--                <template slot-scope="scope">-->
    <!--                    <el-button v-if='scope.row.disabled' @click="handleClick(scope.row)" type="text" size="small">启用-->
    <!--                    </el-button>-->
    <!--                    <el-button v-else @click="handleClick(scope.row)" type="text" size="small">禁用</el-button>-->
    <!--                    <el-button @click="resetClick(scope.row)" type="text" size="small">重置密码</el-button>-->
    <!--                    <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>-->
    <!--                    <el-button type="text" size="small">删除</el-button>-->
    <!--                </template>-->
    <!--            </el-table-column>-->
    <!--        </el-table>-->

    <!--        &lt;!&ndash; Eidt Dialog &ndash;&gt;-->
    <!--        <el-dialog v-loading="ed_loading" :title="dialogTitle" :visible.sync="dialogFormVisible" label-width='60px'>-->
    <!--            <el-form :model="opuser">-->
    <!--                <el-form-item label="账号" :label-width="formLabelWidth">-->
    <!--                    <el-input v-model="opuser.account" auto-complete="off" :disabled="filedDisabled"-->
    <!--                              placeholder="请输入账号"></el-input>-->
    <!--                </el-form-item>-->
    <!--                <el-form-item label="名字" :label-width="formLabelWidth">-->
    <!--                    <el-input v-model="opuser.name" auto-complete="off" placeholder="请输入名字"></el-input>-->
    <!--                </el-form-item>-->
    <!--                <el-form-item label="选择角色" :label-width="formLabelWidth">-->
    <!--                    <el-select v-model="opuser.role_id" placeholder="请选择角色">-->
    <!--                        <el-option v-for="item in sys_roles" :key="item.value" :label="item.label" :value="item.value">-->
    <!--                        </el-option>-->
    <!--                    </el-select>-->
    <!--                </el-form-item>-->
    <!--            </el-form>-->
    <!--            <div slot="footer" class="dialog-footer">-->
    <!--                <el-button @click="dialogFormVisible = false">取 消</el-button>-->
    <!--                <el-button v-if="dialogAction==add" type="primary" @click="postadduser">确 定</el-button>-->
    <!--                <el-button v-else-if="dialogAction==edit" type="primary" @click="postedituser">确 定</el-button>-->
    <!--            </div>-->
    <!--        </el-dialog>-->

    <!--        &lt;!&ndash; 重置密码 dialog &ndash;&gt;-->
    <!--        <el-dialog title="提示" :visible.sync="visi_reset" width="30%" center>-->
    <!--            <span>确定重置 &nbsp;&nbsp;  {{opuser.account}}({{opuser.name}}) &nbsp; &nbsp; 的密码吗？</span>-->
    <!--            <span slot="footer" class="dialog-footer">-->
    <!--    					<el-button @click="visi_reset = false">取 消</el-button>-->
    <!--    					<el-button type="primary" @click="visi_reset = false">确 定</el-button>-->
    <!-- 					 </span>-->
    <!--        </el-dialog>-->

    <!--    </div>-->

</template>

<template id='roleMan'>
    <smodel :upbuttons="upbuttons" :tabledata="tabledata" :tablecolumn="tablecolumn" :opbuttons="opbuttons"></smodel>
    <!--    <div>-->
    <!--        <div>-->
    <!--            <p>-->
    <!--                <el-button type="primary" icon="el-icon-plus" round size='mini' @click="addClick">新增角色</el-button>-->
    <!--            </p>-->
    <!--        </div>-->

    <!--        <el-table :data="roledata" border style="width:100%">-->
    <!--            <el-table-column type='index' width='50'>-->
    <!--            </el-table-column>-->

    <!--            <el-table-column prop='name' label='角色' width='120'>-->
    <!--            </el-table-column>-->

    <!--            <el-table-column prop='description' label='说明' width='160'>-->
    <!--            </el-table-column>-->

    <!--            <el-table-column prop='perms' label='权限' width='140'>-->
    <!--            </el-table-column>-->

    <!--            <el-table-column prop='status' label='状态' width='80'>-->
    <!--            </el-table-column>-->

    <!--            <el-table-column label="操作">-->
    <!--                <template slot-scope="scope">-->
    <!--                    <el-button v-if='scope.row.disabled' @click="handleClick(scope.row)" type="text" size="small">启用-->
    <!--                    </el-button>-->
    <!--                    <el-button v-else @click="handleClick(scope.row)" type="text" size="small">禁用</el-button>-->
    <!--                    <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>-->
    <!--                    <el-button type="text" size="small">删除</el-button>-->
    <!--                </template>-->
    <!--            </el-table-column>-->
    <!--        </el-table>-->

    <!--        &lt;!&ndash; Role Eidt Dialog &ndash;&gt;-->
    <!--        <el-dialog v-loading="ed_loading" :title="dialogTitle" :visible.sync="dialogFormVisible" label-width='60px'>-->
    <!--            <el-form :model="oprole" label-position="left">-->
    <!--                <el-form-item label="角色">-->
    <!--                    <el-input v-model="oprole.name" auto-complete="off" :disabled="filedDisabled"-->
    <!--                              placeholder="请输入角色"></el-input>-->
    <!--                </el-form-item>-->
    <!--                <el-form-item label="说明">-->
    <!--                    <el-input v-model="oprole.description" auto-complete="off" placeholder="请输入说明"></el-input>-->
    <!--                </el-form-item>-->
    <!--                <el-form-item label="选择权限">-->
    <!--                    <el-select v-model="oprole.perms_id" multiple placeholder="请选择权限">-->
    <!--                        <el-option v-for="item in sys_perms" :key="item.value" :label="item.label" :value="item.value">-->
    <!--                        </el-option>-->
    <!--                    </el-select>-->
    <!--                </el-form-item>-->
    <!--            </el-form>-->
    <!--            <div slot="footer" class="dialog-footer">-->
    <!--                <el-button @click="dialogFormVisible = false">取 消</el-button>-->
    <!--                <el-button v-if="dialogAction=='add'" type="primary" @click="postaddrole">确 定</el-button>-->
    <!--                <el-button v-else-if="dialogAction=='edit'" type="primary" @click="posteditrole">确 定</el-button>-->
    <!--            </div>-->
    <!--        </el-dialog>-->
    <!--    </div>-->
</template>

<template id='permMan'>
    <div>
        <div>
            <p>
                <el-button type="primary" icon="el-icon-plus" round size='mini' @click="addClick">新增权限</el-button>
            </p>
        </div>

        <el-table :data="permdata" border style="width:100%">
            <el-table-column type='index' width='50'>
            </el-table-column>

            <el-table-column prop='perm' label='权限' width='120'>
            </el-table-column>

            <el-table-column prop='description' label='说明' width='160'>
            </el-table-column>

            <el-table-column prop='status' label='状态' width='80'>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button v-if='scope.row.disabled' @click="handleClick(scope.row)" type="text" size="small">启用
                    </el-button>
                    <el-button v-else @click="handleClick(scope.row)" type="text" size="small">禁用</el-button>
                    <el-button @click="editClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>


        <!-- Perm Eidt Dialog -->
        <el-dialog v-loading="ed_loading" :title="dialogTitle" :visible.sync="dialogFormVisible" label-width='60px'>
            <el-form :model="opperm">
                <el-form-item label="权限">
                    <el-input v-model="opperm.name" auto-complete="off" :disabled="filedDisabled"
                              placeholder="请输入角色"></el-input>
                </el-form-item>
                <el-form-item label="说明">
                    <el-input v-model="opperm.description" auto-complete="off" placeholder="请输入说明"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button v-if="dialogAction=='add'" type="primary" @click="postaddperm">确 定</el-button>
                <el-button v-else-if="dialogAction=='edit'" type="primary" @click="posteditperm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<template id='menuMan'>
    <h1>菜单管理</h1>
</template>

<template id='dataAnly'>
    <div>
        <smodel></smodel>
    </div>
</template>

<template id="smodel">
    <div>
        <p>
            <el-button v-for="(bt, index) in upbuttons" type="primary" :icon="bt.icon" :key="index" round size='mini'
                       @click="UpClick(bt)">{{bt.label}}
            </el-button>
        </p>
        <el-table :data="tabledata" border style="width:100%">
            <el-table-column type='index' width='50'>
            </el-table-column>
            <el-table-column v-for="(field, index) in tablecolumn" :key="index" :prop="field.prop"
                             :label="field.label"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button v-for="(bt, index) in opbuttons" :key="index" type="text" size="small"
                               @click="OpClick(bt, scope.row)">{{bt.label}}
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-loading="ed_loading" :title="dialogTitle" :visible.sync="dialogFormVisible" label-width='60px'>
            <el-form :model="opdata">
                <el-form-item v-for="(field, index) in dialogForm" :key="index" :label="field.label"  label-width="80px">
                    <el-input v-if="field.type=='input' || field.type == undefined " v-model="opdata[field.prop]"
                              auto-complete="off"></el-input>
                    <el-select v-else-if="field.type=='select'"  :multiple="field.multi" v-model="opdata[field.prop]">
                        <el-option v-for="item in field.options" :key="item.value" :label="item.label"
                                   :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialConfirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<div id="app">
    <el-container>
        <el-header>
            <div class="right-con">
                <el-button icon="el-icon-s-tools" size=mini round @click="logout">Logout</el-button>
            </div>
            <h1 style="color: white;">GreenLight Planet Production</h1>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <leftmenu @mclick-event='menuclick'>
                </leftmenu>
            </el-aside>
            <el-main>
                <maintabs ref="maintabs"></maintabs>
            </el-main>
        </el-container>
    </el-container>

</div>
</body>

<!-- import Vue before Element -->
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<!-- import JavaScript -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://cdn.bootcss.com/qs/6.8.0/qs.js"></script>

<script>
    <!--		-->
    //		var menudata = {
    //			menus: [{
    //				index: '1',
    //				issub: true,
    //				title: '系统管理',
    //				smenus: [{
    //					index: '1-1',
    //					title: '用户管理',
    //					mpath: 'userman'
    //				}, {
    //					index: '1-2',
    //					title: '角色管理',
    //					mpath: 'roleman'
    //				}, {
    //					index: '1-3',
    //					title: '权限管理',
    //					mpath: 'permman'
    //				}, {
    //					index: '1-4',
    //					title: '菜单管理',
    //					mpath: 'menuman'
    //				}]
    //			}, {
    //				index: '2',
    //				issub: false,
    //				title: '数据分析',
    //				mpath: 'dataanly',
    //				smenus:[]
    //			}]
    //		}
    //
    //		var userdata = {
    //
    //		}

</script>


<script src="js/main.js"></script>

</html>