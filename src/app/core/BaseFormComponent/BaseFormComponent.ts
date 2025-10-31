import { Directive, EventEmitter, Input, OnInit, Output, signal } from "@angular/core";
import { FormGroup } from "@angular/forms";

export type formMode = 'create' | 'show' | 'edit';

@Directive()
export abstract class BaseFormComponent<T> implements OnInit{
    private _mode: formMode = 'show';
    @Input() data!: T;
    @Input() 
    set mode(value: formMode) {
        this._mode = value;
        this.updateMode(value);
    }
    get mode(): formMode {
        return this._mode;
    }
    @Input() backendErrors: Record<string, string[]> | null = null;
    @Output() save = new EventEmitter<T>();
    @Output() cancel = new EventEmitter<void>();
    @Output() modeChange = new EventEmitter<formMode>();

    form!: FormGroup;
    originalData = signal<T | null>(null);
    readonly = signal<boolean>(true);

    abstract buildForm(data?: T | null): FormGroup;
    abstract patchForm(data: T): void;
    abstract getValue(): T;

    ngOnInit(): void {
        this.form = this.buildForm(this.data);
        this.updateMode(this.mode);
    }

    ngOnChanges(): void {
        // Whenever backendErrors changes, attach to form
        if (this.backendErrors) {
        this.setBackendErrors(this.backendErrors);
        }
    }

    enterEditMode(): void {
        this.mode = 'edit';
        this.modeChange.emit(this.mode);
        this.readonly.set(false);
    }

    onCancel(): void {
        if (this.mode === 'edit') {
            const original = this.originalData();
            if (original) {
                this.patchForm(original);
            }
            this.readonly.set(true);
            this.mode = 'show';
            this.modeChange.emit(this.mode);
        } else if (this.mode === 'create') {
            this.cancel.emit();
        }
    }

    onSave(): void {
        this.save.emit(this.getValue());
    }

    private updateMode(mode: formMode) {
        switch (mode) {
            case 'show':
                this.readonly.set(true);
                if (this.data) this.originalData.set(this.data);
                break;
            case 'edit':
                this.readonly.set(false);
                if (this.data) this.originalData.set(this.data);
                break;
            case 'create':
                this.readonly.set(false);
                this.originalData.set(null);
                break;
        }
    }

    protected setBackendErrors(errors: Record<string, string[]>): void {
        if (!this.form) return;

        for (const key in errors) {
            if (this.form.controls[key]) {
                // Attach backend error to the control
                this.form.controls[key].setErrors({
                    ...this.form.controls[key].errors,
                    backend: errors[key].join(' '),
                });
            }
        }
    }

    getError(controlName: string, errorKey: string): string | null {
        const control = this.form.controls[controlName];
        return control?.errors?.[errorKey] ?? null;
    }
}