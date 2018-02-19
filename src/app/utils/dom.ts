/* dom操作工具类 */

const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;

/* 转为驼峰 */
const camelCase = function (name: string): string {
    return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
    }).replace(MOZ_HACK_REGEXP, 'Moz$1');
};
const trim = function (string) {
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

/**
 * 判断是否包含某种样式,返回布尔值
 * @param {HTMLElement} el DOM元素
 * @param {string} cls 样式类名
 */
export function hasClass(el: HTMLElement, cls: string): boolean {
    if (!el || !cls) { return false; }
    if (cls.indexOf(' ') !== -1) { throw new Error('className should not contain space.'); }
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
}

/**
 * 添加样式
 * @param {HTMLElement} el DOM元素
 * @param {string} cls 样式类名,如有多个用空格隔开
 */
export function addClass(el: HTMLElement, cls: string) {
    if (!el) { return; }
    let curClass = el.className;
    const classes = (cls || '').split(' ');

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName) { continue; }

        if (el.classList) {
            el.classList.add(clsName);
        } else if (!hasClass(el, clsName)) {
            curClass += ' ' + clsName;
        }
    }
    if (!el.classList) {
        el.className = curClass;
    }
}

/**
 * 删除样式
 * @param {HTMLElement} el DOM元素
 * @param {string} cls 样式类名,如有多个用空格隔开
 */
export function removeClass(el: HTMLElement, cls: string) {
    if (!el || !cls) { return; }
    const classes = cls.split(' ');
    let curClass = ' ' + el.className + ' ';

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName) { continue; }

        if (el.classList) {
            el.classList.remove(clsName);
        } else if (hasClass(el, clsName)) {
            curClass = curClass.replace(' ' + clsName + ' ', ' ');
        }
    }
    if (!el.classList) {
        el.className = trim(curClass);
    }
}

/**
 * 设置样式
 * @param {HTMLElement} element DOM元素
 * @param {object | string} styleName 样式名,单个传字符串,多个传对象
 * @param {string} value 样式值,如第二参数为字符串则该参数必传
 */
export function setStyle(element: HTMLElement, styleName: object | string, value?: string) {
    if (!element || !styleName) { return; }

    if (typeof styleName === 'object') {
        for (const prop in styleName) {
            if (styleName.hasOwnProperty(prop)) {
                setStyle(element, prop, styleName[prop]);
            }
        }
    } else {
        styleName = camelCase(styleName);
        element.style[<string>styleName] = value;
    }
}
