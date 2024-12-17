import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, h } from 'vue';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import { createI18n } from 'vue-i18n'

import '@/assets/styles.scss';
import '@/assets/tailwind.css';
import english from './langs/english';
import marathi from './langs/marathi';
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const i18n = createI18n({
    // something vue-i18n options here ...
    legacy:false,
    locale:'en-US',
    messages:{
        'en-US':english.messages,
        'mr-IN':marathi.messages,
    },
    // locale:'mr-IN',
    fallbackLocale: 'en-US',
  })

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(i18n)
            .use(PrimeVue, {
                theme: {
                    preset: Aura,
                    options: {
                        darkModeSelector: '.app-dark'
                    }
                }
            })
            .use(ToastService)
            .use(ConfirmationService)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
