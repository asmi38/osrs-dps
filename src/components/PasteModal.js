import React, { Component } from 'react'
import { receiveEquipment } from '../actions/equipment'
import { Modal, Button, Input } from 'antd'

//props show, toggle this.props.show, this.props.toggle()
class PasteModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      paste: '',
    }
  }

  handleChange = (e) => {
    this.setState({paste: e.target.value})
  }

  handleSubmit = () => {
    const decode = JSON.parse(atob(this.state.paste))
    this.props.dispatch(receiveEquipment(decode, this.props.actionKey))
    this.handleOk()
  }

  showModal = () => {
    this.props.setModal(true)
  }

  handleOk = () => {
    this.props.setModal(false)
  }

  handleCancel = () => {
    this.props.setModal(false)
  }

  render() {
    return(
      <div className='paste-modal'>
      <Button type="dashed" onClick={this.showModal}>
        Paste
      </Button>
      <Modal title="Import Gear Set" visible={this.props.modalVisible} onOk={this.handleOk} onCancel={this.handleCancel} okText="Confirm"
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={this.handleSubmit}>
            Submit
          </Button>
        ]}
      >
        <Input
          type="text"
          value={this.state.paste}
          onChange={this.handleChange}
          allowClear
          size="medium"
        />
      </Modal>
      </div>
    )
  }
}

export default PasteModal
