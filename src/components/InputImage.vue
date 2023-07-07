<template>
  <v-card
      height="30vh"
      width ="40vh">
    <v-card-text>
      <v-img
          :src="imagePreview"
          height="20vh"
          width="30vh"
      ></v-img>
      <v-file-input
          v-model="image"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an image"
          prepend-icon="mdi-camera"
          @change="selectImage"
          @click:clear="clearImagePreview()"
          label="Image"
      ></v-file-input>
    </v-card-text>
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