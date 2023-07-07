<template>
  <v-card
      class="mx-auto"
     max-height="600px"
      width="800px"
  >
<!--    <v-card-text>-->
    <v-row class="pa-2 ma-2 mb-2" >
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
        <v-col>
          <v-textarea
              v-model="inputText"
              ref="domInput"
              :rules="rules"
              label="Your caption"
              auto-grow
              variant="outlined"
              rows="3"
              row-height="25"
              shaped
              @keyup.enter="canAddItemToTodoList && onInputEnterKeyUp()"
          ></v-textarea>
          <v-btn
              :loading="loading"
              type="submit"
              block
              variant="outlined"
              class="mt-2 align-self-end"
              text="Post"
              shaped
          ></v-btn>
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