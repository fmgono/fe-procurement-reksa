<template>
  <div>
    <v-dialog max-width="600" v-model="dialogProcess.confirmation" persistent>
      <v-card>
        <v-card-title class="headline">{{dialogProcess.isUpdate ? 'Update' : 'Create'}} Item</v-card-title>
        <v-card-text>
          <v-text-field
            :rules="[v => !!v || 'Item Description is required']"
            label="Item Description"
            placeholder="K-253 - KULKAS 2 PINTU SANYO"
            v-model="formItem.description"
          ></v-text-field>
          <v-text-field
            :rules="[v => !!v || 'Item Measurement is required']"
            label="Item Measurement"
            placeholder="UNIT"
            v-model="formItem.measurement"
          ></v-text-field>
          <v-text-field
            :rules="[v => !!v || 'Item Price is required']"
            label="Item Price"
            placeholder="20000"
            v-model="formItem.price"
            @keyup="onlyAllowNumeric"
          ></v-text-field>
          <v-row align-content="center" justify="center">
            <v-col align-self="center" cols="4">
              <div class="body-1">Is Edited</div>
            </v-col>
            <v-col>
              <v-switch v-model="formItem.isEdited"></v-switch>
            </v-col>
          </v-row>
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
            @click.once="createItemHandler"
          >{{dialogProcess.isUpdate ? 'Update' : 'Create'}} Item</v-btn>
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
        Master Data Items
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
            <v-icon left>mdi-pencil-outline</v-icon>
            <span>Edit</span>
          </v-btn>
          <v-btn small text color="red" @click="selectItemToDelete(item.kode)">
            <v-icon left>mdi-delete</v-icon>
            <span>delete</span>
          </v-btn>
        </template>
      </v-data-table>
      <v-btn fab color="primary" class="fixed-btn" @click="dialogProcess.confirmation = true">
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
    formItem: {
      code: '',
      description: '',
      measurement: 'Unit',
      price: 0,
      isEdited: false
    },
    dialogProcess: {
      confirmation: false,
      deleteConfirmation: false,
      confirmationMessage: '',
      isBtnDisabled: false,
      isUpdate: false,
      isLoading: false,
      isSuccess: false,
      isFailed: false,
      responseMessage: ''
    },
    headers: [
      { text: 'Code - Name Item', value: 'codename_item' },
      { text: 'Measurement', value: 'satuan' },
      { text: 'Price', value: 'formattedHarga' },
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
        ? 'api/item/update'
        : 'api/item/insert'

      const isEdited = this.formItem.isEdited ? 1 : 0

      axios
        .post(`${process.env.VUE_APP_BASE_API_URL}${url}`, {
          kode: this.formItem.code,
          deskripsi_barang: this.formItem.description,
          satuan: this.formItem.measurement,
          is_edit: isEdited,
          harga: this.formItem.price,
          token: token
        })
        .then(resp => {
          this.dialogProcess.isLoading = false
          this.dialogProcess.isBtnDisabled = false
          this.dialogProcess.isSuccess = true
          this.dialogProcess.responseMessage = this.dialogProcess.isUpdate
            ? 'Item has been successfully changed!'
            : `Item has been successfully created with no ${resp.data.data.kode} - ${resp.data.data.deskripsi_barang} !`
        })
        .catch(() => {
          this.dialogProcess.isLoading = false
          this.dialogProcess.isLoading = false
          this.dialogProcess.isUpdate = false
          this.dialogProcess.isFailed = true
          this.dialogProcess.responseMessage = `Oops! Something error`
        })
    },
    deleteItemHandler() {
      this.dialogProcess.deleteConfirmation = true
      this.dialogProcess.isLoading = true
      this.dialogProcess.isBtnDisabled = true

      axios
        .post(`${process.env.VUE_APP_BASE_API_URL}api/item/delete`, {
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
      this.dialogProcess.confirmation = false
      this.dialogProcess.deleteConfirmation = false
      this.dialogProcess.isSuccess = false
      this.dialogProcess.isFailed = false
      this.dialogProcess.isUpdate = false
      this.dialogProcess.responseMessage = ''
      this.fetchList()
    },
    selectItemToEdit(selectedItem) {
      this.dialogProcess.isUpdate = true

      const filteredItem = this.items.find(item => item.kode == selectedItem)
      this.formItem.code = filteredItem.kode
      this.formItem.description = filteredItem.deskripsi_barang
      this.formItem.measurement = filteredItem.satuan
      this.formItem.price = filteredItem.harga
      this.formItem.isEdited = filteredItem.is_edit
      this.dialogProcess.confirmation = true
    },
    selectItemToDelete(selectedItem) {
      this.selectedItem = selectedItem
      this.dialogProcess.deleteConfirmation = true
    },
    fetchList() {
      this.loading = true
      axios
        .get(`${process.env.VUE_APP_BASE_API_URL}api/item/show?token=${token}`)
        .then(resp => {
          const editedData = resp.data.map(item => {
            item.codename_item = `${item.kode} - ${item.deskripsi_barang}`
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
      this.formItem.price =
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