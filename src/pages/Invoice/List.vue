<template>
  <div>
    <v-dialog max-width="600" v-model="dialogProcess.confirmation" persistent>
      <v-card>
        <v-card-title :style="style.titleCard" class="headline">Print Receipt Note</v-card-title>
        <v-card-text>
          <v-menu
            v-model="formReceiptNote.menuDatePickerFrom"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :rules="[v => !!v || 'Date From is required']"
                label="Date From"
                prepend-icon="event"
                readonly
                :value="formatDateFrom"
                v-on="on"
                placeholder="Ex: 30-03-2020"
              ></v-text-field>
            </template>
            <v-date-picker
              title="Date From"
              locale="en-in"
              v-model="formReceiptNote.dateFrom"
              no-title
              @input="formReceiptNote.menuDatePickerFrom = false"
              @change="datePickerFromChange"
            ></v-date-picker>
          </v-menu>
          <v-menu
            v-model="formReceiptNote.menuDatePickerto"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :rules="[v => !!v || 'Date to is required']"
                label="Date to"
                prepend-icon="event"
                readonly
                :value="formatDateTo"
                v-on="on"
                placeholder="Ex: 30-03-2020"
              ></v-text-field>
            </template>
            <v-date-picker
              title="Date To"
              locale="en-in"
              v-model="formReceiptNote.dateTo"
              no-title
              @input="formReceiptNote.menuDatePickerTo = false"
              @change="datePickerToChange"
            ></v-date-picker>
          </v-menu>
        </v-card-text>
        <!-- <v-card-text :class="[!dialogProcess.isSuccess ? 'd-none' : '']"></v-card-text> -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialogProcess.confirmation = false">Cancel</v-btn>
          <router-link :to="navigateLink" v-slot="{ href, navigate }">
            <v-btn color="primary" text :href="href" @click="navigate" target="_blank">Print</v-btn>
          </router-link>
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
      <v-btn rounded color="primary" class="fixed-btn" @click="dialogProcess.confirmation = true">
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
    formReceiptNote: {
      dateFrom: null,
      dateTo: null,
      invoiceDateFrom: '',
      invoiceDateTo: '',
      menuDatePickerFrom: false,
      menuDatePickerTo: false
    },
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
      confirmation: true,
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
    },
    datePickerFromChange(date) {
      this.formReceiptNote.invoiceDateFrom = this.formatDate(date)
    },
    datePickerToChange(date) {
      this.formReceiptNote.invoiceDateTo = this.formatDate(date)
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${year}-${month}-${day}`
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('-')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  },
  computed: {
    getStatusResponse() {
      return this.dialogProcess.isFailed ? 'error' : 'success'
    },
    formatDateFrom() {
      return this.formatDate(this.formReceiptNote.dateFrom)
    },
    formatDateTo() {
      return this.formatDate(this.formReceiptNote.dateTo)
    },
    navigateLink() {
      return {
        path: 'invoice/receipt/print',
        query: {
          dateFrom: this.formReceiptNote.invoiceDateFrom,
          dateTo: this.formReceiptNote.invoiceDateTo
        }
      }
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