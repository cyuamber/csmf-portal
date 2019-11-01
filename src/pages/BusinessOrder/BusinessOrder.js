import React from 'react';
import { Link } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import { Button, Card } from "antd";

import Ordermgt1 from 'src/assets/image/ordermgt1.svg';
import Ordermgt2 from 'src/assets/image/ordermgt2.svg';
import Ordermgt3 from 'src/assets/image/ordermgt3.svg';

import './BusinessOrder.less';

class BusinessOrder extends React.Component {
    render() {
        const { t } = this.props;
        const serviceList = [
            {
                icon: Ordermgt1,
                title: t("Slicing Order First Title"),
                desp: t("Slicing Order First Desp"),
                purchase_router: "/businessorder/detail",
                ifPurchasable: true
            },
            {
                icon: Ordermgt2,
                title: t("Slicing Order Second Title"),
                desp: t("Slicing Order Second Desp"),
                purchase_router: "",
                ifPurchasable: false
            },
            {
                icon: Ordermgt3,
                title: t("Slicing Order Third Title"),
                desp: t("Slicing Order Third Desp"),
                purchase_router: "",
                ifPurchasable: false
            },

        ];
        const cardItem = serviceList.map((_, index) =>

            <Card.Grid key={index + 1} className="businessorder_content" style={{ width: '100%' }}>
                <div className="businessorder_content__left">
                    <img alt="ordericon" src={_.icon} />
                    <p className="title">{_.title}</p>
                    <p className="desp">{_.desp}</p>
                </div>
                <div className="businessorder_content__right">
                    {_.ifPurchasable ?
                        <Link to={_.purchase_router}> <Button type="primary">{t('Purchase')}</Button></Link>
                        : null
                    }
                </div>
            </Card.Grid>


        )
        return (
            <div className="businessorder">
                <Card className="businessorder_title" title={t('Slicing Business Order')} bordered={true}>
                    {cardItem}
                </Card>
            </div>
        );
    }
}

export default withNamespaces()(BusinessOrder)
