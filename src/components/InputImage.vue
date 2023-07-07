<template>
      <v-col >
        <v-file-input
            chips
            multiple
            v-model="image"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Pick an image"
            @change="selectImage"
            @click:clear="clearImagePreview()"
            label="Click to choose image"
            prepend-icon="mdi-camera"
            variant="outlined"
            shaped
        ></v-file-input>
       <v-container
              shaped>
         <v-img
             :src="imagePreview"
             height="auto"
             class="pa-2"
         ></v-img>
       </v-container>
      </v-col>
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