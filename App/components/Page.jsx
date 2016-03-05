// import =====================================================================
import React    from 'react';
import ReactDOM from 'react-dom';

// default class
export default class Page extends React.Component {
    constructor(props){
        super(props);
        this.action  = this.props.action;
        this.store   = this.props.store;
        this.content = this.props.content;
    }
    componentDidMount(){
        // this.store.on(Const.UPDATE, this.update);
    }
    componentWillUnmount(){
        // this.store.removeListener(Const.UPDATE, this.update);
    }
    styles(){
        return {
            container: {
                padding: '30px'
            },
            page: {
                backgroundColor: 'silver',
                color: 'slategray',
                lineHeight: '100px',
                width: '100%',
                height: '100px'
            }
        };
    }
    render(){
        const styles = this.styles();
        return (
            <div style={styles.container}>
                <div style={styles.page}>{this.content}</div>
            </div>
        );
    }
}

