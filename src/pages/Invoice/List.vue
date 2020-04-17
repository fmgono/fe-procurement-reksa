<template>
  <div>
    <v-dialog max-width="600" v-model="dialogProcess.confirmation" persistent>
      <v-card>
        <v-card-title :style="style.titleCard" class="headline">
          {{
          dialogProcess.confirmationMessage
          }}
        </v-card-title>
        <v-card-text>
          <v-progress-linear
            :class="[!dialogProcess.isLoading ? 'd-none' : '']"
            color="primary"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
          <v-alert
            :class="[!dialogProcess.isSuccess ? 'd-none' : '']"
            :type="getStatusResponse"
          >{{ dialogProcess.responseMessage }}</v-alert>
        </v-card-text>
        <!-- <v-card-text :class="[!dialogProcess.isSuccess ? 'd-none' : '']"></v-card-text> -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            :class="[!dialogProcess.isSuccess && 'd-none']"
            @click="dialogProcess.confirmation = false"
          >go to invoice</v-btn>
          <v-btn
            color="primary"
            text
            :class="[!dialogProcess.isSuccess && 'd-none']"
            @click="btnSureHandler"
          >Print Invoice</v-btn>
          <v-btn
            color="red darken-1"
            text
            :class="[dialogProcess.isSuccess && 'd-none']"
            @click="dialogProcess.confirmation = false"
          >No</v-btn>
          <v-btn
            color="primary"
            text
            :class="[dialogProcess.isSuccess && 'd-none']"
            @click="btnSureHandler"
          >Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- <v-dialog max-width="600" v-model="dialogProcess.confirmation" persistent>
      <v-card>
        <v-card-title></v-card-title>
      </v-card>
    </v-dialog>-->
    <v-card>
      <v-card-title>
        Invoice Transaction
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :search="search"
        :headers="headers"
        :items="items"
        :loading="loading"
        loading-text="Fetching the data..."
      >
        <template v-slot:item.actions="{ item }">
          <router-link :to="`/invoice/print/${item.inv_seq}`" v-slot="{ href, navigate }">
            <v-btn small text color="primary" :href="href" @click="navigate" target="_blank">
              <v-icon left>mdi-tray-full</v-icon>
              <span>Print</span>
            </v-btn>
          </router-link>
        </template>
      </v-data-table>
      <v-btn rounded color="primary" class="fixed-btn">
        <v-icon left>mdi-text-box-plus-outline</v-icon>
        <span>Receipt Note</span>
      </v-btn>
    </v-card>
  </div>
</template>
<script>
import axios from 'axios'

const { token } = JSON.parse(localStorage.getItem('userAuth'))

export default {
  data: () => ({
    search: '',
    selectedDo: '',
    loading: true,
    style: {
      titleCard: {
        wordBreak: 'break-word'
      },
      btnAddStyle: {
        position: 'fixed',
        bottom: '40px',
        right: '55px'
      }
    },
    dialogProcess: {
      confirmation: false,
      confirmationMessage: '',
      isBtnDisabled: false,
      isLoading: false,
      isSuccess: false,
      isFailed: false,
      responseMessage: ''
    },
    headers: [
      { text: 'Invoice No', value: 'inv_seq' },
      { text: 'Kwitansi No', value: 'kwitansi_seq' },
      { text: 'Invoice Date', value: 'inv_date' },
      { text: 'Description', value: 'inv_deskripsi' },
      { text: 'Price', value: 'total_cost' },
      { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
    ],
    items: []
  }),
  created() {
    this.loading = true
    axios
      .get(`${process.env.VUE_APP_BASE_API_URL}api/invoice/show?token=${token}`)
      .then(resp => {
        const { data } = resp.data
        const editedData = data.map(val => {
          val.total_cost = `Rp. ${parseInt(val.total_cost).toLocaleString(
            'id'
          )}`
          return val
        })
        this.items = editedData
        this.loading = false
      })
      .catch(() => (this.loading = false))
  },
  methods: {
    btnSureHandler() {
      this.dialogProcess.isLoading = true
      this.dialogProcess.isBtnDisabled = true

      axios
        .post(`${process.env.VUE_APP_BASE_API_URL}api/invoice/insert`, {
          inv_seq: this.selectedDo,
          token: token
        })
        .then(resp => {
          this.dialogProcess.isLoading = false
          this.dialogProcess.isSuccess = true
          this.dialogProcess.responseMessage = `Invoice has been successfully created with no ${resp.data.data_mst.inv_seq} !`
        })
        .catch(() => {
          this.dialogProcess.isLoading = false
          alert('Oops! Something wrong, try again later!')
        })
    },
    btnInvoiceHandler(doNo) {
      this.selectedDo = doNo
      this.dialogProcess.confirmation = true
      this.dialogProcess.confirmationMessage = `Are you sure want to process ${doNo} to Invoice ?`
    }
  },
  computed: {
    getStatusResponse() {
      return this.dialogProcess.isFailed ? 'error' : 'success'
    }
  }
}
</script>
<style>
.fixed-btn {
  position: fixed;
  bottom: 40px;
  right: 55px;
}
</style>