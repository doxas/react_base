// import =====================================================================
import Event from 'events';
import EventEmitter from 'eventemitter3'
import CellConst from '../constants/cellConst.js';

export default class CellStore extends Event.EventEmitter {
    constructor(props){
        super(props);
        this.storeState = {
            values: [],
            player: true,
            finished: false,
            marker: {
                p: props.props.player,
                e: props.props.enemy,
            },
            info: ''
        };
        for(var i = 0; i < 9; ++i){
            this.storeState.values[i] = '';
        }

        this.dispatcher = props.dispatcher;
        this.dispatcher.register((payload)=>{
            if(payload.type === CellConst.ACTION.CLICK_CELL){
                if(this.storeState.finished){return;}
                var e = payload.eve.target;
                var f = false;
                var i = parseInt(e.id.match(/\d/));
                var arr = [];
                for(var j = 0; j < this.storeState.values.length; ++j){
                    if(i !== j || this.storeState.values[j] !== ''){
                        arr[j] = this.storeState.values[j];
                    }else{
                        if(this.storeState.player){
                            arr[j] = this.storeState.marker.p;
                        }else{
                            arr[j] = this.storeState.marker.e;
                        }
                        this.storeState.values[j] = arr[j];
                        this.storeState.player = !this.storeState.player;
                        f = true;
                    }
                }
                if(f){this.judge(arr);}
                this.emit(CellConst.EVENT.CLICK, payload.eve);
            }
        });
    }
    judge(arr){
        var i, j;
        var f = false;
        for(i = 0; i < 3; ++i){
            if(arr[i] !== ''){
                f = f || (arr[i] === arr[i + 3] && arr[i] === arr[i + 6]);
            }
            j = i * 3;
            if(arr[j] !== ''){
                f = f || (arr[j] === arr[j + 1] && arr[j] === arr[j + 2]);
            }
        }
        if(arr[0] !== ''){
            f = f || (arr[0] === arr[4] && arr[0] === arr[8]);
        }
        if(arr[2] !== ''){
            f = f || (arr[2] === arr[4] && arr[2] === arr[6]);
        }
        if(f){
            if(!this.storeState.player){
                this.storeState.info = '＼(^o^)／';
            }else{
                this.storeState.info = '(´;ω;`)ﾌﾞﾜｯ';
            }
            this.storeState.finished = true;
        }else{
            f = true;
            for(i = 0; i < arr.length; ++i){
                f = f && arr[i] !== '';
            }
            if(f){
                this.storeState.info = '┌(┌^o^)┐';
                this.storeState.finished = true;
            }
        }
    }
    getStoreState(){
        return this.storeState;
    }
}

