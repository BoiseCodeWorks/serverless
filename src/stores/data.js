import fb from '../firebase-config'

const DB = fb.firestore

export default {
    state: {
        keeps: [],
        myKeeps: [],
        activeVault: {},
        vaults: [],
        observers: []
    },
    mutations: {
        setResourceAndObserver(state, payload) {
            state[payload.resource] = payload.data
            state.observers.push(payload.observer)
        },
        setResource(state, payload) {
            state[payload.resource] = payload.data
        },
        killObservers(state) {
            state.observers.forEach(unsubscribe => {
                unsubscribe()
            })
        }
    },
    actions: {
        create({ commit, dispatch }, payload) {
            //fetch('url').then(res => res.json()).then(data => commit('addResource', data))
            DB.collection(payload.collection).add(payload.data)
                .then(doc => {
                    dispatch("addNotification", { type: "success", message: `${payload.collection} created!` })
                    console.log(`Successfully created a ${payload.collection} with ID: `, doc.id)
                }).catch(err => {
                    console.error(err)
                })
        },
        update({ commit, dispatch }, payload) {
            DB.collection(payload.collection).doc(payload.data.id).set(payload.data)
                .then(() => {
                    dispatch("addNotification", { type: "success", message: `${payload.collection} updated!` })
                    console.log(`Successfully updated a ${payload.collection} with ID: `, payload.data.id)
                }).catch(err => {
                    console.error(err)
                })
        },
        delete({ commit, dispatch }, payload) {
            DB.collection(payload.collection).doc(payload.data.id).delete()
                .then(() => {
                    console.log(`Successfully deleted a ${payload.collection} with ID: `, payload.data.id)
                }).catch(err => {
                    console.error(err)
                })
        },
        get({ commit, dispatch }, payload) {
            let observer = DB.collection(payload.collection).where("public", "==", true).onSnapshot(querySnapShot => {
                let collection = []
                querySnapShot.forEach(doc => {
                    let item = doc.data()
                    item.id = doc.id
                    collection.push(item)
                })
                commit('setResourceAndObserver', { resource: payload.resource || payload.collection, data: collection, observer })
            })
        },
        getVault({ commit, dispatch }, vaultId) {
            //TODO: this doesnt work here
            //FIXME: im broke
            DB.collection("vaults").doc(vaultId).get()
                .then(doc => {
                    let vault = doc.data()
                    vault.id = doc.id
                    commit('setResource', { resource: "activeVault", data: vault })
                    dispatch('getKeepsByVaultId', { data: vault })
                })
        },
        getKeepsByVaultId({ commit, dispatch }, payload) {
            let keeps = []
            payload.data.keeps.forEach(id => {
                DB.collection("keeps").doc(id).get().then(doc => {
                    let keep = doc.data()
                    keep.id = doc.id
                    keeps.push(keep)
                })
                commit("setResource", { data: { ...payload.data, keeps }, resource: "activeVault" })
            })
        },
        getUserData({ commit, dispatch }, user) {
            DB.collection("keeps").where("creatorId", "==", user.uid).onSnapshot(querySnapShot => {
                let collection = []
                querySnapShot.forEach(doc => {
                    let item = doc.data()
                    item.id = doc.id
                    collection.push(item)
                })
                commit("setResource", { data: collection, resource: "myKeeps" })
            })

            DB.collection("vaults").where("creatorId", "==", user.uid).onSnapshot(querySnapShot => {
                let collection = []
                querySnapShot.forEach(doc => {
                    let item = doc.data()
                    item.id = doc.id
                    collection.push(item)
                })
                commit("setResource", { data: collection, resource: "vaults" })
            })
        },
        killObservers({ commit, dispatch }) {
            commit("killObservers")
        }
    }
}