import {Page} from 'ionic-angular';
import {NgZone} from 'angular2/core';


@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    static get parameters() {
        return [NgZone];
    }
    constructor(ngzone) {
        this.zone = ngzone;
        this.chats = [];
        this.chatinp ='';
        this.socket = io('http://localhost:3000');
        this.socket.on('message', (msg) => {
            this.zone.run(() => {
                this.chats.push(msg);
            });
        });
    }
    
    send(msg) {
        if(msg != ''){
            this.socket.emit('message', msg);
        }
        this.chatinp = '';
    }
}
