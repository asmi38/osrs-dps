import React, { Component } from 'react'


//props show, toggle
class PasteModal extends Component{

  handleClick = () => {
    if(!this.props.show){
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false)
    }

    this.props.toggle()
  }

  handleOutsideClick = e => {
    if (!this.node.contains(e.target)){
     this.handleClick()
   }
  }
  render() {
    return(
        <div
          ref={node => {
            this.node = node;
          }}
        >
          <button onClick={this.handleClick}>Paste</button>
          {this.props.show && (
            <div className="modal">
              Modal here
              <button onClick={() => this.handleClick()}>close</button>
            </div>
          )}
        </div>
    )
  }
}

export default PasteModal
