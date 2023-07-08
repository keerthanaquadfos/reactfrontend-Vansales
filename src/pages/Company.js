import React, { useState, useEffect } from 'react';
import Layout from '../components/shared/Layout/Layout';
import API from '../services/API';
import { toast } from 'react-toastify';
import Spinner from '../components/shared/Spinner';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from '../components/shared/form/Button';
import InputType from '../components/shared/form/InputType';
const Company = () => {
  const [show, setShow] = useState(false);
  const [delShow, setDelShow] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [oldEmail, setOldEmail] = useState('');
  const [provinceId, setProvinceId] = useState('');
  const [maxUsers, setMaxUsers] = useState(10);
  const [itemId, setitemId] = useState(0);
  const [comapnies, setCompanies] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(false);
  const modalClose = () => setShow(false);
  const modalShow = (item) => {
    setShow(true);
    setItemToEdit(item);
  };
  const modalDelClose = () => setDelShow(false);
  const modelDeleteShow = (id) => {
    setDelShow(true);
    setitemId(id);
  };
  const getCompanies = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/company', null);
      console.log(data);
      if (data.status) {
        setCompanies(data.value);
      } else {
        toast.error(data.msg);
      }
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getProvinces = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/general/province', null);
      if (data.status) {
        setProvinces(data.value);
      } else {
        toast.error(data.msg);
      }
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const setItemToEdit = (itemd) => {
    if (itemd.id > 0) {
      setOldEmail(itemd.email);
      setName(itemd.name);
      setitemId(itemd.id);
      setProvinceId(itemd.provinceId);
      setEmail(itemd.email);
      setContact(itemd.contact);
      setMaxUsers(itemd.maxUsers);
      setPassword(itemd.password);
    } else {
      setName('');
      setitemId(0);
      setProvinceId(provinces[0].id);
      setEmail('');
      setContact('');
      setMaxUsers('');
      setPassword('');
    }
  };

  const deleteCategory = async () => {
    try {
      setLoading(true);
      const { data } = await API.delete('/company/' + itemId);
      if (data.status) {
        toast.success(data.msg);
        setitemId(0);
        getCompanies();
      } else {
        toast.error(data.msg);
      }
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const postCategory = async () => {
    try {
      if (!name) {
        toast.warning('Name required');
        return;
      }
      debugger;
      setLoading(true);
      var reqData = {
        name: name,
        address: address,
        email: email,
        provinceId: provinceId,
        contact: contact,
        maxUsers: maxUsers,
        password: password,
        oldEmail: oldEmail,
      };
      const { data } =
        itemId > 0
          ? await API.put('/company/' + itemId, reqData)
          : await API.post('/company', reqData);
      console.log(data);
      if (data.status) {
        getCompanies();
        toast.success(data.msg);
        setitemId(0);
      } else {
        toast.error(data.msg);
      }
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProvinces();
    getCompanies();
  }, []);

  const handleSave = () => {
    postCategory();
    modalClose();
  };
  const handleDelete = () => {
    deleteCategory();
    modalDelClose();
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Layout>
          <div className="card">
            <h5 className="card-header">
              <i
                className="bx bx-plus-circle me-2"
                style={{ cursor: 'pointer' }}
                onClick={() => modalShow({ id: 0 })}
              ></i>
              Companies
            </h5>
            <div className="table-responsive text-nowrap">
              <table className="table">
                <thead>
                  <tr>
                    <td>Name</td>
                    <td>Address</td>
                    <td>Contact</td>
                    <td>Email</td>
                    <td>Province</td>
                    <td>Max Users</td>
                    <td>Actions</td>
                  </tr>
                </thead>
                <tbody className="table-border-bottom-0">
                  {comapnies &&
                    comapnies.map((data, index) => {
                      if (data.id > 1) {
                        return (
                          <tr key={data.id}>
                            <td>{data.name}</td>
                            <td>
                              {data.address.length > 80
                                ? data.address.substring(0, 80)
                                : data.address}
                            </td>
                            <td>{data.contact}</td>
                            <td>{data.email}</td>
                            <td>{data.province.name}</td>
                            <td>{data.maxUsers}</td>
                            <td>
                              <div className="">
                                <Link
                                  onClick={() => modalShow(data)}
                                  style={{ width: 100 }}
                                >
                                  <i
                                    className="bx bx-edit-alt me-2"
                                    title="Edit"
                                  ></i>
                                </Link>
                                <Link
                                  onClick={() => modelDeleteShow(data.id)}
                                  style={{ width: 100 }}
                                >
                                  <i
                                    className="bx bx-trash me-2"
                                    title="Delete"
                                  ></i>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        );
                      } else {
                        return null;
                      }
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <Modal show={show} onHide={modalClose}>
            <Modal.Header closeButton>
              <Modal.Title>Comapany</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <InputType
                className={'form-control'}
                inputType={'text'}
                labelFor={'name'}
                onChange={(e) => setName(e.target.value)}
                labelText={'Company Name'}
                name={name}
                placeholder={'Company Name'}
                value={name}
              />

              <InputType
                className={'form-control'}
                inputType={'text'}
                labelFor={'address'}
                onChange={(e) => setAddress(e.target.value)}
                labelText={'Address'}
                placeholder={'Address'}
                value={address}
              />

              <InputType
                className={'form-control'}
                inputType={'text'}
                labelFor={'contact'}
                onChange={(e) => setContact(e.target.value)}
                labelText={'Contact'}
                placeholder={'Contact'}
                value={contact}
              />

              <div className="mb-3">
                <label htmlFor="provinceId" className="form-label">
                  {' '}
                  Province
                </label>
                <select
                  defaultValue={provinceId}
                  value={provinceId}
                  className="form-control mb-3"
                  onChange={(e) => setProvinceId(e.target.value)}
                >
                  {provinces ? (
                    provinces.map((data, index) => (
                      <>
                        <option value={data.id}>{data.name}</option>
                      </>
                    ))
                  ) : (
                    <>
                      <option value={0}>No data available</option>
                    </>
                  )}
                </select>
              </div>

              <InputType
                className={'form-control'}
                inputType={'text'}
                labelFor={'email'}
                onChange={(e) => setEmail(e.target.value)}
                labelText={'Email'}
                placeholder={'Email'}
                value={email}
              />

              <InputType
                className={'form-control'}
                inputType={'password'}
                labelFor={'password'}
                onChange={(e) => setPassword(e.target.value)}
                labelText={'Admin Password'}
                name={password}
                placeholder={'Admin Password'}
                value={password}
              />

              <InputType
                className={'form-control'}
                inputType={'number'}
                labelFor={'maxUsers'}
                onChange={(e) => setMaxUsers(e.target.value)}
                labelText={'Max Users'}
                placeholder={'Max Users'}
                value={maxUsers}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="btn btn-sm btn-primary"
                buttonText={'Save'}
                handleClick={() => handleSave()}
              >
                Save changes
              </Button>
              <Button
                className="btn btn-sm btn-dark"
                buttonText={'Close'}
                handleClick={() => modalClose()}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={delShow} onHide={modalDelClose}>
            <Modal.Header closeButton>
              <Modal.Title>Comapany</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure, do you want to delete?</Modal.Body>
            <Modal.Footer>
              <Button
                className="btn btn-sm btn-primary"
                buttonText={'Delete'}
                handleClick={() => handleDelete()}
              >
                Save changes
              </Button>
              <Button
                className="btn btn-sm btn-dark"
                buttonText={'Close'}
                handleClick={modalDelClose}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Layout>
      )}
    </>
  );
};

export default Company;
