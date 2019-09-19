<!DOCTYPE html>
<html lang="zh">
<head>
    <title>GreenLightPlanet Login</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <!-- vue.js && iview -->
    <link rel="stylesheet" type="text/css" href="http://unpkg.com/iview/dist/styles/iview.css">
    <script type="text/javascript" src="http://vuejs.org/js/vue.min.js"></script>
    <script type="text/javascript" src="http://unpkg.com/iview/dist/iview.min.js"></script>


    <style scoped>
        .login-box{
            padding: 50px 30px;
            width: 350px;
            margin: 0 auto;
            margin-top: 100px;
            border-radius: 5px;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            box-shadow: 0 0 25px #909399;
        }


    </style>



</head>
<body>
<dvi id="app">

    <div class="login-box">
        <i-Form ref="LoginFrom">
            <FormItem>
                <Input v-model="email" type="text" prefix="ios-mail"  placeholder="enter email address"></Input>
            </FormItem>
            <FormItem>
                <Input v-model="passwd" type="password" prefix="ios-lock" placeholder="your password"></Input>
            </FormItem>
            <FormItem>
                <Button long type="primary" @click="handleSubmit('LoginFrom')">Submit</Button>
            </FormItem>
        </i-Form>
    </div>


</dvi>

<script language="JavaScript">
    var app = new Vue({
        el: '#app',
        data: {
            message: 'Hello Vue!',
            name:'zhoushuang',
            passwd:'123456',
            email:'email'
        }
    })
</script>

</body>
</html>