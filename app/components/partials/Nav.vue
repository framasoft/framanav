<template>
  <ul class="list-inline">
    <li>
      <router-link :to="'/' + $t('lang') + '/'">
        {{ $t("home") }}
      </router-link>
    </li>
    <li>
      <router-link :to="'/' + $t('lang') + '/about'">
        {{ $t("about") }}
      </router-link>
    </li>
    <li>
      <router-link :to="'/' + $t('lang') + '/how-it-works'">
        {{ $t("how_it_works") }}
      </router-link>
    </li>
  </ul>
</template>
