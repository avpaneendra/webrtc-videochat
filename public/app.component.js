var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, HostListener } from '@angular/core';
import { UserInstance } from "./users/user-instance";
import { WindowRef } from "./users/native-window.service";
import "./app.component.css";
export let AppComponent = class AppComponent {
    constructor(winRef) {
        this.winRef = winRef;
    }
    ngOnInit() {
        this.getUsers();
    }
    getUsers() {
        this.userList = this.winRef.nativeWindow.mainrtc.UI.userList.map(user => new UserInstance(user.name, user.id));
    }
};
__decorate([
    HostListener('window:userList'), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], AppComponent.prototype, "getUsers", null);
AppComponent = __decorate([
    Component({
        selector: 'user-list',
        template: `<div class="users-online"> Online:</div>
        <user *ngFor="let user of userList" [winRef]="winRef" [user]="user"></user>`
    }), 
    __metadata('design:paramtypes', [WindowRef])
], AppComponent);
//directives: [UserComponent],
//providers: [WindowRef] 
