import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, ToastController } from 'ionic-angular';
import { Events, Content, TextInput } from 'ionic-angular';
import { ChatService, ChatMessage, UserInfo } from "../../../providers/chat-service";

@IonicPage()
@Component({
  selector: 'page-candidate-chat',
  templateUrl: 'candidate-chat.html',
})
export class CandidateChatPage {

   @ViewChild(Content) content: Content;
    @ViewChild('chat_input') messageInput: TextInput;
    msgList: ChatMessage[] = [];
    user: UserInfo;
    toUser: UserInfo;
    editorMsg = '';
    editorSwitch : boolean;

    constructor(navParams: NavParams,
                private chatService: ChatService,
                private toastCtrl: ToastController,
                private events: Events,) {
        this.editorSwitch = true;
        // Get the navParams toUserId parameter
        this.toUser = {
            id: "210000198410281948",
            name:"CODHAB"

        };
        // Get mock user information
        this.chatService.getUserInfo()
        .then((res) => {
            this.user = res
        });

    }

    ionViewWillLeave() {
        // unsubscribe
        this.events.unsubscribe('chat:received');
    }

    ionViewDidEnter() {
        //get message list
        this.getMsg();

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
    private getMsg() {
        // Get mock message list
        return this.chatService
        .getMsgList()
        .subscribe(res => {
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
            messageId: Date.now().toString(),
            userId: this.user.id,
            userName: this.user.name,
            userAvatar: this.user.avatar,
            toUserId: this.toUser.id,
            time: Date.now(),
            message: this.editorMsg,
            status: 'pending'
        };

        this.pushNewMsg(newMsg);
        this.editorMsg = '';

        this.chatService.sendMsg(newMsg)
        .then(() => {
            let index = this.getMsgIndexById(id);
            if (index !== -1) {
                this.msgList[index].status = 'success';
                this.editorSwitch = false
            }
        })
    }

    /**
     * @name pushNewMsg
     * @param msg
     */

    pushNewMsg(msg: ChatMessage) {
        const userId = this.user.id,
        toUserId = this.toUser.id;
        // Verify user relationships
        if (msg.userId === userId && msg.toUserId === toUserId) {
            this.msgList.push(msg);
            let toast = this.toastCtrl.create({
                message: 'Você só poderá enviar uma nova mensagem após a resposta da CODHAB',
                position: 'bottom',
                duration: 2000,
                dismissOnPageChange: true
            });
            toast.present();
        } else if (msg.toUserId === userId && msg.userId === toUserId) {
        
            this.editorSwitch = true;
            this.msgList.push(msg);
        }
        this.scrollToBottom();
    }

    getMsgIndexById(id: string) {
    
        return this.msgList.findIndex(e => e.messageId === id)
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