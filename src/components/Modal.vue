<template>
  <div>
    <!-- <button
      @click="open"
      class="button is-block is-success is-light is-fullwidth"
    >
      Update Info
    </button> -->
    <template v-if="$slots.activator">
      <div @click="open">
        <slot name="activator" />
      </div>
    </template>
    <div v-else>
      <button
        @click="open"
        class="button is-block is-success is-light is-fullwidth"
      >
        Update Info
      </button>
    </div>
    <div :class="['modal', { 'is-active': isOpen }]">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">User Profile</p>
          <button @click="close" class="delete" aria-label="close"></button>
        </header>
        <!-- content modal -->
        <section class="modal-card-body">
          <slot />
        </section>
        <footer class="modal-card-foot">
          <button @click="onUpdate" class="button is-success">
            Save changes
          </button>
          <button @click="close" class="button">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    onModalSubmit: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    onUpdate() {
      this.onModalSubmit();
    },
    open() {
      this.isOpen = true;
    },
    close() {
      this.isOpen = false;
    },
  },
};
</script>