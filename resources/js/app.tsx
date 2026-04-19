import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { RtlProvider } from '@/Components/RtlProvider';
import { StyledEngineProvider, CssBaseline } from '@mui/material';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'مائدة الشيف';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <StyledEngineProvider injectFirst>
                <RtlProvider>
                    <CssBaseline />
                    <App {...props} />
                </RtlProvider>
            </StyledEngineProvider>
        );
    },
    progress: {
        color: '#C9A84C',
    },
});
