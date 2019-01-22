import 'reflect-metadata';
import { FormGroup } from '@angular/forms';
import { environment } from '@env/environment';

const FORM_GROUP = Symbol('FormGroup');

/**
 * 注解表单模型对象
 * @description 注解在FormGroup类型属性上
 */
export function FormModel(): PropertyDecorator {
    let propertyValue;
    return function(target: any, propertyKey: string) {
        Reflect.defineProperty(target, propertyKey, {
            get: () => {
                return propertyValue;
            },
            set(value: FormGroup) {
                if ( value instanceof FormGroup ) {
                    Reflect.defineMetadata(FORM_GROUP, value, target, propertyKey);
                    propertyValue = value;
                  } else {
                    propertyValue = value;
                  }
            },
            enumerable: true,
            configurable: true,
        });
    };
}

/**
 * 注解表单提交方法
 * 自动对表单进行dirty和验证处理
 * @param {string} name 要提交的表单模型
 */
export function SubmitForm(name: string): MethodDecorator {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const method = descriptor.value;
        descriptor.value = function (...arg) {
            const formGroup: FormGroup = Reflect.getMetadata(FORM_GROUP, target, name);
            if (!formGroup) {
                console.error(`${propertyKey}方法SubmitForm注解找不到表单对象`);
            }
            for (const i in formGroup.controls) {
                if (formGroup.controls.hasOwnProperty(i)) {
                    formGroup.controls[i].markAsDirty();
                    formGroup.controls[i].updateValueAndValidity();
                }
            }
            if (formGroup.valid) {
                return method.apply(this, arg);
            }
        };
          return descriptor;
    };
}

/**
 * 捕获该方法抛出的异常信息
 */
export function CatchError(): MethodDecorator {
    return function (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        const method = descriptor.value;
        descriptor.value = function (...arg: any) {
            try {
                return method.apply(this, arg);
            } catch (error) {
                console.error(`执行${propertyKey}方法出错`, error);
            }
        };
    };
}

/**
 * 获取环境变量中的属性值
 * @param envPropertyKey 属性名,用.可以获取里层属性
 * @example
 * @Value('env.API_DOMAIN.default')
 * private readonly url: string;
 */
export function Value(envPropertyKey?: string): PropertyDecorator {
    return function (target: any, propertyKey: string) {
        Reflect.defineProperty(target, propertyKey, {
            get() {
                if (envPropertyKey && envPropertyKey !== '') {
                    const keyArr = envPropertyKey.split('.');
                    const value = keyArr.reduce((prev, curr) => {
                        if (prev === undefined) {
                            return undefined;
                        }
                        return prev[curr];
                    }, environment);
                    return value;
                } else {
                    return environment[propertyKey];
                }
            }
        });
    };
}

/**
 * 设置该API请求类的请求基路径
 * @param baseUrl 该请求类的基路径
 * @param domain 环境配置中的请求域名简称,默认为default
 */
export function BaseUrl(baseUrl: string = '', domain: string = 'default'): PropertyDecorator {
    return function (target: any, propertyKey: string) {
        Reflect.defineProperty(target, propertyKey, {
            get() {
                if (typeof domain !== 'string') {
                    throw Error('@BaseUrl注解应传入String类型');
                }
                let _domain = environment.API_DOMAIN[domain];
                let _baseUrl = baseUrl;
                if (_domain === undefined) {
                    throw Error(`在该环境变量配置文件中的API_DOMAIN找不到${domain}对应的值`);
                } else {
                    if (_domain.endsWith('/') && _domain.length > 1) {
                        _domain = _domain.slice(0, -1);
                    }
                    if (typeof _baseUrl === 'string' && !_domain.startsWith('/') && _baseUrl.length > 1) {
                        _baseUrl = '/' + _baseUrl;
                    }
                }
                return _domain + _baseUrl;
            }
        });
    };
}
