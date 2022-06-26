import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {CustomSocket} from "../../components/shared/custom/custom-socket";
import {Conversation} from "../models/conversation.model";
import {Observable} from "rxjs";
import {Message, MessageDto} from "../models/message.model";

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(
    private socket: CustomSocket,
    private snackBar: MatSnackBar) {
  }

  sendMessage(message: MessageDto) {
    this.socket.emit('addMessage', message)
  }

  getMessages(): Observable<Message[]> {
    return this.socket.fromEvent<Message[]>('messages')
  }

  joinConversation(conversation: Conversation) {
    this.socket.emit('joinConversation', conversation)
  }

  leaveConversation(conversation: Conversation) {
    this.socket.emit('leaveConversation', conversation)
  }

  getMessage(): Observable<Message[]> {
    return this.socket.fromEvent<Message[]>('messages');
  }

  getAddedMessage(): Observable<Message> {
    return this.socket.fromEvent<Message>('messageAdded');
  }

  async getUserConversations(): Promise<Observable<Conversation[]>> {
    return this.socket.fromEvent<Conversation[]>('conversations');
  }

  createRoom(conversation: Conversation) {
    this.socket.emit('createConversation', conversation)
    this.snackBar.open(`User ${conversation.id} created succesfully`, 'Close', {
      duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
    })
  }
}
