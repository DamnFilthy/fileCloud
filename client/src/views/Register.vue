<template>
    <div class="container">
        <div class="form">
            <h1 class="form-title">Регистрация</h1>
            <div v-if="isLoading">
                <Spinner />
            </div>
            <div v-else>
                <div class="form-group">
                    <input v-model="email" placeholder=" " type="text" class="form-input">
                    <label class="form-label">
                        Email
                    </label>
                </div>
                <div class="form-group">
                    <input v-model="password" placeholder=" " type="text" class="form-input">
                    <label class="form-label">
                        Пароль
                    </label>
                </div>
            </div>
            <button class="form-button"
                    :disabled="isSubmitting"
                    :class="[ isSubmitting ? 'disable' : 'form-btn' ]"
                    @click="onSubmit">
                Отправить
            </button>

            <div v-if="validationErrors">
               <div class="validationErrors">{{showErrors.message}}</div>
                <ul v-if="showErrors.errors">
                    <li v-for="error in showErrors.errors.errors" :key="error">
                        {{error.msg}}
                    </li>
                </ul>
            </div>

            <div class="registration-info" v-if="successResponse">
                <div class="registration-info-text">{{successResponse.message}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    
    import Spinner from "../components/Spinner"
    import {mapState} from "vuex";
    import {actionTypes} from "../store/modules/auth";
    
    export default {
        name: "Registration",
        components:{Spinner},
        data(){
            return{
                email: null,
                password: null
            }
        },
        computed: {
            ...mapState({
                isSubmitting: state => state.auth.isSubmitting,
                isLoading: state => state.auth.loading,
                validationErrors: state => state.auth.validationErrors,
                successResponse: state => state.auth.successResponse
            }),
            showErrors(){
                return this.validationErrors
            }
        },
        methods: {
            onSubmit() {
                this.$store.state.auth.validationErrors = ''
                this.$store.state.auth.successResponse = ''

                // Отправляем запрос
                this.$store.dispatch(actionTypes.register, {email: this.email, password: this.password})
                .then(status => {
                    if (status === 200) {
                        setTimeout(() => {
                            this.$router.push('/');
                        }, 2000)
                    }
                })
                this.email = ''
                this.password = ''
            },
        },
        mounted(){
            this.$store.state.auth.validationErrors = ''
            this.$store.state.auth.successResponse = ''
        }
    }
    
</script>

<style lang="scss" scoped>
    .validationErrors{
        color: red;
        font-weight: bold;
        font-size: 24px;
        margin-top: 25px;
    }
    ul{
        padding: 0;
        li{
            font-size: 14px;
            color: red;
            margin-bottom: 8px;
            padding: 0;
            list-style: none;
        }
    }
    .error-list{
        li{
            list-style: inside;
        }
    }
    .registration-info{
        margin-top: 25px;
        &-text{
            font-weight: bold;
            color: #31ff68;
            font-size: 24px;
        }
    }
    .container{
        height: 80vh;
        display: flex;
        align-items: center;
        justify-content: center
    }
    .form{
        margin: 0 auto;
        padding: 32px;
        width: 400px;
        display: block;
        border: 10px;
        box-shadow: 0 4px 16px #ccc;
        letter-spacing: 1px;
    }

    .form-input,
    .form-button{
        letter-spacing: 1px;
        font-size: 16px;
    }

    .form-title{
        text-align: center;
        margin: 0 0 32px 0;
        font-weight: normal;
    }

    .form-group{
        position: relative;
        margin-bottom: 32px;
    }

    .form-label{
        position: absolute;
        top: 0;
        z-index: -1;
        color: #9e9e9e;
        transition: .3s ease-in-out;
    }

    .form-input{
        outline: none;
        width: 100%;
        padding-bottom: 10px;
        border: none;
        border-bottom: 1px solid #c0c0c0;
        background-color: transparent;
        transition: .3s ease-in-out;
    }

    .form-input:focus{
        border-bottom: 1px solid #1a73a8;
    }

    .form-input:focus ~ .form-label,
    .form-input:not(:placeholder-shown) ~ .form-label{
        top: -18px;
        font-size: 12px;
        color: #c0c0c0;
    }

    .form-button{
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        color: #fff;
        background-color: #0071f0;
        cursor: pointer;
        transition: .3s ease-in-out;
    }

    .form-button:hover,
    .form-button:focus{
        background-color: rgba(0, 113, 240, 0.7);
    }
    .disable, .disable:hover{
        background-color: gray;
    }
</style>