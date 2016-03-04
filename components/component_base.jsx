// import =====================================================================
import React  from 'react';
import Flux   from 'flux';
import Action from '../actions/Action.js';
import Store  from '../stores/Store.js';
import Const  from '../constants/Const.js';

// default class
export default class Field extends React.Component {
    constructor(props){
        super(props);
        this.dispatcher = new Flux.Dispatcher;
        this.action     = new Action({dispatcher: dispatcher, props: props});
        this.store      = new Store({dispatcher: dispatcher, props: props});
        this.state      = this.store.getStoreState();
    }
    componentDidMount(){
        this.store.on(Const.UPDATE, this.update);
    }
    componentWillUnmount(){
        this.store.removeListener(Const.UPDATE, this.update);
    }
    update(eve){
        eve.preventDefault();
        eve.stopPropagation();
        this.setState(store.getStoreState());
    }
    styles(){
        return {
            field: {
                margin: '20px',
                width: '96px',
                display: 'inline-block'
            }
        };
    }
    render(){
        const styles = this.styles();
        generator(value, index)=>{
            return (
                <Cell action={this.cellAction} id={'cells' + index} key={'cells' + index} value={this.state.values[index]} />
            );
        }
        return (
            <div>
                <div id="field" style={style.field}>
                    {this.state.values.map(generator, this)}
                </div>
                <div id="info">{this.state.info}</div>
            </div>
        );
    }
}

