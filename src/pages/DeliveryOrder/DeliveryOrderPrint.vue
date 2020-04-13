<template>
  <div>
    <v-row>
      <v-col>
        <v-card outlined tile>
          <v-card-title>PT BANDAR ELEKTRONIK</v-card-title>
        </v-card>
      </v-col>
      <v-col>
        <v-card outlined tile>
          <v-row>
            <v-col class="pb-0">
              <div class="body-1">No PO :</div>
            </v-col>
            <v-col class="text-right">
              <div class="body-1">#1212121</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="pb-0">
              <div class="body-1">No DO :</div>
            </v-col>
            <v-col class="text-right">
              <div class="body-1">00007/BE/DO/2020</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="pb-0">
              <div class="body-1">Tanggal :</div>
            </v-col>
            <v-col class="text-right">
              <div class="body-1">2020-04-20</div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col>
        <v-card outlined tile>
          <v-card-title>PT BANDAR ELEKTRONIK</v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <br />
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
          <tr>
            <td>1</td>
            <td>RUCIKA PIPA - 123123131</td>
            <td>2</td>
            <td>UNIT</td>
            <td>PIPA RUCIKA</td>
          </tr>
          <tr>
            <td>2</td>
            <td>RUCIKA PIPA - 123123131</td>
            <td>2</td>
            <td>UNIT</td>
            <td>PIPA RUCIKA</td>
          </tr>
          <tr>
            <td>3</td>
            <td>RUCIKA PIPA - 123123131</td>
            <td>2</td>
            <td>UNIT</td>
            <td>PIPA RUCIKA</td>
          </tr>
          <tr>
            <td>4</td>
            <td>RUCIKA PIPA - 123123131</td>
            <td>2</td>
            <td>UNIT</td>
            <td>PIPA RUCIKA</td>
          </tr>
          <tr>
            <td>5</td>
            <td>RUCIKA PIPA - 123123131</td>
            <td>2</td>
            <td>UNIT</td>
            <td>PIPA RUCIKA</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
export default {}
</script>
<style scoped>
.table-print {
  border: thin solid rgba(0, 0, 0, 0.12);
}
</style>