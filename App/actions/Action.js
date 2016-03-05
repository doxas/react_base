
import ActionExec from './ActionExec.js';
import Constant   from '../constants/Constant.js';

export default class Action {
    constructor(props){
        this.dispatcher = props.dispatcher;
        this.store = props.store;
        this.exec = new ActionExec({store: this.store});
    }
    update(eve){
        let value = this.exec.update();
        this.dispatcher.dispatch({
            type: Constant.TYPE.UPDATE,
            value: value
        });
    }
}

