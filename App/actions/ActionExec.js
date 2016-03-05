
export default class ActionExec {
    constructor(props){
        this.store = props.store;
    }
    update(){
        let len = this.store.getPageCount();
        return ++len;
    }
}

