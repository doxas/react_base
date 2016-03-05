
import React      from 'react';
import ReactDOM   from 'react-dom';
import Flux       from 'flux';
import Store      from './stores/Store.js';
import Action     from './actions/Action.js';
import Constant   from './constants/Constant.js';
import Page       from './components/Page.jsx';

export default class App extends React.Component {
    constructor(props){
        super(props);
        var dispatcher = new Flux.Dispatcher();
        this.store     = new Store({dispatcher: dispatcher, props: props});
        this.action    = new Action({dispatcher: dispatcher, store: this.store, props: props});
        this.state     = {
            activePage: this.store.getActivePage(),
            pageCount: this.store.getPageCount(),
            pages: this.store.getAllPages()
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.onClick = this.onClick.bind(this);
        this.update = this.update.bind(this);
    }
    componentDidMount(){
        this.store.on(Constant.EMIT.UPDATE, this.update);
    }
    componentWillUnmount(){
        this.store.removeListener(Constant.EMIT.UPDATE, this.update);
    }
    onClick(eve){
        eve.preventDefault();
        eve.stopPropagation();
        this.action.update(eve);
    }
    update(){
        this.setState({activePage: this.store.getActivePage()});
    }
    styles(){
        return {
            app: {
                width: '100%',
                height: '100%',
                boxShadow: '0px 0px 0px 3px #333 inset'
            }
        };
    }
    render(){
        const styles = this.styles();
        var generator = ((value, key)=>{
            return (
                <Page action={this.action} store={this.store} key={key} content={value} />
            );
        }).bind(this);
        return (
            <div style={styles.app} onClick={this.onClick}>
                {this.state.pages.map(generator)}
            </div>
        );
    }
}

