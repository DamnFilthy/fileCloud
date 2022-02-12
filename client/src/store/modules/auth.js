import requestUrl from "@/api/requestGetUrl"

const state = {
    isSubmitting: false,
    validationErrors: null,
    loading: false,
    successResponse: null
}

export const mutationTypes = {
    registerStart: "[register] registerStart",
    registerSuccess: "[register] registerSuccess",
    registerFailure: "[register] registerFailure"
}

export const actionTypes = {
    register: "[register] register"
}

const mutations = {
    [mutationTypes.registerStart](state) {
        state.isSubmitting = true
        state.validationErrors = null
        state.loading = true
    },
    [mutationTypes.registerSuccess](state, data) {
        state.isSubmitting = false
        state.loading = false
        state.successResponse = data
    },
    [mutationTypes.registerFailure](state, response) {
        state.loading = false
        state.isSubmitting = false
        state.validationErrors = response
    }
}

const actions = {
    [actionTypes.register](context, credentials) {
        return new Promise(resolve => {
            context.commit(mutationTypes.registerStart, credentials)
            requestUrl.path(credentials, '/register')
                .then(response => {
                    console.log(response)
                    context.commit(mutationTypes.registerSuccess, response.data)
                    resolve(response.status)
                })
                .catch(error => {
                    context.commit(mutationTypes.registerFailure, error.response.data)
                    console.log(error.response)
                })
        })
    }
}

export default {
    state,
    mutations,
    actions
}