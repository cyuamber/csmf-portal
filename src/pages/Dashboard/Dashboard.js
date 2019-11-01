import React from 'react';
import { withNamespaces } from 'react-i18next';

class Dashboard extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <div>
                <p>{t('Slicing Business Order')}</p>
            </div>
        );
    }
}

export default withNamespaces()(Dashboard)
