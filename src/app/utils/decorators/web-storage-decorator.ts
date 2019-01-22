/**
 * 过期时间单位
 * s：秒
 * m：分
 * h：时
 * d：天
 * w：周
 * y：年
 * t：自定义（毫秒ms）
 */
type ExpiredUnit = 's' | 'm' | 'h' | 'd' | 'w' | 'y' | 't';

class StorageUtil {
    static get(storage: Storage, key: string) {
        const value = StorageUtil.parse(storage.getItem(key) || 'null') || null;
        if (value === null) { return null; }
        if (
            typeof value === 'object' &&
            typeof value._expired !== 'undefined' &&
            value._expired !== 0 &&
            +new Date() > value._expired
        ) {
            StorageUtil.remove(storage, key);
            return null;
        }

        return value._value || null;
    }

    static set(
        storage: Storage,
        key: string,
        value: any,
        expiredAt: number = 0,
        expiredUnit: ExpiredUnit = 't',
    ) {
        storage.setItem(
            key,
            StorageUtil.stringify({
                _expired: StorageUtil.getExpired(expiredAt, expiredUnit),
                _value: value,
            }),
        );
    }

    static remove(storage: Storage, key: string) {
        storage.removeItem(key);
    }

    static key(storage: Storage, index: number) {
        return storage.key(index);
    }

    private static getExpired(val: number, unit: ExpiredUnit): number {
        if (val <= 0) { return 0; }
        const now = +new Date();
        switch (unit) {
            case 's': // 秒
                return now + 1000 * val;
            case 'm': // 分
                return now + 1000 * 60 * val;
            case 'h': // 时
                return now + 1000 * 60 * 60 * val;
            case 'd': // 天
                return now + 1000 * 60 * 60 * 24 * val;
            case 'w': // 周
                return now + 1000 * 60 * 60 * 24 * 7 * val;
            case 'y': // 年
                return now + 1000 * 60 * 60 * 24 * 365 * val;
            case 't': // 自定义
                return now + val;
        }
        return 0;
    }

    private static stringify(value: any) {
        return JSON.stringify(value);
    }

    private static parse(text: string) {
        try {
            return JSON.parse(text) || null;
        } catch (e) {
            return text;
        }
    }
}

interface ICache {
    [key: string]: boolean;
}
const cache: ICache = {};

function WebStorage(
    storage: Storage,
    key: string,
    expiredAt: number = 0,
    expiredUnit: ExpiredUnit = 'd',
) {
    return (target: Object, propertyName: string): void => {
        key = key || propertyName;
        Object.defineProperty(target, propertyName, {
            get: () => {
                return StorageUtil.get(storage, <string>key);
            },
            set: (value: any) => {
                if (!cache[<string>key]) {
                    const storedValue = StorageUtil.get(storage, <string>key);
                    if (storedValue === null) {
                        StorageUtil.set(
                            storage,
                            <string>key,
                            value,
                            expiredAt,
                            expiredUnit,
                        );
                    }
                    cache[<string>key] = true;
                    return;
                }
                StorageUtil.set(storage, <string>key, value, expiredAt, expiredUnit);
            },
            enumerable: true,
            configurable: true,
        });
    };
}

/**
 * localStorage 装饰器
 *
 * @param [key] 指定一个新key
 * @param [expiredAt=0] 过期时间值，0表示永久有效。
 * @param [expiredUnit='t'] 过期时间单位（默认：自定义[单位：毫秒]）
 */
export function LocalStorage(
    key?: string,
    expiredAt: number = 0,
    expiredUnit: ExpiredUnit = 't',
) {
    return WebStorage(localStorage, key, expiredAt, expiredUnit);
}

/**
 * sessionStorage 装饰器
 *
 * @param [key] 指定一个新key
 */
export function SessionStorage(key?: string) {
    return WebStorage(sessionStorage, key);
}
