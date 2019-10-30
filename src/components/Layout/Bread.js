import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { ROUTER } from 'constant/router.js';
import { withNamespaces } from 'react-i18next';

class Bread extends React.Component {
    state = {
        showBread: false
    }
    handelBreaditem() {
        console.log(this.props.location, "=====>handelBreaditem")
    }
    render() {
        const { location, t } = this.props;
        let pathSnippets = location.pathname.split('/').filter(i => i);
        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
            return (
                <Breadcrumb.Item key={url} onClick={() => this.handelBreaditem}>
                    <Link to={url} >{t(ROUTER[url])}</Link>
                </Breadcrumb.Item>
            );
        });
        const breadcrumbItems = [
            <Breadcrumb.Item key="home">
                <Link to="/home">{t("Home")}</Link>
            </Breadcrumb.Item>,
        ].concat(extraBreadcrumbItems);

        const breadContent = extraBreadcrumbItems.length > 1 ? <Breadcrumb separator=">">{breadcrumbItems}</Breadcrumb> : null;

        return breadContent
    }
}
export default withNamespaces()(withRouter(Bread))
