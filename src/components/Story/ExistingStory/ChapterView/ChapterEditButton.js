import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import { Modal, Button, Input, Icon } from 'antd';

class ChapterEditButton extends Component {
    state = {
        modalVisible: false,
        editedValue: null,
    }

    static propTypes = {
        valueToEdit: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
    }

    handleModalBtn = (value, e) => {
        this.setState({ modalVisible: value, })
    }

    handleEdit = (e) => {
        // console.log(e)
        this.setState({ editedValue: e.target.value })
    }

    handleSubmit = () => {
        // console.log('in submit');
        const { editedValue } = this.state;
        let { name, id } = this.props;
        if(editedValue !== null){
            this.props.dispatch({
                type: 'EDIT_CHAPTER',
                payload: {
                    id: id,
                    colName: name,
                    updatedValue: editedValue,
                },
            })
        }
    }

    render() {
        // console.log(this.props);
        const { editedValue } = this.state;
        const { valueToEdit, name, type, action } = this.props;
        return (
            <div>
                <Button type="default" icon='edit' onClick={this.handleModalBtn.bind(this, true)}>{`${name}`} </Button>
                <Modal
                    title={`Editing ${type} ${name}`}
                    style={{ top: 20 }}
                    visible={this.state.modalVisible}
                    onOk={this.handleSubmit}
                    onCancel={() => this.handleModalBtn(false)}
                >
                    <Input.TextArea value={editedValue === null ? valueToEdit : editedValue} onChange={this.handleEdit} />
                </Modal>
            </div>
        )
    }
}

export default connect()(ChapterEditButton);