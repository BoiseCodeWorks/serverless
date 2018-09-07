<template>
  <transition-group name="list-complete" tag="div">
    <div v-for="(notification, i) in notifications" class="card dark faded notification show action" :style="{top: (i * 10)+'em'}"
      :key="i" @click="clear(notification)">
      <div class="alert text-theme-white-1" :class="'alert-'+getClass(notification)">
        <i class="material-icons right">close</i>
        <h6>{{notification.type || 'Alert'}}: {{notification.title ? notification.title : notification.code}}</h6>
        <hr/>
        <p>{{notification.message || notification.error}}</p>
      </div>
    </div>
  </transition-group>
</template>

<script>
  export default {
    name: 'Notification',
    computed: {
      notifications() {
        return this.$store.state.notifications.notifications
      }
    },
    methods: {
      clear(notification) {
        this.$store.commit('clearNotification', notification)
      },
      getClass(notification) {
        notification.type = notification.type || 'error'
        switch (notification.type.toLowerCase()) {
          case 'error':
          case 'Error':
            return 'error'
          case 'success':
          case 'complete':
            return 'success'
          case 'info':
            return 'info'
          case 'warning':
            return 'warning'
          default:
            return 'info'
        }
      }
    }
  }
</script>


<style>
  .notification {
    position: fixed;
    font-family: arial;
    font-size: small;
    color: white !important;
    width: 300px;
    transition: all .3s linear
  }

  .notification.show {
    display: block;
    right: 10px;
    top: 10px;
    padding: 0.7em;
    z-index: 99999999999999;
  }

  .notification.show a {
    float: right;
    margin-right: 5px;
    color: #fff;
  }
</style>