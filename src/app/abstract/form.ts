import { FormGroup, AbstractControl } from '@angular/forms';

/* 表单操作工具抽象类 */
export abstract class AbsFormUtil {
    public validateForm: FormGroup;
    constructor() { }
    /**
     * 获取表单控制器
     * @param formControlName 要获取的表单控制器名称
     * @returns {AbstractControl} 返回表单控制器
     */
    getFormControl(formControlName): AbstractControl {
        return this.validateForm.controls[formControlName];
    }
    /**
     * 当移出焦点时去前后空格
     * @param formControlName 要去前后空格的表单控制器名称
     */
    trimOnBulr(formControlName) {
        this.getFormControl(formControlName).setValue(this.getFormControl(formControlName).value.trim());
    }
    /**
     * 将表单所有控制器标记为dirty
     */
    markAsDirty(): void {
        for (const i in this.validateForm.controls) {
            if (this.validateForm.controls.hasOwnProperty(i)) {
                this.validateForm.controls[i].markAsDirty();
                this.validateForm.controls[i].updateValueAndValidity();
            }
        }
    }
    /**
     * 提交表单
     */
    abstract onSubmit(): void;
    /**
     * 创建表单模型
     */
    abstract buildForm(): void;
}
