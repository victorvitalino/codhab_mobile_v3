import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, ToastController } from 'ionic-angular';
import { Events, Content, TextInput } from 'ionic-angular';
import { ChatService, ChatMessage } from "../../../providers/chat-service";
import { CandidateChatProvider } from '../../../providers/candidate-chat/candidate-chat';
import { UserDataProvider } from '../../../providers/user-data/user-data';



@IonicPage()
@Component({
    selector: 'page-candidate-chat',
    templateUrl: 'candidate-chat.html',
})
export class CandidateChatPage {

    @ViewChild(Content) content: Content;
    @ViewChild('chat_input') messageInput: TextInput;
    msgList: ChatMessage[] = [];
    editorMsg = '';
    editorSwitch : boolean;
    token :string = '';
    constructor(navParams: NavParams,
                private chatService: ChatService,
                private toastCtrl: ToastController,
                private candidateChat: CandidateChatProvider,
                private candidateData: UserDataProvider,
                private events: Events,) {
        this.editorSwitch = true;

        this.candidateData.getData().then((response) =>{
            this.candidateChat.getChats(response.auth)
            .subscribe((resp)=>{
                console.log(resp)
            })
        })
        

    }

    ionViewWillLeave() {
        // unsubscribe
        this.events.unsubscribe('chat:received');
    }

    ionViewDidEnter() {
        this.candidateData.getData().then((resp)=>{
            this.token = resp.auth;
            //get message list
            this.getMsg(this.token);
        })
        // Subscribe to received  new message events
        this.events.subscribe('chat:received', msg => {
            this.pushNewMsg(msg);
        })
    }

    onFocus() {
        this.content.resize();
        this.scrollToBottom();
    }

    displayChat(){
        return this.editorSwitch;
    }


    
    /**
     * @name getMsg
     * @returns {Promise<ChatMessage[]>}
     */
    private getMsg(token) {
        // Get mock message list
        return this.chatService
            .getMsgList(token)
        .subscribe(res => {
            console.log(res)
            this.msgList = res;
            this.scrollToBottom();
        });
    }

    /**
     * @name sendMsg
     */
    sendMsg() {
        if (!this.editorMsg.trim()) return;

        // Mock message
        const id = Date.now().toString();
        let newMsg: ChatMessage = {
            content: this.editorMsg
        };

        this.pushNewMsg(newMsg);
        this.editorMsg = '';
        this.chatService.sendMsg(newMsg,this.token)
        .subscribe((resp) => {
            console.log(resp)
        })
    }

    /**
     * @name pushNewMsg
     * @param msg
     */

    pushNewMsg(msg: ChatMessage) {
        console.log(msg)
            this.msgList.push(msg);
            // let toast = this.toastCtrl.create({
            //     message: 'Você só poderá enviar uma nova mensagem após a resposta da CODHAB',
            //     position: 'bottom',
            //     duration: 2000,
            //     dismissOnPageChange: true
            // });
            // toast.present();
        this.scrollToBottom();
    }
    
    scrollToBottom() {
        setTimeout(() => {
            if (this.content.scrollToBottom) {
                this.content.scrollToBottom();
            }
        }, 400)
    }
    callToast() {
        let toast = this.toastCtrl.create({
            message: 'Você só poderá enviar uma nova mensagem após a resposta da CODHAB',
            position: 'top',
            showCloseButton: true,
            dismissOnPageChange: true
        });

        toast.present();
    }
}