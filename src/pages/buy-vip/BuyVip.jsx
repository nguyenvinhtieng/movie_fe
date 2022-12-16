import React, { useEffect, useState } from 'react'
import { IoCopy } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { path } from '../../API/apiPath';
import CustomModal from '../../components/CustomModal/CustomModal';
import Header from '../../components/Header/Header'
import request from '../../services/request';
function formatCountdownTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;
  return `${minutes < 10 ? "0": ""}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
export default function BuyVip() {
  const {auth, plan} = useSelector(state => state)
  const [time, setTime] = useState(10*60); // 10 minutes
  const [isCopy, setIsCopy] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({})
  useEffect(()=>{
    let timer = setInterval(() => {
      setTime(time => time - 1);
    }, 1000)
    return () => clearInterval(timer);
  }, [])

  const copyTranferCode = () => {
    navigator.clipboard.writeText(`${auth.user.username.toUpperCase()}BUYVIP`);
    setIsCopy(true);
    setTimeout(() => setIsCopy(false), 1500);
  }
  const showBuyVipPayment = (id) => {
    setPaymentInfo(plan.plans.find(item => item.id === id))
    setIsOpen(true)
  }
  const payment = async () => {
    const res = await request("POST", path.billing, {body: {
      amount: paymentInfo.price,
      payment: "momo",
      planId: paymentInfo.id,
      description: paymentInfo.description
    }});
    setIsOpen(false)
    toast.success("Please wait for the admin to confirm your payment")
  }

  return (
    <div className="homeUser">
      <Header></Header>
      <div className="containerUser">
        <div className="payment__list">
          {plan?.plans?.length > 0 && plan.plans.map((item, index) => 
          <div className="payment__item" key={item.id} onClick={()=>showBuyVipPayment(item.id)}>
            <div className="name">{item.name}</div>
            <div className="description">{item.description}</div>
            <div className="price">${item.price} <span className='days'>/ {item.days} days</span></div>
          </div>
          )}
        </div>
        <CustomModal size="md" button="Payment" title="Payment" isOpen={isOpen} setIsOpen={setIsOpen} handleSubmit={payment}>
          <div className="payment">
            <div className="payment__wrapper">
                <div className="payment__inner">
                    <div className="payment__left">
                        <div className="countdount">Đơn hàng hết hạn sau:<span>{formatCountdownTime(time)}</span></div>
                        <h1 className="account__name">Tên chủ tài khoản: <span>CONG NGHE JAVA HK1</span></h1>
                        <p className="info amount">Số tiền: <span>{paymentInfo.price}</span></p>
                        <p className="info id">Đơn hàng: <span>108t3o21iuy213</span></p>
                        {/* <a className="back">Quay lại</a> */}
                    </div>
                    <div className="payment__right">
                        <h2>Quét mã để thanh toán</h2>
                        <div className="img"><img src="/images/qr.webp" alt="QR code"/></div>
                        <p className="money">Số tiền: <span>{paymentInfo.price}</span></p>
                        <span className="">Gói: {paymentInfo.name} ({paymentInfo.description}) [ $ {paymentInfo.price} / {paymentInfo.days} days ]</span>
                        <p className="note">Sử dụng camera diện thoại hoặc ứng dụng momo để quét mã</p>
                        <div className="content">
                          Nội dung chuyển khoản 
                          <span>{auth.user.username.toUpperCase()}BUYVIP</span>
                          <span className="copy" onClick={copyTranferCode}>
                            {isCopy ? (<i>Copied</i>) : <IoCopy />}
                          </span>
                        </div>

                    </div>
                </div>
            </div>
          </div>
        </CustomModal>
        
      </div>
    </div>
  )
}
