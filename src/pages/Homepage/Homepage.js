import React from 'react';
import { createHashHistory } from 'history';
import { withNamespaces } from 'react-i18next';
import { Row, Col } from 'antd';
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
            desp: t('Slicing Business Order Desp'),
            link: "business_order"
        }, {
            img: OrdermanagePicture,
            title: t('Slicing Order Management'),
            desp: t('Slicing Order Management Desp'),
            link: "order_mgt"
        }, {
            img: BusinessmanagePicture,
            title: t('Slicing Business Management'),
            desp: t('Slicing Business Management Desp'),
            link: "business_mgt"
        }, {
            img: BusinessmonitorPicture,
            title: t('Slicing Business Monitor'),
            desp: t('Slicing Business Monitor Desp'),
            link: "business_monitor"
        }]
        return (
            <div className="homepage">
                <div style={{ position: 'relative' }}>
                    <img className="homepage_img" alt="header" src={HeaderPicture} />
                    <div className="homepage_text">
                        <p className="homepage_text__main animated fadeInDown delay-0.5s">{t('Picture Title')}</p>
                        <hr className="homepage_text__divid animated fadeInLeft delay-1s" />
                        <p className="homepage_text__sub animated fadeInDown delay-1s">{t('Picture Sub Title')}</p>
                    </div>
                </div>
                <div className="homepage_entry">
                    <Row type="flex" justify="space-around">
                        {
                            cardList.map((item, index) =>
                                <Col span={6}> <Qiuckcard key={index + 1} sourceData={item} /></Col>

                            )
                        }
                        {/* <Col span={4}>col-4</Col>
                        <Col span={4}>col-4</Col>
                        <Col span={4}>col-4</Col>
                        <Col span={4}>col-4</Col> */}
                    </Row>
                    {/* {
                        cardList.map((item, index) =>
                            <Qiuckcard key={index + 1} sourceData={item} />
                        )
                    } */}
                </div>
            </div>
        );
    }
}

export default withNamespaces()(Homepage)
