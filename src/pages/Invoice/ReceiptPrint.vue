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
          <tr>
            <td>1</td>
            <td>484797</td>
            <td>20761/BE-INV/II/2020</td>
            <td>2470000</td>
            <td>PONDOK INDAH MALL I</td>
          </tr>
          <tr>
            <td colspan="3">Jumlah</td>
            <td>2470000</td>
            <td>&nbsp;`</td>
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
// import axios from 'axios'

// const { token } = JSON.parse(localStorage.getItem('userAuth'))

export default {
  data: () => ({
    uri: 'data:application/vnd.ms-excel;base64,',
    template:
      '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
    base64: function(s) {
      return window.btoa(unescape(encodeURIComponent(s)))
    },
    format: function(s, c) {
      return s.replace(/{(\w+)}/g, function(m, p) {
        return c[p]
      })
    }
  }),
  methods: {
    print() {
      window.print()
    },
    exportToExcel(table, name) {
      if (!table.nodeType) table = this.$refs.table
      var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
      window.location.href =
        this.uri + this.base64(this.format(this.template, ctx))
    }
  }
}
</script>
<style scoped>
.table-print {
  border: thin solid rgba(0, 0, 0, 0.12);
}
</style>
