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
require('./user-component.css');
const popover_component_1 = require('./popover/popover-component');
let UserComponent = class UserComponent {
    over() {
        this.popOver = true;
    }
    out() {
        setTimeout(() => this.popOver = false, 2000);
    }
    callUser() {
        console.log("calluser", this.winRef.nativeWindow.mainrtc);
        this.winRef.nativeWindow.mainrtc.UI.userCall(this.user.name);
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', Object)
], UserComponent.prototype, "winRef", void 0);
__decorate([
    core_1.HostListener('mouseover'), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], UserComponent.prototype, "over", null);
__decorate([
    core_1.HostListener('mouseleave'), 
    __metadata('design:type', Function), 
    __metadata('design:paramtypes', []), 
    __metadata('design:returntype', void 0)
], UserComponent.prototype, "out", null);
UserComponent = __decorate([
    core_1.Component({
        selector: "user",
        template: `
        <div class="user-root">
            <pop-over [popOver]="popOver"></pop-over>
            <div class="user-preview">
                <div class="user-inf">
                        <div class="user-main">
                            <div id="user-name">{{ user.name}}</div> 
                            <div id="dot"></div>
                        </div>
                        <div id="user-status"> {{"Hi, wanna sing you a song"}}</div>          
                </div>
                <div class="user-call">
                    <img (click)='callUser()' id="icon-call"/>
                </div>
            </div>
        </div>`,
        directives: [popover_component_1.PopOver],
        inputs: ['user']
    }), 
    __metadata('design:paramtypes', [])
], UserComponent);
exports.UserComponent = UserComponent;
//# sourceMappingURL=user-component.js.map