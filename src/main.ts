import { createApp } from 'vue'
import App from './App.vue'
import i18n from '@/locale/index'
import router from './router/index'
import 'element-plus/dist/index.css'
import './assets/style/tailwind.css'
import pinia from '@/store/index'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import * as Sentry from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'
import {setDefaultLocale} from '@/store/locale/index'
import {setDefaultTheme} from '@/hooks/multiTheme';

const firebaseConfig = {
    apiKey: "AIzaSyALvEig-Cc4pTBV246nhIpIzqOskdzrmJw",
    authDomain: "beem-web-meeting.firebaseapp.com",
    projectId: "beem-web-meeting",
    storageBucket: "beem-web-meeting.appspot.com",
    messagingSenderId: "882520999490",
    appId: "1:882520999490:web:7f2ef9d9a6f4c550284fdb",
    measurementId: "G-6P382DK173"
};

const fireapp = initializeApp(firebaseConfig);
const analytics = getAnalytics(fireapp);

const app = createApp(App)

// sentry
Sentry.init({
    app,
    dsn: 'http://c6dd2ebe4b754c4280518344d6fc2c4a@39.96.190.182:9000/1',
    integrations: [
        new BrowserTracing({
            routingInstrumentation: Sentry.vueRouterInstrumentation(router),
            tracingOrigins: ['localhost', 'my-site-url.com', /^\//],
        }),
    ],
    tracesSampleRate: 1.0,
})


app.use(i18n).use(router).use(pinia)
router.isReady().then(() => {
    app.mount('#app');
    setDefaultLocale();
    setDefaultTheme();
})
