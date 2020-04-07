<template>
  <v-container fluid>
    <v-row>
      <v-col cols="8">
        <v-card>
          <v-container>
            <v-form>
              <v-autocomplete
                outlined
                prepend-icon="domain"
                :items="formData.autoCompleteVendor"
                item-text="name"
                item-value="id"
                label="Vendor Name"
                placeholder="Select Vendor Name"
                @change="autoCompleteChange"
                return-object
              ></v-autocomplete>
              <v-textarea
                auto-grow
                disabled
                rows="1"
                prepend-icon="domain"
                outlined
                :value="formData.vendorData.information"
                label="Vendor Information"
                placeholder="Automatic filled when vendor has been selected"
                filled
              ></v-textarea>
              <v-text-field
                prepend-icon="domain"
                outlined
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
                :headers="formData.table.headers"
                class="elevation-1"
                :hide-default-header="true"
                :hide-default-footer="true"
              >
                <template v-slot:top>
                  <v-toolbar flat color="white">
                    <p class="title">Add Item</p>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="formData.table.dialog" max-width="500px">
                      <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model="formData.table.editedItem.name"
                                  label="Item Name"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model="formData.table.editedItem.itemQty"
                                  label="Item Qty"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model="formData.table.editedItem.pricePerItem"
                                  label="Price Per Item"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                  v-model="formData.table.editedItem.total"
                                  label="Total Price"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text>Cancel</v-btn>
                          <v-btn color="blue darken-1" text>Save</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
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
                <div class="body-1" style="display: inline">{{ formData.vendorData.name }}</div>
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
                <div class="body-1" style="display: inline">12 Units</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4" class="pb-0">
                <div class="body-1" style="display: inline">Total Price</div>
              </v-col>
              <v-col cols="8" class="text-right">
                <div class="body-1" style="display: inline">Rp. 3.900.000,-</div>
              </v-col>
            </v-row>
            <v-row align-content="stretch">
              <v-col>
                <v-btn>Create Delivery Order</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    drawer: null,
    formData: {
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
      vendorData: {
        id: '',
        name: '',
        information: ''
      },
      vendorInfo: '',
      poNumber: '',
      deliveryDate: '',
      autoCompleteVendor: [
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
      ]
    },
    menuDatePicker: false,
    date: new Date().toISOString().substr(0, 10),
    menus: [
      { title: 'Delivery Order', icon: 'receipt' },
      { title: 'Invoice', icon: 'receipt' }
    ]
  }),
  methods: {
    datePickerChange(date) {
      this.formData.deliveryDate = this.formatDate(date)
    },
    autoCompleteChange(value) {
      // console.log(value)
      this.formData.vendorData.id = value.id
      this.formData.vendorData.name = value.name
      this.formData.vendorData.information = value.information
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    fromDateDisp() {
      return this.formatDate(this.date)
      // format date, apply validations, etc. Example below.
      // return this.deliveryDate ? this.formatDate(this.deliveryDate) : "";
    }
  }
}
</script>