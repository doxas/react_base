
import Event        from 'events';
import EventEmitter from 'eventemitter3'
import Constant     from '../constants/Constant.js';

export default class Store extends Event.EventEmitter {
    constructor(props){
        super(props);
        this.pages = [];
        this.activePage = 0;
        this.dispatcher = props.dispatcher;
        this.dispatcher.register((payload)=>{
            this.pages[payload.value - 1] = 'hello react';
            if(payload.type === Constant.TYPE.UPDATE){
                this.emit(Constant.EMIT.UPDATE);
            }
        });
    }
    getActivePage(){
        return this.activePage;
    }
    getPageCount(){
        return this.pages.length;
    }
    getAllPages(){
        return this.pages;
    }
}

