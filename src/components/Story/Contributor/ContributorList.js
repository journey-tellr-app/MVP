import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContributorItem from './ContributorItem';

import { List } from 'antd';

class ContributorList extends Component {
    render() {
        const { pendingContributors } = this.props;
        return (
            <div>
                {pendingContributors &&
                    <List
                        itemLayout="horizontal"
                        dataSource={pendingContributors}
                        renderItem={item => (
                            <ContributorItem item={item} />
                        )}
                    />
                }
            </div>
        )
    }
};

const mapRStoProps = (rs) => {
    return { pendingContributors: rs.contributor.pending }
}

export default connect(mapRStoProps)(ContributorList);