import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContributorForm from './ContributorForm';
import ContributorList from './ContributorList';

import { Modal, Button, } from 'antd';

class ContributorPopup extends Component {
    state = {
        loading: false,
        visible: false,
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleCancel = () => {
        this.props.dispatch({ type: "RESET_PENDING_CONTRIBUTOR" })
        this.setState({ visible: false });
    }

    handleInvite = () => {
        const fullPayload = {
            story_id: this.props.story_id,
            pendingContributor: this.props.pendingContributor
        }
        this.props.dispatch({ type: 'ADD_CONTRIBUTOR', payload: fullPayload});
        this.setState({ visible: false });
    }

    render() {
        const { visible, loading } = this.state;
        const { editMode } = this.props;
        const footer = [];
        //some logic here to only show footer on edit page
        if (editMode) {

        }

        let ContributorBtnName = 'View Contributors';
        let title = 'Story Contributors';
        //some logic to change button name based on edit/view and  
        // whether there are many contributors, none, or one
        if (editMode) {
            ContributorBtnName = 'Add Contributors';
            title = 'Inviting Contributors to Story'
            //adds footer actions for editors
            footer.push(<Button key="back"
                onClick={this.handleCancel}>
                Cancel</Button>);
            footer.push(<Button key="submit"
                type="primary"
                loading={loading}
                onClick={this.handleInvite}
                icon='usergroup-add'>
                Send Invites</Button>);
        }



        return (
            <div>
                <Button onClick={this.showModal}
                    className='edit-button'   >
                    {ContributorBtnName}</Button>
                <Modal
                    visible={visible}
                    title={title}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={footer}>
                    {editMode === true &&
                        <ContributorForm />
                    }
                    <ContributorList editMode={editMode}/>
                </Modal>
            </div>
        );
    }
}

const mapRStoProps = (rs) => {
    return {
        pendingContributor: rs.contributor.pending
    }
}

export default connect(mapRStoProps)(ContributorPopup);