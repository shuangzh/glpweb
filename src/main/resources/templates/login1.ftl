<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Green Light Planet</title>

    <!-- import element-ui CSS -->
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">

    <!-- import less -->
    <link rel="stylesheet" type="text/less" href="css/styles.less"/>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/less.js/3.10.0-beta/less.min.js"></script>

</head>
<body>
<div id="app">

    <div id="stick-header">
        <div class="logo">
            <img src="image/new-logo.png" />
        </div>
    </div>


    <div class="login">
        <div class="login-con">

            <div class="form-con">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>欢迎登录</span>
                    </div>

                    <el-form id="loginform" action="/login" ref="LoginForm">
                        <el-form-item label="账号">
                            <el-input
                                    placeholder="请输入账号"
                                    name="username">
                                <i slot="prefix" class="el-input__icon el-icon-user"></i>
                            </el-input>

                        </el-form-item>

                        <el-form-item label="密码">
                            <el-input
                                    placeholder="请输入账号"
                                    name="password">
                                <i slot="prefix" class="el-input__icon el-icon-key"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button native-type="submit" style="width:100%;background-color: #FFDB00">登录</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </div>

        </div>
    </div>

    <!--
    <i-button @click="show">Click me!</i-button>
    <Modal v-model="visible" title="Welcome">Welcome to iView</Modal>
    -->

</div>

</body>

<!-- import Vue before Element -->
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<!-- import JavaScript -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://cdn.bootcss.com/qs/6.8.0/qs.js"></script>


<script>
    new Vue({
        el: '#app',
        data: {
            visible: false
        },
        methods: {
            show: function () {
                this.visible = true;
            },
            loginSubmit:function () {
                var f=document.getElementById("loginform");
                console.log("login form submit")
                f.submit()
            }
        }
    })
</script>


</html>