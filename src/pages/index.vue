<template>
  <div>
    <v-navigation-drawer v-model="drawer" app clipped class="d-print-none">
      <v-list shaped>
        <router-link
          :to="menu.link"
          v-for="menu in menus"
          :key="menu.title"
          style="textDecoration: none"
          v-slot="{href, route, navigate,isExactActive}"
        >
          <v-list-item
            link
            :class="[isExactActive && 'v-item--active v-list-item--active']"
            color="primary"
            :href="href"
            @click="navigate"
          >
            <v-list-item-icon>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ menu.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="primary" dark app clipped-left class="d-print-none">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{menuTitle}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="subtitle-1">{{userCode}}</div>
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
const userAuth = JSON.parse(localStorage.getItem('userAuth'))
let user_code = userAuth ? userAuth.user_code : ''
// if (userAuth) {
//   user_code = userAuth.user_code
// }

export default {
  data: () => ({
    drawer: null,
    menuTitle: 'Dashboard Page',
    userCode: user_code || '',
    menus: [
      { title: 'Dashboard', icon: 'mdi-view-dashboard-outline', link: '/' },
      { title: 'Delivery Order', icon: 'receipt', link: '/delivery_order' },
      { title: 'Invoice', icon: 'receipt', link: '/invoice' }
    ]
  }),
  methods: {
    handleBtnLogout() {
      localStorage.removeItem('userAuth')
      this.$router.push('/login')
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title += ` - ${to.meta.title}`
        this.menuTitle = to.meta.title
      }
    }
  }
}
</script>