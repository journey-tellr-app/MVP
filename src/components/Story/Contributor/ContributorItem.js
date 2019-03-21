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
        let eHandler;
        if(editMode === undefined) {
            eHandler  = this.handleClick;
        }
        return (
            <List.Item onClick={eHandler}>
                <List.Item.Meta
                    avatar={<Avatar src={`${item.profile_pic}`} />}
                    title={`${item.first_name} ${item.last_name}`}
                />
            </List.Item>
        )
    }
};

export default connect()(ContributorItem);