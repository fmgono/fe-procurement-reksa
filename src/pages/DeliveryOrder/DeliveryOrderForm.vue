<template>
  <v-row>
    <v-col cols="8">
      <v-card>
        <v-container>
          <v-form v-model="isFormWrapperValid">
            <v-autocomplete
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

            <v-data-table
              disable-sortisFormItemsValid
              disable-filtering
              :headers="formData.table.headers"
              :items="formData.table.items"
              class="elevation-1"
              :hide-default-footer="true"
            >
              <template v-slot:top>
                <v-form ref="formItem" v-model="isFormItemsValid">
                  <v-row>
                    <v-col>
                      <p class="title">Add Item</p>
                    </v-col>
                  </v-row>
                  <!-- <v-spacer></v-spacer> -->
                  <v-row>
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
                      ></v-text-field>
                    </v-col>
                    <v-col align-self="center">
                      <v-btn
                        color="secondary"
                        :disabled="!isFormItemsValid"
                        @click.prevent="addItemHandler"
                      >Add Item</v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
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
              <div class="body-1" style="display: inline">Send To</div>
            </v-col>
            <v-col cols="8" class="text-right">
              <div class="body-1" style="display: inline">{{ formData.customerData.name }}</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" class="pb-0">
              <div class="body-1" style="display: inline">PO No</div>
            </v-col>
            <v-col cols="8" class="text-right">
              <div class="body-1" style="display: inline">{{ `#${formData.poNumber}` }}</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" class="pb-0">
              <div class="body-1" style="display: inline">DO Date</div>
            </v-col>
            <v-col cols="8" class="text-right">
              <div class="body-1" style="display: inline">{{ formData.deliveryDate }}</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" class="pb-0">
              <div class="body-1" style="display: inline">Total Qty</div>
            </v-col>
            <v-col cols="8" class="text-right">
              <div class="body-1" style="display: inline">{{ formData.summary.totalQty }}</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="4" class="pb-0">
              <div class="body-1" style="display: inline">Total Price</div>
            </v-col>
            <v-col cols="8" class="text-right">
              <div class="body-1" style="display: inline">{{ formData.summary.totalPriceCurrency }}</div>
            </v-col>
          </v-row>
          <v-row align-content="stretch">
            <v-col>
              <v-btn
                color="primary"
                :disabled="!isFormWrapperValid"
                @click.prevent="btnSubmitHandler"
              >Create Delivery Order</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import axios from 'axios'

const { token } = JSON.parse(localStorage.getItem('userAuth'))

export default {
  data: () => ({
    isFormWrapperValid: true,
    isFormItemsValid: true,
    formData: {
      items: [],
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
        editedIndex: -1,
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
        itemID: '',
        itemName: '',
        quantity: 0,
        price: 0
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
      const inputedItem = {
        do_itemid: this.formData.formItem.itemID,
        do_deskripsi: this.formData.formItem.itemName,
        do_qty: parseInt(this.formData.formItem.quantity),
        do_cost:
          parseInt(this.formData.formItem.quantity) *
          parseInt(this.formData.formItem.price)
      }
      this.formData.items.push(inputedItem)

      const displayToTable = {
        name: `${this.formData.formItem.itemID} - ${this.formData.formItem.itemName}`,
        itemQty: parseInt(this.formData.formItem.quantity),
        pricePerItem: `Rp. ${parseInt(
          this.formData.formItem.price
        ).toLocaleString('id')}`,
        total: `Rp. ${(
          parseInt(this.formData.formItem.quantity) *
          parseInt(this.formData.formItem.price)
        ).toLocaleString('id')}`
      }

      this.sumQtyAndPriceOfItems(this.formData.items)

      this.formData.table.items.push(displayToTable)

      this.formData.formItem.itemID = undefined
      this.formData.formItem.itemName = undefined
      this.$refs.formItem.reset()
    },
    inputItemChange(value) {
      this.formData.formItem.itemID = value.kode
      this.formData.formItem.itemName = value.deskripsi_barang
      this.formData.formItem.price = value.harga
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
      this.formData.formItem.quantity = this.formData.formItem.quantity.replace(
        /[^0-9]/g,
        ''
      )

      this.formData.formItem.price = this.formData.formItem.price.replace(
        /[^0-9]/g,
        ''
      )
    },
    sumQtyAndPriceOfItems(items) {
      const totalQty = items.reduce((prev, cur) => prev + cur.do_qty, 0)
      const totalPrice = items.reduce((prev, cur) => prev + cur.do_cost, 0)

      this.formData.summary.totalQty = totalQty
      this.formData.summary.totalPrice = totalPrice
      this.formData.summary.totalPriceCurrency = `Rp. ${this.formData.summary.totalPrice.toLocaleString(
        'id'
      )}`
    },
    btnSubmitHandler() {
      axios
        .post(`${process.env.VUE_APP_BASE_API_URL}api/do/insert`, {
          do_custid: this.formData.customerData.id,
          do_deskripsi: 'Test Deskripsi',
          do_date: this.formData.deliveryDate,
          token: token,
          do_detail: this.formData.items
        })
        .then(resp => console.log(resp))
        .catch(e => console.error(e))
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
      this.isFormWrapperValid =
        newValue.length > 0 &&
        !this.isFormWrapperValid &&
        !this.isFormWrapperValid
    }
  }
}
</script>
