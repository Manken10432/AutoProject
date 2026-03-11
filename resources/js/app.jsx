import './bootstrap';
import '../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { route as ziggyRoute } from 'ziggy-js';

// Make route() available globally using Ziggy config from Inertia shared data
window.route = (name, params, absolute, config) => {
    return ziggyRoute(name, params, absolute, config || window.Ziggy);
};

createInertiaApp({
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx')
        ),
    setup({ el, App, props }) {
        // Store Ziggy config globally
        if (props.initialPage?.props?.ziggy) {
            window.Ziggy = props.initialPage.props.ziggy;
        }
        createRoot(el).render(<App {...props} />);
    },
    progress: {
        color: '#F5C518',
    },
});
