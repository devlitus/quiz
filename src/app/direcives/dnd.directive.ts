import { Directive, HostListener, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
export interface FileHandle {
  file: File;
  url: SafeUrl;
}

@Directive({
  selector: '[appDnd]',
})
export class DndDirective {
  @Output() files: EventEmitter<FileHandle> = new EventEmitter();
  constructor(private sanitizer: DomSanitizer) {}

  @HostListener("dragover", ["$event"]) public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
  }
  @HostListener("dragleave", ["$event"]) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
  }
  @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();

    let files: FileHandle;
    if(evt.dataTransfer) {
      for (let i = 0; i < evt.dataTransfer.files.length; i++) {
        const file = evt.dataTransfer.files[i];
        const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
        this.files.emit({file, url})
      }
      
    }
  }
}
