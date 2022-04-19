import React from 'react'
import { useEffect, useState } from 'react';
import Modal from 'react-modal';

function AddAccount({ isOpen, closeModal, onSave }) {
  return (
    <Modal
      isOpen={isOpen}
      contentLabel="Add account"
      style={{
        border: '1px solid black'
      }}
    >
      <h2>Associate an Account</h2>
      <button onClick={closeModal}>close</button>
      <form onSubmit={onSave}>
        <div>
          <input name="alias" placeholder="Account Alias" type="text" />
          <input name="ethaddress" placeholder="Ethereum Address" type="text" />
          <input name="jwt" placeholder="JWT token" type="text" />
        </div>
        <button type="submit">save</button>
      </form>
    </Modal>
  )
}

export default AddAccount
