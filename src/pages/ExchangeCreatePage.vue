<template>
  <div class="page-wrapper">
    <div class="container">
      <div class="form-container">
        <form>
          <div class="field">
            <label class="label">Type</label>
            <div class="control">
              <div class="select">
                <select v-model="form.type">
                  <option value="service">Service</option>
                  <option value="product">Product</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label">Title</label>
            <div class="control">
              <input
                v-model="form.title"
                class="input"
                type="text"
                placeholder="Some Nice Product"
              />
              <div class="form-error" v-if="v$.form.title.$error">
                <div
                  v-if="v$.form.title.required.$invalid"
                  class="help is-danger"
                >
                  Tittle is required
                </div>
                <div
                  v-if="v$.form.title.minLength.$invalid"
                  class="help is-danger"
                >
                  Tittle must be at least 10 character long
                </div>
              </div>
            </div>
          </div>

          <!-- +++++++++++++++++++++++++++++++++++++ -->
          <div class="field">
            <label class="label">Description</label>
            <div class="control">
              <textarea
                v-model="form.description"
                class="textarea"
                placeholder="Some catchy description about product"
              >
              </textarea>
              <div v-if="v$.form.description.$error" class="form-error">
                <div
                  v-if="v$.form.description.required.$invalid"
                  class="help is-danger"
                >
                  Description is required!
                </div>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label">Image Link</label>
            <div class="control">
              <input
                v-model="form.image"
                class="input"
                type="text"
                placeholder="https://unsplash....">
              <div
                v-if="v$.form.image.$error"
                class="form-error">
                <div
                  v-if="v$.form.image.required.$invalid"
                  class="help is-danger">
                  Image is required!
                </div>
                <div
                  v-if="v$.form.image.url.$invalid"
                  class="help is-danger">
                  Image has wrong url format
                </div>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label">Price</label>
            <div class="control">
              <input
                v-model="form.price"
                class="input"
                type="number"
                placeholder="249"
              />
               <div
                v-if="v$.form.price.$error"
                class="form-error">
                <div
                  v-if="v$.form.price.required.$invalid"
                  class="help is-danger">
                  Price is required!
                </div>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label">Country</label>
            <div class="control">
              <input
                v-model="form.country"
                class="input"
                type="text"
                placeholder="Slovakia"
              />
               <div
                v-if="v$.form.country.$error"
                class="form-error">
                <div
                  v-if="v$.form.country.required.$invalid"
                  class="help is-danger">
                  Country is required!
                </div>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label">City</label>
            <div class="control">
              <input
                v-model="form.city"
                class="input"
                type="text"
                placeholder="Bratislava"
              />
               <div
                v-if="v$.form.city.$error"
                class="form-error">
                <div
                  v-if="v$.form.city.required.$invalid"
                  class="help is-danger">
                  City is required!
                </div>
              </div>
            </div>
          </div>

          <!-- TODO: provide tags inputs -->
          <div class="field">
            <label class="label">Tags</label>
            <div class="control">
              <input class="input" type="text" placeholder="programming" />
            </div>
          </div>

          <div class="field is-grouped">
            <div class="control">
              <button @click.prevent="createExchange" class="button is-link">
                Submit
              </button>
            </div>
            <div class="control">
              <button class="button is-text">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, minLength, url } from "@vuelidate/validators";
export default {
  data() {
    return {
      form: {
        title: "",
        description: "",
        type: "product",
        image: "",
        price: null,
        country: "",
        city: "",
        tags: [],
      },
    };
  },
  validations() {
    return {
      form: {
        title: { required, minLength: minLength(5) },
        description: { required },
        type: { required },
        image: { required, url },
        price: { required },
        country: { required },
        city: { required },
        tags: { },
      },
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  methods: {
    async createExchange() {
      const isValid = await this.v$.$validate();
      console.log(isValid);
      if (isValid) {
        alert(JSON.stringify(this.form));
      } else {
        alert("nhập đủ các field");
      }
    },
  },
};
</script>

<style scoped>
.form-container {
  max-width: 960px;
  margin: 0 auto;
  margin-top: 40px;
}
.tag {
  margin: 3px;
}
</style>