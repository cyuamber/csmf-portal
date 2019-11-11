import React, { Component } from 'react';
import './style.less';

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    // componentDidMount(){
    //     this.preventDefault();
    // }
    preventDefault() {
        document.body.style.overflow = "hidden";
    }
    render() {
        const { showLoading } = this.props;
        if (showLoading) {
            this.preventDefault();
        } else {
            document.body.style.overflow = "auto";
        }
        return (
            <div id="loading">
                {showLoading ?
                    <div className="loading">
                        <div className="scene">
                            <div className="k-line k-line-1" ></div>
                            <div className="k-line k-line-2" ></div>
                            <div className="k-line k-line-3" ></div>
                            <div className="k-line k-line-4" ></div>
                            <div className="k-line k-line-5" ></div>
                        </div>
                    </div>
                    : null}
            </div>
        );
    }
}

export default Loading;