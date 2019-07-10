<template>
  <article>
    <div v-for="tag in Object.keys($t(section))" :key="tag">
      <div class="alert alert-info"
        v-if="/^alert/.test(tag)"
        v-html="$t(`${section}.${tag}`)"
      ></div>
      <h2
        v-if="/^h2/.test(tag)"
        v-html="$t(`${section}.${tag}`)"
      ></h2>
      <h3
        v-if="/^h3/.test(tag)"
        v-html="$t(`${section}.${tag}`)"
      ></h3>
      <h4
        v-if="/^h4/.test(tag)"
        v-html="$t(`${section}.${tag}`)"
      ></h4>
      <h5
        v-if="/^h5/.test(tag)"
        v-html="$t(`${section}.${tag}`)"
      ></h5>
      <h6
        v-if="/^h6/.test(tag)"
        v-html="$t(`${section}.${tag}`)"
      ></h6>
      <p
        v-for="p in Object.keys($t(`${section}.${tag}`)).filter(i => /^p/.test(tag))"
        :key="p"
        v-html="$t(`${section}.${tag}[${p}]`)"
      ></p>
      <ul v-if="/^ul/.test(tag)">
        <li
          v-for="li in Object.keys($t(`${section}.${tag}`))"
          :key="li"
          v-html="$t(`${section}.${tag}[${li}]`)"
        ></li>
      </ul>
      <ol v-if="/^ol/.test(tag)">
        <li
          v-for="li in Object.keys($t(`${section}.${tag}`))"
          :key="li"
          v-html="$t(`${section}.${tag}[${li}]`)"
        ></li>
      </ol>
      <blockquote
        v-for="bq in Object.keys($t(`${section}.${tag}`)).filter(i => /^blockquote/.test(tag))"
        :key="bq"
        v-html="$t(`${section}.${tag}[${bq}]`)"
      ></blockquote>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    section: {
      type: String,
      required: true,
    },
  },
};
</script>
