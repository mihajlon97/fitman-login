<template>
    <div class="resetPassword">
        <div class="login-wrap">
            <img id="logo" src="https://res.cloudinary.com/werbifi/image/upload/v1531155187/logo-preloader.png" alt="werbifi">
            <div class="login-html">
                <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">Reset Password</label>
                <input id="tab-2" type="text" name="tab" class="sign-up"><label for="tab-2" class="tab"></label>
                <div class="login-form">
                    <div class="sign-in-htm">
                        <div class="group">
                            <label for="email" class="label" :class="{invalid: $v.email.$error}">Email</label>
                            <input
                                    id="email"
                                    type="text"
                                    class="input"
                                    v-model="email"
                                    @blur="$v.email.$touch()"
                            >
                            <p class="error" v-if="!$v.email.required">Please provide an email.</p>
                            <p class="error" v-if="!$v.email.email">Email is not valid.</p>
                            <!--<div style="color: #fff">{{$v}}</div>-->
                        </div>
                        <div class="group" @click.prevent="onSubmit">
                            <input type="submit" class="button" :class="{disabled: $v.$invalid}" value="Send a reset email" :disabled="$v.$invalid">
                        </div>
                        <p class="success" v-if="!first && isSent">{{messageSuccess}}</p>
                        <p class="error" v-if="!first && !isSent">{{messageFail}}</p>
                    </div>
                </div>
                <div class="hr"></div>
                <div class="foot-lnk">
                    <router-link to="/">Sign In?</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { required, email, numeric, minValue, minLength, sameAs, requiredUnless } from 'vuelidate/lib/validators'
    import AuthService from '../../services/AuthService';

    export default {
        data() {
            return {
                email: '',
                isSent: false,
                messageFail: '',
                messageSuccess: '',
                first: true
            };
        },
        validations: {
            email: {
                required,
                email
            }
        },
        methods: {
            onSubmit () {
                this.first = false;
                console.log(this.email)
                AuthService.sendResetEmail({
                    email: this.email
                })
                    .then(res => {
                        console.log(res);
                        this.messageFail = res.data.error;
                        if(this.messageFail !== undefined) {
                            this.isSent = false;
                            return;
                        }

                        this.isSent = true;
                        this.messageSuccess = res.data.message;
                    })
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
        margin-top: 50px;
        width:100%;
        height:100%;
        position:absolute;
        padding:90px 70px 50px 70px;
    }
    .login-html .sign-in-htm {
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
    .login-html .sign-up:checked + .tab + .login-form {
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
    .success {
        color: #1dff4e;
        padding: 10px;
        border: 1px solid #1dff4e;
        border-radius: 3%;
        text-align: center;
        background-color: inherit;
        font-weight: lighter;
    }
</style>