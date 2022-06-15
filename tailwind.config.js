module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        width: {
            '960': '960px',
            '1024': '1024px',
        },
        minWidth: {
            '960': '960px',
        },
        screens: {
            'md': {'max': '1023px'},
            'lg': {'min': '1024px'},
        }
    },
    plugins: []
}
