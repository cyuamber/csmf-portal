import React from 'react';
import { createHashHistory } from 'history';
import { withNamespaces } from 'react-i18next';
import { Button } from 'antd';
import './style.less';

import Qiuckcard from './Quickcard';
import HeaderPicture from 'src/assets/image/homeheader.png';

import OrderPicture from 'src/assets/image/businessorder.png';
import OrdermanagePicture from 'src/assets/image/ordermanage.png';
import BusinessmanagePicture from 'src/assets/image/businessmanage.png';
import BusinessmonitorPicture from 'src/assets/image/businessmonitor.png';

const history = createHashHistory();

class Homepage extends React.Component {

    render() {
        const { t } = this.props;
        const cardList = [{
            img: OrderPicture,
            title: t('Slicing Business Order'),
            desp: "满足各类网络互连需求，方便快捷，一站式完成网络切片服务订购。",
            link: "business_order"
        }, {
            img: OrdermanagePicture,
            title: t('Slicing Order Management'),
            desp: "订单查询、订单退订、订单续费等服务。",
            link: "order_mgt"
        }, {
            img: BusinessmanagePicture,
            title: t('Slicing Business Management'),
            desp: "On-demand进行切片激活和去激活，达到最省钱方式使用切片。",
            link: "business_mgt"
        }, {
            img: BusinessmonitorPicture,
            title: t('Slicing Business Monitor'),
            desp: "实时监控切片业务的运行情况，接入用户，以及切片的健康状态。",
            link: "business_monitor"
        }]
        return (
            <div className="homepage">
                <div style={{ position: 'relative' }}>
                    <img alt="header" src={HeaderPicture} />
                    <div className="homepage_text">
                        <p className="homepage_text__main">5G网络切片服务</p>
                        <hr className="homepage_text__divid" />
                        <p className="homepage_text__sub">助力企业数字化转型</p>
                    </div>
                </div>
                <div className="homepage_entry">
                    {
                        cardList.map((item, index) =>
                            <Qiuckcard key={index + 1} sourceData={item} />
                        )
                    }
                </div>
            </div>
        );
    }
}

export default withNamespaces()(Homepage)
