<template>
  <div>
    <v-dialog max-width="500" v-model="dialogProcess.confirmation" persistent>
      <v-card>
        <v-card-title class="headline"
          >Are you sure the data filled in is correct ?</v-card-title
        >
        <v-card-text
          >The data that is filled in will be stored in the database and can't
          be changed again</v-card-text
        >
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
            type="success"
            >{{ dialogProcess.successMessage }}</v-alert
          >
        </v-card-text>
        <!-- <v-card-text :class="[!dialogProcess.isSuccess ? 'd-none' : '']"></v-card-text> -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <router-link to="/delivery_order" v-slot="{ href, navigate }">
            <v-btn
              color="red darken-1"
              text
              :class="[!dialogProcess.isSuccess && 'd-none']"
              :href="href"
              @click="navigate"
              >go to list</v-btn
            >
          </router-link>
          <router-link
            :to="`/delivery_order/print/${doNo}`"
            v-slot="{ href, navigate }"
          >
            <v-btn
              color="primary"
              text
              :href="href"
              :class="[!dialogProcess.isSuccess && 'd-none']"
              @click="navigate"
              target="_blank"
              >Print</v-btn
            >
          </router-link>
          <v-btn
            color="red darken-1"
            text
            :class="[dialogProcess.isSuccess && 'd-none']"
            @click="dialogProcess.confirmation = false"
            >No, will check again</v-btn
          >
          <v-btn
            color="primary"
            text
            :class="[dialogProcess.isSuccess && 'd-none']"
            @click="btnSureHandler"
            >Yes, I'm Sure</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col cols="8">
        <v-card>
          <v-container>
            <v-form v-model="isFormWrapperValid">
              <v-autocomplete
                autofocus
                outlined
                :rules="[v => !!v || 'Customer field is required']"
                prepend-icon="domain"
                :items="formData.autoCompleteCust"
                item-text="name"
                item-value="id"
                label="Customer Name"
                placeholder="Select Customer Name"
                @change="customerChange"
                return-object
              ></v-autocomplete>
              <v-textarea
                auto-grow
                disabled
                rows="1"
                prepend-icon="domain"
                outlined
                :value="formData.customerData.information"
                label="Customer Information"
                placeholder="Automatic filled when customer has been selected"
                filled
              ></v-textarea>
              <v-text-field
                outlined
                :rules="[v => !!v || 'PO Number is required']"
                prepend-icon="domain"
                label="PO No"
                placeholder="32304010"
                v-model="formData.poNumber"
              ></v-text-field>

              <v-menu
                v-model="menuDatePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :rules="[v => !!v || 'Delivery Date is required']"
                    label="Delivery Date"
                    outlined
                    prepend-icon="event"
                    readonly
                    :value="fromDateDisp"
                    v-on="on"
                    placeholder="Ex: 30-03-2020"
                  ></v-text-field>
                </template>
                <v-date-picker
                  title="Delivery Date"
                  locale="en-in"
                  v-model="date"
                  no-title
                  @input="menuDatePicker = false"
                  @change="datePickerChange"
                ></v-date-picker>
              </v-menu>

              <v-form ref="formItem" v-model="isFormItemsValid">
                <v-row>
                  <v-col>
                    <p class="title">Add Item</p>
                  </v-col>
                </v-row>
                <v-row justify="space-between">
                  <v-col>
                    <v-autocomplete
                      :items="formData.autoCompleteItems"
                      :rules="[v => !!v || 'Items field is required']"
                      v-model="formData.formItem.itemID"
                      :key="formData.formItem.itemID"
                      item-text="deskripsi_barang"
                      item-value="kode"
                      label="Items"
                      placeholder="Select Items"
                      return-object
                      @change="inputItemChange"
                    ></v-autocomplete>
                  </v-col>
                  <v-col>
                    <v-text-field
                      :rules="[v => !!v || 'Quantity is required']"
                      label="Quantity"
                      placeholder="2"
                      @keyup="onlyAllowNumeric"
                      v-model="formData.formItem.quantity"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      :rules="[v => !!v || 'Price is required']"
                      label="Price Per Item"
                      prefix="Rp."
                      @keyup="onlyAllowNumeric"
                      v-model="formData.formItem.price"
                      :disabled="!formData.formItem.isEdited"
                    ></v-text-field>
                  </v-col>
                  <v-col align-self="center" :style="style.btnAddItemStyle">
                    <v-btn
                      color="secondary"
                      :class="[!formData.isItemEdited && 'd-none']"
                      :disabled="!isFormItemsValid"
                      @click.prevent="editItemHandler"
                      >Edit Item</v-btn
                    >
                    <v-btn
                      color="secondary"
                      :class="[formData.isItemEdited && 'd-none']"
                      :disabled="!isFormItemsValid"
                      @click.prevent="addItemHandler"
                      >Add Item</v-btn
                    >
                  </v-col>
                </v-row>
              </v-form>

              <v-data-table
                disable-sortisFormItemsValid
                disable-filtering
                :headers="formData.table.headers"
                :items="formData.table.items"
                class="elevation-1"
                :hide-default-footer="true"
              >
                <template v-slot:item.actions="{ item }">
                  <v-icon small class="mr-2" @click="selectItemToEdit(item.id)"
                    >mdi-pencil</v-icon
                  >
                  <v-icon small @click="deleteitemHandler(item.id)"
                    >mdi-delete</v-icon
                  >
                </template>
              </v-data-table>
            </v-form>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-container>
            <div class="title">Summary</div>
            <v-divider></v-divider>
            <v-row>
              <v-col cols="4" class="pb-0">
                <div class="body-1" :style="style.summaryStyle">Send To</div>
              </v-col>
              <v-col cols="8" class="text-right">
                <div class="body-1" :style="style.summaryStyle">
                  {{ formData.customerData.name }}
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4" class="pb-0">
                <div class="body-1" :style="style.summaryStyle">PO No</div>
              </v-col>
              <v-col cols="8" class="text-right">
                <div class="body-1" :style="style.summaryStyle">
                  {{ `#${formData.poNumber}` }}
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4" class="pb-0">
                <div class="body-1" :style="style.summaryStyle">DO Date</div>
              </v-col>
              <v-col cols="8" class="text-right">
                <div class="body-1" :style="style.summaryStyle">
                  {{ formData.deliveryDate }}
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4" class="pb-0">
                <div class="body-1" :style="style.summaryStyle">Total Qty</div>
              </v-col>
              <v-col cols="8" class="text-right">
                <div class="body-1" :style="style.summaryStyle">
                  {{ formData.summary.totalQty }}
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4" class="pb-0">
                <div class="body-1" :style="style.summaryStyle">
                  Total Price
                </div>
              </v-col>
              <v-col cols="8" class="text-right">
                <div class="body-1" :style="style.summaryStyle">
                  {{ formData.summary.totalPriceCurrency }}
                </div>
              </v-col>
            </v-row>
            <v-row align-content="stretch">
              <v-col :style="style.btnCreateDOStyle">
                <v-btn
                  color="primary"
                  :disabled="!isFormWrapperValid"
                  @click.prevent="dialogProcess.confirmation = true"
                  >Create Delivery Order</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import axios from 'axios'

const { token } = JSON.parse(localStorage.getItem('userAuth'))

export default {
  data: () => ({
    style: {
      summaryStyle: {
        display: 'inline'
      },
      btnAddItemStyle: {
        display: 'flex',
        justifyContent: 'flex-end'
      },
      btnCreateDOStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch'
      }
    },
    dialogProcess: {
      confirmation: false,
      isBtnDisabled: false,
      isLoading: false,
      isSuccess: false,
      successMessage: ''
    },
    doNo: '',
    isFormWrapperValid: true,
    isFormItemsValid: true,
    formData: {
      items: [],
      isItemEdited: false,
      summary: {
        totalQty: 0,
        totalPrice: 0,
        totalPriceCurrency: ''
      },
      table: {
        dialog: false,
        headers: [
          { text: 'Name Of Goods', value: 'name' },
          { text: 'Qty', value: 'itemQty' },
          { text: 'Price', value: 'pricePerItem' },
          { text: 'Total', value: 'total' },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        items: [],
        editedItem: {
          name: '',
          itemQty: 0,
          pricePerItem: 0,
          total: 0
        },
        defaultItem: {
          name: '',
          itemQty: 0,
          pricePerItem: 0,
          total: 0
        }
      },
      customerData: {
        id: '',
        name: '',
        information: ''
      },
      poNumber: '',
      deliveryDate: '',
      formItem: {
        id: '',
        itemID: '',
        itemName: '',
        quantity: 0,
        price: 0,
        isEdited: true
      },
      autoCompleteCust: [
        {
          name: 'PT Rekso Nasional',
          id: 1,
          information:
            'Jl. AMD X No 10 \n Jakarta Timur, Indonesia.\n 082112345678'
        },
        {
          name: 'PT Mc. Donald',
          id: 2,
          information:
            'Jl. AMD X No 10 \n Jakarta Timur, Indonesia.\n 082112345678'
        },
        {
          name: 'PT KFC',
          id: 3,
          information:
            'Jl. AMD X No 10 \n Jakarta Timur, Indonesia.\n 082112345678'
        }
      ],
      autoCompleteItems: []
    },
    menuDatePicker: false,
    date: null
  }),
  created() {
    axios
      .get(`${process.env.VUE_APP_BASE_API_URL}api/item/show?token=${token}`)
      .then(resp => {
        this.formData.autoCompleteItems = resp.data
      })
      .catch(e => console.error(e))
  },
  methods: {
    datePickerChange(date) {
      this.formData.deliveryDate = this.formatDate(date)
    },
    addItemHandler() {
      const unique_id = Date.now()
      let { itemID, itemName, quantity, price } = this.formData.formItem
      quantity = parseInt(quantity)
      price = parseInt(price)
      const totalPrice = quantity * price
      const inputedItem = this.createItemObj(unique_id, itemID, quantity, price)
      const displayToTable = this.createItemTable(
        unique_id,
        itemID,
        itemName,
        quantity,
        price,
        totalPrice
      )

      this.formData.items.push(inputedItem)
      this.formData.table.items.push(displayToTable)
      this.resetFormItem()
    },
    editItemHandler() {
      let { id, itemID, itemName, quantity, price } = this.formData.formItem
      quantity = parseInt(quantity)
      price = parseInt(price)
      const totalPrice = quantity * price
      const indexOfSelectedItem = this.formData.items.findIndex(
        item => item.id == this.formData.formItem.id
      )
      const indexOfSelectedItemTable = this.formData.table.items.findIndex(
        item => item.id == this.formData.formItem.id
      )

      const editedItem = this.createItemObj(id, itemID, quantity, price)
      const displayToTable = this.createItemTable(
        id,
        itemID,
        itemName,
        quantity,
        price,
        totalPrice
      )

      this.formData.items.splice(indexOfSelectedItem, 1, editedItem)
      this.formData.table.items.splice(
        indexOfSelectedItemTable,
        1,
        displayToTable
      )

      this.formData.isItemEdited = false
      this.resetFormItem()
    },
    deleteitemHandler(id) {
      const indexOfSelectedItem = this.formData.items.findIndex(
        item => item.id == id
      )
      this.formData.items.splice(indexOfSelectedItem, 1)
      this.formData.table.items.splice(indexOfSelectedItem, 1)
    },
    selectItemToEdit(id) {
      const filteredItem = this.formData.items.find(item => item.id == id)
      this.formData.formItem.itemID = filteredItem.do_itemid
      this.formData.formItem.quantity = filteredItem.do_qty
      this.formData.formItem.price = filteredItem.do_cost
      this.formData.formItem.id = filteredItem.id
      this.formData.isItemEdited = true
    },
    inputItemChange(value) {
      this.formData.formItem.itemID = value.kode
      this.formData.formItem.itemName = value.deskripsi_barang
      this.formData.formItem.price = value.harga
      this.formData.formItem.isEdited = value.is_edit ? true : false
    },
    customerChange(value) {
      this.formData.customerData.id = value.id
      this.formData.customerData.name = value.name
      this.formData.customerData.information = value.information
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
    },
    onlyAllowNumeric() {
      try {
        this.formData.formItem.quantity = this.formData.formItem.quantity.replace(
          /[^0-9]/g,
          ''
        )

        this.formData.formItem.price = this.formData.formItem.price.replace(
          /[^0-9]/g,
          ''
        )
      } catch (error) {
        return true // to skip showing error in console
      }
    },
    sumQtyAndPriceOfItems(items) {
      const totalQty = items.reduce((prev, cur) => prev + cur.do_qty, 0)
      const totalPrice = items.reduce(
        (prev, cur) => prev + cur.do_cost * cur.do_qty,
        0
      )

      this.formData.summary.totalQty = totalQty
      this.formData.summary.totalPrice = totalPrice
      this.formData.summary.totalPriceCurrency = `Rp. ${this.formData.summary.totalPrice.toLocaleString(
        'id'
      )}`
    },
    btnSureHandler() {
      this.dialogProcess.isLoading = true
      this.dialogProcess.isBtnDisabled = true
      axios
        .post(`${process.env.VUE_APP_BASE_API_URL}api/do/insert`, {
          do_custid: this.formData.customerData.id,
          do_deskripsi: '',
          po_seq: this.formData.poNumber,
          do_date: this.formData.deliveryDate,
          token: token,
          do_detail: this.formData.items
        })
        .then(resp => {
          const doNo = resp.data.data_mst.do_seq
          this.doNo = doNo
          this.dialogProcess.isLoading = false
          this.dialogProcess.isSuccess = true
          this.dialogProcess.successMessage = `Delivery Order has been successfully created with no ${this.doNo} !`
        })
        .catch(e => console.error(e))
    },
    createItemObj(id, itemID, qty, cost) {
      return {
        id: id,
        do_itemid: itemID,
        do_deskripsi: '',
        do_qty: qty,
        do_cost: cost
      }
    },
    createItemTable(id, itemID, itemName, qty, pricePerItem, totalPrice) {
      return {
        id: id,
        name: `${itemID} - ${itemName}`,
        itemQty: qty,
        pricePerItem: `Rp. ${pricePerItem.toLocaleString('id')}`,
        total: `Rp. ${totalPrice.toLocaleString('id')}`
      }
    },
    resetFormItem() {
      this.formData.formItem.itemID = undefined
      this.formData.formItem.itemName = undefined
      this.$refs.formItem.reset()
    }
  },
  computed: {
    fromDateDisp() {
      return this.formatDate(this.date)
    }
  },
  watch: {
    isFormWrapperValid: function(newValue) {
      this.isFormWrapperValid =
        this.formData.items.length > 0 ? newValue : false
    },
    'formData.items': function(newValue) {
      this.sumQtyAndPriceOfItems(this.formData.items)
      if (newValue.length > 0) {
        this.isFormWrapperValid = !this.isFormWrapperValid
          ? !this.isFormWrapperValid
          : true
      } else {
        this.isFormWrapperValid = false
      }
    }
  }
}
</script>
