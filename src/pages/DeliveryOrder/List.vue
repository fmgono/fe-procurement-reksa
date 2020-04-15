<template>
  <div>
    <v-dialog max-width="600" v-model="dialogProcess.confirmation" persistent>
      <v-card>
        <v-card-title :style="style.titleCard" class="headline">{{
          dialogProcess.confirmationMessage
        }}</v-card-title>
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
            >{{ dialogProcess.responseMessage }}</v-alert
          >
        </v-card-text>
        <!-- <v-card-text :class="[!dialogProcess.isSuccess ? 'd-none' : '']"></v-card-text> -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <router-link to="/invoice" v-slot="{ href, navigate }">
            <v-btn
              color="red darken-1"
              text
              :class="[!dialogProcess.isSuccess && 'd-none']"
              :href="href"
              @click="navigate"
              >go to invoice</v-btn
            >
          </router-link>
          <router-link
            :to="`/invoice/print/${invoiceNo}`"
            v-slot="{ href, navigate }"
          >
            <v-btn
              color="primary"
              text
              :class="[!dialogProcess.isSuccess && 'd-none']"
              :href="href"
              @click="navigate"
              target="_blank"
              >Print Invoice</v-btn
            >
          </router-link>
          <v-btn
            color="red darken-1"
            text
            :class="[dialogProcess.isSuccess && 'd-none']"
            @click="dialogProcess.confirmation = false"
            >No</v-btn
          >
          <v-btn
            color="primary"
            text
            :class="[dialogProcess.isSuccess && 'd-none']"
            @click="btnSureHandler"
            >Yes</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card>
      <v-card-title>
        Deliver Order Transaction
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
        <template v-slot:item.status="{ item }">
          <v-chip small :color="getColorBg(item.flag_invoice)" dark>{{
            checkStatus(item.flag_invoice)
          }}</v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <router-link
            :to="`/delivery_order/print/${item.do_seq}`"
            v-slot="{ href, navigate }"
          >
            <v-btn
              small
              text
              color="primary"
              :href="href"
              @click="navigate"
              target="_blank"
            >
              <v-icon left>mdi-tray-full</v-icon>
              <span>Print</span>
            </v-btn>
          </router-link>
          <v-btn
            :disabled="item.flag_invoice == 1"
            small
            color="primary"
            @click="btnInvoiceHandler(item.do_seq)"
          >
            <v-icon left>mdi-tray-full</v-icon>
            <span>to invoice</span>
          </v-btn>
        </template>
      </v-data-table>

      <router-link v-slot="{ href, navigate }" to="/delivery_order/add">
        <v-btn
          fab
          color="primary"
          :style="style.btnAddStyle"
          :href="href"
          @click="navigate"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </router-link>
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
    invoiceNo: '',
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
      { text: 'DO No', value: 'do_seq' },
      { text: 'PO No', value: 'po_seq' },
      { text: 'DO Date', value: 'do_date' },
      { text: 'Description', value: 'do_deskripsi' },
      { text: 'Total Price', value: 'total_cost' },
      { text: 'Status', value: 'status', align: 'center' },
      { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
    ],
    items: []
  }),
  created() {
    this.loading = true
    axios
      .get(`${process.env.VUE_APP_BASE_API_URL}api/do/show?token=${token}`)
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
      .catch(e => console.log(e))
  },
  methods: {
    btnSureHandler() {
      this.dialogProcess.isLoading = true
      this.dialogProcess.isBtnDisabled = true

      axios
        .post(`${process.env.VUE_APP_BASE_API_URL}api/invoice/insert`, {
          do_seq: this.selectedDo,
          token: token
        })
        .then(resp => {
          const invoiceNo = resp.data.data_mst.inv_seq
          this.invoiceNo = invoiceNo
          this.dialogProcess.isLoading = false
          this.dialogProcess.isSuccess = true
          this.dialogProcess.responseMessage = `Invoice has been successfully created with no ${this.invoiceNo} !`
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
    },
    checkStatus(flag_invoice) {
      const status = flag_invoice ? 'INVOICED' : 'NOT INVOICED'
      return status
    },
    getColorBg(flag_invoice) {
      const color = flag_invoice ? 'green' : 'warning'
      return color
    }
  },
  computed: {
    getStatusResponse() {
      return this.dialogProcess.isFailed ? 'error' : 'success'
    }
  }
}
</script>
