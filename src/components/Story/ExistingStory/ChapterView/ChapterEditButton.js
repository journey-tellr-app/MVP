import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

import { Modal, Button, Input } from 'antd';

class ChapterEditButton extends Component {
    state = {
        modalVisible: false,
        editedValue: null,
    }

    static propTypes = {
        valueToEdit: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    }

    handleModalBtn = (value) => {
        this.setState({ modalVisible: value, })
    }

    handleEdit = (e) => {
        console.log(e)
        this.setState({ editedValue: e.target.value })
    }

    render() {
        console.log(this.props);
        const { editedValue } = this.state;
        const { valueToEdit, name, type } = this.props;
        return (
            <div>
                <Button type="primary" onClick={() => this.handleModalBtn(true)}>{`Edit ${name}`} </Button>
                <Modal
                    title={`Editing ${type} ${name}`}
                    style={{ top: 20 }}
                    visible={this.state.modalVisible}
                    onOk={() => this.handleModalBtn(false)}
                    onCancel={() => this.handleModalBtn(false)}
                >
                    <Input.TextArea value={editedValue === null ? valueToEdit : editedValue} onChange={this.handleEdit} />
                </Modal>
            </div>
        )
    }
}

export default connect()(ChapterEditButton);