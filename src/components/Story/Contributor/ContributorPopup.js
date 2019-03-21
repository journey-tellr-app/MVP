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
                Return</Button>);
            footer.push(<Button key="submit"
                type="primary"
                loading={loading}
                onClick={this.handleOk}
                icon='usergroup-add'>
                Send Invites</Button>);
        }



        return (
            <div>
                <Button onClick={this.showModal}>
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

export default connect()(ContributorPopup);