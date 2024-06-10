<template>
  <div class="card mb-2">
    <div class="card-header p-3 pt-2">
      <div
        class="icon icon-lg icon-shape shadow text-center border-radius-xl mt-n4 position-absolute"
      >
        <i class="material-icons opacity-10" aria-hidden="true">
          {{ icon.name }}
        </i>
      </div>
      <div class="pt-1 text-end">
        <p class="text-sm mb-0 text-capitalize">{{ title.text }}</p>
        <h4 class="mb-0">{{ title.value }}</h4>
      </div>
    </div>
    <hr class="dark horizontal my-0 " />
    <div class="card-footer p-3 text-end" >
      <!--  eslint-disable-next-line vue/no-v-html -->
      <p class="mb-0" v-html="detail"></p>
    </div>
  </div>
</template>
<script>
export default {
  data() {},
  props: {
    title: {
        type: Object,
        required: true,
        text: String,
        value: [Number, String]
    },
    icon: {
      type: Object,
      required: true,
      name: String,
      default: () => ({
        color: "text-white",
        background: "dark",
      }),
    },
  },
};
</script>
