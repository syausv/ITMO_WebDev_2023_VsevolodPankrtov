<template>
  <v-card
      class="mx-auto"
     max-height="600px"
      width="800px"
  >
<!--    <v-card-text>-->
    <v-row class="pa-2 ma-2 bg-grey mb-2" >
      <v-col  class="">
        <v-file-input
            chips
            multiple
            v-model="image"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Pick an image"
            @change="selectImage"
            @click:clear="clearImagePreview()"
            label="Click to choose image"
            class="bg-white"
        ></v-file-input>
        <v-img
            :src="imagePreview"
            height="auto"
            class="pa-2 bg-white"
        ></v-img>
      </v-col>
        <v-col>
          <v-text-field
              v-model="imageCaption"
              :rules="rules"
              label="Your caption"
              class="pa-2 bg-white"
          ></v-text-field>
        </v-col>

    </v-row>
<!--    </v-card-text>-->
  </v-card>
</template>

<script>
export default {
  name: 'InputImage',
  data() {
    return {
      image: '',
      imagePreview: '',
    };
  },

  methods: {
    async selectImage(e) {
      const fileRaw = e;
      const file = e.target.files[0];


      if (!file) return;

      const readData = (f) =>
          new Promise((resolve) => {
            console.log('f',f);
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(f);
          });

      const data = await readData(file);
      console.log('data',data);
      this.imagePreview = data;
    },

    async clearImagePreview() {
      this.imagePreview = '';
    },
  },
};
</script>