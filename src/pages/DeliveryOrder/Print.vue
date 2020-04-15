<template>
  <div>
    <v-row>
      <v-col class="pb-0 center-element">
        <v-card-title>SURAT JALAN / DO</v-card-title>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="center-element">
        <v-card outlined tile>
          <v-card-title>PT BANDAR ELEKTRONIK</v-card-title>
        </v-card>
      </v-col>
      <v-col>
        <!-- <v-card outlined tile> -->
        <v-row>
          <v-col class="pb-0">
            <div class="body-1">No PO :</div>
          </v-col>
          <v-col class="text-right">
            <div class="body-1">{{ data.po_seq }}</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0">
            <div class="body-1">No DO :</div>
          </v-col>
          <v-col class="text-right">
            <div class="body-1">{{ data.do_seq }}</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0">
            <div class="body-1">Tanggal :</div>
          </v-col>
          <v-col class="text-right">
            <div class="body-1">{{ data.do_date }}</div>
          </v-col>
        </v-row>
        <!-- </v-card> -->
      </v-col>
      <v-col>
        <v-row>
          <v-col class="pb-0">
            <div class="body-1">Kepada YTH:</div>
          </v-col>
          <v-col class="text-right">
            <div class="body-1">PT Reksa Nasional</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0" cols="2">
            <div class="body-1">Alamat:</div>
          </v-col>
          <v-col class="text-right" cols="10">
            <div class="body-1">Graha Rekso Building 5th floor</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0" cols="2">
            <div class="body-1"></div>
          </v-col>
          <v-col class="text-right mt-5" cols="10">
            <hr />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-simple-table light class="table-print">
      <template v-slot:default>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama - Kode Produk</th>
            <th>Jumlah</th>
            <th>Satuan</th>
            <th>Keterangan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data.do_detail" :key="item.do_rownum">
            <td>{{ item.do_rownum }}</td>
            <td>{{ item.do_itemid }}</td>
            <td>{{ item.do_qty }}</td>
            <td>{{ item.do_satuan }}</td>
            <td>{{ item.do_deskripsi }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <br />
    <v-row no-gutters>
      <v-col>
        <v-card outlined tile>
          <v-card-text class="text-center">Dikirim Oleh</v-card-text>
          <!-- <v-card-text>&nbsp;</v-card-text> -->
          <v-card-text>&nbsp;</v-card-text>
          <v-card-text class="pb-0">Nama &nbsp; :</v-card-text>
          <v-card-text class="pt-2">Tanggal :</v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card outlined tile>
          <v-card-text class="text-center">Diketahui Oleh</v-card-text>
          <!-- <v-card-text>&nbsp;</v-card-text> -->
          <v-card-text>&nbsp;</v-card-text>
          <v-card-text class="pb-0">Nama &nbsp; :</v-card-text>
          <v-card-text class="pt-2">Tanggal :</v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card outlined tile>
          <v-card-text class="text-center">Diterima Oleh</v-card-text>
          <!-- <v-card-text>&nbsp;</v-card-text> -->
          <v-card-text>&nbsp;</v-card-text>
          <v-card-text class="pb-0">Nama &nbsp; :</v-card-text>
          <v-card-text class="pt-2">Tanggal :</v-card-text>
        </v-card>
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
      .post(`${process.env.VUE_APP_BASE_API_URL}api/do/prints`, {
        do_seq: this.$route.params.doNo,
        token
      })
      .then(resp => {
        this.data = resp.data.data
      })
      .catch(e => console.error(e))
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

@media print {
  .margin-wrapper {
    margin-top: -110px;
  }
}
</style>
