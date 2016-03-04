// import =====================================================================
import Const from '../constants/Const.js';

export default class Action {
    constructor(props){
        this.dispatcher = props.dispatcher;
    }
    update(eve){
        this.dispatcher.dispatch({
            type: Const.ACTION.UPDATE,
            eve: eve
        });
    }
}

