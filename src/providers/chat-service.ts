import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { map } from 'rxjs/operators/map';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

export class ChatMessage {
    content: string;
}

export class UserInfo {
    id: string;
    name?: string;
    avatar?: string;
}

@Injectable()
export class ChatService {

    constructor(private http: Http,
                private events: Events) {
    }

    mockNewMsg(msg) {
        const mockMsg: ChatMessage = msg.message
                    // const mockMsg: ChatMessage = {
                    //         content: msg.message
                    // };

        // setTimeout(() => {
        //     this.events.publish('chat:received', mockMsg, Date.now())
        // }, Math.random() * 10000)
    }

    // getMsgList(token): Observable<ChatMessage[]> {
    getMsgList(token){
        let myHeaders = new Headers();
        myHeaders.set('Content-Type', 'application/json');
        myHeaders.set('Accept', 'text/plain');
        myHeaders.set('Authorization', token)
        const msgListUrl = './assets/mock/msg-list.json';
        return this.http.get('/pc/attendance/chat_comments', { headers: myHeaders })
        .pipe(map(this.extractData));
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data;
    }
    // sendMsg(msg: ChatMessage) {
    //     return new Promise(resolve => setTimeout(() => resolve(msg), Math.random() * 1000))
    //     .then(() => this.mockNewMsg(msg));
    // }
    sendMsg(msg: ChatMessage,token) {
        let content = msg.content

        let myHeaders = new Headers();
        myHeaders.set('Content-Type', 'application/json');
        myHeaders.set('Accept', 'text/plain');
        myHeaders.set('Authorization', token)
        return this.http.post('/pc/attendance/chat_comments', { content: content, attendant:false }, { headers: myHeaders,})
        .map((resp) =>{
            console.log(resp)
        })
    }

    getUserInfo(): Promise<UserInfo> {
        const userInfo: UserInfo = {
            id: '140000198202211138',
            name: 'Maria de Jesus',
            avatar: './assets/images/profile-1.jpg'
        };
        return new Promise(resolve => resolve(userInfo));
    }
    

}
