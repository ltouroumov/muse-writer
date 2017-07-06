import {Component, Input, forwardRef, ElementRef, ViewChild, OnChanges, OnInit, OnDestroy} from '@angular/core';
import {NgControl, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'muse-medium-editor',
  template: `
    <div #host></div>
  `,
  styleUrls: [
    './medium-editor.component.scss',
  ],
})
export class MediumEditorComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
  @Input() options: any;
  @Input() placeholder: string;
  el: ElementRef;
  ngControl: NgControl;
  editor: any;
  @ViewChild('host') host: any;

  constructor(el: ElementRef, ngControl: NgControl) {
    this.el = el;
    if (ngControl) {
      ngControl.valueAccessor = this;
      this.ngControl = ngControl;
    }
  }

  propagateChange(_: any): void {
    // Empty
  }

  ngOnInit(): void {
    this.options = (typeof this.options === 'string') ? JSON.parse(this.options)
      : (typeof this.options === 'object') ? this.options : {};
    if (this.placeholder && this.placeholder !== '') {
      Object.assign(this.options, {
        placeholder: {text: this.placeholder},
      });
    }
    this.editor = new MediumEditor(this.host.nativeElement, this.options);
    this.editor.subscribe('editableInput', (event: any, editable: any) => {
      let value: any = this.editor.elements[0].innerHTML;
      this.ngOnChanges(value);
    });
  }

  ngOnDestroy(): void {
    if (this.editor) {
      this.editor.destroy();
    }
  }

  ngOnChanges(changes: any): void {
    this.propagateChange(changes);
  }

  writeValue(value: any): void {
    console.log(value);
    if (this.editor) {
      if (value && value !== '') {
        this.editor.setContent(value);
      }
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    // Empty
  }

}
