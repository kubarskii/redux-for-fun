import {decrementAction, incrementAction, store} from "./store";
import React from "react";

const Wrapper = (config) => (Component) => class Wrapper extends React.Component {

    constructor(props) {
        super(props);
        this.additionalProps = {}
    }

    state = {
        value: 0,
    }

    componentWillUnmount() {
        store.unsubscribe();
    }

    componentDidMount() {
        store.subscribe(() => {
            const state = store.getState();
            const {stateToProps} = config;
            stateToProps.forEach(p => {
                this.additionalProps[p] = state[p];
            })
            this.setState((prevState) => ({...prevState, ...this.additionalProps}))
        })
    }


    render() {
        return (
            <Component {...this.props} {...this.state}></Component>
        )
    }

}

function App(props) {

    const {value, name} = props;
    console.log(name);

    return (
        <>
            <div>
                {value}
            </div>
            <div>{name}</div>
            <div>
                <button onClick={() => {
                    store.dispatch(incrementAction(10))
                }}>Increase
                </button>
                <button onClick={() => {
                    store.dispatch(decrementAction(10))
                }}>Decrease
                </button>
            </div>
        </>)
}

export default Wrapper({stateToProps: ["value", "name"]})(App);

