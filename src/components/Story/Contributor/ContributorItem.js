import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Avatar, List } from 'antd';

class ContributorItem extends Component {

    handleClick = () => {
        this.props.dispatch({
            type: 'REMOVE_PENDING_CONTRIBUTOR',
            payload: this.props.item,
        })
    }

    render() {
        const { item, editMode } = this.props;
        
        // only lets editors remove contributors
        let itemClick;
        if(editMode) {
            itemClick = this.handleClick;
        }
        return (
            <List.Item onClick={itemClick}>
                <List.Item.Meta
                    avatar={<Avatar src={`${item.profile_pic}`} />}
                    title={`${item.first_name} ${item.last_name}`}
                />
            </List.Item>
        )
    }
};

export default connect()(ContributorItem);