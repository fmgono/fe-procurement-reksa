<template>
  <div class="print-invoice">
    <v-row>
      <v-col class="pb-0 mt-2 center-element">
        <v-card-title class="invoice-text">INVOICE</v-card-title>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <!-- <v-card outlined tile> -->
        <v-row>
          <v-col class="margin-right pb-0" cols="2">
            <div class="text-caption">Date</div>
          </v-col>
          <!-- <v-col cols="1" class="pb-0 text-right">:</v-col> -->
          <v-col class="text-left pb-0">
            <div class="text-caption">: {{ data.inv_date_fmt }}</div>
          </v-col>
          <v-spacer class="d-print-none"></v-spacer>
          <!-- <v-spacer></v-spacer> -->
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-col class="margin-right pb-0 pt-0" cols="2">
            <div class="text-caption">Company ID</div>
          </v-col>
          <!-- <v-col cols="1" class="text-right pt-0 pb-0">:</v-col> -->
          <v-col class="text-left pt-0 pb-0">
            <div class="text-caption">
              :
              <span class="font-weight-black">PT Rekso Nasional Food</span>
            </div>
          </v-col>
          <v-spacer class="d-print-none"></v-spacer>
          <!-- <v-spacer></v-spacer> -->
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-col class="margin-right pb-0 pt-0" cols="2">
            <div class="text-caption">Invoice</div>
          </v-col>
          <!-- <v-col cols="1" class="text-right pt-0 pb-0">:</v-col> -->
          <v-col class="text-left pt-0 pb-0">
            <div class="text-caption">: {{ $route.params.invNo }}</div>
          </v-col>
          <v-spacer class="d-print-none"></v-spacer>
          <!-- <v-spacer></v-spacer> -->
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-col class="margin-right pb-0 pt-0" cols="2">
            <div class="text-caption">PO No</div>
          </v-col>
          <!-- <v-col cols="1" class="text-right pt-0 pb-0">:</v-col> -->
          <v-col class="text-left pt-0 pb-0">
            <div class="text-caption">: {{ data.po_seq }}</div>
          </v-col>
          <v-spacer class="d-print-none"></v-spacer>
          <!-- <v-spacer></v-spacer> -->
          <v-spacer></v-spacer>
        </v-row>
        <v-row>
          <v-col class="margin-right pb-0 pt-0" cols="2">
            <div class="text-caption">Kwitansi No</div>
          </v-col>
          <!-- <v-col cols="1" class="text-right pt-0">:</v-col> -->
          <v-col class="text-left pt-0">
            <div class="text-caption">: {{ data.kwitansi_seq }}</div>
          </v-col>
          <v-spacer class="d-print-none"></v-spacer>
          <!-- <v-spacer></v-spacer> -->
          <v-spacer></v-spacer>
        </v-row>
        <!-- </v-card> -->
      </v-col>
      <!-- <v-col class="center-element column-direction" cols="5">
        <img :src="logo" alt="logo" class="center" />
        <div class="subtitle-1">CV BANDAR ELEKTRONIK</div>
      </v-col>-->
    </v-row>
    <v-row>
      <v-col class="pt-0">
        <!-- <v-card outlined tile> -->
        <v-row>
          <v-col class="pb-0">
            <div class="text-caption">Bill To</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="text-caption font-weight-black">PT Rekso Nasional Food</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="text-caption">Graha Rekso Building 5th Floor</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="text-caption">Jl. Bulevar Artha Gading Kav. A1</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="text-caption">Sentra Bisnis Artha Gading</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="text-caption">Jakarta Utara 14240</div>
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
            <th>QTY</th>
            <th>Type / Item</th>
            <th>Description</th>
            <th class="text-right">Unit Price</th>
            <th class="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data.inv_detail" :key="item.inv_rownum">
            <td>{{ item.inv_rownum }}</td>
            <td>{{ item.inv_qty }}</td>
            <td>{{ item.inv_itemid }}</td>
            <td>{{ item.deskripsi_barang }}</td>
            <td class="text-right">{{ item.inv_cost }}</td>
            <td class="text-right">{{ item.total_cost }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="subtitle-2">Grandtotal</td>
            <td colspan="4" class="subtitle-2 text-right">{{data.total_cost}}</td>
          </tr>
          <tr>
            <td
              colspan="3"
              class="terbilang-left text-left text-caption font-weight-black"
            >Terbilang</td>
            <td
              class="terbilang-right text-right capitalize text-caption font-weight-black font-italic"
              colspan="3"
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
            <div class="text-caption font-weight-black underline">Notes :</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="text-caption">Jatuh Tempo Pembayaran 30(tiga puluh) hari</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="text-caption">Setelah Invoice diterbitkan, dan harap transfer ke:</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="text-caption font-weight-black">CV. Bandar Elektronik</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="text-caption font-weight-black">Bank Mega KCP Indomobil MT. Haryono</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-1">
            <div class="text-caption font-weight-black">No. Rek: 01-133-00-11-77777-0</div>
          </v-col>
        </v-row>
        <!-- </v-card> -->
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <div class="text-caption">&nbsp;</div>
        <!-- <div class="text-caption font-weight-black">SHAHRIAL</div> -->
      </v-col>
      <v-col>
        <v-row>
          <v-col class="pb-10">
            <div class="text-caption text-center">Hormat Kami,</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pt-10">
            <div class="text-caption text-center font-weight-black">SHAHRIAL</div>
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
import Logo from '@/assets/logo.png'

const { token } = JSON.parse(localStorage.getItem('userAuth'))

export default {
  data: () => ({
    data: {},
    logo: Logo
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
        this.data.total_cost = `${this.data.total_cost.toLocaleString('id')}`
        this.data.inv_detail = this.data.inv_detail.map(item => {
          item.inv_cost = `${item.inv_cost.toLocaleString('id')}`
          item.total_cost = `${item.total_cost.toLocaleString('id')}`
          return item
        })
      })
  }
}
</script>
<style scoped>
.invoice-text {
  text-decoration: underline;
}

.print-invoice {
  font-size: 12px !important;
}

.margin-right {
  margin-right: -54px;
}

.table-print,
.table-print table,
.table-print th,
.table-print td {
  border: 1px solid rgba(12, 12, 12, 0.932);
}

.table-print th {
  color: rgba(12, 12, 12, 0.932) !important;
}

/* .table-print tfoot, */
.terbilang-left {
  border-right: none !important;
}

.terbilang-right {
  border-left: none !important;
}

.center-element {
  display: flex;
  align-items: center;
  justify-content: center;
}

.column-direction {
  flex-direction: column;
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
