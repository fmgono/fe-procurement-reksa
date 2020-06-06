<template>
  <div>
    <v-dialog max-width="600" v-model="dialogProcess.modalDetails" persistent>
      <v-card>
        <v-card-title class="headline">
          {{
          dialogProcess.isReadOnly
          ? 'Detail'
          : dialogProcess.isUpdate
          ? 'Update'
          : 'Create'
          }}
          Customer
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Customer Code"
            placeholder="001"
            :filled="dialogProcess.isReadOnly || !dialogProcess.isAddCust"
            :readonly="dialogProcess.isReadOnly || !dialogProcess.isAddCust"
            v-model="formCustomer.code"
          ></v-text-field>
          <v-text-field
            :rules="[v => !!v || 'Customer name is required']"
            label="Customer Name"
            placeholder="Kota Bintang"
            :filled="!dialogProcess.isUpdate && !dialogProcess.isAddCust"
            :readonly="!dialogProcess.isUpdate && !dialogProcess.isAddCust"
            v-model="formCustomer.name"
          ></v-text-field>
          <v-text-field
            :rules="[v => !!v || 'Customer RGM is required']"
            label="Customer RGM"
            placeholder="20000"
            :filled="!dialogProcess.isUpdate && !dialogProcess.isAddCust"
            :readonly="!dialogProcess.isUpdate && !dialogProcess.isAddCust"
            v-model="formCustomer.RGM"
          ></v-text-field>
          <v-textarea
            :rules="[v => !!v || 'Customer Address is required']"
            rows="1"
            label="Customer Address"
            placeholder="Jl. KH. Noer Ali"
            :filled="!dialogProcess.isUpdate && !dialogProcess.isAddCust"
            :readonly="!dialogProcess.isUpdate && !dialogProcess.isAddCust"
            v-model="formCustomer.address"
          ></v-textarea>
          <v-text-field
            :rules="[v => !!v || 'Customer City is required']"
            label="Customer City"
            placeholder="Bekasi"
            :filled="!dialogProcess.isUpdate && !dialogProcess.isAddCust"
            :readonly="!dialogProcess.isUpdate && !dialogProcess.isAddCust"
            v-model="formCustomer.city"
          ></v-text-field>
          <v-text-field
            :rules="[v => !!v || 'Customer Postal Code is required']"
            label="Customer Postal Code"
            placeholder="40173"
            :filled="!dialogProcess.isUpdate && !dialogProcess.isAddCust"
            :readonly="!dialogProcess.isUpdate && !dialogProcess.isAddCust"
            v-model="formCustomer.postalCode"
            @keyup="onlyAllowNumeric"
          ></v-text-field>
          <v-text-field
            :rules="[v => !!v || 'Customer Area is required']"
            label="Customer Area"
            placeholder="Jawa Barat"
            :filled="!dialogProcess.isUpdate && !dialogProcess.isAddCust"
            :readonly="!dialogProcess.isUpdate && !dialogProcess.isAddCust"
            v-model="formCustomer.area"
          ></v-text-field>
          <v-text-field
            :rules="[v => !!v || 'Customer RGM Cug is required']"
            label="Customer RGM Cug"
            placeholder="+628111927469"
            :filled="!dialogProcess.isUpdate && !dialogProcess.isAddCust"
            :readonly="!dialogProcess.isUpdate && !dialogProcess.isAddCust"
            v-model="formCustomer.RGMCug"
          ></v-text-field>
          <v-text-field
            :rules="[v => !!v || 'Customer Cug is required']"
            label="Customer Cug"
            placeholder="+628111927469"
            :filled="!dialogProcess.isUpdate && !dialogProcess.isAddCust"
            :readonly="!dialogProcess.isUpdate && !dialogProcess.isAddCust"
            v-model="formCustomer.cug"
          ></v-text-field>
          <v-text-field
            :rules="[v => !!v || 'Customer Email is required']"
            label="Customer Email"
            placeholder="mcds0125@id.mcd.com"
            :filled="!dialogProcess.isUpdate && !dialogProcess.isAddCust"
            :readonly="!dialogProcess.isUpdate && !dialogProcess.isAddCust"
            v-model="formCustomer.email"
          ></v-text-field>
          <v-text-field
            :rules="[v => !!v || 'Customer Business Hour is required']"
            label="Customer Business Hour"
            placeholder="24"
            :filled="!dialogProcess.isUpdate && !dialogProcess.isAddCust"
            :readonly="!dialogProcess.isUpdate && !dialogProcess.isAddCust"
            v-model="formCustomer.businessHour"
            @keyup="onlyAllowNumeric"
          ></v-text-field>
          <v-text-field
            :rules="[v => !!v || 'Customer Category is required']"
            label="Customer Category"
            placeholder="Drive-Thru / Free Stand"
            :filled="!dialogProcess.isUpdate && !dialogProcess.isAddCust"
            :readonly="!dialogProcess.isUpdate && !dialogProcess.isAddCust"
            v-model="formCustomer.category"
          ></v-text-field>
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
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :class="[dialogProcess.isSuccess ? 'd-none' : '']"
            :disabled="dialogProcess.isBtnDisabled"
            color="red darken-1"
            text
            @click="closeModal"
          >Back To List</v-btn>
          <v-btn
            :class="[dialogProcess.isAddCust || dialogProcess.isUpdate ? 'd-none' : '']"
            :disabled="dialogProcess.isSuccess"
            color="primary"
            text
            @click="triggerEdit"
          >Update Customer</v-btn>
          <v-btn
            :class="[!dialogProcess.isAddCust ? 'd-none' : '']"
            :disabled="dialogProcess.isSuccess"
            color="primary"
            text
            @click="createItemHandler"
          >Create Customer</v-btn>
          <v-btn
            :class="[!dialogProcess.isUpdate || dialogProcess.isSuccess ? 'd-none' : '']"
            :disabled="dialogProcess.isSuccess"
            color="primary"
            text
            @click="createItemHandler"
          >Update Now</v-btn>
          <v-btn
            :class="[!dialogProcess.isSuccess ? 'd-none' : '']"
            color="primary"
            text
            @click="closeModal"
          >Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog max-width="600" v-model="dialogProcess.deleteConfirmation" persistent>
      <v-card>
        <v-card-title class="headline">Are You Sure want to delete this Item ?</v-card-title>
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
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="dialogProcess.isBtnDisabled"
            color="red darken-1"
            text
            @click="closeModal"
          >Back To List</v-btn>
          <v-btn
            :disabled="dialogProcess.isSuccess"
            color="primary"
            text
            @click.once="deleteItemHandler"
          >Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card>
      <v-card-title>
        Master Data Customers
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
          <v-chip small :color="getColorBg(item.is_active)" dark>{{ checkStatus(item.is_active) }}</v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn small text color="primary" @click="selectItemToEdit(item.kode)">
            <v-icon left>mdi-card-account-details-outline</v-icon>
            <span>see more</span>
          </v-btn>
          <v-btn small text color="red" @click="selectItemToDelete(item.kode)">
            <v-icon left>mdi-delete</v-icon>
            <span>delete</span>
          </v-btn>
        </template>
      </v-data-table>
      <v-btn fab color="primary" class="fixed-btn" @click="triggerAdd">
        <v-icon>mdi-plus</v-icon>
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
    selectedItem: '',
    formCustomer: {
      code: '',
      name: '',
      address: '',
      city: '',
      postalCode: '',
      area: '',
      email: '',
      cug: '',
      RGM: '',
      RGMCug: '',
      businessHour: 0,
      category: '',
      status: ''
    },
    dialogProcess: {
      modalDetails: false,
      deleteConfirmation: false,
      confirmationMessage: '',
      isBtnDisabled: false,
      isReadOnly: false,
      isAddCust: false,
      isUpdate: false,
      isLoading: false,
      isSuccess: false,
      isFailed: false,
      responseMessage: ''
    },
    headers: [
      { text: 'Code - Name Store', value: 'codename_cust' },
      { text: 'RGM', value: 'store_rgm' },
      { text: 'Address', value: 'store_address' },
      { text: 'Area', value: 'store_area' },
      { text: 'Status', value: 'status' },
      { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
    ],
    items: []
  }),
  created() {
    this.fetchList()
  },
  methods: {
    createItemHandler() {
      this.dialogProcess.isLoading = true
      this.dialogProcess.isBtnDisabled = true
      const url = this.dialogProcess.isUpdate
        ? 'api/cust/update'
        : 'api/cust/insert'

      const dataToPost = {
        kode: this.formCustomer.code,
        store_name: this.formCustomer.name,
        store_address: this.formCustomer.address,
        store_city: this.formCustomer.city,
        store_postal_code: this.formCustomer.postalCode,
        store_area: this.formCustomer.area,
        store_email: this.formCustomer.email,
        store_cug: this.formCustomer.cug,
        store_rgm: this.formCustomer.RGM,
        rgm_cug: this.formCustomer.RGMCug,
        business_hour: this.formCustomer.businessHour,
        store_category: this.formCustomer.category,
        store_status: this.formCustomer.status,
        token: token
      }

      if (!this.dialogProcess.isUpdate) {
        dataToPost.kode = this.formCustomer.code
      }

      axios
        .post(`${process.env.VUE_APP_BASE_API_URL}${url}`, dataToPost)
        .then(resp => {
          console.log(resp)
          this.dialogProcess.isLoading = false
          this.dialogProcess.isBtnDisabled = false
          this.dialogProcess.isSuccess = true
          this.dialogProcess.responseMessage = this.dialogProcess.isUpdate
            ? 'Customer has been successfully changed!'
            : `Customer has been successfully created with code ${resp.data.data.kode} - ${resp.data.data.store_name}!`
        })
        .catch(() => {
          this.dialogProcess.isLoading = false
          this.dialogProcess.isLoading = false
          this.dialogProcess.isUpdate = false
          this.dialogProcess.isFailed = true
          this.dialogProcess.isSuccess = true
          this.dialogProcess.responseMessage = `Oops! Something error`
        })
    },
    deleteItemHandler() {
      this.dialogProcess.deleteConfirmation = true
      this.dialogProcess.isLoading = true
      this.dialogProcess.isBtnDisabled = true

      axios
        .post(`${process.env.VUE_APP_BASE_API_URL}api/cust/delete`, {
          kode: this.selectedItem,
          token: token
        })
        .then(() => {
          this.dialogProcess.isLoading = false
          this.dialogProcess.isBtnDisabled = false
          this.dialogProcess.isSuccess = true
          this.dialogProcess.responseMessage =
            'Item has been successfully deleted!'
        })
        .catch(() => {
          this.dialogProcess.isLoading = false
          this.dialogProcess.isLoading = false
          this.dialogProcess.isUpdate = false
          this.dialogProcess.isFailed = true
          this.dialogProcess.responseMessage = `Oops! Something error`
        })
    },
    closeModal() {
      this.dialogProcess.modalDetails = false
      this.dialogProcess.deleteConfirmation = false
      this.dialogProcess.isAddCust = false
      this.dialogProcess.isSuccess = false
      this.dialogProcess.isFailed = false
      this.dialogProcess.isUpdate = false
      this.dialogProcess.isReadOnly = false
      this.dialogProcess.responseMessage = ''
      this.formCustomer.code = ''
      this.formCustomer.name = ''
      this.formCustomer.address = ''
      this.formCustomer.city = ''
      this.formCustomer.postalCode = ''
      this.formCustomer.area = ''
      this.formCustomer.email = ''
      this.formCustomer.cug = ''
      this.formCustomer.RGM = ''
      this.formCustomer.RGMCug = ''
      this.formCustomer.businessHour = ''
      this.formCustomer.category = ''
      this.formCustomer.status = ''
      this.fetchList()
    },
    selectItemToEdit(selectedItem) {
      this.dialogProcess.isReadOnly = true

      const filteredCust = this.items.find(item => item.kode == selectedItem)
      this.formCustomer.code = filteredCust.kode
      this.formCustomer.name = filteredCust.store_name
      this.formCustomer.address = filteredCust.store_address
      this.formCustomer.city = filteredCust.store_city
      this.formCustomer.postalCode = filteredCust.store_postal_code
      this.formCustomer.area = filteredCust.store_area
      this.formCustomer.email = filteredCust.store_email
      this.formCustomer.cug = filteredCust.store_cug
      this.formCustomer.RGM = filteredCust.store_rgm
      this.formCustomer.RGMCug = filteredCust.rgm_cug
      this.formCustomer.businessHour = filteredCust.business_hour
      this.formCustomer.category = filteredCust.store_category
      this.formCustomer.status = filteredCust.store_status
      this.dialogProcess.modalDetails = true
    },
    triggerAdd() {
      this.dialogProcess.modalDetails = true
      this.dialogProcess.isReadOnly = false
      this.dialogProcess.isAddCust = true
    },
    triggerEdit() {
      this.dialogProcess.isUpdate = true
      this.dialogProcess.isReadOnly = false
    },
    triggerCancelEdit() {
      this.dialogProcess.isUpdate = false
      this.dialogProcess.isReadOnly = true
    },
    selectItemToDelete(selectedItem) {
      this.selectedItem = selectedItem
      this.dialogProcess.deleteConfirmation = true
    },
    fetchList() {
      this.loading = true
      axios
        .get(`${process.env.VUE_APP_BASE_API_URL}api/cust/show?token=${token}`)
        .then(resp => {
          const editedData = resp.data.map(item => {
            item.codename_cust = `${item.kode} - ${item.store_name}`
            item.formattedHarga = `Rp. ${parseInt(item.harga).toLocaleString(
              'id'
            )}`
            return item
          })
          this.items = editedData
          this.loading = false
        })
        .catch(() => (this.loading = false))
    },
    onlyAllowNumeric() {
      this.formCustomer.postalCode =
        parseInt(this.formItem.price.replace(/[^0-9]/g, '')) || 0
      this.formCustomer.businessHour =
        parseInt(this.formItem.price.replace(/[^0-9]/g, '')) || 0
    },
    checkStatus(itemStatus) {
      const status = itemStatus ? 'ACTIVE' : 'NOT ACTIVE'
      return status
    },
    getColorBg(itemStatus) {
      const color = itemStatus ? 'green' : 'warning'
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
<style>
.fixed-btn {
  position: fixed;
  bottom: 40px;
  right: 55px;
}
</style>