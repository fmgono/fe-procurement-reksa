<template>
  <div class="print-invoice">
    <v-row>
      <v-col class="pb-0 center-element">
        <v-card-title>INVOICE</v-card-title>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <!-- <v-card outlined tile> -->
        <v-row>
          <v-col class="pb-0" cols="3">
            <div class="body-2">Date</div>
          </v-col>
          <v-col class="pb-0 text-right">
            <div class="body-2">{{ data.inv_date }} 121</div>
          </v-col>
          <v-spacer class="d-print-none"></v-spacer>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-0" cols="3">
            <div class="body-2">Company ID</div>
          </v-col>
          <v-col class="text-right pt-0 pb-0">
            <div class="body-2 font-weight-bold">CV Rekso Nasional Food</div>
          </v-col>
          <v-spacer class="d-print-none"></v-spacer>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-0" cols="3">
            <div class="body-2">Invoice</div>
          </v-col>
          <v-col class="text-right pt-0 pb-0">
            <div class="body-2">{{ $route.params.invNo }}</div>
          </v-col>
          <v-spacer class="d-print-none"></v-spacer>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-0" cols="3">
            <div class="body-2">PO No</div>
          </v-col>
          <v-col class="text-right pt-0 pb-0">
            <div class="body-2">{{ data.po_seq }}</div>
          </v-col>
          <v-spacer class="d-print-none"></v-spacer>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-0" cols="3">
            <div class="body-2">Kwitansi No</div>
          </v-col>
          <v-col class="text-right pt-0">
            <div class="body-2">{{ data.kwitansi_seq }}</div>
          </v-col>
          <v-spacer class="d-print-none"></v-spacer>
          <v-spacer></v-spacer>
        </v-row>
        <!-- </v-card> -->
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pt-0">
        <!-- <v-card outlined tile> -->
        <v-row>
          <v-col class="pb-0">
            <div class="body-2">Bill To</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="body-2 font-weight-bold">PT Rekso Nasional Food</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="body-2">Graha Rekso Building 5th Floor</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="body-2">Jl. Bulevar Artha Gading Kav. A1</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="body-2">Sentra Bisnis Artha Gading</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="body-2">Jakarta Utara 14240</div>
          </v-col>
        </v-row>
        <!-- </v-card> -->
      </v-col>
    </v-row>
    <v-simple-table light class="table-print" dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th>No</th>
            <th>Deskripsi</th>
            <th>Kode Item</th>
            <th>Qty</th>
            <th class="text-right">Unit Price</th>
            <th class="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data.inv_detail" :key="item.inv_rownum">
            <td>{{ item.inv_rownum }}</td>
            <td>{{ item.deskripsi_barang }}</td>
            <td>{{ item.inv_itemid }}</td>
            <td>{{ item.inv_qty }}</td>
            <td class="text-right">{{ item.inv_cost }}</td>
            <td class="text-right">{{ item.total_cost }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" class="subtitle-2">Grandtotal</td>
            <td class="subtitle-2 text-right">{{data.total_cost}}</td>
          </tr>
          <tr>
            <td colspan="2" class="text-center body-2 font-weight-bold">Terbilang</td>
            <td
              colspan="3"
              class="capitalize text-right body-2 font-weight-bold font-italic"
            >{{data.terbilang}}</td>
          </tr>
        </tfoot>
      </template>
    </v-simple-table>
    <br />
    <v-row>
      <v-col class="pt-0">
        <!-- <v-card outlined tile> -->
        <v-row>
          <v-col class="pb-0">
            <div class="body-2 font-weight-bold underline">Notes :</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="body-2">Jatuh Tempo Pembayaran</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="body-2">Setelah Invoice diterbitkan, dan harap transfer ke:</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="body-2 font-weight-bold">CV. Bandar Elektronik</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="body-2 font-weight-bold">Bank Mega KCP Indomobil MT. Haryono</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="body-2 font-weight-bold">No. Rek: 01-133-00-11-77777-0</div>
          </v-col>
        </v-row>
        <!-- </v-card> -->
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="body-2">&nbsp;</div>
        <!-- <div class="body-2 font-weight-bold">SHAHRIAL</div> -->
      </v-col>
      <v-col>
        <v-row>
          <v-col class="pb-10">
            <div class="body-2 text-center">Hormat Kami,</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pt-10">
            <div class="body-2 text-center font-weight-bold">SHAHRIAL</div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col class="center-element">
        <v-btn @click="print()" color="primary" class="d-print-none">
          <v-icon left>mdi-tray-full</v-icon>
          <span>Print</span>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import axios from 'axios'

const { token } = JSON.parse(localStorage.getItem('userAuth'))

export default {
  data: () => ({
    data: {}
  }),
  methods: {
    print() {
      window.print()
    }
  },
  created() {
    axios
      .post(`${process.env.VUE_APP_BASE_API_URL}api/invoice/prints`, {
        inv_seq: this.$route.params.invNo,
        token
      })
      .then(resp => {
        this.data = resp.data.data
        this.data.total_cost = `Rp. ${this.data.total_cost.toLocaleString(
          'id'
        )}`
        this.data.inv_detail = this.data.inv_detail.map(item => {
          item.inv_cost = `Rp. ${item.inv_cost.toLocaleString('id')}`
          item.total_cost = `Rp. ${item.total_cost.toLocaleString('id')}`
          return item
        })
      })
  }
}
</script>
<style scoped>
.print-invoice {
  font-size: ;
}

.table-print {
  border: thin solid rgba(0, 0, 0, 0.12);
}

.center-element {
  display: flex;
  align-items: center;
  justify-content: center;
}

.assignment {
  display: flex;
  justify-content: center;
}

.capitalize {
  text-transform: capitalize;
}

.underline {
  text-decoration: underline;
}

@media print {
  .margin-wrapper {
    margin-top: -110px;
  }
}
</style>
