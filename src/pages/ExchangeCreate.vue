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
              <form-error :errors="v$.form.title.$errors" />
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
              <!-- custom file errors thành các component -->
              <form-error :errors="v$.form.description.$errors" />
            </div>
          </div>
          <div class="field">
            <label class="label">Image Link</label>
            <div class="control">
              <input
                v-model="form.image"
                class="input"
                type="text"
                placeholder="https://unsplash...."
              />
              <form-error :errors="v$.form.image.$errors" />
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
              <form-error :errors="v$.form.price.$errors" />
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
              <form-error :errors="v$.form.country.$errors" />
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
              <form-error :errors="v$.form.city.$errors" />
            </div>
          </div>

          <!-- TODO: provide tags inputs -->
          <div class="field">
            <label class="label">Tags</label>
            <div class="control">
              <input
                @input="handleTags"
                class="input"
                type="text"
                placeholder="programming"
              />
              <div
                v-for="tag in form.tags"
                :key="tag"
                class="tag is-primary is-medium"
              >
                {{ tag }}
              </div>
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
import {
  required,
  minLength,
  url,
  minValue,
  helpers,
} from "@vuelidate/validators";

import FormError from "../components/FormError.vue";
// import { supportedFileType } from "../helpers/validators";

const setupInitialData = () => ({
  title: "",
  description: "",
  type: "product",
  image: "",
  price: null,
  country: "",
  city: "",
  tags: []
});

export default {
  components: {
    FormError,
  },
  data() {
    return {
      form: setupInitialData(),
    };
  },
  validations() {
    return {
      // kiểm tra và trả về một list những lỗi
      form: {
        // required = required
        title: {
          required: helpers.withMessage("Title cannot by empty!", required),
          minLength: helpers.withMessage(
            "Title length should be at least 6!",
            minLength(6)
          ),
        },
        description: { required },
        type: { required },
        image: {
          required,
          url,
          // supportedFileType: helpers.withMessage(
          //   "Invalid format",
          //   supportedFileType
          // ),
        },
        price: { required, minValue: minValue(50) },
        country: { required },
        city: { required },
        tags: {},
      },
    };
  },
  setup() {
    return { v$: useVuelidate() };
  },
  methods: {
    async createExchange() {
      const isValid = await this.v$.$validate();
      if (isValid) {
        this.v$.$reset()
        this.$store.dispatch("exchange/createExchange", {
          data: this.form,
          onSuccess: () => {
            this.form = setupInitialData()
          },
        });
      }
    },
    handleTags(event) {
      const { value } = event.target;
      // xử lý value khi có dấu cách hoặc dầu phẩy thì lấy ra dữ liệu và set value lại thành rỗng
      if (
        value.trim().length > 0 &&
        // method substr dùng để trích xuất chuỗi
        // substr(start, length) -1 là trích xuất từ cuối dãy string
        // code ở dưới có nghĩa là ký tự cuối mà là "," hoặc "trống" thì là đúng
        (value.substr(-1) === "," || value.substr(-1) === " ")
      ) {
        const _value = value.split(",")[0];
        console.log(_value);
        if (this.form.tags.includes(_value) === false) {
          this.form.tags.push(_value);
        }

        console.log(this.form.tags);
        event.target.value = "";
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