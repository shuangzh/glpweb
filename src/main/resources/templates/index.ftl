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
</template>

<template id='roleMan'>
    <smodel :upbuttons="upbuttons" :tabledata="tabledata" :tablecolumn="tablecolumn" :opbuttons="opbuttons"></smodel>
</template>

<template id='permMan'>
    <smodel :upbuttons="upbuttons" :tabledata="tabledata" :tablecolumn="tablecolumn" :opbuttons="opbuttons"></smodel>
</template>

<template id='menuMan'>
    <smodel :upbuttons="upbuttons" :tabledata="tabledata" :tablecolumn="tablecolumn" :opbuttons="opbuttons"></smodel>
</template>

<template id='dataAnly'>
    <h1>数据分析</h1>
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


</script>


<script src="js/main.js"></script>

</html>