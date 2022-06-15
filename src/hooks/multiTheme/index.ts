export default function multiThemeOnclick() {
    if (document.body.classList.contains('dark-theme')) {
        document.body.classList.remove('dark-theme')
        document.body.classList.remove('light-theme')
        document.body.classList.add('light-theme')
    } else {
        document.body.classList.remove('dark-theme')
        document.body.classList.remove('light-theme')
        document.body.classList.add('dark-theme')
    }
}

export function setDefaultTheme() {
    document.body.classList.add('dark-theme')
}
