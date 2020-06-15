<template>
  <div class="body">
    <v-row>
      <v-col class="pb-0 center-element">
        <v-card-title>SURAT JALAN / DO</v-card-title>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="center-element column-direction custom-row" cols="3">
        <img :src="logo" alt="logo" class="center" />
        <v-card-text>&nbsp;</v-card-text>
        <div class="text-caption">CV BANDAR ELEKTRONIK</div>
      </v-col>
      <v-col>
        <!-- <v-card outlined tile> -->
        <v-row>
          <!-- <v-col><v-spacer></v-spacer></v-col> -->
          <v-col class="pb-0">
            <div class="text-caption">No PO :</div>
          </v-col>
          <v-col class="text-right">
            <div class="text-caption">{{ data.po_seq }}</div>
          </v-col>
        </v-row>
        <v-row>
          <!-- <v-col><v-spacer></v-spacer></v-col> -->
          <v-col class="pb-0 pt-0">
            <div class="text-caption">No DO :</div>
          </v-col>
          <v-col class="text-right pt-0">
            <div class="text-caption">{{ data.do_seq }}</div>
          </v-col>
        </v-row>
        <v-row>
          <!-- <v-col><v-spacer></v-spacer></v-col> -->
          <v-col class="pb-0 pt-0">
            <div class="text-caption">Tanggal :</div>
          </v-col>
          <v-col class="text-right pt-0">
            <div class="text-caption">{{ data.do_date }}</div>
          </v-col>
        </v-row>
        <!-- </v-card> -->
      </v-col>
      <v-col>
        <v-row>
          <v-col class="pb-0">
            <div class="text-caption">Kepada YTH:</div>
          </v-col>
          <v-col class="text-right">
            <div clastexts="text-caption">PT Rekso Nasional Food</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-0" cols="2">
            <div class="text-caption">Alamat:</div>
          </v-col>
          <v-col class="text-right pt-0" cols="10">
            <div class="text-caption">Graha Rekso Building 5th floor</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pb-0 pt-0" cols="2">
            <div class="text-caption"></div>
          </v-col>
          <v-col class="text-right pt-0 mt-5" cols="10">
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
            <th>Deskripsi</th>
            <th>Kode Item</th>
            <th>Jumlah</th>
            <th>Satuan</th>
            <th>Keterangan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data.do_detail" :key="item.do_rownum">
            <td>{{ item.do_rownum }}</td>
            <td>{{ item.deskripsi_barang || ' - ' }}</td>
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
          <!-- <v-card-text>&nbsp;</v-card-text> -->
          <v-card-text class="pb-0">Nama &nbsp; :</v-card-text>
          <v-card-text class="pt-1">Tanggal :</v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card outlined tile>
          <v-card-text class="text-center">Diketahui Oleh</v-card-text>
          <!-- <v-card-text>&nbsp;</v-card-text> -->
          <!-- <v-card-text>&nbsp;</v-card-text> -->
          <v-card-text class="pb-0">Nama &nbsp; :</v-card-text>
          <v-card-text class="pt-1">Tanggal :</v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card outlined tile>
          <v-card-text class="text-center">Diterima Oleh</v-card-text>
          <!-- <v-card-text>&nbsp;</v-card-text> -->
          <!-- <v-card-text>&nbsp;</v-card-text> -->
          <v-card-text class="pb-0">Nama &nbsp; :</v-card-text>
          <v-card-text class="pt-1">Tanggal :</v-card-text>
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
.body {
  font-size: 10px !important;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 25%;
}

.custom-row div {
  padding-top: 0;
}

.table-print {
  border: thin solid rgba(0, 0, 0, 0.63) !important;
}

.theme--light.v-card.v-card--outlined {
  border: thin solid rgba(0, 0, 0, 0.63);
}

.v-data-table td {
  font-size: 0.7rem;
  height: 35px;
}

.center-element {
  display: flex;
  align-items: center;
  justify-content: center;
}

.column-direction {
  flex-direction: column;
}

@media print {
  .margin-wrapper {
    margin-top: -110px;
  }
}
</style>
