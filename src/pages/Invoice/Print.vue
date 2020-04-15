<template>
  <div>
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
            <div class="body-1">Date</div>
          </v-col>
          <v-col class="pb-0 text-right">
            <div class="body-1">{{ data.inv_date }} 121</div>
          </v-col>
          <v-spacer class="d-print-none"></v-spacer>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-col class="pb-0" cols="3">
            <div class="body-1">Company ID</div>
          </v-col>
          <v-col class="text-right">
            <div class="body-1 font-weight-bold">PT Rekso Nasional Food</div>
          </v-col>
          <v-spacer class="d-print-none"></v-spacer>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-col class="pb-0" cols="3">
            <div class="body-1">Invoice</div>
          </v-col>
          <v-col class="text-right">
            <div class="body-1">{{ $route.params.invNo }}</div>
          </v-col>
          <v-spacer class="d-print-none"></v-spacer>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-col class="pb-0" cols="3">
            <div class="body-1">PO No</div>
          </v-col>
          <v-col class="text-right">
            <div class="body-1">{{ data.po_seq }}</div>
          </v-col>
          <v-spacer class="d-print-none"></v-spacer>
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-col class="pb-0" cols="3">
            <div class="body-1">Kwitansi No</div>
          </v-col>
          <v-col class="text-right">
            <div class="body-1">{{ data.kwitansi_seq }}</div>
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
            <div class="body-1">Bill To</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="body-1 font-weight-bold">PT Rekso Nasional Food</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="body-1">Graha Rekso Building 5th Floor</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="body-1">Jl. Bulevar Artha Gading Kav. A1</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="body-1">Sentra Bisnis Artha Gading</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="body-1">Jakarta Utara 14240</div>
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
            <th>Code - Name Item</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data.inv_detail" :key="item.inv_rownum">
            <td>{{ item.inv_rownum }}</td>
            <td>{{ item.inv_itemid }}</td>
            <td>{{ item.inv_qty }}</td>
            <td>{{ item.inv_cost }}</td>
            <td>{{ item.total_cost }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colspan="4">Grandtotal</th>
            <th>Rp. 128.000,00</th>
          </tr>
          <tr>
            <th colspan="1">Terbilang</th>
            <th colspan="4">Seratus dua puluh juta rupiah</th>
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
            <div class="body-1 font-weight-bold underline">Notes :</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="body-1">Jatuh Tempo Pembayaran</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="body-1">Setelah Invoice diterbitkan, dan harap transfer ke:</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="body-1 font-weight-bold">CV. Bandar Elektronik</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="body-1 font-weight-bold">Bank Mega KCP Indomobil MT. Haryono</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="body-1 font-weight-bold">No. Rek: 01-133-00-11-77777-0</div>
          </v-col>
        </v-row>
        <!-- </v-card> -->
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="body-1">&nbsp;</div>
        <!-- <div class="body-1 font-weight-bold">SHAHRIAL</div> -->
      </v-col>
      <v-col>
        <v-row>
          <v-col class="pb-10">
            <div class="body-1 text-center">Hormat Kami,</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pt-10">
            <div class="body-1 text-center font-weight-bold">SHAHRIAL</div>
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

.underline {
  text-decoration: underline;
}

@media print {
  .margin-wrapper {
    margin-top: -110px;
  }
}
</style>
