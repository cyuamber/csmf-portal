import React from 'react';
import { createHashHistory } from 'history';
import './style.less';

const history = createHashHistory();

class Quickcard extends React.Component {
    jumpToPage(page) {
        console.log(page)
        switch (page) {
            case 'business_order':
                history.push('/businessorder');
                break;
            case 'order_mgt':
                history.push('/ordermgt');
                break;
            case 'business_mgt':
                history.push('/businessmgt');
                break;
            case 'business_monitor':
                history.push('/businessmonitor');
                break;
            default:
                break;
        }
    }
    render() {
        const { sourceData } = this.props;
        return (
            <div className="homepage_card" onClick={() => this.jumpToPage(sourceData.link)}>
                <div className="homepage_card__top">
                    <img alt="order" src={sourceData.img} />
                    <p className="title">{sourceData.title}</p>
                </div>
                <div className="homepage_card__bottom">
                    <p className="desp">{sourceData.desp}</p>
                </div>
            </div>
        );
    }
}

export default Quickcard
