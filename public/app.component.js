"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('angular2/core');
const user_component_1 = require('./users/user-component');
const user_instance_1 = require("./users/user-instance");
const native_window_service_1 = require("./users/native-window.service");
require("./app.component.css");
let AppComponent = class AppComponent {
    constructor(winRef) {
        this.winRef = winRef;
    }
    ngOnInit() {
        this.getUsers();
    }
    getUsers() {
        this.userList = this.winRef.nativeWindow.mainrtc.UI.userList.map(user => new user_instance_1.UserInstance(user.name, user.id));
    }
};
__decorate([
    core_1.HostListener('window:userList'), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], AppComponent.prototype, "getUsers", null);
AppComponent = __decorate([
    core_1.Component({
        selector: 'user-list',
        template: `<div class="users-online"> Online:</div>
        <user *ngFor="let user of userList" [winRef]="winRef" [user]="user"></user>`,
        directives: [user_component_1.UserComponent],
        providers: [native_window_service_1.WindowRef]
    }), 
    __metadata('design:paramtypes', [native_window_service_1.WindowRef])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map