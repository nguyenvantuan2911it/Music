import { Button, message, Modal } from "antd"
import router from "next/router"

export interface ModalDLTrackProps {
   visible:boolean, 
    setVisible :any,
   title:String,
  }

const ModalDownload =(props:ModalDLTrackProps)=>{
    const {visible,  title,setVisible}=props
    const handleCancel=()=>{
        setVisible(false)
    }
    const handleOk=()=>{
       router.push("/pricing")
    }
    const handleContact=()=>{
        message.success("We have develop function later!")
    }
    return(
    <Modal
        visible={visible}
        title={title}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button  onClick={handleContact} className="border-slate-900">
            Contact Us
          </Button>,
          <Button key="submit" type="primary" className="bg-cyan-600" onClick={handleOk}>
           Explore pricing 
          </Button>,
          
        ]}
      >
        <p>It’s a good sign that you like our music, but you need a subscription to download more tracks. You can also buy single tracks for a one-off production, whatever suits you best.</p>
        
      </Modal>)
}
export default ModalDownload