<template>
    <div class="login-wrap">
        <div>
            <img id="logo" src="https://res.cloudinary.com/werbifi/image/upload/v1531155187/logo-preloader.png" alt="werbifi">
        </div>
        <div class="login-html">
            <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">Sign In</label>
            <input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">Sign Up</label>
            <div class="login-form">
                <div class="sign-in-htm">
                    <div class="group">
                        <label for="user1" class="label" :class="{invalid: $v.username.$error}">Username</label>
                        <input
                                id="user1"
                                type="text"
                                class="input"
                                v-model="username"
                                @blur="$v.username.$touch()"
                        >
                        <p class="error" v-if="isSubmitted && !$v.username.required">Please provide a username.</p>
                        <p class="error" v-if="isSubmitted && !$v.username.minLen">Username must be at least 6 characters long.</p>
                        <!--<div style="color: #fff">{{$v}}</div>-->
                    </div>
                    <div class="group">
                        <label for="pass" class="label" :class="{invalid: $v.password.$error}">Password</label>
                        <input
                                id="pass"
                                type="password"
                                class="input"
                                data-type="password"
                                v-model="password"
                                @blur="$v.password.$touch()"
                        >
                        <p class="error" v-if="isSubmitted && !$v.password.required">Please provide a password.</p>
                        <p class="error" v-if="isSubmitted && !$v.password.minLen">Password must be at least 6 characters long.</p>
                    </div>
                    <!--<div class="group">
                        <input id="check" type="checkbox" class="check" checked>
                        <label for="check"><span class="icon"></span> Keep me Signed in</label>
                    </div>-->
                    <div class="group" @click.prevent="onSubmit">
                        <input type="submit" class="button" value="Sign In"><!--:class="{disabled: $v.$invalid}"-->  <!--:disabled="$v.$invalid"-->
                    </div>
                    <p class="error" v-if="$store.getters.getLoginError">{{$store.getters.getLoginError}}</p>
                    <!--<p style="color: #fff">{{$v}}</p>-->
                    <div class="hr"></div>
                    <div class="foot-lnk">
                        <router-link to="/reset-form">Forgot Password?</router-link>
                    </div>
                </div>
                <div class="sign-up-htm">
                    <div class="group">
                        <label for="user2" class="label">Username</label>
                        <input id="user2" type="text" class="input">
                    </div>
                    <div class="group">
                        <label for="pass1" class="label">Password</label>
                        <input id="pass1" type="password" class="input" data-type="password">
                    </div>
                    <div class="group">
                        <label for="pass2" class="label">Repeat Password</label>
                        <input id="pass2" type="password" class="input" data-type="password">
                    </div>
                    <div class="group">
                        <label for="pass3" class="label">Email Address</label>
                        <input id="pass3" type="text" class="input">
                    </div>
                    <div class="group">
                        <input type="submit" class="button" value="Sign Up">
                    </div>
                    <div class="hr"></div>
                    <div class="foot-lnk">
                        <label for="tab-1">Already Member?</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { required, email, numeric, minValue, minLength, sameAs, requiredUnless } from 'vuelidate/lib/validators'

    export default {
        data() {
            return {
                username: '',
                password: '',
                isSubmitted: false
            }
        },
        validations: {
            username: {
                required,
                minLen: minLength(6)
            },
            password: {
                required,
                minLen: minLength(6)
            }
        },
        methods: {
            onSubmit () {
                this.isSubmitted = true;
                if(this.$v.$invalid) {
                    return;
                }
                const formData = {
                    username: this.username,
                    password: this.password
                }
                this.$store.dispatch('login', {username: formData.username, password: formData.password})
            }
        }
    }
</script>
<style scoped>
    body{
        margin:0;
        color:#6a6f8c;
        background:#c8c8c8;
        font:600 16px/18px 'Open Sans',sans-serif;
    }
    *,:after,:before{box-sizing:border-box}
    .clearfix:after,.clearfix:before{content:'';display:table}
    .clearfix:after{clear:both;display:block}
    a{color:inherit;text-decoration:none}

    .login-wrap{
        width:100%;
        margin:auto;
        max-width:525px;
        min-height:850px;
        position:relative;
        background:url("http://res.cloudinary.com/werbifi/image/upload/v1534522841/intro-bg.jpg") no-repeat center;
        box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);
    }
    .login-html{
        width:100%;
        height:100%;
        position:absolute;
        padding:90px 70px 50px 70px;

    }
    .login-html .sign-in-htm,
    .login-html .sign-up-htm{
        top:0;
        left:0;
        right:0;
        bottom:0;
        position:absolute;
        transform:rotateY(180deg);
        backface-visibility:hidden;
        transition:all .4s linear;
    }
    .login-html .sign-in,
    .login-html .sign-up,
    .login-form .group .check{
        display:none;
    }
    .login-html .tab,
    .login-form .group .label,
    .login-form .group .button{
        text-transform:uppercase;
    }
    .label {
        margin-top: 7px;
        margin-bottom: 9px;
        width:100%;
        color: #fff;
        display:block;
    }
    .login-html .tab{
        font-weight: 300;
        font-size:22px;
        margin-right:15px;
        color: #fff;
        margin-bottom: 20px;
        padding-bottom:5px;
        display:inline-block;
        border-bottom:2px solid transparent;
    }
    .login-html .sign-in:checked + .tab,
    .login-html .sign-up:checked + .tab{
        color: #fff;
        border-color:#1161ee;
    }
    .login-form{
        min-height:345px;
        position:relative;
        perspective:1000px;
        transform-style:preserve-3d;
    }
    .login-form .group{
        margin-bottom:15px;
    }

    .login-form .group .input,
    .login-form .group .button{
        width:100%;
        color:#fff;
        display:block;
    }
    .login-form .group .button:hover{
        background: #fff;
        color: #000;
    }
    .login-form .group .input,
    .login-form .group .button{
        border:none;
        padding:15px 20px;
        border-radius:25px;
        background:rgba(255,255,255,.1);
    }
    .login-form .group input[data-type="password"]{
        text-security:circle;
        -webkit-text-security:circle;
    }
    .login-form .group .label{
        font-size:12px;
    }
    .login-form .group .button{
        background:#1161ee;
    }
    .login-form .group label .icon{
        width:15px;
        height:15px;
        border-radius:2px;
        position:relative;
        display:inline-block;
        background:rgba(255,255,255,.1);
    }
    .login-form .group label .icon:before,
    .login-form .group label .icon:after{
        content:'';
        width:10px;
        height:2px;
        background:#fff;
        position:absolute;
        transition:all .2s ease-in-out 0s;
    }
    .login-form .group label .icon:before{
        left:3px;
        width:5px;
        bottom:6px;
        transform:scale(0) rotate(0);
    }
    .login-form .group label .icon:after{
        top:6px;
        right:0;
        transform:scale(0) rotate(0);
    }
    .login-form .group .check:checked + label{
        color:#fff;
    }
    .login-form .group .check:checked + label .icon{
        background:#1161ee;
    }
    .login-form .group .check:checked + label .icon:before{
        transform:scale(1) rotate(45deg);
    }
    .login-form .group .check:checked + label .icon:after{
        transform:scale(1) rotate(-45deg);
    }
    .login-html .sign-in:checked + .tab + .sign-up + .tab + .login-form .sign-in-htm{
        transform:rotate(0);
    }
    .login-html .sign-up:checked + .tab + .login-form .sign-up-htm{
        transform:rotate(0);
    }

    .hr{
        height:2px;
        margin:60px 0 50px 0;
        background:rgba(255,255,255,.2);
    }
    .foot-lnk{
        text-align:center;
        color: #fff;
    }
    #logo {
        margin-top: 13%;
        margin-left: 35%;
        margin-right: auto;
        width:150px;
        height: 50px;
    }
    .invalid {
        color: #FF0000;
    }
    .error {
        color: #FF0000;
        padding: 10px;
        border: 1px solid #FF0000;
        border-radius: 3%;
        text-align: center;
        background-color: inherit;
        font-weight: lighter;
    }
    input {
        background-color: red;
    }
    .disabled {
        background: red;
    }
</style>