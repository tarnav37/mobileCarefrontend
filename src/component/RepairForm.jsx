import React, { useState } from 'react';
import './RepairForm.css'; // Import your CSS file
import SignatureCanvas from 'react-signature-canvas'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RepairForm = () => {
  const [signature, setSignature] = useState();
  const [result, setResult] = useState();
  const clearHandler = () => {
    signature.clear();
    setResult(null);
  };
  const saveHandler = () => {
    const res = signature.getTrimmedCanvas().toDataURL('image/png');
    setResult(res);
  };
  const notify = () => toast("Your form is submitted!");

  const [formData, setFormData] = useState({
    date: '',
    deviceModel: '',
    customerName: '',
    phoneNumber: '',
    partOrder: '',
    technicianName: '',
    status: '',
    deposit: '',
    totalAmount: '',
    balance: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://mobilecarebackend.onrender.com/repairform', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        notify();
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="repair-form">
      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required/>
      </div>
      <div className="form-group">
        <label htmlFor="deviceModel">Device Model:</label>
        <input type="text" id="deviceModel" name="deviceModel" value={formData.deviceModel} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="customerName">Customer Name:</label>
        <input type="text" id="customerName" name="customerName" value={formData.customerName} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="partOrder">Part Order:</label>
        <input type="text" id="partOrder" name="partOrder" value={formData.partOrder} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="technicianName">Technician Name:</label>
        <input type="text" id="technicianName" name="technicianName" value={formData.technicianName} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status:</label>
        <input type="text" id="status" name="status" value={formData.status} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="deposit">Deposit:</label>
        <input type="text" id="deposit" name="deposit" value={formData.deposit} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="totalAmount">Total Amount:</label>
        <input type="text" id="totalAmount" name="totalAmount" value={formData.totalAmount} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="balance">Balance:</label>
        <input type="text" id="balance" name="balance" value={formData.balance} onChange={handleChange} />
      </div>
      <label htmlFor="signature">Signature:</label>
      <div style={{width: 500, height: 200, border:'1px Solid #CCC'}}>
        <SignatureCanvas
          ref={(ref) => setSignature(ref)}
          pencolor='Black'
          backgroundColor= "rgba(255,255,255,1)"
          canvasProps={{width: 500, height: 200, className: 'sigCanvas'}}
        />
      </div>
      <div className="sig-actions">
        <button onClick={clearHandler}>Clear</button>
        <button onClick={saveHandler}>Save</button>
      </div>
      {
        result && (
          <div>
            <img src={result} alt="signature" />
          </div>
        )
      }
      <button onClick={notify}>Submit</button>
      <ToastContainer />
    </form>
  );
};

export default RepairForm;
