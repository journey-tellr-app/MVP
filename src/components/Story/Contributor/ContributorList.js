import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContributorItem from './ContributorItem';

import { List, Typography } from 'antd';

class ContributorList extends Component {
    render() {
        const { pendingContributors, storyContributors, editMode } = this.props;
        let dataSource = pendingContributors;

        //checks to see if list is being used on existing story view
        if (editMode !== undefined){
            dataSource = [...storyContributors, ...pendingContributors];
        }
        return (
            <div>
                <Typography align="center">
                    Click contributor to remove them.
                </Typography>
                {pendingContributors &&
                    <List
                        itemLayout="horizontal"
                        dataSource={dataSource}
                        renderItem={item => (
                            <ContributorItem item={item} editMode={editMode}/>
                        )}
                    />
                }
            </div>
        )
    }
};

const mapRStoProps = (rs) => {
    return { 
        pendingContributors: rs.contributor.pending,
        storyContributors: rs.storyDetail.contributor, 
    }
}

export default connect(mapRStoProps)(ContributorList);