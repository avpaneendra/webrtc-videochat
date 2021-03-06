var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, HostListener } from '@angular/core';
import './popover-component.css';
export let PopOver = class PopOver {
    constructor() {
        this.popOver = false;
        this.popThis = false;
    }
    over() {
        this.popThis = true;
    }
    out() {
        this.popThis = false;
    }
};
__decorate([
    Input(), 
    __metadata('design:type', Boolean)
], PopOver.prototype, "popOver", void 0);
__decorate([
    HostListener('mouseover'), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], PopOver.prototype, "over", null);
__decorate([
    HostListener('mouseleave'), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], PopOver.prototype, "out", null);
PopOver = __decorate([
    Component({
        selector: 'pop-over',
        template: `<div *ngIf="popOver || popThis" class="user-details">Detailed information</div>`
    }), 
    __metadata('design:paramtypes', [])
], PopOver);
