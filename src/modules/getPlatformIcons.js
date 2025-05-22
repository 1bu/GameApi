export function getPlatformsIcons(name) {
    const icons = {
        'PlayStation': 'playstation.svg',
        'Xbox': 'xbox.svg',
        'PC': 'pc.svg',
        'Nintendo': 'nintendo.svg',
        'Linux': 'linux.svg',
        'iOS': 'ios.svg',
        'Android': 'android.svg',

    };

    const lower = name.toLowerCase();
    const match = Object.keys(icons).find(key =>
        lower.includes(key.toLowerCase())
    );

    if (match) {
        const path = require(`../assets/icons/${icons[match]}`);
        return `<img src="${path}" alt="${match}" class="platform-icon">`;
    }

    return '';
}