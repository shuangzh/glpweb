<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>GreenLight Planet</title>
    <link rel="stylesheet" type="text/css" href="http://unpkg.com/iview/dist/styles/iview.css">
    <script type="text/javascript" src="http://vuejs.org/js/vue.min.js"></script>
    <script type="text/javascript" src="http://unpkg.com/iview/dist/iview.min.js"></script>

    <!-- less -->
    <link rel="stylesheet" type="text/less" href="/css/styles.less"/>
    <script src="//cdnjs.cloudflare.com/ajax/libs/less.js/3.10.0-beta/less.min.js"></script>

</head>
<body>
<div id="app">
    <div class="login">
        <div class="login-con">
            <Card icon="log-in" title="欢迎登陆" :bordered="false">
                <div class="form-con">
                    <i-form id="loginform" action="/login" method="POST">
                        <form-iterm>
                            <i-input type="text" name="username" >
                                <span slot="prepend">
                                    <Icon :size="16" type="ios-person"/>
                                </span>
                            </i-input>
                        </form-iterm>
                        <form-iterm>
                            <i-input  type="password" name="password">
                                 <span slot="prepend">
                                     <Icon :size="16" type="ios-lock"/>
                                 </span>
                            </i-input>
                        </form-iterm>
                        <form-iterm>
                            <i-button long type="primary" @click="loginSubmit">Login</i-button>
                        </form-iterm>
                    </i-form>
                </div>
            </Card>
        </div>
    </div>

    <!--
    <i-button @click="show">Click me!</i-button>
    <Modal v-model="visible" title="Welcome">Welcome to iView</Modal>
    -->

</div>
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
</body>
</html>