export default {
    state: {
        notifications: []
    },
    mutations: {
        clearNotification(state, notification) {
            let i = state.notifications.indexOf(notification)
            if (i > -1) {
                state.notifications.splice(i, 1)
            }
        },
        addNotification(state, notification) {
            state.notifications.push(notification)
        }
    },
    actions: {
        addNotification({ commit }, notification) {
            if (!commit) {
                commit = (fn, payload) => {
                    this.mutations[fn].bind(null, this.state)(payload)
                }
            }
            if (notification && notification.success) {
                setTimeout(() => {
                    commit('clearNotification', notification)
                }, 2500)
                commit('addNotification', notification)
                return
            }
            if (notification && notification.response && notification.response.data && notification.response.data.stack) {
                var stack = notification.response.data.stack
                notification.type = 'Error'
                notification.message = stack.error.error
                notification.title = `${stack.action} ${stack.schemaType}`
            }
            var error = {
                type: notification.type || 'Error',
                message: notification.message || notification.error,
                title: notification.title || notification.error
            }
            setTimeout(() => {
                commit('clearNotification', error)
            }, 2500)
            commit('addNotification', error)
        }
    }
}
