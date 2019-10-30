import React from 'react';
import { createHashHistory } from 'history';
import { withNamespaces } from 'react-i18next';
import { Button } from 'antd';
import './style.less';

const history = createHashHistory();

class Homepage extends React.Component {
    jumpToPage(page) {
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
        const { t } = this.props;
        return (
            <div className="homepage">
                <div>
                    <Button type="primary" onClick={() => this.jumpToPage('business_order')}>{t('Slicing Business Order')}</Button>
                    <Button type="primary" onClick={() => this.jumpToPage('order_mgt')}>{t('Slicing Order Management')}</Button>
                    <Button type="primary" onClick={() => this.jumpToPage('business_mgt')}>{t('Slicing Business Management')}</Button>
                    <Button type="primary" onClick={() => this.jumpToPage('business_monitor')}>{t('Slicing Business Monitor')}</Button>
                </div>
            </div>
        );
    }
}

export default withNamespaces()(Homepage)
