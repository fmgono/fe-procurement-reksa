<template>
  <div>
    <v-simple-table light dense ref="table">
      <template v-slot:default>
        <thead>
          <tr>
            <th>To :</th>
            <th></th>
            <th></th>
            <th>From :</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th colspan="3">REKSO NASIONAL FOOD, PT</th>
            <th colspan="2">BANDAR ELEKTRONIK CV</th>
          </tr>
          <tr>
            <td colspan="3">Graha Rekso Building 5th Floor</td>
            <td colspan="2">JL. Bhineka 1 No. 27</td>
          </tr>
          <tr>
            <td colspan="3">Jl. Bulevar Artha Gading Kav. A1</td>
            <td colspan="2">Cawang Kavling -Jakarta</td>
          </tr>
          <tr>
            <td colspan="3">Jakarta</td>
            <td colspan="2">Jakarta</td>
          </tr>
          <tr>
            <td colspan="3">Telp : 021 - 4585 6199</td>
            <td colspan="2">Telp : 021-29360017</td>
          </tr>
          <tr>
            <td colspan="5">&nbsp;</td>
          </tr>
          <tr>
            <td colspan="5">TANDA TERIMA INVOICE NO.735/BE/KW/II/2020</td>
          </tr>
          <tr>
            <td colspan="5">&nbsp;</td>
          </tr>
          <tr>
            <th>No.</th>
            <th>No PO</th>
            <th>No Invoice</th>
            <th>Jumlah</th>
            <th>Nama Store</th>
          </tr>
          <tr v-for="inv in data" :key="inv.inv_seq">
            <td>{{inv.no}}</td>
            <td>{{inv.po_seq}}</td>
            <td>{{inv.inv_seq}}</td>
            <td>{{inv.total_cost}}</td>
            <td>{{inv.inv_custid}}</td>
          </tr>
          <tr>
            <td colspan="3">Jumlah</td>
            <td>2470000</td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td colspan="5">&nbsp;</td>
          </tr>
          <tr>
            <td colspan="2">Jakarta, 15 Feb 2020</td>
            <td colspan="3">&nbsp;</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-btn @click="exportToExcel('table','lorem')">export excel</v-btn>
  </div>
</template>
<script>
import XLSX from 'xlsx'
import axios from 'axios'

const { token } = JSON.parse(localStorage.getItem('userAuth'))

export default {
  data: () => ({
    data: {}
  }),
  created() {
    axios
      .post(`${process.env.VUE_APP_BASE_API_URL}api/invoice/invoice_excel`, {
        date_from: '2020-04-13',
        date_to: '2020-04-14',
        token
      })
      .then(resp => {
        let orderNo = 0
        const data = resp.data.data.map(inv => {
          orderNo++
          inv.no = orderNo
          inv.total_cost = inv.total_cost.toLocaleString('id')
          return inv
        })
        this.data = data
      })
      .catch(e => console.error(e))
  },
  mounted() {
    const tableEl = document.querySelector('table')
    tableEl.id = 'table'
  },
  methods: {
    print() {
      window.print()
    },
    exportToExcel() {
      const table = document.getElementById('table')
      const wb = XLSX.utils.table_to_book(table)
      return XLSX.writeFile(wb, 'Invoice Receipt.xls')
    }
  }
}
</script>
<style scoped>
.table-print {
  border: thin solid rgba(0, 0, 0, 0.12);
}
</style>
