<template>
  <exchange-modal :onModalSubmit="createOpportunity">
    <div class="deal">
      <div class="deal-highlight">{{ exchange.user.username }}'s Offer</div>
      <div class="deal-wrapper">
        <div>Offering {{ exchange.type }}</div>
        <div>{{ exchange.title }}</div>
      </div>
      <div class="deal-highlight">Your Offer</div>
      <div class="counter-offer">
        <div class="field">
          Would you prefer to exchange credit ?
          <label class="checkbox is-large">
            <input type="checkbox" v-model="isPriceExchange" />
            Yes
          </label>
        </div>
        <div class="field">
          <label class="label">How Much Credit ?</label>
          <div class="control">
            <input
              :disabled="!isPriceExchange"
              class="input"
              type="number"
              placeholder="40"
              v-model="selectedPrice"
            />
            <i> You don't have enough of credit</i>
          </div>
        </div>
        <div class="field">
          <label class="label">Exchange</label>
          <div class="control">
            <div class="select">
              <select :disabled="isPriceExchange" v-model="selectedExchange">
                <option
                  v-for="exchange in availableExchanges"
                  :key="exchange"
                  :value="exchange"
                >
                  {{ exchange.title }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div v-if="offeredPrice">
          <span>Your price is:</span>
          <span class="deal-highlight">{{ offeredPrice }}</span>
        </div>
        <div class="price price">{{ priceDifferenceText }}</div>
        <i>Allowed difference is not less than 20%</i>
      </div>
    </div>
    <template #activator>
      <button class="button is-fullwidth is-large is-danger is-outlined m-b-sm">
        Make a Deal
      </button>
    </template>
  </exchange-modal>
</template>

<script>
import ExchangeModal from "./Modal.vue";
export default {
  components: {
    ExchangeModal,
  },
  data() {
    return {
      selectedPrice: null,
      isPriceExchange: false,
      selectedExchange: null,
    };
  },
  props: {
    exchange: {
      type: Object,
      required: true,
    },
    availableExchanges: {
      type: Array,
      required: true,
    },
  },
  computed: {
    offeredPrice() {
      if (this.isPriceExchange) {
        return this.selectedPrice;
      } else if (this.selectedExchange) {
        return this.selectedExchange.price;
      }
      return null;
    },
    percentageDifference() {
      if (this.offeredPrice === null) {
        return null;
      } else {
        const priceDifference = this.offeredPrice - this.exchange.price;
        return (priceDifference / this.exchange.price) * 100;
      }
    },
    priceDifferenceText() {
      // nên so sánh vs null vì 0 vẫn là falsy
      if (this.percentageDifference === null) {
        return "";
      }
      if (this.percentageDifference === 0) {
        return `You are offering the exact same amount`;
      }
      const roundedPercentageDiff =
        Math.round(this.percentageDifference * 100) / 100;
      const differenceText = this.percentageDifference > 0 ? "higher" : "lower";
      return `Offered price is ${Math.abs(roundedPercentageDiff)} % ${differenceText} than exchange price`;
    },
  },
  watch: {
    isPriceExchange(value) {
      if (value) {
        this.selectedExchange = null;
      } else {
        this.selectedPrice = null;
      }
    },
  },
  methods: {
    createOpportunity() {
      alert("ok ok !!!");
    },
  },
};
</script>
<style scoped lang="scss">
.price {
  padding: 7px;
  &-allowed {
    background-color: #cdeacd;
  }
  &-declined {
    background-color: #ffc2c2;
  }
}
.deal-wrapper {
  margin-bottom: 10px;
}
.counter-offer,
.deal-wrapper {
  border: 2px solid grey;
  padding: 10px;
  margin-top: 10px;
  &-title {
    font-size: 21px;
    margin: 5px 0;
    font-weight: bold;
  }
}
.deal {
  font-size: 19px;
  &-highlight {
    font-size: 19px;
    font-weight: bold;
  }
}
.disabled {
  &.field {
    input,
    textarea,
    select {
      pointer-events: none;
      color: grey;
    }
    label {
      color: grey;
    }
  }
}
</style>
0 comments on commit 93e9110