<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>GreenLight Planet</title>

    <!-- import element-ui CSS -->
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">

    <!-- import less -->
    <link rel="stylesheet" type="text/less" href="css/styles.less" />
    <script src="//cdnjs.cloudflare.com/ajax/libs/less.js/3.10.0-beta/less.min.js"></script>
</head>

<body>
<!-- left Menu -->
<template id="leftMenu">
    <div>
        <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <template v-for="menu in menudata.menus">
                <el-submenu v-if="menu.issub" :index="menu.index">
                    <template slot="title">{{menu.title}}</template>
                    <el-menu-item v-for="(sub, index) in menu.smenus" :key="index" :index="sub.index" @click="mclick(sub.index)">{{sub.title}}</el-menu-item>
                </el-submenu>
                <el-menu-item v-else="menu.issub" :index="menu.index" @click="mclick(menu.index)">
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
    <h1>Welcome, Green Light Planet !</h1>
</template>

<template id='userMan'>
    <h1>用户管理</h1>
</template>

<template id='roleMan'>
    <h1>角色管理</h1>
</template>

<template id='permMan'>
    <h1>权限管理</h1>
</template>

<template id='menuMan'>
    <h1>菜单管理</h1>
</template>

<template id='dataAnly'>
    <h1>数据分析</h1>
</template>

<div id="app">
    <el-container>
        <el-header>
            <div class="right-con">
                <el-button icon="el-icon-s-tools" size=mini round @click="logout">Logout</el-button>
            </div>
            <h1>Sun King</h1>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <leftmenu :menudata="menudata" @mclick-event='menuclick'>
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

<script>
    var menudata = {
        menus: [{
            index: '1',
            issub: true,
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
            issub: false,
            title: '数据分析',
            mpath: 'dataanly'
        }]
    }
</script>

<script src="js/main.js"></script>

</html>