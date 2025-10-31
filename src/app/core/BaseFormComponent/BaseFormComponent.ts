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
        if (this.form.valid) {
            this.save.emit(this.getValue());

            if (this.mode === 'edit') {
                this.readonly.set(true);
                this.mode = 'show';
                this.modeChange.emit(this.mode);
            }
        } else {
            this.form.markAllAsTouched();
        }
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
}