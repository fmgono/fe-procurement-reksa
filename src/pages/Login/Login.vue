<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-form ref="form" v-model="valid">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-text-field
                  label="Usercode"
                  name="login"
                  v-model="usercode"
                  :rules="[v => !!v || 'Usercode is required']"
                  prepend-icon="person"
                  type="text"
                  required
                ></v-text-field>
                <v-text-field
                  label="Password"
                  name="password"
                  v-model="password"
                  :rules="[v => !!v || 'Password is required']"
                  prepend-icon="lock"
                  type="password"
                  :error-messages="errorMessage"
                  @focus="errorMessage = null"
                  required
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  :loading="btnLoading"
                  :disabled="!valid"
                  @click.prevent="handleSubmit"
                >Login</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      btnLoading: false,
      valid: true,
      usercode: '',
      password: '',
      error: false,
      errorMessage: ''
    }
  },
  methods: {
    handleSubmit() {
      this.btnLoading = true
      axios
        .post('http://api_do_hub.test/api/login', {
          user_code: this.usercode,
          password: this.password
        })
        .then(response => {
          this.btnLoading = false
          localStorage.setItem('token', response.data.token)
          this.$router.push('/')
        })
        .catch(e => {
          console.error(e)
          this.errorMessage = `The User and Password you entered doesnt match`
          this.btnLoading = false
        })
    }
  }
}
</script>
