<template>
    <div class="HomePage border border-solid ">
        <button @click="throwError">验证sentry</button>
        <p>HomePage</p>
        <button @click="multiThemeOnclick">multiTheme</button>
        <p class="test">{{ t('ok') }}</p>
        <button @click="setar">设置阿语</button>
        <p></p>
        <button @click="seten">设置英语</button>
        <p></p>
        <button @click="setzh">设置中文</button>
    </div>
</template>

<script setup lang="ts" name="HomePage">
import { useI18n } from "vue-i18n";
import multiThemeOnclick from '@/hooks/multiTheme';
import {setLocale} from '@/store/locale/index';
const { t } = useI18n();
const setar = () => {
    setLocale('ar');
}
const seten = () => {
    setLocale('en');
}
const setzh = () => {
    setLocale('zh');
}
const throwError = () => {
    throw new RangeError('Sentry test Error');
}
// const { proxy } = getCurrentInstance()
// const router = useRouter()
// const route = useRoute()
</script>

<style lang="scss">
.HomePage {
    background-color: var(--bg);
}
.test {
    margin-inline-start: 100px;
}
</style>
