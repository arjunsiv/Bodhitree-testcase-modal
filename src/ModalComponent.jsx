import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DiffViewer from './DiffViewer';
import OrderList from './OrderList';

const ModalComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState('');
  // Generate the UI for displaying the differences
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}> Click to see modal</Button>
      <Modal show={showModal} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Testcase Comparison</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', height: '60vh' }}>
            <div style={{ overflow: 'auto', height: '100%' }}>
              <OrderList setData={setData} />
            </div>
            <div
              style={{
                overflow: 'auto',
                height: '100%',
                flex: '1',
                padding: '30px',
              }}
            >
              <DiffViewer data={data} />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};


export default ModalComponent;
