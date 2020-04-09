<template>
  <div>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list>
        <v-list-item v-for="menu in menus" :key="menu.title" link>
          <v-list-item-icon>
            <v-icon>{{ menu.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ menu.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="primary" dark app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Delivery Order</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-subheader>Khalid Abdullah</v-subheader>
      <v-btn icon @click="handleBtnLogout">
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </div>
</template>
<script>
console.log('[BASE APP] => RENDERED!')
export default {
  data: () => ({
    drawer: null,
    title: 'Dashboard Page',
    menus: [
      { title: 'Delivery Order', icon: 'receipt' },
      { title: 'Invoice', icon: 'receipt' }
    ]
  }),
  methods: {
    handleBtnLogout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>